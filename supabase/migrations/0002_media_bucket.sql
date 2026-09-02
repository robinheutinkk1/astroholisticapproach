-- Storage for images uploaded through the admin CMS.
--
-- Public read, so the site can serve the files straight from the bucket.
-- Writes go exclusively through the upload server action, which runs with the
-- service role after checking that the caller is an admin — so no write
-- policies are needed here.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  8388608, -- 8 MB, matching the limit enforced in the upload action
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update
  set public             = true,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
