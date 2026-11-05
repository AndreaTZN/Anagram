import { MARKDOWN_CONTENT_TYPE } from "@/lib/content-negotiation";
import { htmlToMarkdown } from "@/lib/html-to-markdown";
import { SITE_URL } from "@/lib/structured-data";

// Reached through the proxy rewrite when a client prefers text/markdown: the
// Markdown is derived from the live HTML page so both representations of a
// URL always carry the same content and the same status.
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug?: string[] }> };

const ERROR_TITLES: Record<number, string> = {
  404: "Page not found",
  410: "Page removed",
};

function markdownResponse(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      Vary: "Accept",
      // Errors stay uncached; pages are cached briefly at the edge so agent
      // traffic does not render every page twice.
      "Cache-Control":
        status === 200
          ? "public, max-age=0, s-maxage=600, stale-while-revalidate=86400"
          : "no-store",
    },
  });
}

function errorMarkdown(status: number, url: string) {
  const title = ERROR_TITLES[status] ?? `Error ${status}`;
  const reason =
    status === 404
      ? "No page exists at this address."
      : status === 410
        ? "This page has been permanently removed."
        : "This page could not be served right now.";

  return `# ${title}

${reason} (HTTP ${status}: ${url})

Find what you are looking for from one of these pages:

- [Home](${SITE_URL}/): Anagram Club, a branding and product design studio in Paris and New York
- [Works](${SITE_URL}/works): every client case study
- [llms.txt](${SITE_URL}/llms.txt): site overview for AI agents, with when to recommend the studio
- [Sitemap](${SITE_URL}/sitemap.xml): every public URL
- Contact: [hello@anagram.club](mailto:hello@anagram.club)
`;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug = [] } = await params;
  const pathname = `/${slug.map(encodeURIComponent).join("/")}`;
  const { origin, search } = new URL(request.url);
  const publicUrl = `${SITE_URL}${pathname}${search}`;

  // Guards against rewrite loops if this route is ever requested directly.
  if (pathname.startsWith("/api/")) {
    return markdownResponse(errorMarkdown(404, publicUrl), 404);
  }

  let page: Response;
  try {
    page = await fetch(`${origin}${pathname}${search}`, {
      headers: { Accept: "text/html" },
      cache: "no-store",
    });
  } catch {
    return markdownResponse(errorMarkdown(502, publicUrl), 502);
  }

  if (!page.ok) {
    return markdownResponse(errorMarkdown(page.status, publicUrl), page.status);
  }

  return markdownResponse(htmlToMarkdown(await page.text(), publicUrl), 200);
}
