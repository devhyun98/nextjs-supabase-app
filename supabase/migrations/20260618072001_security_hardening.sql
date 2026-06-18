-- ============================================
-- Security Hardening: Fix function search_path
-- ============================================

-- Add search_path to handle_updated_at function
create or replace function public.handle_updated_at()
returns trigger
set search_path = public, pg_temp
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Add search_path to handle_new_user function
create or replace function public.handle_new_user()
returns trigger
set search_path = public, pg_temp
language plpgsql
security definer
as $$
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
$$;

-- Add search_path to handle_user_email_update function
create or replace function public.handle_user_email_update()
returns trigger
set search_path = public, pg_temp
language plpgsql
security definer
as $$
begin
  if new.email != old.email then
    update public.profiles
    set email = new.email
    where id = new.id;
  end if;
  return new;
end;
$$;

-- ============================================
-- Security Hardening: Revoke RPC access to trigger functions
-- ============================================

-- Revoke EXECUTE permission from anon and authenticated roles
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.handle_user_email_update() from anon, authenticated;

-- ============================================
-- Security Hardening: Remove overly permissive RLS policies
-- ============================================

-- Remove overly permissive INSERT policy from profiles table
-- (회원가입은 handle_new_user trigger로만 처리, 클라이언트 직접 INSERT는 필요 없음)
drop policy if exists "서비스 역할 INSERT" on public.profiles;

-- Remove duplicate admin policy from events table
-- (events_select_all로 이미 전체 공개이므로 events_admin_all은 중복)
drop policy if exists "events_admin_all" on public.events;
