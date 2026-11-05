import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const ORIGIN = "https://www.anagram.club";

function request(path: string, headers: Record<string, string> = {}, method = "GET") {
  return new NextRequest(`${ORIGIN}${path}`, { headers, method });
}

function varyValues(response: Response) {
  return (response.headers.get("vary") ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase());
}

test("rewrites Markdown requests for the homepage to the Markdown route", () => {
  const response = proxy(request("/", { accept: "text/markdown" }));

  assert.equal(
    response.headers.get("x-middleware-rewrite"),
    `${ORIGIN}/api/markdown`,
  );
  assert.ok(varyValues(response).includes("accept"));
});

test("keeps the path and query string when rewriting inner pages", () => {
  const response = proxy(
    request("/works/fortuneo?tab=backstage", { accept: "text/markdown" }),
  );

  assert.equal(
    response.headers.get("x-middleware-rewrite"),
    `${ORIGIN}/api/markdown/works/fortuneo?tab=backstage`,
  );
});

test("lets HTML requests through, with Vary: Accept", () => {
  const response = proxy(request("/about", { accept: "text/html" }));

  assert.equal(response.headers.get("x-middleware-rewrite"), null);
  assert.equal(response.headers.get("x-middleware-next"), "1");
  assert.ok(varyValues(response).includes("accept"));
  assert.equal(response.headers.get("x-pathname"), "/about");
});

test("answers 406 when neither HTML nor Markdown is acceptable", async () => {
  const response = proxy(request("/", { accept: "application/pdf" }));

  assert.equal(response.status, 406);
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.ok(varyValues(response).includes("accept"));
  assert.match(await response.text(), /text\/html or text\/markdown/);
});

test("client-side router navigations (Accept: */*) still get HTML", () => {
  const response = proxy(request("/works", { accept: "*/*" }));

  assert.equal(response.headers.get("x-middleware-rewrite"), null);
  assert.equal(response.headers.get("x-middleware-next"), "1");
});

test("leaves files, route handlers and server actions untouched", () => {
  const untouched = [
    request("/llms.txt", { accept: "text/markdown" }),
    request("/works/Fortuneo/1.webp", { accept: "application/pdf" }),
    request("/api/markdown/about", { accept: "text/markdown" }),
    request("/metrics/gtm.js", { accept: "application/pdf" }),
    request("/", { accept: "text/x-component" }, "POST"),
  ];

  for (const req of untouched) {
    const response = proxy(req);
    assert.equal(response.status, 200, req.nextUrl.pathname);
    assert.equal(response.headers.get("x-middleware-rewrite"), null);
    assert.equal(response.headers.get("vary"), null);
    assert.equal(response.headers.get("x-pathname"), req.nextUrl.pathname);
  }
});
