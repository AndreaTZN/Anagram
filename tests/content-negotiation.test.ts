import assert from "node:assert/strict";
import { test } from "node:test";
import { negotiateRepresentation } from "@/lib/content-negotiation";

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

test("defaults to HTML when there is no usable Accept header", () => {
  assert.equal(negotiateRepresentation(null), "html");
  assert.equal(negotiateRepresentation(""), "html");
  assert.equal(negotiateRepresentation("not a media range"), "html");
});

test("browsers and wildcards get HTML", () => {
  assert.equal(negotiateRepresentation(BROWSER_ACCEPT), "html");
  assert.equal(negotiateRepresentation("*/*"), "html");
  assert.equal(negotiateRepresentation("text/*"), "html");
});

test("agents asking for Markdown get Markdown", () => {
  assert.equal(negotiateRepresentation("text/markdown"), "markdown");
  assert.equal(negotiateRepresentation("Text/Markdown"), "markdown");
  assert.equal(negotiateRepresentation("text/markdown, */*;q=0.1"), "markdown");
  assert.equal(
    negotiateRepresentation("text/markdown;charset=utf-8;q=1"),
    "markdown",
  );
});

test("the highest q-value wins", () => {
  assert.equal(
    negotiateRepresentation("text/html;q=0.5, text/markdown"),
    "markdown",
  );
  assert.equal(
    negotiateRepresentation("text/markdown;q=0.9, text/html"),
    "html",
  );
});

test("equal q-values follow the client's order", () => {
  assert.equal(negotiateRepresentation("text/markdown, text/html"), "markdown");
  assert.equal(negotiateRepresentation("text/html, text/markdown"), "html");
});

test("the most specific range decides, including q=0 rejections", () => {
  assert.equal(negotiateRepresentation("*/*, text/markdown;q=0"), "html");
  assert.equal(negotiateRepresentation("text/*;q=0.2, text/html;q=0"), "markdown");
});

test("returns null when every representation is rejected", () => {
  assert.equal(negotiateRepresentation("application/pdf"), null);
  assert.equal(negotiateRepresentation("image/*"), null);
  assert.equal(negotiateRepresentation("text/html;q=0, text/markdown;q=0"), null);
  assert.equal(negotiateRepresentation("*/*;q=0"), null);
});
