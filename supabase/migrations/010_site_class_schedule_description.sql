-- Optional class description shown in the public schedule detail dialog.

alter table public.site_class_schedule
  add column if not exists class_description text;
