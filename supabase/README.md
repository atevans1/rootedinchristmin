# Rooted In Christ Supabase boundary

These migrations belong only to Rooted In Christ Ministry. Before applying them to the shared LOI Intelligence Supabase project, inspect the existing remote schemas, tables, policies, functions, triggers, storage buckets, and auth/account model. Do not run a reset or modify unrelated LOI or Beautiful You objects.

The target production namespace is `rooted_in_christ`. The current migrations are a development foundation and must be reviewed/translated into that schema before first application to the shared project.

When the Supabase CLI and Docker are available:

```bash
supabase start
supabase db reset
```

Keep credentials in local environment variables and never commit them. Never expose a service-role key to the browser.
