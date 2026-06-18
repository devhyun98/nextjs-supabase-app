-- Add email and role columns to existing profiles table
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists name text;
alter table public.profiles add column if not exists role text default 'user' check (role in ('user', 'admin'));

-- Create index for role queries (admin dashboard)
create index if not exists idx_profiles_role on public.profiles(role);

-- Update handle_new_user() function to populate email and name
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    coalesce(new.raw_user_meta_data->>'name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Function to sync email changes from auth.users to profiles
create or replace function public.handle_user_email_update()
returns trigger as $$
begin
  if new.email != old.email then
    update public.profiles
    set email = new.email
    where id = new.id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for email updates on auth.users
drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
  after update on auth.users
  for each row execute procedure public.handle_user_email_update();
