grant insert on rooted_in_christ.donation_records to anon, authenticated;
create policy "public submit donation confirmation" on rooted_in_christ.donation_records for insert to anon, authenticated with check (true);
