-- Carousel order: lower sort_order first; tie-break by updated_at in the app query.

alter table public.homepage_testimonial
  add column if not exists sort_order integer not null default 0;

create index if not exists homepage_testimonial_active_sort_idx
  on public.homepage_testimonial (is_active, sort_order asc, updated_at desc);
