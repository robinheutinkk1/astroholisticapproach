-- Up to three photos per product instead of one.
--
-- A list column rather than image_1/2/3: the first entry is the main photo
-- (the shop card, the share image), the rest appear as thumbnails on the
-- product page. Three is a limit the admin form enforces, not the database —
-- raising it later is a number in the code, not a migration.

alter table public.products
  add column images text[] not null default '{}';

-- The photo a product already has becomes its first one.
update public.products
   set images = array[image_url]
 where image_url is not null and image_url <> '';

alter table public.products drop column image_url;

-- Generous upper bound so a bug cannot fill a row with thousands of entries;
-- the real cap of three lives in the admin form.
alter table public.products
  add constraint products_images_cap check (cardinality(images) <= 12);
