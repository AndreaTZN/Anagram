import type { NextRequest } from "next/server";

// Google tag gateway: proxies tag requests through our own domain so the tag is
// served first-party. Upstream host is derived from the container ID, per
// https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide
const CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const UPSTREAM_HOST = `${CONTAINER_ID.toLowerCase()}.fps.goog`;

// Google requires live geolocation on every request; caching would freeze it.
export const dynamic = "force-dynamic";
export const runtime = "edge";

// Hop-by-hop headers must not be forwarded to the upstream (RFC 7230 §6.1).
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  // Let the runtime negotiate encoding: forwarding the client's value makes the
  // upstream reply brotli, which we would then relay without a matching
  // content-encoding header — the browser reads it as corrupt JS.
  "accept-encoding",
]);

function buildUpstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers();

  for (const [key, value] of request.headers) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  headers.set("Host", UPSTREAM_HOST);

  // Map Vercel's geo headers onto the X-Forwarded-* names Google expects.
  const country = request.headers.get("x-vercel-ip-country");
  const region = request.headers.get("x-vercel-ip-country-region");
  const city = request.headers.get("x-vercel-ip-city");
  const latitude = request.headers.get("x-vercel-ip-latitude");
  const longitude = request.headers.get("x-vercel-ip-longitude");

  if (country && region) {
    headers.set("X-Forwarded-CountryRegion", `${country}-${region}`);
  }
  if (country) {
    headers.set("X-Forwarded-Country", country);
  }
  if (region) {
    headers.set("X-Forwarded-Region", region);
  }
  if (latitude && longitude) {
    // City is URL-encoded by Vercel; Google expects it decoded.
    const parts = [`lat=${latitude}`, `long=${longitude}`];
    if (city) parts.push(`city=${decodeURIComponent(city)}`);
    headers.set("X-Forwarded-Geolocation", parts.join(","));
  }

  const clientIp =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");
  if (clientIp) {
    headers.set("X-Forwarded-For", clientIp);
  }

  return headers;
}

async function proxy(request: NextRequest): Promise<Response> {
  if (!CONTAINER_ID) {
    return new Response("Tag gateway not configured", { status: 503 });
  }

  // The measurement path is part of the upstream URL, so the pathname is
  // forwarded as-is — stripping the /metrics prefix makes Google reject it.
  const upstreamUrl = new URL(request.url);
  upstreamUrl.protocol = "https:";
  upstreamUrl.host = UPSTREAM_HOST;
  upstreamUrl.port = "";

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers: buildUpstreamHeaders(request),
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
    // Streaming request bodies require this flag in undici-based runtimes.
    ...({ duplex: "half" } as RequestInit),
  });

  const responseHeaders = new Headers(upstreamResponse.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.set("cache-control", "no-store");

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const OPTIONS = proxy;
