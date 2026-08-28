-- Basic private donation records only. This is not accounting or payment processing.
create table public.donation_records (
  id uuid primary key default gen_random_uuid(),
  donor_name text,
  donor_email text,
  amount numeric(12,2),
  currency text,
  donation_date date not null default current_date,
  purpose text,
  method text,
  gateway text,
  external_reference text,
  acknowledgement_sent boolean not null default false,
  internal_notes text,
  recorded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
alter table public.donation_records enable row level security;
create policy "finance managers manage donation records" on public.donation_records for all using (public.has_role('finance_manager')) with check (public.has_role('finance_manager'));
