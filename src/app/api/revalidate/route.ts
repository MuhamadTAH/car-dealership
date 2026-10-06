import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("x-sanity-webhook-secret");
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

    // Validate secret if configured
    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
    }

    // Revalidate homepage and search pages
    revalidatePath("/");
    revalidatePath("/search");

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      message: "Dealership inventory caches successfully revalidated",
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error revalidating paths", error: err?.message },
      { status: 500 }
    );
  }
}
