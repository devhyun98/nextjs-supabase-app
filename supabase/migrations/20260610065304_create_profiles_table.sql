-- Create profiles table synced from auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email text,
  name text,
  role text default 'user' check (role in ('user', 'admin'))
);

-- Create indexes
create unique index profiles_username_key on public.profiles(username);
create index idx_profiles_role on public.profiles(role);

-- Function to auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Comments for clarity
comment on table public.profiles is 'User profiles synced from auth.users with additional metadata';
comment on column public.profiles.email is 'Email synced from auth.users for search/display purposes';
comment on column public.profiles.role is 'User role: user (default) or admin';

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies
create policy "profiles_select_authenticated"
  on public.profiles for select
  using (auth.role() = 'authenticated');

create policy "profiles_update_self"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "공개 프로필 조회"
  on public.profiles for select
  using (true);

create policy "본인 프로필 수정"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "서비스 역할 INSERT"
  on public.profiles for insert
  with check (true);
