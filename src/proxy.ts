import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  MARKDOWN_ROUTE,
  negotiateRepresentation,
} from "@/lib/content-negotiation";

// Only page URLs have both an HTML and a Markdown representation. Files,
// route handlers and server actions (POST) keep a single one. RSC navigations
// need no special case: they send Accept: */* and therefore resolve to HTML.
function isNegotiable(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (pathname.startsWith("/api/") || pathname.startsWith("/metrics/")) {
    return false;
  }
  return !/\.[^/]+$/.test(pathname);
}

function negotiate(request: NextRequest) {
  const representation = negotiateRepresentation(
    request.headers.get("accept"),
  );

  if (representation === "markdown") {
    const { pathname, search } = request.nextUrl;
    const target = `${MARKDOWN_ROUTE}${pathname === "/" ? "" : pathname}${search}`;
    return NextResponse.rewrite(new URL(target, request.url));
  }

  if (representation === null) {
    return new NextResponse(
      "406 Not Acceptable\n\nThis URL is available as text/html or text/markdown.\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.next();
}

export function proxy(request: NextRequest) {
  const negotiable = isNegotiable(request);
  const response = negotiable ? negotiate(request) : NextResponse.next();

  // One URL now has two representations: shared caches must key on Accept.
  // Appended, not set, so Next's own RSC Vary values survive.
  if (negotiable) response.headers.append("Vary", "Accept");
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
