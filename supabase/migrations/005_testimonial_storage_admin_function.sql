-- Storage policies that query admin_users can fail intermittently because nested
-- SELECTs still honor RLS on admin_users in some evaluation contexts.
-- Use a SECURITY DEFINER helper so the allowlist check is reliable.

create or replace function public.is_allowlisted_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users u
    where u.user_id = auth.uid()
  );
$$;

revoke all on function public.is_allowlisted_admin() from public;
grant execute on function public.is_allowlisted_admin() to authenticated;

drop policy if exists "Admins insert testimonial images" on storage.objects;
create policy "Admins insert testimonial images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'testimonial-images'
    and public.is_allowlisted_admin()
  );

drop policy if exists "Admins update testimonial images" on storage.objects;
create policy "Admins update testimonial images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'testimonial-images'
    and public.is_allowlisted_admin()
  )
  with check (
    bucket_id = 'testimonial-images'
    and public.is_allowlisted_admin()
  );

drop policy if exists "Admins delete testimonial images" on storage.objects;
create policy "Admins delete testimonial images"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'testimonial-images'
    and public.is_allowlisted_admin()
  );
