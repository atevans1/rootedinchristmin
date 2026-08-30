-- Core Rooted In Christ records. No public LOI tables are modified.
create type rooted_in_christ.record_status as enum ('draft','published','archived');
create type rooted_in_christ.review_status as enum ('new','under_review','approved','declined','closed');

create table rooted_in_christ.programmes (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique,
  description text, category text, status rooted_in_christ.record_status not null default 'draft',
  created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table rooted_in_christ.events (
  id uuid primary key default gen_random_uuid(), title text not null, description text, venue text,
  start_at timestamptz not null, end_at timestamptz, registration_required boolean not null default false,
  registration_url text, status rooted_in_christ.record_status not null default 'draft',
  created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table rooted_in_christ.contact_enquiries (
  id uuid primary key default gen_random_uuid(), full_name text not null, email text not null,
  subject text, message text not null, status rooted_in_christ.review_status not null default 'new',
  internal_notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table rooted_in_christ.prayer_requests (
  id uuid primary key default gen_random_uuid(), full_name text, email text, phone text,
  details text not null, consent_to_follow_up boolean not null default false,
  status rooted_in_christ.review_status not null default 'new', internal_notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table rooted_in_christ.donation_records (
  id uuid primary key default gen_random_uuid(), donor_name text, donor_email text,
  amount numeric(12,2), currency text, received_at timestamptz, method text, gateway text,
  external_reference text, notes text, created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table rooted_in_christ.programmes enable row level security;
alter table rooted_in_christ.events enable row level security;
alter table rooted_in_christ.contact_enquiries enable row level security;
alter table rooted_in_christ.prayer_requests enable row level security;
alter table rooted_in_christ.donation_records enable row level security;

create policy "published programmes are public" on rooted_in_christ.programmes for select using (status = 'published');
create policy "published events are public" on rooted_in_christ.events for select using (status = 'published');
create policy "ministry editors manage programmes" on rooted_in_christ.programmes for all using (rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('editor'));
create policy "ministry editors manage events" on rooted_in_christ.events for all using (rooted_in_christ.has_role('editor')) with check (rooted_in_christ.has_role('editor'));
create policy "authorized staff manage enquiries" on rooted_in_christ.contact_enquiries for all using (rooted_in_christ.has_role('ministry_admin')) with check (rooted_in_christ.has_role('ministry_admin'));
create policy "authorized prayer team manage requests" on rooted_in_christ.prayer_requests for all using (rooted_in_christ.has_role('prayer_team')) with check (rooted_in_christ.has_role('prayer_team'));
create policy "public may submit contact enquiries" on rooted_in_christ.contact_enquiries for insert to anon, authenticated with check (true);
create policy "public may submit prayer requests" on rooted_in_christ.prayer_requests for insert to anon, authenticated with check (true);
create policy "authorized staff manage giving" on rooted_in_christ.donation_records for all using (rooted_in_christ.has_role('ministry_admin')) with check (rooted_in_christ.has_role('ministry_admin'));

grant usage on schema rooted_in_christ to anon, authenticated;
grant select on rooted_in_christ.programmes, rooted_in_christ.events to anon, authenticated;
grant insert on rooted_in_christ.contact_enquiries, rooted_in_christ.prayer_requests to anon, authenticated;
grant all on rooted_in_christ.programmes, rooted_in_christ.events, rooted_in_christ.contact_enquiries, rooted_in_christ.prayer_requests, rooted_in_christ.donation_records to authenticated;
