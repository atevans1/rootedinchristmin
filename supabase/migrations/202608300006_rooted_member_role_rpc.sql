-- Stable authorization bridge for middleware. Returns only the signed-in
-- user's active Rooted In Christ role and exposes no LOI or cross-brand data.
create or replace function public.rooted_in_christ_member_role()
returns text
language sql
stable
security definer
set search_path = rooted_in_christ, auth, pg_temp
as $$
  select role::text
  from rooted_in_christ.members
  where user_id = auth.uid()
    and status = 'active'
  limit 1;
$$;

revoke all on function public.rooted_in_christ_member_role() from public;
grant execute on function public.rooted_in_christ_member_role() to authenticated;
