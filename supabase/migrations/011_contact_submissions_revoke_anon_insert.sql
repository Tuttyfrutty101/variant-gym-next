-- contact_submissions was created outside this migration history.
-- Leads are inserted only by the server, using the service role key.
-- The public anon key must not be able to skip the Turnstile check.

do $$
begin
  if to_regclass('public.contact_submissions') is null then
    raise notice 'public.contact_submissions does not exist; skipping policy drop';
    return;
  end if;

  execute 'alter table public.contact_submissions enable row level security';
  execute 'drop policy if exists "Allow anonymous inserts" on public.contact_submissions';
end $$;
