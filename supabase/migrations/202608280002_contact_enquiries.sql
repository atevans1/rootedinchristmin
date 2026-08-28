create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  enquiry_type text not null default 'general',
  message text not null,
  status public.review_status not null default 'new',
  internal_notes text,
  reviewed_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.contact_enquiries enable row level security;
create policy "admins manage contact enquiries" on public.contact_enquiries for all using (public.has_role('administrator')) with check (public.has_role('administrator'));
