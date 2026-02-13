# AGENTS Guide

This document defines conventions for automation agents working in this repository.

## Repository layout

- `apps/*`: runnable applications (for example a Next.js web app).
- `packages/*`: shared libraries and configs used across apps.
- `turbo.json`: Turborepo task graph and caching behavior.
- `tsconfig.base.json`: shared TypeScript compiler settings.

## Core commands

Run all commands from repository root unless a package-specific command is documented.

- `pnpm install`: install workspace dependencies.
- `pnpm dev`: run all development tasks with Turborepo.
- `pnpm build`: build all packages/apps.
- `pnpm lint`: run linting across the workspace.
- `pnpm test`: run tests across the workspace.
- `pnpm typecheck`: run TypeScript checks across the workspace.

## Supabase local workflow

- `supabase start`: start local Supabase services.
- `supabase db reset`: reset local database and re-run migrations/seed.
- `supabase migration up`: apply local migrations.

## Coding conventions

- Use TypeScript for new application and package code.
- Reuse shared utilities from `packages/*` before creating duplicates.
- Keep modules focused and avoid large multi-purpose files.
- Favor strict typing and avoid `any` unless justified with comments.
- Keep imports sorted and remove dead code.

## Pull request expectations

- Include a concise summary of changed files and why.
- Note commands run for validation.
- Call out follow-up work or TODOs explicitly.
