import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "change-me";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const tag = req.nextUrl.searchParams.get("tag");
  if (!tag) {
    return NextResponse.json({ message: "tag required" }, { status: 400 });
  }

  // Next.js 16 requires a cache profile as the second argument.
  // "max" means revalidate the longest-lived cache entry for this tag.
  revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: true, tag });
}
