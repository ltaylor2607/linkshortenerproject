---
description: Read this before implementing or modifying data mutations, server actions, or database-write flows in this project.
---

# Data Mutations — Server Actions

- Perform all application data mutations through Next.js server actions. Invoke server actions from Client Components; do not mutate data directly in UI components or route handlers.
- Put each server action in an `actions.ts` file colocated with the Client Component that calls it. Keep server-action modules focused on server-side operations.
- Give every server-action input an explicit TypeScript type. Do not use the `FormData` type; define typed input objects instead.
- Validate all input inside the server action with Zod before using it.
- Before any database operation, check that a user is signed in using Clerk server-side auth. Stop the action if the user is unauthenticated.
- Perform database reads and writes only through helper functions in `/data` that wrap Drizzle queries. Server actions must call these helpers and must not contain Drizzle queries directly.
- Server actions must never throw errors. Catch failures (validation, authentication, database) and return a typed result object instead: `{ error: string }` on failure or `{ success: true, ... }` on success. Client Components check these properties to handle the outcome.