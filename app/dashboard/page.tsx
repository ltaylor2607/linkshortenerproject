import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkDialog } from "@/app/dashboard/create-link-dialog";

const dateFormatter = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {userLinks.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader>
                  <CardTitle>/{link.shortCode}</CardTitle>
                  <CardDescription>{link.destinationUrl}</CardDescription>
                  <CardAction className="text-sm text-muted-foreground">
                    Created{" "}
                    <time dateTime={link.createdAt.toISOString()}>
                      {dateFormatter.format(link.createdAt)}
                    </time>
                  </CardAction>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
