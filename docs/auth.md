# Authentication — Clerk

## Rules

- **Clerk is the only authentication provider.** Do not implement any other auth method (NextAuth, custom JWT, sessions, etc.).
- Never write custom login/logout logic. Delegate entirely to Clerk.

## Route Protection

- `/dashboard` is a **protected route**. Users must be authenticated to access it.
  - Enforce this via Clerk middleware (`clerkMiddleware` in `middleware.ts`). Unauthenticated requests to `/dashboard` must be redirected to the sign-in modal.
- The **homepage** (`/`) must redirect authenticated users to `/dashboard`. Check auth state in the page (Server Component) and return a `redirect('/dashboard')` if the user is signed in.

## Sign-In / Sign-Up Modals

- Sign-in and sign-up must **always** launch as Clerk modals — never as full-page redirects to `/sign-in` or `/sign-up`.
- Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` for any trigger buttons.
- The `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` catch-all routes exist only as fallbacks; do not link to them directly.

## Accessing Auth State

- In **Server Components / Route Handlers**: use `auth()` from `@clerk/nextjs/server`.
- In **Client Components**: use `useAuth()` or `useUser()` hooks from `@clerk/nextjs`.
- Never pass raw session tokens or user IDs through props when Clerk hooks are available.

## Environment Variables

All Clerk keys must live in `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

Never hard-code these values anywhere in the codebase.
