-- Isolated Rooted In Christ boundary for the shared LOI Supabase project.
-- This migration intentionally does not alter any public LOI tables, policies, or triggers.
create schema if not exists rooted_in_christ;

create type rooted_in_christ.member_role as enum ('owner','ministry_admin','pastor','editor','media_manager','prayer_team','viewer');
create type rooted_in_christ.member_status as enum ('invited','active','suspended');

create table rooted_in_christ.members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role rooted_in_christ.member_role not null default 'viewer',
  status rooted_in_christ.member_status not null default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create or replace function rooted_in_christ.has_role(required_role rooted_in_christ.member_role)
returns boolean language sql stable security definer set search_path = rooted_in_christ, pg_temp as $$
  select exists (
    select 1 from rooted_in_christ.members
    where user_id = auth.uid()
      and status = 'active'
      and (role = required_role or role = 'owner')
  );
$$;

alter table rooted_in_christ.members enable row level security;
create policy "members can view own membership" on rooted_in_christ.members
  for select using (user_id = auth.uid());
create policy "owners manage ministry membership" on rooted_in_christ.members
  for all using (rooted_in_christ.has_role('owner'))
  with check (rooted_in_christ.has_role('owner'));

revoke all on schema rooted_in_christ from anon;
grant usage on schema rooted_in_christ to authenticated;
grant select on rooted_in_christ.members to authenticated;

comment on schema rooted_in_christ is 'Private data boundary for Rooted In Christ Ministry; independent from LOI and other brands.';
