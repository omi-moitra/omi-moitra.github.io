-- =============================================================================
-- supabase/messages.sql — contact-message schema and access policies
-- -----------------------------------------------------------------------------
-- 1. messages table        validated public contact-message storage
-- 2. Role grants           least-privilege Data API permissions
-- 3. RLS policies          public insert and authenticated administration
-- =============================================================================

create table if not exists public.messages (
  -- Database constraints repeat client validation because browser validation
  -- is a usability layer and can never be the authoritative data boundary.
  id uuid primary key default gen_random_uuid(),
  name text not null
    constraint messages_name_length
      check (char_length(btrim(name)) between 2 and 100),
  email text not null
    constraint messages_email_format
      check (
        char_length(btrim(email)) between 3 and 254
        and btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
      ),
  message text not null
    constraint messages_message_length
      check (char_length(btrim(message)) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Reset table privileges before applying the narrow contract. Authenticated
-- users may administer records; public and authenticated visitors may submit.
revoke all on table public.messages from anon, authenticated;
grant insert on table public.messages to anon, authenticated;
grant select, delete on table public.messages to authenticated;

drop policy if exists "Public visitors can submit messages" on public.messages;
drop policy if exists "Authenticated administrator can read messages" on public.messages;
drop policy if exists "Authenticated administrator can delete messages" on public.messages;

-- Inserts accept only rows that already satisfy table constraints. No SELECT
-- permission is granted to anon, so a visitor cannot read submitted messages.
create policy "Public visitors can submit messages"
on public.messages
for insert
to anon, authenticated
with check (true);

create policy "Authenticated administrator can read messages"
on public.messages
for select
to authenticated
using (true);

create policy "Authenticated administrator can delete messages"
on public.messages
for delete
to authenticated
using (true);
