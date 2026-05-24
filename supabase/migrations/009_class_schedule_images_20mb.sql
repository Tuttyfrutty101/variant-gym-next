-- Raise class schedule image upload limit to 20MB (if 008 was already applied at 5MB).

update storage.buckets
set file_size_limit = 20971520
where id = 'class-schedule-images';
