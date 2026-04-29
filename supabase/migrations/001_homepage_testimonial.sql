-- Run in Supabase SQL Editor (or `supabase db push` if you use the CLI).
-- Homepage testimonial: public SELECT on active rows only; edits via dashboard (bypass RLS) or service role.

create table if not exists public.homepage_testimonial (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  image_url text,
  name text not null,
  title text not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists homepage_testimonial_active_updated_idx
  on public.homepage_testimonial (is_active, updated_at desc);

alter table public.homepage_testimonial enable row level security;

drop policy if exists "Allow public read of active testimonial" on public.homepage_testimonial;

create policy "Allow public read of active testimonial"
  on public.homepage_testimonial
  for select
  to anon, authenticated
  using (is_active = true);

-- Optional seed when table is empty (set image_url after uploading to Storage).
insert into public.homepage_testimonial (quote, image_url, name, title)
select
  $quote$Balancing home and work life with training can be challenging, but the team at Variant makes sure my workouts are efficient and effective. They've helped me perform at my best in every part of my life.$quote$,
  null,
  'Dr. Sean Shafi',
  'UCLA Health'
where not exists (select 1 from public.homepage_testimonial);

-- Public bucket for headshots (upload in Dashboard → Storage; paste public URL into image_url).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'testimonial-images',
  'testimonial-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read testimonial images" on storage.objects;

create policy "Public read testimonial images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'testimonial-images');
