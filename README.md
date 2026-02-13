# expert-vessel

Monorepo scaffolded for Turborepo + pnpm workspaces with apps in `apps/*` and shared packages in `packages/*`.

## Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase CLI

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy environment variables and fill values:

   ```bash
   cp .env.example .env
   ```

3. Start local Supabase services:

   ```bash
   supabase start
   ```

4. Reset local database (runs migrations/seed from a clean state):

   ```bash
   supabase db reset
   ```

5. Apply pending migrations:

   ```bash
   supabase migration up
   ```

6. Run the web app in development mode:

   ```bash
   pnpm dev
   ```

## Supabase migrations workflow

Use these Supabase CLI commands from the repository root:

- `supabase start` – boot local Supabase containers.
- `supabase db reset` – recreate the local DB and replay migrations/seeds.
- `supabase migration up` – apply any pending migrations.

## Workspace commands

- `pnpm dev` – run development tasks.
- `pnpm build` – build all apps/packages.
- `pnpm lint` – lint workspace projects.
- `pnpm test` – run tests.
- `pnpm typecheck` – run type checking.
