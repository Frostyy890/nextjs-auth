import { type NextRequest, NextResponse } from "next/server";
import { matchEndpoint } from "@/app/api/v1/endpoints";

export async function middleware(req: NextRequest) {
  const {
    nextUrl: { pathname },
  } = req;
  if (pathname.startsWith("/api")) {
    const endpoint = matchEndpoint(pathname);
    if (!endpoint)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (endpoint.method !== req.method)
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
  }
}
