drop policy if exists "members publish posts" on rooted_in_christ.posts;
drop policy if exists "members publish gallery" on rooted_in_christ.gallery_items;
create policy "active members manage posts" on rooted_in_christ.posts for all to authenticated
using (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'))
with check (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'));
create policy "active members manage gallery" on rooted_in_christ.gallery_items for all to authenticated
using (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'))
with check (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'));
drop policy if exists "active members manage programmes" on rooted_in_christ.programmes;
drop policy if exists "active members manage projects" on rooted_in_christ.projects;
drop policy if exists "active members manage events" on rooted_in_christ.events;
create policy "active members manage programmes" on rooted_in_christ.programmes for all to authenticated using (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active')) with check (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'));
create policy "active members manage projects" on rooted_in_christ.projects for all to authenticated using (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active')) with check (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'));
create policy "active members manage events" on rooted_in_christ.events for all to authenticated using (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active')) with check (exists (select 1 from rooted_in_christ.members m where m.user_id = auth.uid() and m.status = 'active'));
