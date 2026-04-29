-- Site content: hours, contact, promotion. Admin allowlist + RLS.
-- day_index: 0 = Monday .. 6 = Sunday

create table if not exists public.site_business_hours (
  day_index smallint primary key check (day_index >= 0 and day_index <= 6),
  label text not null
);

create table if not exists public.site_contact_info (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  phone_display text not null,
  phone_tel text not null,
  email text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_promotion (
  id uuid primary key default gen_random_uuid(),
  badge text not null,
  title text not null,
  body text not null,
  fine_print text not null,
  cta_label text not null,
  cta_href text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.site_business_hours enable row level security;
alter table public.site_contact_info enable row level security;
alter table public.site_promotion enable row level security;
alter table public.admin_users enable row level security;

-- Public read CMS
drop policy if exists "Public read business hours" on public.site_business_hours;
create policy "Public read business hours"
  on public.site_business_hours for select to anon, authenticated using (true);

drop policy if exists "Public read contact info" on public.site_contact_info;
create policy "Public read contact info"
  on public.site_contact_info for select to anon, authenticated using (true);

drop policy if exists "Public read promotion" on public.site_promotion;
create policy "Public read promotion"
  on public.site_promotion for select to anon, authenticated using (true);

-- Admin: own row only (for session checks)
drop policy if exists "Users read own admin row" on public.admin_users;
create policy "Users read own admin row"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid());

-- Admin write helper
drop policy if exists "Admins update business hours" on public.site_business_hours;
create policy "Admins update business hours"
  on public.site_business_hours for update to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())))
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins insert business hours" on public.site_business_hours;
create policy "Admins insert business hours"
  on public.site_business_hours for insert to authenticated
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins delete business hours" on public.site_business_hours;
create policy "Admins delete business hours"
  on public.site_business_hours for delete to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins update contact info" on public.site_contact_info;
create policy "Admins update contact info"
  on public.site_contact_info for update to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())))
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins insert contact info" on public.site_contact_info;
create policy "Admins insert contact info"
  on public.site_contact_info for insert to authenticated
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins delete contact info" on public.site_contact_info;
create policy "Admins delete contact info"
  on public.site_contact_info for delete to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins update promotion" on public.site_promotion;
create policy "Admins update promotion"
  on public.site_promotion for update to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())))
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins insert promotion" on public.site_promotion;
create policy "Admins insert promotion"
  on public.site_promotion for insert to authenticated
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins delete promotion" on public.site_promotion;
create policy "Admins delete promotion"
  on public.site_promotion for delete to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

-- homepage_testimonial: admin full CRUD + public still reads active only
drop policy if exists "Admins select all testimonials" on public.homepage_testimonial;
create policy "Admins select all testimonials"
  on public.homepage_testimonial for select to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins insert testimonials" on public.homepage_testimonial;
create policy "Admins insert testimonials"
  on public.homepage_testimonial for insert to authenticated
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins update testimonials" on public.homepage_testimonial;
create policy "Admins update testimonials"
  on public.homepage_testimonial for update to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())))
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins delete testimonials" on public.homepage_testimonial;
create policy "Admins delete testimonials"
  on public.homepage_testimonial for delete to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

-- Seeds (idempotent-ish)
insert into public.site_business_hours (day_index, label) values
  (0, '6:30am – 6:30pm'),
  (1, '6:30am – 6:30pm'),
  (2, '6:30am – 6:30pm'),
  (3, '6:30am – 6:30pm'),
  (4, '6:30am – 2:00pm'),
  (5, '8:00am – 1:00pm'),
  (6, 'Closed')
on conflict (day_index) do nothing;

insert into public.site_contact_info (id, address, phone_display, phone_tel, email)
values (
  '10000000-0000-0000-0000-000000000001',
  '314 Anacapa St., Santa Barbara, CA 93101',
  '(805) 837-8475',
  'tel:+18058378475',
  'info@varianttraininglab.com'
)
on conflict (id) do nothing;

insert into public.site_promotion (id, badge, title, body, fine_print, cta_label, cta_href)
values (
  '20000000-0000-0000-0000-000000000001',
  'Limited time · Spring',
  'Spring membership offer',
  $b$Join before Memorial Day and we'll waive your enrollment fee, plus include two guest passes so you can train with a partner on us.$b$,
  'Offer valid for new memberships through May 26, 2026. Not combinable with other promotions.',
  'Claim this offer',
  '#contact'
)
on conflict (id) do nothing;

-- After creating a staff user in Supabase Auth, allowlist them:
-- insert into public.admin_users (user_id) values ('<auth.users.id>');
