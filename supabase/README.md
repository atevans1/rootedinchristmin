# Local Supabase development

This folder is local-only configuration for Rooted In Christ Ministry. It does not connect to either existing production Supabase project.

When the Supabase CLI and Docker are available:

```bash
supabase start
supabase db reset
```

The migration files create the ministry tables, roles, row-level security policies, and private media bucket. Keep credentials in local environment variables and never commit them.
