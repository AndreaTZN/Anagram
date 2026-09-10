// The legacy /contact page is gone for good — 410 tells crawlers to drop it
// from the index instead of following a redirect to unrelated content.
export const dynamic = "force-static";

export function GET() {
  return new Response("Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
