-- Homepage promo band visibility toggle (admin-controlled).
alter table public.site_promotion
add column if not exists visible boolean not null default true;
