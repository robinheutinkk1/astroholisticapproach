-- Editable site settings.
--
-- One row per section, each holding a JSON document. Anything not stored here
-- falls back to the values compiled into the app, so an empty table renders
-- exactly the site as shipped, and clearing a section restores its defaults
-- rather than blanking the page.

create table public.site_settings (
  key        text        primary key,
  value      jsonb       not null,
  updated_at timestamptz not null default now()
);

create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

alter table public.site_settings enable row level security;

-- Everything here is on public pages anyway, so anonymous reads are fine.
-- Writes are admin-only, and go through validated server actions.
create policy "settings are public" on public.site_settings
  for select using (true);
create policy "admins write settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());
