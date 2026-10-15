-- Contact form storage for the ZotPot Technologies website.
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
--
-- Security model: the website uses the public (anon / publishable) key, which
-- anyone can see in the browser. Row Level Security below lets that key ADD
-- messages only. It cannot read, change or delete them. You read messages in
-- the dashboard (Table Editor → contact_messages), which bypasses these rules.

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 120),
  email       text not null check (char_length(email) between 5 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  phone       text check (char_length(phone) <= 40),
  company     text check (char_length(company) <= 160),
  service     text check (char_length(service) <= 120),
  package     text check (char_length(package) <= 120),
  budget      text check (char_length(budget) <= 60),
  message     text not null check (char_length(message) between 20 and 5000),
  page        text check (char_length(page) <= 300),
  -- For your own tracking: new → contacted → quoted → won / lost
  status      text not null default 'new'
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Website visitors may insert a new message, and only as status 'new'.
drop policy if exists "Website can submit messages" on public.contact_messages;
create policy "Website can submit messages"
  on public.contact_messages
  for insert
  to anon
  with check (status = 'new');

-- Make sure the public role can insert but never read or modify.
revoke all on public.contact_messages from anon, authenticated;
grant insert (name, email, phone, company, service, package, budget, message, page)
  on public.contact_messages to anon;
