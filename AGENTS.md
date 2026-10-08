# Agent Instructions — Link Shortener Project

This file is the entry point for all LLM coding agents working in this repository.
**Read this file first, then read every doc linked below before writing any code.**

---

## Project Overview

A full-stack link-shortening web app built with Next.js App Router, Clerk authentication, Drizzle ORM, and a Neon serverless PostgreSQL database. The UI is composed with shadcn/ui components and styled with Tailwind CSS v4.

---

## ⚠️ Critical Warnings

- **Next.js 16 is not the Next.js you know.** APIs, file conventions, and behaviour may differ from your training data. Before writing any Next.js code, read `node_modules/next/dist/docs/` and heed all deprecation notices.
- **Never use `middleware.ts`.** It is deprecated in this version of Next.js. Request interception logic (including Clerk auth) belongs in [`proxy.ts`](proxy.ts) at the project root instead. Do not create a `middleware.ts` file, and do not port examples that reference one.
- **Drizzle ORM 1.0.0-rc** — the API surface is in release-candidate state; do not assume stable-release patterns from older training data.
- **Clerk v7** — component names, hooks, and provider APIs differ significantly from earlier versions. Always verify against the installed package source.
- **Tailwind CSS v4** — configuration, plugin syntax, and utility names have breaking changes from v3. Never apply v3 patterns.

---

## Non-Negotiable Rules

1. **TypeScript strict mode is on.** Every file must typecheck cleanly. No `any`, no `@ts-ignore`.
2. **No `"use client"` unless necessary.** Prefer React Server Components. Only add `"use client"` when the component uses browser APIs, event handlers, or React state/effects.
3. **Use the `@/` path alias** for all internal imports. Never use relative `../../` paths that traverse more than one level.
4. **Never hard-code secrets or connection strings.** All credentials live in environment variables (`.env.local`).
5. **Run `npm run lint` and ensure zero errors** before considering any task complete.
6. **Do not install new dependencies** without explicit user approval.
