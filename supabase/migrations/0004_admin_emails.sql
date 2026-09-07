-- Who may reach /admin.
--
-- The role lives on public.profiles, but a profile row only exists once the
-- auth user does, so granting admin by hand means remembering to do it in the
-- right order. This allowlist removes the ordering: an address listed here is
-- promoted when the user is created, and any user that already exists is
-- promoted by the backfill at the bottom.
--
-- To add someone later: insert their address here (lowercase) and, if their
-- account already exists, run the same backfill statement again.

create table if not exists public.admin_emails (
  email    text primary key check (email = lower(email)),
  note     text,
  added_at timestamptz not null default now()
);

-- No policies, deliberately: with RLS on and nothing granted, this table is
-- invisible through the API. Only the service role and the SECURITY DEFINER
-- trigger below can read it, which is the point — it decides who is an admin.
alter table public.admin_emails enable row level security;

insert into public.admin_emails (email, note)
values ('landkroonmilan@gmail.com', 'Milan Landkroon — owner')
on conflict (email) do nothing;

-- Same as before, with the role now decided by the allowlist.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    case
      when exists (select 1 from public.admin_emails a where a.email = lower(new.email))
        then 'admin'
      else 'customer'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Promotes accounts that already existed when this ran.
update public.profiles p
   set role = 'admin'
  from public.admin_emails a
 where lower(p.email) = a.email
   and p.role <> 'admin';
