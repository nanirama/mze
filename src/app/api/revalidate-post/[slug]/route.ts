import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { clearPostsCache } from "@/lib/sheets";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Optional protection for revalidation endpoints.
  // If `process.env.REVALIDATE_SECRET` is set, require `x-revalidate-secret` header.
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (expectedSecret) {
    const provided = request.headers.get("x-revalidate-secret");
    if (!provided || provided !== expectedSecret) {
      return NextResponse.json(
        { revalidated: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  const tag = `post:${slug}`;

  // Bust the in-memory cache too so revalidation reflects sheet changes immediately.
  clearPostsCache();
  // Second argument matches this Next.js version's `revalidateTag(tag, profile)` signature.
  revalidateTag(tag, "default");

  return NextResponse.json({ revalidated: true, tag });
}

