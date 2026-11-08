begin;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke all on all functions in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;

create type public.profile_role as enum (
  'buyer',
  'super_admin',
  'procurement_manager',
  'procurement_employee',
  'sales_manager',
  'finance_manager',
  'operations_manager',
  'quality_manager'
);

create type public.company_member_role as enum ('owner', 'member');
create type public.company_verification_status as enum ('pending', 'under_review', 'verified', 'rejected', 'suspended');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role public.profile_role not null default 'buyer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 160),
  tax_id text unique check (tax_id is null or tax_id ~ '^[0-9]{9,14}$'),
  city text not null check (char_length(btrim(city)) between 2 and 100),
  verification_status public.company_verification_status not null default 'pending',
  created_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_members (
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  member_role public.company_member_role not null default 'member',
  created_at timestamptz not null default now(),
  primary key (company_id, user_id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories (id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name_ar text not null check (char_length(btrim(name_ar)) between 2 and 120),
  name_en text not null check (char_length(btrim(name_en)) between 2 and 120),
  commission_pct numeric(5,2) not null default 10 check (commission_pct between 0 and 100),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index company_members_user_id_idx on public.company_members (user_id);
create index categories_parent_active_sort_idx on public.categories (parent_id, is_active, sort_order);
create index audit_logs_entity_created_idx on public.audit_logs (entity_type, entity_id, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''), ''), 'buyer');
  return new;
end;
$$;

create function public.audit_profile_role_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.role is distinct from new.role then
    insert into public.audit_logs (actor_id, action, entity_type, entity_id, old_data, new_data)
    values (
      auth.uid(),
      'profile.role_changed',
      'profile',
      new.id::text,
      jsonb_build_object('role', old.role),
      jsonb_build_object('role', new.role)
    );
  end if;
  return new;
end;
$$;

create function public.audit_company_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  before_row jsonb;
  after_row jsonb;
  row_id uuid;
begin
  if tg_op = 'INSERT' then
    after_row := to_jsonb(new);
    row_id := new.id;
  else
    before_row := to_jsonb(old);
    after_row := to_jsonb(new);
    row_id := new.id;
  end if;

  insert into public.audit_logs (actor_id, action, entity_type, entity_id, old_data, new_data)
  values (auth.uid(), 'company.' || lower(tg_op), 'company', row_id::text, before_row, after_row);
  return new;
end;
$$;

create function public.prevent_audit_log_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception using errcode = '42501', message = 'AUDIT_LOG_APPEND_ONLY';
end;
$$;

create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role <> 'buyer'
  );
$$;

create function public.onboard_company(p_name text, p_tax_id text, p_city text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  new_company_id uuid;
begin
  if current_user_id is null then
    raise exception using errcode = '28000', message = 'AUTH_REQUIRED';
  end if;
  if p_name is null or char_length(btrim(p_name)) not between 2 and 160 then
    raise exception using errcode = '22023', message = 'INVALID_COMPANY_NAME';
  end if;
  if p_city is null or char_length(btrim(p_city)) not between 2 and 100 then
    raise exception using errcode = '22023', message = 'INVALID_COMPANY_CITY';
  end if;
  if p_tax_id is not null and p_tax_id !~ '^[0-9]{9,14}$' then
    raise exception using errcode = '22023', message = 'INVALID_TAX_ID';
  end if;

  insert into public.companies (name, tax_id, city, created_by)
  values (btrim(p_name), nullif(btrim(p_tax_id), ''), btrim(p_city), current_user_id)
  returning id into new_company_id;

  insert into public.company_members (company_id, user_id, member_role)
  values (new_company_id, current_user_id, 'owner');

  return new_company_id;
end;
$$;

create function public.set_profile_role(p_user_id uuid, p_role public.profile_role)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or not public.is_staff() or not exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'super_admin'
  ) then
    raise exception using errcode = '42501', message = 'FORBIDDEN';
  end if;
  if p_user_id = auth.uid() then
    raise exception using errcode = '42501', message = 'SELF_ROLE_CHANGE_FORBIDDEN';
  end if;
  if p_role is null then
    raise exception using errcode = '22023', message = 'INVALID_ROLE';
  end if;

  update public.profiles set role = p_role, updated_at = now() where id = p_user_id;
  if not found then
    raise exception using errcode = 'P0002', message = 'PROFILE_NOT_FOUND';
  end if;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

create trigger profiles_role_audit after update of role on public.profiles
for each row execute function public.audit_profile_role_change();

create trigger companies_updated_at before update on public.companies
for each row execute function public.set_updated_at();

create trigger companies_audit after insert or update on public.companies
for each row execute function public.audit_company_change();

create trigger categories_updated_at before update on public.categories
for each row execute function public.set_updated_at();

create trigger audit_logs_append_only
before update or delete on public.audit_logs
for each row execute function public.prevent_audit_log_mutation();

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.categories enable row level security;
alter table public.audit_logs enable row level security;

create policy "Profiles are visible to their owner and staff"
on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select public.is_staff()));

create policy "Users update only their own profile"
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Company members and staff can read companies"
on public.companies for select to authenticated
using (
  (select public.is_staff())
  or id in (select cm.company_id from public.company_members cm where cm.user_id = (select auth.uid()))
);

create policy "Users can read their own memberships"
on public.company_members for select to authenticated
using (user_id = (select auth.uid()));

create policy "Active categories are public"
on public.categories for select to anon, authenticated
using (is_active);

create policy "Staff can read inactive categories"
on public.categories for select to authenticated
using ((select public.is_staff()));

create policy "Super admins can read audit logs"
on public.audit_logs for select to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'super_admin'
  )
);

grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant select on public.companies, public.company_members to authenticated;
grant select on public.categories to anon, authenticated;
grant select on public.audit_logs to authenticated;
revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.audit_profile_role_change() from public, anon, authenticated;
revoke all on function public.audit_company_change() from public, anon, authenticated;
revoke all on function public.prevent_audit_log_mutation() from public, anon, authenticated;
revoke all on function public.is_staff() from public, anon, authenticated;
revoke all on function public.onboard_company(text, text, text) from public, anon, authenticated;
revoke all on function public.set_profile_role(uuid, public.profile_role) from public, anon, authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.onboard_company(text, text, text) to authenticated;
grant execute on function public.set_profile_role(uuid, public.profile_role) to authenticated;

insert into public.categories (slug, name_ar, name_en, sort_order)
values
  ('industrial-raw-materials', 'المواد الخام الصناعية', 'Industrial Raw Materials', 1),
  ('spare-parts', 'قطع الغيار', 'Spare Parts', 2),
  ('electrical', 'المستلزمات الكهربائية', 'Electrical', 3),
  ('packaging', 'مواد التعبئة والتغليف', 'Packaging', 4),
  ('tools-safety', 'الأدوات والسلامة', 'Tools & Safety', 5),
  ('corporate-office', 'مستلزمات الشركات والمكاتب', 'Corporate & Office', 6),
  ('logistics-services', 'الخدمات اللوجستية والصناعية', 'Logistics & Services', 7);

insert into public.categories (parent_id, slug, name_ar, name_en, sort_order)
select parent.id, child.slug, child.name_ar, child.name_en, child.sort_order
from (values
  ('industrial-raw-materials', 'plastics-polymers', 'البلاستيك والبوليمرات', 'Plastics & Polymers', 1),
  ('industrial-raw-materials', 'metals', 'المعادن', 'Steel, Iron & Non-ferrous Metals', 2),
  ('industrial-raw-materials', 'chemicals', 'المواد الكيميائية', 'Chemicals', 3),
  ('industrial-raw-materials', 'textile-materials', 'المواد النسيجية', 'Textile Materials', 4),
  ('spare-parts', 'motors-bearings', 'المحركات والمحامل', 'Motors & Bearings', 1),
  ('spare-parts', 'pumps-valves', 'المضخات والصمامات', 'Pumps & Valves', 2),
  ('spare-parts', 'filters-mechanical-parts', 'الفلاتر والقطع الميكانيكية', 'Filters & Mechanical Parts', 3),
  ('spare-parts', 'production-line-parts', 'قطع خطوط الإنتاج', 'Production-line Parts', 4),
  ('electrical', 'cables', 'الكابلات', 'Cables', 1),
  ('electrical', 'breakers-protection', 'القواطع والحماية', 'Breakers & Protection', 2),
  ('electrical', 'control-sensors', 'لوحات التحكم والحساسات', 'Control Panels & Sensors', 3),
  ('electrical', 'electrical-components', 'المكونات الكهربائية', 'Electrical Components', 4),
  ('packaging', 'cardboard-paper', 'الكرتون والورق', 'Cardboard & Paper', 1),
  ('packaging', 'industrial-rolls-bags', 'الرولات والأكياس الصناعية', 'Industrial Rolls & Bags', 2),
  ('packaging', 'stretch-film', 'أفلام التغليف', 'Stretch Film', 3),
  ('packaging', 'packaging-equipment', 'معدات التعبئة والتغليف', 'Packaging Equipment', 4),
  ('tools-safety', 'tools', 'الأدوات اليدوية والكهربائية', 'Hand & Power Tools', 1),
  ('tools-safety', 'ppe', 'معدات الوقاية الشخصية', 'Personal Protective Equipment', 2),
  ('tools-safety', 'welding-maintenance', 'اللحام والصيانة', 'Welding & Maintenance', 3),
  ('tools-safety', 'workplace-safety', 'السلامة المهنية', 'Workplace Safety', 4),
  ('corporate-office', 'computers-it', 'الحواسيب وتقنية المعلومات', 'Computers & IT', 1),
  ('corporate-office', 'printers-furniture', 'الطابعات والأثاث', 'Printers & Furniture', 2),
  ('corporate-office', 'stationery', 'القرطاسية', 'Stationery', 3),
  ('corporate-office', 'office-equipment', 'معدات المكاتب', 'Office Equipment', 4),
  ('logistics-services', 'transport', 'النقل', 'Transport', 1),
  ('logistics-services', 'warehousing', 'التخزين', 'Warehousing', 2),
  ('logistics-services', 'maintenance-installation', 'الصيانة والتركيب', 'Maintenance & Installation', 3),
  ('logistics-services', 'calibration-technical-services', 'المعايرة والخدمات الفنية', 'Calibration & Technical Services', 4)
) as child(parent_slug, slug, name_ar, name_en, sort_order)
join public.categories parent on parent.slug = child.parent_slug;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

commit;
