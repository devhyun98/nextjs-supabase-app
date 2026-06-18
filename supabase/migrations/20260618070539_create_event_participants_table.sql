-- Create event_participants table
create table public.event_participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'participant' check (role in ('host', 'participant')),
  joined_at timestamptz not null default now(),
  unique (event_id, user_id)
);

-- Create indexes for common queries
create index idx_event_participants_event_id on public.event_participants(event_id);
create index idx_event_participants_user_id on public.event_participants(user_id);
create index idx_event_participants_role on public.event_participants(role);
