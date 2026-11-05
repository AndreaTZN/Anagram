import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { GET } from "@/app/api/markdown/[[...slug]]/route";

const realFetch = globalThis.fetch;
const requested: { url: string; accept: string | null }[] = [];

function mockPage(status: number, body = "") {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    requested.push({
      url: String(input),
      accept: new Headers(init?.headers).get("accept"),
    });
    return new Response(body, {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }) as typeof fetch;
}

function call(slug?: string[], search = "") {
  const path = slug ? `/${slug.join("/")}` : "";
  return GET(new Request(`http://localhost:3000/api/markdown${path}${search}`), {
    params: Promise.resolve({ slug }),
  });
}

function assertMarkdownHeaders(response: Response) {
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.equal(response.headers.get("vary"), "Accept");
}

afterEach(() => {
  globalThis.fetch = realFetch;
  requested.length = 0;
});

test("serves the homepage HTML as Markdown", async () => {
  mockPage(200, "<html><body><main><h1>We shape brands</h1><p>Studio.</p></main></body></html>");
  const response = await call();

  assert.equal(response.status, 200);
  assertMarkdownHeaders(response);
  assert.equal(await response.text(), "# We shape brands\n\nStudio.\n");
  assert.deepEqual(requested, [{ url: "http://localhost:3000/", accept: "text/html" }]);
});

test("fetches inner pages on the same origin, query string included", async () => {
  mockPage(200, "<main><h1>Fortuneo</h1><a href='/works/wastetide'>Next</a></main>");
  const response = await call(["works", "fortuneo"], "?tab=backstage");

  assert.equal(requested[0].url, "http://localhost:3000/works/fortuneo?tab=backstage");
  // Links point at the public site, not the host that served the request.
  assert.match(await response.text(), /\(https:\/\/www\.anagram\.club\/works\/wastetide\)/);
});

test("answers a missing page with a Markdown 404 that points agents somewhere useful", async () => {
  mockPage(404, "<html><body>Error 404</body></html>");
  const response = await call(["__ora-404-probe"]);
  const body = await response.text();

  assert.equal(response.status, 404);
  assertMarkdownHeaders(response);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.ok(body.length >= 20);
  assert.match(body, /^# Page not found/);
  assert.match(body, /https:\/\/www\.anagram\.club\/__ora-404-probe/);
  assert.match(body, /\(https:\/\/www\.anagram\.club\/llms\.txt\)/);
  assert.match(body, /\(https:\/\/www\.anagram\.club\/sitemap\.xml\)/);
});

test("mirrors other error statuses, such as the 410 on /contact", async () => {
  mockPage(410, "Gone");
  const response = await call(["contact"]);

  assert.equal(response.status, 410);
  assertMarkdownHeaders(response);
  assert.match(await response.text(), /^# Page removed/);
});

test("answers 502 in Markdown when the HTML page cannot be fetched", async () => {
  globalThis.fetch = (async () => {
    throw new TypeError("fetch failed");
  }) as typeof fetch;
  const response = await call(["about"]);

  assert.equal(response.status, 502);
  assertMarkdownHeaders(response);
});

test("refuses to convert API routes, so the rewrite cannot loop", async () => {
  mockPage(200, "<main><h1>Should not be fetched</h1></main>");
  const response = await call(["api", "markdown", "about"]);

  assert.equal(response.status, 404);
  assert.equal(requested.length, 0);
});
