import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 flex-col bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
              Ship shorter links with less friction
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Create, organize, and share short links from one secure workspace.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Link Shortener gives your team a fast way to turn long URLs into
                clean, memorable links with authentication built in from the
                start.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Start shortening links
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign in to your workspace
                </Button>
              </SignInButton>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-sm text-muted-foreground">Faster sharing</dt>
                <dd className="mt-2 text-2xl font-semibold">Short, clean URLs</dd>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-sm text-muted-foreground">Secure access</dt>
                <dd className="mt-2 text-2xl font-semibold">Clerk-powered auth</dd>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <dt className="text-sm text-muted-foreground">Built to scale</dt>
                <dd className="mt-2 text-2xl font-semibold">Next.js + Neon</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  What you can do
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Everything you need to manage shared links
                </h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-muted p-4">
                  <h3 className="font-medium text-foreground">
                    Create memorable links
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Turn long destinations into short links that are easier to
                    copy, post, and remember.
                  </p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <h3 className="font-medium text-foreground">
                    Keep link management private
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Require sign-in before accessing your dashboard so your team
                    can manage links in a protected workspace.
                  </p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <h3 className="font-medium text-foreground">
                    Work from a single dashboard
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Centralize link creation and future reporting in one place
                    instead of juggling spreadsheets or docs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Simple onboarding
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              New users can sign up in a modal and get straight into the app
              without leaving the landing page.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Modern app foundation
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Built on Next.js, Clerk, Drizzle, and Neon for a streamlined
              full-stack workflow.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Ready for teams
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Give teammates a consistent place to create and manage the links
              they share most often.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
