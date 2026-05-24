-- Optional circular class photo on /schedule (uploaded via admin).

alter table public.site_class_schedule
  add column if not exists image_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'class-schedule-images',
  'class-schedule-images',
  true,
  20971520,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read class schedule images" on storage.objects;
create policy "Public read class schedule images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'class-schedule-images');

drop policy if exists "Admins insert class schedule images" on storage.objects;
create policy "Admins insert class schedule images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'class-schedule-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  );

drop policy if exists "Admins update class schedule images" on storage.objects;
create policy "Admins update class schedule images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'class-schedule-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  )
  with check (
    bucket_id = 'class-schedule-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  );

drop policy if exists "Admins delete class schedule images" on storage.objects;
create policy "Admins delete class schedule images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'class-schedule-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  );
