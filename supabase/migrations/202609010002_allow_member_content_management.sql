drop policy if exists "ministry editors manage programmes" on rooted_in_christ.programmes;
drop policy if exists "ministry editors manage projects" on rooted_in_christ.projects;
drop policy if exists "ministry editors manage events" on rooted_in_christ.events;
create policy "active members manage programmes" on rooted_in_christ.programmes for all to authenticated using (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor'));
create policy "active members manage projects" on rooted_in_christ.projects for all to authenticated using (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor'));
create policy "active members manage events" on rooted_in_christ.events for all to authenticated using (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('ministry_admin') or rooted_in_christ.has_role('editor'));
