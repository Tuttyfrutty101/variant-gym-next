-- Weekly class schedule rows (editable in admin). day_index: 0 = Monday .. 6 = Sunday

create table if not exists public.site_class_schedule (
  id uuid primary key default gen_random_uuid(),
  day_index smallint not null check (day_index >= 0 and day_index <= 6),
  sort_order int not null default 0,
  class_name text not null,
  class_time text not null,
  updated_at timestamptz not null default now()
);

create index if not exists site_class_schedule_day_sort_idx
  on public.site_class_schedule (day_index, sort_order);

alter table public.site_class_schedule enable row level security;

drop policy if exists "Public read class schedule" on public.site_class_schedule;
create policy "Public read class schedule"
  on public.site_class_schedule for select to anon, authenticated using (true);

drop policy if exists "Admins insert class schedule" on public.site_class_schedule;
create policy "Admins insert class schedule"
  on public.site_class_schedule for insert to authenticated
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins update class schedule" on public.site_class_schedule;
create policy "Admins update class schedule"
  on public.site_class_schedule for update to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())))
  with check ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));

drop policy if exists "Admins delete class schedule" on public.site_class_schedule;
create policy "Admins delete class schedule"
  on public.site_class_schedule for delete to authenticated
  using ((select exists (select 1 from admin_users u where u.user_id = auth.uid())));
