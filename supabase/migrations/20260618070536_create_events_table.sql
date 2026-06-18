-- Create events table
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) >= 1 and char_length(title) <= 100),
  description text check (description is null or char_length(description) <= 500),
  location text not null check (char_length(location) >= 1 and char_length(location) <= 200),
  event_date timestamptz not null,
  cover_image_url text,
  invite_code text not null unique,
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes for common queries
create index idx_events_created_by on public.events(created_by);
create index idx_events_invite_code on public.events(invite_code);
create index idx_events_event_date on public.events(event_date);

-- Create function to update events.updated_at (reuse existing pattern)
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at on events
create trigger on_events_updated
  before update on public.events
  for each row execute procedure public.handle_updated_at();
