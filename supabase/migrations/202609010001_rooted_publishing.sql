do $$ begin
  create type rooted_in_christ.record_status as enum ('draft','published','archived');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type rooted_in_christ.member_role as enum ('owner','ministry_admin','pastor','editor','media_manager','prayer_team','viewer');
exception when duplicate_object then null;
end $$;

create or replace function rooted_in_christ.has_role(required_role rooted_in_christ.member_role)
returns boolean language sql stable security definer set search_path = rooted_in_christ, pg_temp as $$
  select exists (select 1 from rooted_in_christ.members where user_id = auth.uid() and status = 'active' and (role = required_role or role = 'owner'));
$$;

create table if not exists rooted_in_christ.posts (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique,
  category text, content text not null, status rooted_in_christ.record_status not null default 'draft',
  author_id uuid references auth.users(id), published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists rooted_in_christ.gallery_items (
  id uuid primary key default gen_random_uuid(), title text, caption text, storage_path text not null,
  status rooted_in_christ.record_status not null default 'draft', created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
alter table rooted_in_christ.posts enable row level security;
alter table rooted_in_christ.gallery_items enable row level security;
create policy "published posts are public" on rooted_in_christ.posts for select using (status = 'published');
create policy "published gallery is public" on rooted_in_christ.gallery_items for select using (status = 'published');
drop policy if exists "members publish posts" on rooted_in_christ.posts;
create policy "members publish posts" on rooted_in_christ.posts for all using (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor'));
drop policy if exists "members publish gallery" on rooted_in_christ.gallery_items;
create policy "members publish gallery" on rooted_in_christ.gallery_items for all using (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor'));
grant all on rooted_in_christ.posts, rooted_in_christ.gallery_items to authenticated;
