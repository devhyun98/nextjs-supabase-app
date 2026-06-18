-- Enable RLS on new tables
alter table public.events enable row level security;
alter table public.event_participants enable row level security;
