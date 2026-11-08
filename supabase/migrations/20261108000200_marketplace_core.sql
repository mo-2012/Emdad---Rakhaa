begin;

create type public.seller_status as enum ('pending', 'under_review', 'verified', 'rejected', 'suspended');
create type public.product_review_status as enum ('pending', 'approved', 'rejected');
create type public.order_status as enum ('new', 'confirmed', 'shipped', 'delivered', 'cancelled');

alter table public.categories
  add column search_name text generated always as (
    lower(name_ar || ' ' || name_en || ' ' || slug)
  ) stored;

create table public.sellers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null unique references public.companies (id) on delete restrict,
  store_name text not null check (char_length(btrim(store_name)) between 2 and 160),
  description text not null default '' check (char_length(description) <= 3000),
  commission_override numeric(5,2) check (commission_override between 0 and 100),
  status public.seller_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers (id) on delete restrict,
  category_id uuid not null references public.categories (id) on delete restrict,
  name_ar text not null check (char_length(btrim(name_ar)) between 2 and 200),
  name_en text not null check (char_length(btrim(name_en)) between 2 and 200),
  description_ar text not null default '' check (char_length(description_ar) <= 10000),
  description_en text not null default '' check (char_length(description_en) <= 10000),
  specifications jsonb not null default '{}'::jsonb check (jsonb_typeof(specifications) = 'object'),
  brand text check (brand is null or char_length(brand) <= 120),
  sku text check (sku is null or char_length(sku) <= 100),
  unit text not null default 'قطعة' check (char_length(btrim(unit)) between 1 and 40),
  unit_price numeric(12,2) not null check (unit_price > 0),
  min_order_qty integer not null default 1 check (min_order_qty > 0),
  stock_qty integer not null default 0 check (stock_qty >= 0),
  shipping_fee numeric(12,2) not null default 0 check (shipping_fee >= 0),
  vat_rate numeric(4,2) not null default 14 check (vat_rate in (0, 14)),
  is_active boolean not null default true,
  review_status public.product_review_status not null default 'pending',
  search_text text generated always as (
    lower(name_ar || ' ' || name_en || ' ' || coalesce(brand, '') || ' ' || coalesce(sku, ''))
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (seller_id, sku)
);

create table public.product_price_tiers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  min_qty integer not null check (min_qty > 0),
  unit_price numeric(12,2) not null check (unit_price > 0),
  created_at timestamptz not null default now(),
  unique (product_id, min_qty)
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  storage_path text not null,
  alt_ar text not null default '',
  alt_en text not null default '',
  sort_order smallint not null default 0 check (sort_order between 0 and 7),
  created_at timestamptz not null default now(),
  unique (product_id, storage_path),
  unique (product_id, sort_order)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  buyer_user_id uuid not null references public.profiles (id) on delete restrict,
  buyer_company_id uuid not null references public.companies (id) on delete restrict,
  status public.order_status not null default 'new',
  payment_method text not null default 'cod' check (payment_method in ('cod', 'fawaterk', 'paymob')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  delivery_name text not null check (char_length(btrim(delivery_name)) between 2 and 160),
  delivery_phone text not null check (char_length(btrim(delivery_phone)) between 7 and 30),
  delivery_city text not null check (char_length(btrim(delivery_city)) between 2 and 100),
  delivery_address text not null check (char_length(btrim(delivery_address)) between 5 and 500),
  subtotal numeric(14,2) not null default 0,
  vat_total numeric(14,2) not null default 0,
  shipping_total numeric(14,2) not null default 0,
  grand_total numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.seller_orders (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete restrict,
  seller_id uuid not null references public.sellers (id) on delete restrict,
  status public.order_status not null default 'new',
  payment_collected boolean not null default false,
  subtotal numeric(14,2) not null default 0,
  vat_total numeric(14,2) not null default 0,
  shipping_total numeric(14,2) not null default 0,
  grand_total numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, seller_id)
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  seller_order_id uuid not null references public.seller_orders (id) on delete restrict,
  product_id uuid references public.products (id) on delete set null,
  product_name_ar text not null,
  product_name_en text not null,
  unit text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price > 0),
  line_subtotal numeric(14,2) not null,
  vat_rate numeric(4,2) not null check (vat_rate in (0, 14)),
  line_vat numeric(14,2) not null,
  shipping_fee numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table public.seller_order_fees (
  seller_order_id uuid primary key references public.seller_orders (id) on delete restrict,
  commission_total numeric(14,2) not null check (commission_total >= 0),
  seller_net numeric(14,2) not null,
  settled_at timestamptz,
  settled_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.order_item_fees (
  order_item_id uuid primary key references public.order_items (id) on delete restrict,
  commission_pct numeric(5,2) not null check (commission_pct between 0 and 100),
  commission_amount numeric(14,2) not null check (commission_amount >= 0),
  created_at timestamptz not null default now()
);

create table public.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders (id) on delete restrict,
  seller_order_id uuid references public.seller_orders (id) on delete restrict,
  from_status public.order_status,
  to_status public.order_status not null,
  actor_id uuid references public.profiles (id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create table public.procurement_requests (
  id uuid primary key default gen_random_uuid(),
  request_number bigint generated always as identity unique,
  tracking_number text not null unique,
  buyer_user_id uuid not null references public.profiles (id) on delete restrict,
  company_id uuid not null references public.companies (id) on delete restrict,
  title text not null check (char_length(btrim(title)) between 3 and 200),
  description text not null check (char_length(btrim(description)) between 10 and 10000),
  status text not null default 'submitted'
    check (status in ('submitted', 'under_review', 'clarification_needed', 'sourcing', 'quoted', 'accepted', 'declined', 'cancelled', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.procurement_request_items (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.procurement_requests (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  specifications text not null check (char_length(btrim(specifications)) between 3 and 3000),
  quantity numeric(14,3) check (quantity is null or quantity > 0),
  unit text check (unit is null or char_length(unit) <= 40),
  created_at timestamptz not null default now()
);

create table public.request_attachments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.procurement_requests (id) on delete cascade,
  storage_path text not null unique,
  file_name text not null check (char_length(file_name) between 1 and 255),
  mime_type text not null check (mime_type in ('application/pdf', 'image/png', 'image/jpeg', 'image/webp')),
  file_size integer not null check (file_size between 1 and 26214400),
  created_at timestamptz not null default now()
);

create table public.request_events (
  id bigint generated always as identity primary key,
  request_id uuid not null references public.procurement_requests (id) on delete restrict,
  from_status text,
  to_status text not null,
  customer_note text,
  actor_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.request_internal (
  request_id uuid primary key references public.procurement_requests (id) on delete cascade,
  assigned_to uuid references public.profiles (id) on delete set null,
  is_urgent boolean not null default false,
  internal_notes text not null default '',
  updated_at timestamptz not null default now()
);

create index products_public_catalog_idx on public.products (category_id, created_at desc)
  where is_active and review_status = 'approved';
create index products_seller_idx on public.products (seller_id, created_at desc);
create index products_search_idx on public.products using gin (to_tsvector('simple', search_text));
create index product_price_tiers_product_idx on public.product_price_tiers (product_id, min_qty desc);
create index product_images_product_idx on public.product_images (product_id, sort_order);
create index orders_buyer_idx on public.orders (buyer_user_id, created_at desc);
create index seller_orders_seller_idx on public.seller_orders (seller_id, created_at desc);
create index order_items_product_idx on public.order_items (product_id);
create index order_events_order_idx on public.order_events (order_id, created_at);
create index procurement_requests_buyer_idx on public.procurement_requests (buyer_user_id, created_at desc);
create index procurement_request_items_request_idx on public.procurement_request_items (request_id);
create index request_attachments_request_idx on public.request_attachments (request_id);
create index request_events_request_idx on public.request_events (request_id, created_at);

create function public.reset_product_review()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.review_status := 'pending';
  return new;
end;
$$;

create function public.list_staff_sellers()
returns table (
  id uuid,
  company_id uuid,
  store_name text,
  description text,
  status public.seller_status,
  commission_override numeric,
  company_name text,
  city text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_staff() then raise exception using errcode = '42501', message = 'FORBIDDEN'; end if;
  return query
  select s.id, s.company_id, s.store_name, s.description, s.status,
    s.commission_override, c.name, c.city
  from public.sellers s
  join public.companies c on c.id = s.company_id
  order by s.created_at desc;
end;
$$;

create function public.get_commission_rate(p_seller_id uuid, p_category_id uuid)
returns numeric
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  result numeric;
begin
  if not public.owns_seller(p_seller_id)
     and not exists (
       select 1 from public.profiles p where p.id = auth.uid()
         and p.role in ('super_admin', 'finance_manager')
     ) then
    raise exception using errcode = '42501', message = 'FORBIDDEN';
  end if;
  select coalesce(s.commission_override, c.commission_pct, 10)
  into result
  from public.sellers s cross join public.categories c
  where s.id = p_seller_id and c.id = p_category_id;
  if result is null then raise exception using errcode = 'P0002', message = 'CATEGORY_OR_SELLER_NOT_FOUND'; end if;
  return result;
end;
$$;

create function public.is_verified_seller(p_seller_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.sellers s
    where s.id = p_seller_id and s.status = 'verified'
  );
$$;

create function public.staff_list_categories()
returns table (id uuid, parent_id uuid, slug text, name_ar text, name_en text, commission_pct numeric, is_active boolean, sort_order integer)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_staff() then raise exception using errcode = '42501', message = 'FORBIDDEN'; end if;
  return query
    select c.id, c.parent_id, c.slug, c.name_ar, c.name_en, c.commission_pct, c.is_active, c.sort_order
    from public.categories c order by c.sort_order, c.name_en;
end;
$$;

create function public.manage_category(
  p_category_id uuid,
  p_parent_id uuid,
  p_slug text,
  p_name_ar text,
  p_name_en text,
  p_commission_pct numeric,
  p_is_active boolean,
  p_sort_order integer
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  result_id uuid;
begin
  if not exists (
    select 1 from public.profiles p where p.id = auth.uid()
      and p.role in ('super_admin', 'procurement_manager')
  ) then raise exception using errcode = '42501', message = 'FORBIDDEN'; end if;
  if p_parent_id = p_category_id then raise exception using errcode = '22023', message = 'INVALID_CATEGORY_PARENT'; end if;
  if p_parent_id is not null and exists (
    select 1 from public.categories child where child.id = p_parent_id and child.parent_id is not null
  ) then raise exception using errcode = '22023', message = 'CATEGORY_NESTING_TOO_DEEP'; end if;

  if p_category_id is null then
    insert into public.categories (parent_id, slug, name_ar, name_en, commission_pct, is_active, sort_order)
    values (p_parent_id, lower(btrim(p_slug)), btrim(p_name_ar), btrim(p_name_en), p_commission_pct,
      coalesce(p_is_active, true), coalesce(p_sort_order, 0))
    returning id into result_id;
  else
    update public.categories set
      parent_id = p_parent_id,
      slug = lower(btrim(p_slug)),
      name_ar = btrim(p_name_ar),
      name_en = btrim(p_name_en),
      commission_pct = p_commission_pct,
      is_active = coalesce(p_is_active, true),
      sort_order = coalesce(p_sort_order, 0)
    where id = p_category_id
    returning id into result_id;
    if result_id is null then raise exception using errcode = 'P0002', message = 'CATEGORY_NOT_FOUND'; end if;
  end if;
  return result_id;
end;
$$;

create function public.audit_category_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, old_data, new_data)
  values (
    auth.uid(),
    'category.' || lower(tg_op),
    'category',
    new.id::text,
    case when tg_op = 'INSERT' then null else to_jsonb(old) end,
    to_jsonb(new)
  );
  return new;
end;
$$;

create trigger categories_audit
after insert or update on public.categories
for each row execute function public.audit_category_change();

create function public.list_unsettled_commissions()
returns table (
  seller_order_id uuid,
  order_number bigint,
  seller_name text,
  commission_total numeric,
  seller_net numeric,
  delivered_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p where p.id = auth.uid()
      and p.role in ('super_admin', 'finance_manager')
  ) then raise exception using errcode = '42501', message = 'FINANCE_ROLE_REQUIRED'; end if;
  return query
    select so.id, o.order_number, s.store_name, f.commission_total, f.seller_net, so.updated_at
    from public.seller_order_fees f
    join public.seller_orders so on so.id = f.seller_order_id
    join public.orders o on o.id = so.order_id
    join public.sellers s on s.id = so.seller_id
    where so.status = 'delivered' and f.settled_at is null
    order by so.updated_at;
end;
$$;

create function public.set_seller_commission(p_seller_id uuid, p_commission_pct numeric)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('super_admin', 'finance_manager')
  ) then raise exception using errcode = '42501', message = 'FINANCE_ROLE_REQUIRED'; end if;
  if p_commission_pct is not null and p_commission_pct not between 0 and 100 then
    raise exception using errcode = '22023', message = 'INVALID_COMMISSION';
  end if;
  update public.sellers set commission_override = p_commission_pct where id = p_seller_id;
  if not found then raise exception using errcode = 'P0002', message = 'SELLER_NOT_FOUND'; end if;
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, new_data)
  values (auth.uid(), 'seller.commission_changed', 'seller', p_seller_id::text,
    jsonb_build_object('commission_override', p_commission_pct));
end;
$$;

create trigger sellers_updated_at before update on public.sellers
for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();
create trigger products_review_reset before update on public.products
for each row
when (
  old.name_ar is distinct from new.name_ar
  or old.name_en is distinct from new.name_en
  or old.description_ar is distinct from new.description_ar
  or old.description_en is distinct from new.description_en
  or old.specifications is distinct from new.specifications
  or old.category_id is distinct from new.category_id
)
execute function public.reset_product_review();
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();
create trigger seller_orders_updated_at before update on public.seller_orders
for each row execute function public.set_updated_at();
create trigger requests_updated_at before update on public.procurement_requests
for each row execute function public.set_updated_at();

create function public.assign_request_tracking_number()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.tracking_number := 'REQ-' || to_char(clock_timestamp() at time zone 'UTC', 'YYYY')
    || '-' || lpad(new.request_number::text, 6, '0');
  return new;
end;
$$;

create function public.is_safe_uuid_path(p_first text, p_second text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_first ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
     and p_second ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
$$;

create trigger request_tracking_number
before insert on public.procurement_requests
for each row execute function public.assign_request_tracking_number();

create function public.owns_seller(p_seller_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.sellers s
    join public.company_members cm on cm.company_id = s.company_id
    where s.id = p_seller_id
      and cm.user_id = (select auth.uid())
      and cm.member_role = 'owner'
  );
$$;

create function public.request_seller_store(p_company_id uuid, p_store_name text, p_description text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_seller_id uuid;
begin
  if auth.uid() is null or not exists (
    select 1 from public.company_members cm
    join public.companies c on c.id = cm.company_id
    where cm.company_id = p_company_id
      and cm.user_id = auth.uid()
      and cm.member_role = 'owner'
      and c.verification_status = 'verified'
  ) then
    raise exception using errcode = '42501', message = 'VERIFIED_COMPANY_OWNER_REQUIRED';
  end if;
  if p_store_name is null or char_length(btrim(p_store_name)) not between 2 and 160 then
    raise exception using errcode = '22023', message = 'INVALID_STORE_NAME';
  end if;

  insert into public.sellers (company_id, store_name, description)
  values (p_company_id, btrim(p_store_name), coalesce(p_description, ''))
  on conflict (company_id) do update
    set store_name = excluded.store_name, description = excluded.description
    where sellers.status in ('pending', 'rejected')
  returning id into new_seller_id;

  if new_seller_id is null then
    raise exception using errcode = '23505', message = 'SELLER_STORE_ALREADY_EXISTS';
  end if;
  return new_seller_id;
end;
$$;

create function public.save_seller_product(p_product_id uuid, p_data jsonb, p_tiers jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_seller_id uuid;
  saved_product_id uuid;
  tier jsonb;
begin
  if jsonb_typeof(p_data) <> 'object' or jsonb_typeof(p_tiers) <> 'array'
     or jsonb_array_length(p_tiers) > 50 then
    raise exception using errcode = '22023', message = 'INVALID_PRODUCT';
  end if;
  begin
    target_seller_id := (p_data ->> 'seller_id')::uuid;
  exception when invalid_text_representation then
    raise exception using errcode = '22023', message = 'INVALID_SELLER';
  end;
  if not public.owns_seller(target_seller_id) then
    raise exception using errcode = '42501', message = 'FORBIDDEN';
  end if;

  if p_product_id is null then
    insert into public.products (
      seller_id, category_id, name_ar, name_en, description_ar, description_en,
      specifications, brand, sku, unit, unit_price, min_order_qty, stock_qty,
      shipping_fee, vat_rate, is_active
    ) values (
      target_seller_id, (p_data ->> 'category_id')::uuid,
      btrim(p_data ->> 'name_ar'), btrim(p_data ->> 'name_en'),
      coalesce(p_data ->> 'description_ar', ''), coalesce(p_data ->> 'description_en', ''),
      coalesce(p_data -> 'specifications', '{}'::jsonb),
      nullif(btrim(p_data ->> 'brand'), ''), nullif(btrim(p_data ->> 'sku'), ''),
      btrim(p_data ->> 'unit'), (p_data ->> 'unit_price')::numeric,
      (p_data ->> 'min_order_qty')::integer, (p_data ->> 'stock_qty')::integer,
      (p_data ->> 'shipping_fee')::numeric, (p_data ->> 'vat_rate')::numeric,
      coalesce((p_data ->> 'is_active')::boolean, true)
    ) returning id into saved_product_id;
  else
    if not exists (
      select 1 from public.products p
      where p.id = p_product_id and p.seller_id = target_seller_id
    ) then raise exception using errcode = '42501', message = 'PRODUCT_NOT_OWNED'; end if;
    update public.products set
      category_id = (p_data ->> 'category_id')::uuid,
      name_ar = btrim(p_data ->> 'name_ar'),
      name_en = btrim(p_data ->> 'name_en'),
      description_ar = coalesce(p_data ->> 'description_ar', ''),
      description_en = coalesce(p_data ->> 'description_en', ''),
      specifications = coalesce(p_data -> 'specifications', '{}'::jsonb),
      brand = nullif(btrim(p_data ->> 'brand'), ''),
      sku = nullif(btrim(p_data ->> 'sku'), ''),
      unit = btrim(p_data ->> 'unit'),
      unit_price = (p_data ->> 'unit_price')::numeric,
      min_order_qty = (p_data ->> 'min_order_qty')::integer,
      stock_qty = (p_data ->> 'stock_qty')::integer,
      shipping_fee = (p_data ->> 'shipping_fee')::numeric,
      vat_rate = (p_data ->> 'vat_rate')::numeric,
      is_active = coalesce((p_data ->> 'is_active')::boolean, true)
    where id = p_product_id
    returning id into saved_product_id;
  end if;

  delete from public.product_price_tiers where product_id = saved_product_id;
  for tier in select value from jsonb_array_elements(p_tiers)
  loop
    insert into public.product_price_tiers (product_id, min_qty, unit_price)
    values (saved_product_id, (tier ->> 'min_qty')::integer, (tier ->> 'unit_price')::numeric);
  end loop;
  return saved_product_id;
exception
  when invalid_text_representation or numeric_value_out_of_range then
    raise exception using errcode = '22023', message = 'INVALID_PRODUCT_DATA';
end;
$$;

create function public.get_my_sellers()
returns table (id uuid, company_id uuid, store_name text, description text, status public.seller_status)
language sql
stable
security definer
set search_path = ''
as $$
  select s.id, s.company_id, s.store_name, s.description, s.status
  from public.sellers s
  join public.company_members cm on cm.company_id = s.company_id
  where cm.user_id = auth.uid() and cm.member_role = 'owner';
$$;

create function public.set_company_verification(p_company_id uuid, p_status public.company_verification_status)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('super_admin', 'operations_manager', 'quality_manager')
  ) then raise exception using errcode = '42501', message = 'FORBIDDEN'; end if;
  update public.companies set verification_status = p_status where id = p_company_id;
  if not found then raise exception using errcode = 'P0002', message = 'COMPANY_NOT_FOUND'; end if;
end;
$$;

create function public.submit_procurement_request(
  p_company_id uuid,
  p_title text,
  p_description text,
  p_items jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_request_id uuid;
  item jsonb;
begin
  if auth.uid() is null or not exists (
    select 1 from public.company_members cm
    where cm.company_id = p_company_id and cm.user_id = auth.uid()
  ) then raise exception using errcode = '42501', message = 'COMPANY_MEMBERSHIP_REQUIRED'; end if;
  if p_title is null or char_length(btrim(p_title)) not between 3 and 200
    or p_description is null or char_length(btrim(p_description)) not between 10 and 10000
    or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 50 then
    raise exception using errcode = '22023', message = 'INVALID_REQUEST';
  end if;

  insert into public.procurement_requests (buyer_user_id, company_id, title, description)
  values (auth.uid(), p_company_id, btrim(p_title), btrim(p_description))
  returning id into new_request_id;

  for item in select value from jsonb_array_elements(p_items)
  loop
    if char_length(btrim(coalesce(item ->> 'specifications', ''))) not between 3 and 3000 then
      raise exception using errcode = '22023', message = 'INVALID_REQUEST_ITEM';
    end if;
    insert into public.procurement_request_items (request_id, product_id, specifications, quantity, unit)
    values (
      new_request_id,
      nullif(item ->> 'product_id', '')::uuid,
      btrim(item ->> 'specifications'),
      nullif(item ->> 'quantity', '')::numeric,
      nullif(btrim(item ->> 'unit'), '')
    );
  end loop;
  return new_request_id;
end;
$$;

create function public.add_request_attachment(
  p_request_id uuid,
  p_storage_path text,
  p_file_name text,
  p_mime_type text,
  p_file_size integer
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_attachment_id uuid;
begin
  if not exists (
    select 1 from public.procurement_requests r
    where r.id = p_request_id and r.buyer_user_id = auth.uid()
      and r.status in ('submitted', 'under_review', 'clarification_needed', 'sourcing')
  ) then raise exception using errcode = '42501', message = 'REQUEST_NOT_ACCESSIBLE'; end if;
  if p_storage_path !~ ('^' || auth.uid()::text || '/' || p_request_id::text || '/[A-Za-z0-9._-]+$')
    or p_mime_type not in ('application/pdf', 'image/png', 'image/jpeg', 'image/webp')
    or p_file_size not between 1 and 26214400 then
    raise exception using errcode = '22023', message = 'INVALID_ATTACHMENT';
  end if;
  insert into public.request_attachments (request_id, storage_path, file_name, mime_type, file_size)
  values (p_request_id, p_storage_path, left(p_file_name, 255), p_mime_type, p_file_size)
  returning id into new_attachment_id;
  return new_attachment_id;
end;
$$;

create function public.place_order(
  p_items jsonb,
  p_delivery_name text,
  p_delivery_phone text,
  p_delivery_city text,
  p_delivery_address text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  buyer_id uuid := auth.uid();
  buyer_company uuid;
  new_order_id uuid;
  new_seller_order_id uuid;
  line record;
  product_row public.products%rowtype;
  chosen_price numeric(12,2);
  pct numeric(5,2);
  line_sub numeric(14,2);
  line_vat numeric(14,2);
  commission numeric(14,2);
  new_order_item_id uuid;
  group_sub numeric(14,2);
  group_vat numeric(14,2);
  group_shipping numeric(14,2);
  group_commission numeric(14,2);
  all_sub numeric(14,2) := 0;
  all_vat numeric(14,2) := 0;
  all_shipping numeric(14,2) := 0;
begin
  if buyer_id is null then
    raise exception using errcode = '28000', message = 'AUTH_REQUIRED';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 100 then
    raise exception using errcode = '22023', message = 'INVALID_CART';
  end if;
  if p_delivery_name is null or char_length(btrim(p_delivery_name)) not between 2 and 160
     or p_delivery_phone is null or char_length(btrim(p_delivery_phone)) not between 7 and 30
     or p_delivery_city is null or char_length(btrim(p_delivery_city)) not between 2 and 100
     or p_delivery_address is null or char_length(btrim(p_delivery_address)) not between 5 and 500 then
    raise exception using errcode = '22023', message = 'INVALID_DELIVERY_DETAILS';
  end if;
  if exists (
    select 1 from jsonb_to_recordset(p_items) as x(product_id uuid, quantity integer)
    where x.product_id is null or x.quantity is null or x.quantity < 1
  ) or (select count(*) from jsonb_to_recordset(p_items) as x(product_id uuid, quantity integer))
       <> (select count(distinct x.product_id) from jsonb_to_recordset(p_items) as x(product_id uuid, quantity integer)) then
    raise exception using errcode = '22023', message = 'INVALID_CART_LINES';
  end if;

  select cm.company_id into buyer_company
  from public.company_members cm
  join public.companies c on c.id = cm.company_id
  where cm.user_id = buyer_id
    and c.verification_status = 'verified'
  order by cm.created_at
  limit 1;
  if buyer_company is null then
    raise exception using errcode = '42501', message = 'VERIFIED_BUYER_COMPANY_REQUIRED';
  end if;

  insert into public.orders (
    buyer_user_id, buyer_company_id, delivery_name, delivery_phone, delivery_city, delivery_address
  ) values (
    buyer_id, buyer_company, btrim(p_delivery_name), btrim(p_delivery_phone), btrim(p_delivery_city), btrim(p_delivery_address)
  ) returning id into new_order_id;

  for line in
    select x.product_id, x.quantity
    from jsonb_to_recordset(p_items) as x(product_id uuid, quantity integer)
    order by x.product_id
  loop
    select p.* into product_row
    from public.products p
    where p.id = line.product_id
    for update;
    if not found or not product_row.is_active or product_row.review_status <> 'approved' then
      raise exception using errcode = 'P0002', message = 'PRODUCT_UNAVAILABLE';
    end if;
    if not exists (select 1 from public.sellers s where s.id = product_row.seller_id and s.status = 'verified') then
      raise exception using errcode = 'P0002', message = 'SELLER_UNAVAILABLE';
    end if;
    if exists (
      select 1 from public.sellers s
      where s.id = product_row.seller_id and s.company_id = buyer_company
    ) then
      raise exception using errcode = '42501', message = 'OWN_PRODUCT';
    end if;
    if line.quantity < product_row.min_order_qty then
      raise exception using errcode = '22023', message = 'BELOW_MIN_QTY';
    end if;
    if line.quantity > product_row.stock_qty then
      raise exception using errcode = '22023', message = 'OUT_OF_STOCK';
    end if;

    select tier.unit_price into chosen_price
    from public.product_price_tiers tier
    where tier.product_id = product_row.id and tier.min_qty <= line.quantity
    order by tier.min_qty desc
    limit 1;
    chosen_price := coalesce(chosen_price, product_row.unit_price);
    line_sub := round(chosen_price * line.quantity, 2);
    line_vat := round(line_sub * product_row.vat_rate / 100, 2);
    select coalesce(s.commission_override, c.commission_pct, 10)
      into pct
    from public.sellers s
    join public.products p on p.seller_id = s.id
    join public.categories c on c.id = p.category_id
    where p.id = product_row.id;
    commission := round(line_sub * pct / 100, 2);

    select so.id into new_seller_order_id
    from public.seller_orders so
    where so.order_id = new_order_id and so.seller_id = product_row.seller_id;
    if new_seller_order_id is null then
      insert into public.seller_orders (order_id, seller_id)
      values (new_order_id, product_row.seller_id)
      returning id into new_seller_order_id;
    end if;

    insert into public.order_items (
      seller_order_id, product_id, product_name_ar, product_name_en, unit,
      quantity, unit_price, line_subtotal, vat_rate, line_vat, shipping_fee
    ) values (
      new_seller_order_id, product_row.id, product_row.name_ar, product_row.name_en, product_row.unit,
      line.quantity, chosen_price, line_sub, product_row.vat_rate, line_vat, product_row.shipping_fee
    ) returning id into new_order_item_id;
    insert into public.order_item_fees (order_item_id, commission_pct, commission_amount)
    values (new_order_item_id, pct, commission);

    update public.products set stock_qty = stock_qty - line.quantity where id = product_row.id;
    update public.seller_orders
    set subtotal = subtotal + line_sub,
        vat_total = vat_total + line_vat,
        shipping_total = shipping_total + product_row.shipping_fee,
        grand_total = grand_total + line_sub + line_vat + product_row.shipping_fee
    where id = new_seller_order_id;

    all_sub := all_sub + line_sub;
    all_vat := all_vat + line_vat;
    all_shipping := all_shipping + product_row.shipping_fee;
  end loop;

  for line in select so.id from public.seller_orders so where so.order_id = new_order_id
  loop
    select coalesce(sum(f.commission_amount), 0) into group_commission
    from public.order_items oi join public.order_item_fees f on f.order_item_id = oi.id
    where oi.seller_order_id = line.id;
    select so.subtotal, so.shipping_total into group_sub, group_shipping
    from public.seller_orders so where so.id = line.id;
    insert into public.seller_order_fees (seller_order_id, commission_total, seller_net)
    values (line.id, group_commission, group_sub + group_shipping - group_commission);
  end loop;

  update public.orders
  set subtotal = all_sub,
      vat_total = all_vat,
      shipping_total = all_shipping,
      grand_total = all_sub + all_vat + all_shipping
  where id = new_order_id;
  insert into public.order_events (order_id, to_status, actor_id, note)
  values (new_order_id, 'new', buyer_id, 'Order placed');
  return new_order_id;
end;
$$;

create function public.transition_seller_order(p_seller_order_id uuid, p_next public.order_status, p_note text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  so public.seller_orders%rowtype;
  next_allowed boolean := false;
begin
  select * into so from public.seller_orders where id = p_seller_order_id;
  if not found then raise exception using errcode = 'P0002', message = 'ORDER_NOT_FOUND'; end if;
  if not public.owns_seller(so.seller_id) then
    raise exception using errcode = '42501', message = 'FORBIDDEN';
  end if;
  perform 1 from public.orders where id = so.order_id for update;
  select * into so from public.seller_orders where id = p_seller_order_id for update;
  if (so.status = 'new' and p_next = 'confirmed')
     or (so.status = 'confirmed' and p_next = 'shipped')
     or (so.status = 'shipped' and p_next = 'delivered') then
    next_allowed := true;
  end if;
  if not next_allowed then
    raise exception using errcode = '22023', message = 'INVALID_TRANSITION';
  end if;

  update public.seller_orders set status = p_next where id = p_seller_order_id;
  if p_next = 'delivered' then
    update public.seller_orders set payment_collected = true where id = p_seller_order_id;
  end if;
  update public.orders
  set status = case
    when exists (select 1 from public.seller_orders where order_id = so.order_id and status = 'new') then 'new'::public.order_status
    when exists (select 1 from public.seller_orders where order_id = so.order_id and status = 'confirmed') then 'confirmed'::public.order_status
    when exists (select 1 from public.seller_orders where order_id = so.order_id and status = 'shipped') then 'shipped'::public.order_status
    when exists (select 1 from public.seller_orders where order_id = so.order_id and status = 'cancelled') then 'cancelled'::public.order_status
    else 'delivered'::public.order_status
  end
  where id = so.order_id;
  insert into public.order_events (order_id, seller_order_id, from_status, to_status, actor_id, note)
  values (so.order_id, so.id, so.status, p_next, auth.uid(), nullif(btrim(p_note), ''));
end;
$$;

create function public.cancel_buyer_order(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  parent public.orders%rowtype;
  item record;
begin
  select * into parent from public.orders where id = p_order_id for update;
  if not found or parent.buyer_user_id <> auth.uid() then
    raise exception using errcode = '42501', message = 'FORBIDDEN';
  end if;
  if parent.status <> 'new' then
    raise exception using errcode = '22023', message = 'INVALID_TRANSITION';
  end if;
  if exists (
    select 1 from public.seller_orders
    where order_id = p_order_id and status <> 'new'
  ) then
    raise exception using errcode = '22023', message = 'INVALID_TRANSITION';
  end if;
  for item in
    select oi.product_id, oi.quantity
    from public.order_items oi
    join public.seller_orders so on so.id = oi.seller_order_id
    where so.order_id = p_order_id and oi.product_id is not null
    for update of oi
  loop
    update public.products set stock_qty = stock_qty + item.quantity where id = item.product_id;
  end loop;
  update public.seller_orders set status = 'cancelled' where order_id = p_order_id and status = 'new';
  update public.orders set status = 'cancelled' where id = p_order_id;
  insert into public.order_events (order_id, from_status, to_status, actor_id, note)
  values (p_order_id, 'new', 'cancelled', auth.uid(), 'Cancelled by buyer');
end;
$$;

create function public.settle_seller_order(p_seller_order_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('super_admin', 'finance_manager')
  ) then
    raise exception using errcode = '42501', message = 'FINANCE_ROLE_REQUIRED';
  end if;
  update public.seller_order_fees f
  set settled_at = now(), settled_by = auth.uid()
  from public.seller_orders so
  where f.seller_order_id = p_seller_order_id
    and so.id = f.seller_order_id
    and so.status = 'delivered'
    and f.settled_at is null;
  if not found then
    raise exception using errcode = '22023', message = 'NOT_SETTLEABLE';
  end if;
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, new_data)
  values (auth.uid(), 'commission.settled', 'seller_order', p_seller_order_id::text, jsonb_build_object('settled_at', now()));
end;
$$;

create function public.review_product(p_product_id uuid, p_approved boolean, p_note text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('super_admin', 'procurement_manager', 'procurement_employee', 'quality_manager')
  ) then raise exception using errcode = '42501', message = 'FORBIDDEN'; end if;
  update public.products
  set review_status = case when p_approved then 'approved'::public.product_review_status else 'rejected'::public.product_review_status end
  where id = p_product_id;
  if not found then raise exception using errcode = 'P0002', message = 'PRODUCT_NOT_FOUND'; end if;
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, new_data)
  values (auth.uid(), 'product.reviewed', 'product', p_product_id::text,
    jsonb_build_object('approved', p_approved, 'note', left(coalesce(p_note, ''), 1000)));
end;
$$;

create function public.set_seller_status(p_seller_id uuid, p_status public.seller_status)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('super_admin', 'procurement_manager', 'quality_manager')
  ) then raise exception using errcode = '42501', message = 'FORBIDDEN'; end if;
  update public.sellers set status = p_status where id = p_seller_id;
  if not found then raise exception using errcode = 'P0002', message = 'SELLER_NOT_FOUND'; end if;
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, new_data)
  values (auth.uid(), 'seller.status_changed', 'seller', p_seller_id::text, jsonb_build_object('status', p_status));
end;
$$;

create function public.manage_request(
  p_request_id uuid,
  p_status text,
  p_assigned_to uuid default null,
  p_is_urgent boolean default null,
  p_customer_note text default null,
  p_internal_notes text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_status text;
  actor_role public.profile_role;
begin
  select role into actor_role from public.profiles where id = auth.uid();
  if actor_role not in ('super_admin', 'procurement_manager', 'procurement_employee') then
    raise exception using errcode = '42501', message = 'FORBIDDEN';
  end if;
  select status into current_status from public.procurement_requests where id = p_request_id for update;
  if not found then raise exception using errcode = 'P0002', message = 'REQUEST_NOT_FOUND'; end if;
  if p_status not in ('submitted', 'under_review', 'clarification_needed', 'sourcing', 'quoted', 'accepted', 'declined', 'cancelled', 'closed') then
    raise exception using errcode = '22023', message = 'INVALID_REQUEST_STATUS';
  end if;
  if p_status <> current_status and not (
    (current_status = 'submitted' and p_status in ('under_review', 'cancelled'))
    or (current_status = 'under_review' and p_status in ('clarification_needed', 'sourcing', 'declined', 'cancelled'))
    or (current_status = 'clarification_needed' and p_status in ('under_review', 'sourcing', 'cancelled'))
    or (current_status = 'sourcing' and p_status in ('quoted', 'declined', 'cancelled'))
    or (current_status = 'quoted' and p_status in ('accepted', 'declined', 'cancelled'))
    or (current_status in ('accepted', 'declined', 'cancelled') and p_status = 'closed')
  ) then
    raise exception using errcode = '22023', message = 'INVALID_REQUEST_TRANSITION';
  end if;
  if p_assigned_to is not null and actor_role not in ('super_admin', 'procurement_manager') then
    raise exception using errcode = '42501', message = 'MANAGER_REQUIRED_FOR_ASSIGNMENT';
  end if;

  update public.procurement_requests set status = p_status where id = p_request_id;
  update public.request_events
  set customer_note = nullif(left(btrim(coalesce(p_customer_note, '')), 1000), '')
  where id = (
    select e.id from public.request_events e
    where e.request_id = p_request_id and e.to_status = p_status
    order by e.created_at desc, e.id desc limit 1
  );
  insert into public.request_internal (request_id, assigned_to, is_urgent, internal_notes)
  values (p_request_id, p_assigned_to, coalesce(p_is_urgent, false), coalesce(p_internal_notes, ''))
  on conflict (request_id) do update set
    assigned_to = coalesce(p_assigned_to, request_internal.assigned_to),
    is_urgent = coalesce(p_is_urgent, request_internal.is_urgent),
    internal_notes = coalesce(p_internal_notes, request_internal.internal_notes),
    updated_at = now();
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, old_data, new_data)
  values (
    auth.uid(), 'request.managed', 'procurement_request', p_request_id::text,
    jsonb_build_object('status', current_status),
    jsonb_build_object('status', p_status, 'assigned_to', p_assigned_to, 'is_urgent', p_is_urgent)
  );
end;
$$;

create function public.normalize_arabic(p_text text)
returns text
language sql
immutable
set search_path = ''
as $$
  select regexp_replace(
    translate(lower(coalesce(p_text, '')), 'أإآٱىة', 'اااايه'),
    '[ًٌٍَُِّْـ]', '', 'g'
  );
$$;

create view public.seller_public with (security_barrier = true) as
select s.id, s.store_name, s.description, c.city
from public.sellers s
join public.companies c on c.id = s.company_id
where s.status = 'verified';

create view public.product_public with (security_barrier = true) as
select p.id, p.seller_id, p.category_id, p.name_ar, p.name_en,
  p.description_ar, p.description_en, p.specifications, p.brand, p.sku,
  p.unit, p.unit_price, p.min_order_qty, p.stock_qty, p.shipping_fee,
  p.vat_rate, p.created_at,
  s.store_name, s.description as store_description, s.city as store_city
from public.products p
join public.seller_public s on s.id = p.seller_id
where p.is_active and p.review_status = 'approved';

create function public.search_products(
  p_query text default null,
  p_category_id uuid default null,
  p_sort text default 'newest',
  p_limit integer default 24,
  p_offset integer default 0
)
returns setof public.product_public
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  normalized_query text := public.normalize_arabic(btrim(coalesce(p_query, '')));
  relaxed_query text;
  safe_limit integer := greatest(1, least(coalesce(p_limit, 24), 100));
  safe_offset integer := greatest(0, least(coalesce(p_offset, 0), 100000));
begin
  if normalized_query like 'ال%' then
    relaxed_query := substr(normalized_query, 3);
  elsif char_length(normalized_query) >= 2 then
    relaxed_query := 'ال' || normalized_query;
  end if;
  if p_sort not in ('newest', 'price_asc', 'price_desc') then
    raise exception using errcode = '22023', message = 'INVALID_SORT';
  end if;

  return query execute
    'select pp.* from public.product_public pp
     where ($1 is null or pp.category_id = $1 or pp.category_id in (
         select c.id from public.categories c where c.parent_id = $1
       ))
       and (
         $2 = '''' or
         strpos(public.normalize_arabic(pp.name_ar || '' '' || pp.name_en || '' '' || coalesce(pp.brand, '''') || '' '' || coalesce(pp.sku, '''')), $2) > 0
         or ($3 is not null and strpos(public.normalize_arabic(pp.name_ar || '' '' || pp.name_en || '' '' || coalesce(pp.brand, '''') || '' '' || coalesce(pp.sku, '''')), $3) > 0)
         or exists (
           select 1 from public.products p
           where p.id = pp.id
             and to_tsvector(''simple'', p.search_text) @@ plainto_tsquery(''simple'', $2)
         )
       )
     order by
       case when $4 = ''price_asc'' then pp.unit_price end asc,
       case when $4 = ''price_desc'' then pp.unit_price end desc,
       case when $4 = ''newest'' then pp.created_at end desc,
       pp.id
     limit $5 offset $6'
  using p_category_id, normalized_query, relaxed_query, p_sort, safe_limit, safe_offset;
end;
$$;

create function public.audit_request_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.request_events (request_id, to_status, actor_id)
    values (new.id, new.status, new.buyer_user_id);
  elsif old.status is distinct from new.status then
    insert into public.request_events (request_id, from_status, to_status, actor_id)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$;

create trigger procurement_request_status_history
after insert or update of status on public.procurement_requests
for each row execute function public.audit_request_status_change();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('request-attachments', 'request-attachments', false, 26214400,
  array['application/pdf', 'image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read product image objects"
on storage.objects for select to anon, authenticated
using (bucket_id = 'product-images');
create policy "Seller owner uploads product image objects"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'product-images'
  and array_length(storage.foldername(name), 1) = 2
  and public.is_safe_uuid_path((storage.foldername(name))[1], (storage.foldername(name))[2])
  and public.owns_seller((storage.foldername(name))[1]::uuid)
  and exists (
    select 1 from public.products p
    where p.id = (storage.foldername(name))[2]::uuid
      and p.seller_id = (storage.foldername(name))[1]::uuid
  )
);
create policy "Seller owner updates product image objects"
on storage.objects for update to authenticated
using (
  bucket_id = 'product-images'
  and array_length(storage.foldername(name), 1) = 2
  and public.is_safe_uuid_path((storage.foldername(name))[1], (storage.foldername(name))[2])
  and public.owns_seller((storage.foldername(name))[1]::uuid)
  and exists (
    select 1 from public.products p
    where p.id = (storage.foldername(name))[2]::uuid
      and p.seller_id = (storage.foldername(name))[1]::uuid
  )
)
with check (
  bucket_id = 'product-images'
  and array_length(storage.foldername(name), 1) = 2
  and public.is_safe_uuid_path((storage.foldername(name))[1], (storage.foldername(name))[2])
  and public.owns_seller((storage.foldername(name))[1]::uuid)
  and exists (
    select 1 from public.products p
    where p.id = (storage.foldername(name))[2]::uuid
      and p.seller_id = (storage.foldername(name))[1]::uuid
  )
);
create policy "Seller owner deletes product image objects"
on storage.objects for delete to authenticated
using (
  bucket_id = 'product-images'
  and array_length(storage.foldername(name), 1) = 2
  and public.is_safe_uuid_path((storage.foldername(name))[1], (storage.foldername(name))[2])
  and public.owns_seller((storage.foldername(name))[1]::uuid)
  and exists (
    select 1 from public.products p
    where p.id = (storage.foldername(name))[2]::uuid
      and p.seller_id = (storage.foldername(name))[1]::uuid
  )
);

create policy "Buyer and staff can read request attachment objects"
on storage.objects for select to authenticated
using (
  bucket_id = 'request-attachments'
  and array_length(storage.foldername(name), 1) = 2
  and public.is_safe_uuid_path((storage.foldername(name))[1], (storage.foldername(name))[2])
  and exists (
    select 1 from public.procurement_requests r
    where r.id = (storage.foldername(name))[2]::uuid
      and (r.buyer_user_id = (storage.foldername(name))[1]::uuid or public.is_staff())
  )
);
create policy "Buyer uploads own request attachment objects"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'request-attachments'
  and array_length(storage.foldername(name), 1) = 2
  and public.is_safe_uuid_path((storage.foldername(name))[1], (storage.foldername(name))[2])
  and (storage.foldername(name))[1] = auth.uid()::text
  and exists (
    select 1 from public.procurement_requests r
    where r.id = (storage.foldername(name))[2]::uuid
      and r.buyer_user_id = auth.uid()
  )
);

alter table public.sellers enable row level security;
alter table public.products enable row level security;
alter table public.product_price_tiers enable row level security;
alter table public.product_images enable row level security;
alter table public.orders enable row level security;
alter table public.seller_orders enable row level security;
alter table public.order_items enable row level security;
alter table public.seller_order_fees enable row level security;
alter table public.order_item_fees enable row level security;
alter table public.order_events enable row level security;
alter table public.procurement_requests enable row level security;
alter table public.procurement_request_items enable row level security;
alter table public.request_attachments enable row level security;
alter table public.request_events enable row level security;
alter table public.request_internal enable row level security;

create policy "Public can read verified seller stores"
on public.sellers for select to anon, authenticated
using (status = 'verified' or public.owns_seller(id) or public.is_staff());
create policy "Seller owner can create products for own store"
on public.products for insert to authenticated
with check (public.owns_seller(seller_id));
create policy "Public can read approved active products from verified stores"
on public.products for select to anon, authenticated
using (
  (is_active and review_status = 'approved' and public.is_verified_seller(seller_id))
  or public.owns_seller(seller_id)
  or public.is_staff()
);
create policy "Seller owner can update own products"
on public.products for update to authenticated
using (public.owns_seller(seller_id))
with check (public.owns_seller(seller_id));
create policy "Visible product tiers follow product visibility"
on public.product_price_tiers for select to anon, authenticated
using (exists (select 1 from public.products p where p.id = product_id));
create policy "Seller owner manages own product tiers"
on public.product_price_tiers for all to authenticated
using (exists (select 1 from public.products p where p.id = product_id and public.owns_seller(p.seller_id)))
with check (exists (select 1 from public.products p where p.id = product_id and public.owns_seller(p.seller_id)));
create policy "Visible product images follow product visibility"
on public.product_images for select to anon, authenticated
using (exists (select 1 from public.products p where p.id = product_id));
create policy "Seller owner manages own product images"
on public.product_images for all to authenticated
using (exists (select 1 from public.products p where p.id = product_id and public.owns_seller(p.seller_id)))
with check (exists (select 1 from public.products p where p.id = product_id and public.owns_seller(p.seller_id)));
create policy "Buyer reads own orders"
on public.orders for select to authenticated
using (buyer_user_id = (select auth.uid()) or public.is_staff());
create policy "Seller reads delivery details for own orders"
on public.orders for select to authenticated
using (
  exists (select 1 from public.seller_orders so
    where so.order_id = id and public.owns_seller(so.seller_id))
);
create policy "Seller reads own seller orders"
on public.seller_orders for select to authenticated
using (public.owns_seller(seller_id) or public.is_staff());
create policy "Order items visible to buyer or owning seller"
on public.order_items for select to authenticated
using (
  exists (select 1 from public.seller_orders so join public.orders o on o.id = so.order_id
    where so.id = seller_order_id and (o.buyer_user_id = (select auth.uid()) or public.owns_seller(so.seller_id) or public.is_staff()))
);
create policy "Seller and finance staff read seller fees"
on public.seller_order_fees for select to authenticated
using (
  exists (select 1 from public.seller_orders so where so.id = seller_order_id and public.owns_seller(so.seller_id))
  or exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('super_admin', 'finance_manager'))
);
create policy "Seller and staff read item fees"
on public.order_item_fees for select to authenticated
using (
  exists (select 1 from public.order_items oi join public.seller_orders so on so.id = oi.seller_order_id
    where oi.id = order_item_id and public.owns_seller(so.seller_id))
  or public.is_staff()
);
create policy "Order participants read order timeline"
on public.order_events for select to authenticated
using (
  exists (select 1 from public.orders o where o.id = order_id and o.buyer_user_id = (select auth.uid()))
  or exists (select 1 from public.seller_orders so where so.id = seller_order_id and public.owns_seller(so.seller_id))
  or public.is_staff()
);
create policy "Buyers read own submitted requests"
on public.procurement_requests for select to authenticated
using (buyer_user_id = (select auth.uid()) or public.is_staff());
create policy "Request participants read request items"
on public.procurement_request_items for select to authenticated
using (
  exists (select 1 from public.procurement_requests r
    where r.id = request_id and (r.buyer_user_id = (select auth.uid()) or public.is_staff()))
);
create policy "Request participants read request attachments"
on public.request_attachments for select to authenticated
using (
  exists (select 1 from public.procurement_requests r
    where r.id = request_id and (r.buyer_user_id = (select auth.uid()) or public.is_staff()))
);
create policy "Request participants read request events"
on public.request_events for select to authenticated
using (
  exists (select 1 from public.procurement_requests r
    where r.id = request_id and (r.buyer_user_id = (select auth.uid()) or public.is_staff()))
);
create policy "Buyers submit own requests"
on public.procurement_requests for insert to authenticated
with check (
  buyer_user_id = (select auth.uid())
  and exists (select 1 from public.company_members cm where cm.company_id = company_id and cm.user_id = (select auth.uid()))
);
create policy "Staff can manage request internals"
on public.request_internal for all to authenticated
using (public.is_staff())
with check (public.is_staff());

create policy "Seller owners can delete their own products"
on public.products for delete to authenticated
using (public.owns_seller(seller_id));

revoke all on public.sellers, public.products, public.product_price_tiers, public.product_images,
  public.orders, public.seller_orders, public.order_items, public.seller_order_fees, public.order_item_fees,
  public.order_events, public.procurement_requests, public.procurement_request_items,
  public.request_attachments, public.request_events, public.request_internal from anon, authenticated;
drop policy "Buyers submit own requests" on public.procurement_requests;
revoke select on public.categories from anon, authenticated;
grant select (id, parent_id, slug, name_ar, name_en, is_active, sort_order) on public.categories to anon, authenticated;
grant select (id, store_name, description, city) on public.seller_public to anon, authenticated;
grant select on public.product_public to anon, authenticated;
grant select (id, seller_id, category_id, name_ar, name_en, description_ar, description_en, specifications, brand, sku, unit, unit_price, min_order_qty, stock_qty, shipping_fee, vat_rate, is_active, review_status, created_at, updated_at) on public.products to anon, authenticated;
grant delete on public.products to authenticated;
grant select (id, product_id, min_qty, unit_price) on public.product_price_tiers to anon, authenticated;
grant select (id, product_id, storage_path, alt_ar, alt_en, sort_order) on public.product_images to anon, authenticated;
grant insert (product_id, min_qty, unit_price), update (min_qty, unit_price), delete on public.product_price_tiers to authenticated;
grant insert (product_id, storage_path, alt_ar, alt_en, sort_order), update (alt_ar, alt_en, sort_order), delete on public.product_images to authenticated;
grant select (id, order_number, buyer_user_id, buyer_company_id, status, payment_method, payment_status, delivery_name, delivery_phone, delivery_city, delivery_address, subtotal, vat_total, shipping_total, grand_total, created_at, updated_at) on public.orders to authenticated;
grant select on public.seller_orders, public.order_items to authenticated;
grant select on public.seller_order_fees, public.order_item_fees, public.order_events, public.procurement_requests to authenticated;
grant select on public.request_internal to authenticated;
grant select on public.procurement_request_items, public.request_attachments, public.request_events to authenticated;

revoke execute on function public.reset_product_review() from public, anon, authenticated;
revoke execute on function public.owns_seller(uuid) from public, anon, authenticated;
revoke execute on function public.request_seller_store(uuid, text, text) from public, anon, authenticated;
revoke execute on function public.save_seller_product(uuid, jsonb, jsonb) from public, anon, authenticated;
revoke execute on function public.get_my_sellers() from public, anon, authenticated;
revoke execute on function public.set_company_verification(uuid, public.company_verification_status) from public, anon, authenticated;
revoke execute on function public.submit_procurement_request(uuid, text, text, jsonb) from public, anon, authenticated;
revoke execute on function public.add_request_attachment(uuid, text, text, text, integer) from public, anon, authenticated;
revoke execute on function public.set_seller_commission(uuid, numeric) from public, anon, authenticated;
revoke execute on function public.list_staff_sellers() from public, anon, authenticated;
revoke execute on function public.get_commission_rate(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.is_verified_seller(uuid) from public, anon, authenticated;
revoke execute on function public.staff_list_categories() from public, anon, authenticated;
revoke execute on function public.manage_category(uuid, uuid, text, text, text, numeric, boolean, integer) from public, anon, authenticated;
revoke execute on function public.list_unsettled_commissions() from public, anon, authenticated;
revoke execute on function public.audit_category_change() from public, anon, authenticated;
revoke execute on function public.place_order(jsonb, text, text, text, text) from public, anon, authenticated;
revoke execute on function public.transition_seller_order(uuid, public.order_status, text) from public, anon, authenticated;
revoke execute on function public.cancel_buyer_order(uuid) from public, anon, authenticated;
revoke execute on function public.settle_seller_order(uuid) from public, anon, authenticated;
revoke execute on function public.review_product(uuid, boolean, text) from public, anon, authenticated;
revoke execute on function public.set_seller_status(uuid, public.seller_status) from public, anon, authenticated;
revoke execute on function public.manage_request(uuid, text, uuid, boolean, text, text) from public, anon, authenticated;
revoke execute on function public.normalize_arabic(text) from public, anon, authenticated;
revoke execute on function public.search_products(text, uuid, text, integer, integer) from public, anon, authenticated;
revoke execute on function public.is_safe_uuid_path(text, text) from public, anon, authenticated;
revoke execute on function public.audit_request_status_change() from public, anon, authenticated;
revoke execute on function public.audit_category_change() from public, anon, authenticated;
grant execute on function public.owns_seller(uuid) to anon, authenticated;
grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.is_safe_uuid_path(text, text) to authenticated;
grant execute on function public.request_seller_store(uuid, text, text) to authenticated;
grant execute on function public.save_seller_product(uuid, jsonb, jsonb) to authenticated;
grant execute on function public.get_my_sellers() to authenticated;
grant execute on function public.set_company_verification(uuid, public.company_verification_status) to authenticated;
grant execute on function public.submit_procurement_request(uuid, text, text, jsonb) to authenticated;
grant execute on function public.add_request_attachment(uuid, text, text, text, integer) to authenticated;
grant execute on function public.set_seller_commission(uuid, numeric) to authenticated;
grant execute on function public.list_staff_sellers() to authenticated;
grant execute on function public.get_commission_rate(uuid, uuid) to authenticated;
grant execute on function public.is_verified_seller(uuid) to anon, authenticated;
grant execute on function public.staff_list_categories() to authenticated;
grant execute on function public.manage_category(uuid, uuid, text, text, text, numeric, boolean, integer) to authenticated;
grant execute on function public.list_unsettled_commissions() to authenticated;
grant execute on function public.place_order(jsonb, text, text, text, text) to authenticated;
grant execute on function public.transition_seller_order(uuid, public.order_status, text) to authenticated;
grant execute on function public.cancel_buyer_order(uuid) to authenticated;
grant execute on function public.settle_seller_order(uuid) to authenticated;
grant execute on function public.review_product(uuid, boolean, text) to authenticated;
grant execute on function public.set_seller_status(uuid, public.seller_status) to authenticated;
grant execute on function public.manage_request(uuid, text, uuid, boolean, text, text) to authenticated;
grant execute on function public.search_products(text, uuid, text, integer, integer) to anon, authenticated;

alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

revoke execute on function public.reset_product_review() from public, anon, authenticated;
revoke execute on function public.assign_request_tracking_number() from public, anon, authenticated;
revoke execute on function public.audit_request_status_change() from public, anon, authenticated;

commit;
