# expert-vessel

Production-oriented monorepo scaffold for the Anti-Gravity Expertise Wrapper MVP.

## Stack

- Monorepo: pnpm workspaces + Turborepo
- Web: Next.js 15 App Router + Tailwind + RTL Hebrew UI
- Data: Supabase Postgres + pgvector with RLS
- AI: OpenAI via environment variables

## Repository layout

- `apps/web`: Next.js application
- `packages/db`: Supabase clients, types, and query helpers
- `packages/ingestion`: ingestion CLI, Hebrew normalization, chunking, embeddings
- `packages/ai`: prompt building and draft generation
- `packages/scoring`: readiness scoring logic
- `supabase/migrations`: database migrations

## Prerequisites

- Node.js 20+
- pnpm 9+
- Supabase CLI

## Setup

1. Install dependencies.

```bash
pnpm install
```

2. Copy env file and set values.

```bash
cp .env.example .env
```

3. Start local Supabase.

```bash
supabase start
```

4. Reset and apply migrations.

```bash
supabase db reset
supabase migration up
```

5. Run development tasks.

```bash
pnpm dev
```

## Supabase migration notes

Run these from repo root:

- `supabase start`
- `supabase db reset`
- `supabase migration up`

## Web routes

- `/`: dashboard placeholder
- `/archives/upload`: PDF upload and ingestion
- `/vessels/new`: vessel definition form
- `/drafts/new`: draft generation form
- `/drafts/[id]`: red-pen style editor

## Validation commands

- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`
