-- Email alerts for new contact-form enquiries (sent via Resend).
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
--
-- BEFORE RUNNING: replace PASTE_YOUR_RESEND_API_KEY_HERE below with your
-- Resend API key (re_...). Do not save this file with the real key in it.
--
-- How it works: when a row is added to contact_messages, the database sends
-- the details to Resend, which emails them to you. Sending happens in the
-- background, so the website's form is never slowed down or blocked by it.

-- 1. Let the database make web requests.
create extension if not exists pg_net;

-- 2. Store the Resend key encrypted in Supabase Vault (safe to re-run).
do $$
declare
  k text := 'PASTE_YOUR_RESEND_API_KEY_HERE';
  existing uuid;
begin
  select id into existing from vault.secrets where name = 'resend_api_key';
  if existing is null then
    perform vault.create_secret(k, 'resend_api_key', 'Resend API key for website enquiry emails');
  else
    perform vault.update_secret(existing, k);
  end if;
end $$;

-- 3. The function that sends the email.
--    Change alert_to once zotpot.co.uk is verified in Resend.
create or replace function public.email_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  api_key   text;
  alert_to  text := 'asadurzamannabin@gmail.com';
  alert_from text := 'ZotPot Website <onboarding@resend.dev>';
begin
  select decrypted_secret into api_key
  from vault.decrypted_secrets
  where name = 'resend_api_key';

  if api_key is null or api_key like 'PASTE_%' then
    raise warning 'email_new_enquiry: Resend API key is not set in Vault';
    return new;
  end if;

  perform net.http_post(
    url     := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || api_key,
      'Content-Type', 'application/json'
    ),
    body    := jsonb_build_object(
      'from', alert_from,
      'to', jsonb_build_array(alert_to),
      'reply_to', new.email,
      'subject', 'New enquiry: ' || coalesce(new.service, 'General') || ' - ' || new.name,
      'text', concat_ws(E'\n',
        'New enquiry from the ZotPot website',
        '',
        'Name: ' || new.name,
        'Email: ' || new.email,
        'Phone / WhatsApp: ' || new.phone,
        'Business: ' || new.company,
        'Service: ' || new.service,
        'Package: ' || new.package,
        'Budget: ' || new.budget,
        'Sent from page: ' || new.page,
        'Received: ' || to_char(new.created_at at time zone 'Europe/London', 'DD Mon YYYY, HH24:MI') || ' (UK time)',
        '',
        'Message:',
        new.message,
        '',
        '---',
        'Press Reply to answer ' || new.name || ' directly.'
      )
    )
  );
  return new;
end;
$$;

-- Only the trigger should run this function.
revoke all on function public.email_new_enquiry() from public, anon, authenticated;

-- 4. Run it for every new enquiry.
drop trigger if exists email_new_enquiry on public.contact_messages;
create trigger email_new_enquiry
  after insert on public.contact_messages
  for each row execute function public.email_new_enquiry();
