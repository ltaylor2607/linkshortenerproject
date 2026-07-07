# Agent Instructions — Link Shortener Project

This file is the entry point for all LLM coding agents working in this repository.
**Read this file first, then read every doc linked below before writing any code.**

> ⛔ **STOP. Before you write a single line of code, you MUST open and read every relevant file in the `/docs` directory. Skipping this step is not permitted under any circumstances.**

---

## Project Overview

A full-stack link-shortening web app built with Next.js App Router, Clerk authentication, Drizzle ORM, and a Neon serverless PostgreSQL database. The UI is composed with shadcn/ui components and styled with Tailwind CSS v4.

---

## ⚠️ Critical Warnings

- **Next.js 16 is not the Next.js you know.** APIs, file conventions, and behaviour may differ from your training data. Before writing any Next.js code, read `node_modules/next/dist/docs/` and heed all deprecation notices.
- **Drizzle ORM 1.0.0-rc** — the API surface is in release-candidate state; do not assume stable-release patterns from older training data.
- **Clerk v7** — component names, hooks, and provider APIs differ significantly from earlier versions. Always verify against the installed package source.
- **Tailwind CSS v4** — configuration, plugin syntax, and utility names have breaking changes from v3. Never apply v3 patterns.

---

## ⛔ Agent Documentation Index — MANDATORY PRE-READING

**You MUST read the relevant file(s) below BEFORE generating ANY code.** This is not optional. If your task touches authentication, UI, or any other documented area, open the corresponding file and read it in full first. Failure to do so will result in incorrect, non-compliant code.

| Topic | File | Read before… |
|---|---|---|
| Authentication | [`docs/auth.md`](docs/auth.md) | Any Clerk usage, route protection, session handling |
| UI Components | [`docs/ui.md`](docs/ui.md) | Any component, layout, or styling work |

---

## Non-Negotiable Rules

1. **Read `/docs` first — always.** Before writing any code, read every `/docs` file relevant to your task. This rule takes precedence over everything else.
2. **TypeScript strict mode is on.** Every file must typecheck cleanly. No `any`, no `@ts-ignore`.
3. **No `"use client"` unless necessary.** Prefer React Server Components. Only add `"use client"` when the component uses browser APIs, event handlers, or React state/effects.
4. **Use the `@/` path alias** for all internal imports. Never use relative `../../` paths that traverse more than one level.
5. **Never hard-code secrets or connection strings.** All credentials live in environment variables (`.env.local`).
6. **Run `npm run lint` and ensure zero errors** before considering any task complete.
7. **Do not install new dependencies** without explicit user approval.
