insert into storage.buckets (id, name, public)
values ('ministry-media', 'ministry-media', true)
on conflict (id) do update set public = true;
grant usage on schema storage to service_role;
grant select, insert, update, delete on storage.objects to service_role;
