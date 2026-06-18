-- ============================================
-- Update PROFILES table RLS POLICIES for Gather
-- ============================================

-- Add policy for profiles if not exists: All authenticated users can view all profiles
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
  on public.profiles for select
  using (auth.role() = 'authenticated');

-- Keep existing update/insert/delete policies or add new ones
drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============================================
-- EVENTS TABLE RLS POLICIES
-- ============================================

-- SELECT: Everyone can view all events (including anonymous users for invite preview)
create policy "events_select_all"
  on public.events for select
  using (true);

-- INSERT: Authenticated users can create events
create policy "events_insert_authenticated"
  on public.events for insert
  with check (auth.uid() = created_by);

-- UPDATE: Only event creator can update
create policy "events_update_owner"
  on public.events for update
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

-- DELETE: Only event creator can delete
create policy "events_delete_owner"
  on public.events for delete
  using (auth.uid() = created_by);

-- Admin override: Admins can view all events
create policy "events_admin_all"
  on public.events for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- EVENT_PARTICIPANTS TABLE RLS POLICIES
-- ============================================

-- SELECT: User can view their own records, participants in events they join, or created events
create policy "event_participants_select"
  on public.event_participants for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.event_participants ep2
      where ep2.event_id = event_participants.event_id
      and ep2.user_id = auth.uid()
    )
    or exists (
      select 1 from public.events e
      where e.id = event_participants.event_id
      and e.created_by = auth.uid()
    )
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- INSERT: Users can only add themselves as participants
create policy "event_participants_insert_self"
  on public.event_participants for insert
  with check (auth.uid() = user_id and role = 'participant');

-- DELETE: Only event creator can remove participants
create policy "event_participants_delete_by_host"
  on public.event_participants for delete
  using (
    exists (
      select 1 from public.events e
      where e.id = event_participants.event_id
      and e.created_by = auth.uid()
    )
  );

-- Admin override
create policy "event_participants_admin_all"
  on public.event_participants for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
