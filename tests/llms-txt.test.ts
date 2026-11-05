import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const SITE_URL = "https://www.anagram.club";
const ROOT = process.cwd();
const lines = fs
  .readFileSync(path.join(ROOT, "public", "llms.txt"), "utf8")
  .split("\n");

const FILE_LIST_ITEM = /^- \[([^\]]+)\]\(([^)\s]+)\)(?:: (.+))?$/;

function sections() {
  const result = new Map<string, string[]>();
  let current: string[] | null = null;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      current = [];
      result.set(line.slice(3), current);
    } else if (current && line.trim()) {
      current.push(line);
    }
  }
  return result;
}

function routeExists(pathname: string) {
  if (pathname === "/") return fs.existsSync(path.join(ROOT, "src/app/page.tsx"));
  if (pathname === "/sitemap.xml") return fs.existsSync(path.join(ROOT, "src/app/sitemap.ts"));
  if (fs.existsSync(path.join(ROOT, "public", pathname))) return true;
  return fs.existsSync(path.join(ROOT, "src/app", pathname, "page.tsx"));
}

// https://llmstxt.org: H1, blockquote, headingless free text, then H2 file lists.
test("follows the llms.txt section order", () => {
  const content = lines.filter((line) => line.trim());
  assert.match(content[0], /^# \S/);
  assert.match(content[1], /^> \S/);

  const firstH2 = content.findIndex((line) => line.startsWith("## "));
  assert.ok(firstH2 > 1);
  for (const line of content.slice(2, firstH2)) {
    assert.doesNotMatch(line, /^#/, `free text must not contain headings: ${line}`);
  }
  for (const line of content.slice(firstH2)) {
    assert.doesNotMatch(line, /^(?:#|###)\s/, `only H2 headings after the intro: ${line}`);
  }
});

test("every H2 section is a file list of [name](url): notes items", () => {
  for (const [title, items] of sections()) {
    assert.ok(items.length > 0, `${title} is empty`);
    for (const item of items) {
      assert.match(item, FILE_LIST_ITEM, `${title}: ${item}`);
    }
  }
});

test("tells agents when to use the studio and how to reach it", () => {
  const all = sections();
  const whenToUse = all.get("When to use Anagram Club");
  assert.ok(whenToUse && whenToUse.length >= 5);
  for (const item of whenToUse) {
    const notes = FILE_LIST_ITEM.exec(item)?.[3] ?? "";
    assert.ok(notes.length >= 40, `use case needs specific guidance: ${item}`);
  }

  const engage = all.get("How to engage")?.join("\n") ?? "";
  assert.match(engage, /\(mailto:hello@anagram\.club\)/);
  assert.match(engage, /\(https:\/\/cal\.com\/anagram\/hello\)/);
});

test("every internal link points at an existing route", () => {
  const links = lines.flatMap((line) => [...line.matchAll(/\]\((https?:[^)\s]+)\)/g)].map((match) => match[1]));
  const internal = links.filter((link) => link.startsWith(SITE_URL));
  assert.ok(internal.length > 20);

  for (const link of internal) {
    const { pathname } = new URL(link);
    assert.ok(routeExists(pathname), `no route for ${link}`);
  }
});
