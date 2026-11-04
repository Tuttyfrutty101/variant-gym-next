-- Domains the gym does not want to accept on the public lead forms.
-- The form API reads this table with the service role key.
-- Only allowlisted admins can see or change the list.

create table if not exists public.blocked_email_domains (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  created_at timestamptz not null default now(),
  constraint blocked_email_domains_domain_unique unique (domain),
  constraint blocked_email_domains_domain_shape check (
    domain = lower(domain)
    and char_length(domain) between 3 and 253
    and domain ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'
  )
);

alter table public.blocked_email_domains enable row level security;

revoke all on table public.blocked_email_domains from anon;
grant select, insert, delete on table public.blocked_email_domains to authenticated;

drop policy if exists "Admins read blocked email domains" on public.blocked_email_domains;
create policy "Admins read blocked email domains"
  on public.blocked_email_domains for select to authenticated
  using ((select exists (select 1 from public.admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins insert blocked email domains" on public.blocked_email_domains;
create policy "Admins insert blocked email domains"
  on public.blocked_email_domains for insert to authenticated
  with check ((select exists (select 1 from public.admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins delete blocked email domains" on public.blocked_email_domains;
create policy "Admins delete blocked email domains"
  on public.blocked_email_domains for delete to authenticated
  using ((select exists (select 1 from public.admin_users u where u.user_id = auth.uid())));
