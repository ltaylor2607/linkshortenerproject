import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getLinksByUserId } from "@/data/links";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

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
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
