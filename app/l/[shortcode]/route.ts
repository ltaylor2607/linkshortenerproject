import { NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;
  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    return new NextResponse("Link not found", { status: 404 });
  }

  let destination: URL;
  try {
    destination = new URL(link.destinationUrl);
  } catch {
    return new NextResponse("Link not found", { status: 404 });
  }

  if (destination.protocol !== "http:" && destination.protocol !== "https:") {
    return new NextResponse("Link not found", { status: 404 });
  }

  if (destination.username || destination.password) {
    return new NextResponse("Link not found", { status: 404 });
  }

  // Temporary redirect: destinations can be edited, so browsers must not cache it.
  return NextResponse.redirect(destination, 307);
}
