# EMDAD | إمداد

Arabic-first, static web application foundation for an Egyptian B2B marketplace. The website uses plain HTML, CSS, and JavaScript and connects to Supabase through its REST/Auth APIs.

## No npm or build step

There is no `package.json`, Node dependency, framework, or build command. You can open `index.html` using VS Code Live Server, or upload the website files directly to a static web host.

Upload these files together into the same public folder:

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `.htaccess` (Apache hosting)
- `_redirects` (Netlify-style hosting)

The page uses ordinary JavaScript scripts and relative file paths, so the static host serves `config.js` and `app.js` directly. Do not upload the old `dist/` folder if one is left over from an earlier version.

## What is implemented

- Responsive Arabic/English landing page with RTL/LTR toggle and saved language preference.
- Supabase email/password buyer registration and sign-in.
- Company onboarding through the database RPC and company verification status in the portal.
- Active bilingual category list from Supabase.
- Static runtime configuration in `config.js`; no service-role key.
- Phase A migration for profiles, companies, memberships, category seed data, append-only audit logs, RLS, and role helpers.

## Setup

1. Create a Supabase project.
2. Run `supabase/migrations/20261108000100_phase_a_foundation.sql` exactly once against the clean project.
3. Edit `config.js` and enter the project's URL and public anon key:

   ```js
   window.EMDAD_CONFIG = {
     SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
     SUPABASE_ANON_KEY: "YOUR-PUBLIC-ANON-KEY"
   };
   ```

4. To preview, open `index.html` with VS Code Live Server. To publish, upload the listed website files to your host and open your domain. No npm, terminal build, or `localhost:5173` is required.
5. Create a buyer account through the website. To promote the first super admin, run this SQL in the Supabase SQL Editor with the account's UUID:

   ```sql
   update public.profiles set role = 'super_admin' where id = 'REPLACE-WITH-AUTH-USER-UUID';
   ```

## Verification

The static website was converted to normal HTML, CSS, and JavaScript files to avoid a build step. A live Supabase project was not available, so database execution, authentication, and RLS still require testing with your project.

Manual smoke test: configure Supabase, open the site from Live Server or the hosted domain, toggle the language, create/sign into a buyer account, register a company, and verify the company and audit records in Supabase.

## Security notes and limitations

- The anon key is public by design; never put the Supabase `service_role` key in `config.js`.
- Roles are assigned by the database and new signups are buyers.
- Auth session is kept in the current browser tab's `sessionStorage`.
- RLS is enabled in the Phase A migration. Company creation and owner membership are performed by one database RPC.
- This is Phase A only. Sellers, product listings, cart, ordering, commission, operations screens, and special requests are not implemented yet.
- No live Supabase, hosting, payment, or email-provider workflows have been verified.
