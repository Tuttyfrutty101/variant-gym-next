-- Allow allowlisted admins to upload / replace / delete testimonial headshots.
-- Public read already exists in 001_homepage_testimonial.sql.

drop policy if exists "Admins insert testimonial images" on storage.objects;
create policy "Admins insert testimonial images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'testimonial-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  );

drop policy if exists "Admins update testimonial images" on storage.objects;
create policy "Admins update testimonial images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'testimonial-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  )
  with check (
    bucket_id = 'testimonial-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  );

drop policy if exists "Admins delete testimonial images" on storage.objects;
create policy "Admins delete testimonial images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'testimonial-images'
    and (select exists (select 1 from public.admin_users u where u.user_id = auth.uid()))
  );
