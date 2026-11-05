import assert from "node:assert/strict";
import { test } from "node:test";
import { htmlToMarkdown } from "@/lib/html-to-markdown";

const PAGE_URL = "https://www.anagram.club/works/fortuneo";

function page(main: string, head = "") {
  return `<!DOCTYPE html><html><head>${head}</head><body>
    <nav><a href="/">Home</a><a href="/works">Work</a></nav>
    <main>${main}</main>
    <script>self.__next_f.push([1, "payload"])</script>
  </body></html>`;
}

test("converts headings, paragraphs, emphasis and lists", () => {
  const markdown = htmlToMarkdown(
    page(`
      <h1>Fortuneo</h1>
      <p>A <strong>premium</strong> bank, <em>always</em> free.</p>
      <h2>Scope</h2>
      <ul><li>Strategy</li><li>Identity<ul><li>Logo</li></ul></li></ul>
      <ol><li>Brief</li><li>Launch</li></ol>
    `),
    PAGE_URL,
  );

  assert.equal(
    markdown,
    [
      "# Fortuneo",
      "A **premium** bank, *always* free.",
      "## Scope",
      "- Strategy\n- Identity\n  - Logo",
      "1. Brief\n2. Launch",
    ].join("\n\n") + "\n",
  );
});

test("resolves relative links and keeps external ones", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Links</h1>
      <p><a href="/works/wastetide">Next project</a> or
      <a href="mailto:hello@anagram.club">email us</a>
      <a href="#faq">skip</a></p>`),
    PAGE_URL,
  );

  assert.match(markdown, /\[Next project\]\(https:\/\/www\.anagram\.club\/works\/wastetide\)/);
  assert.match(markdown, /\[email us\]\(mailto:hello@anagram\.club\)/);
  assert.match(markdown, / skip/);
  assert.doesNotMatch(markdown, /#faq/);
});

test("only converts <main>, without site chrome, scripts or decorative markup", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Title</h1>
      <svg><text>12</text></svg>
      <div aria-hidden="true">Duplicated marquee</div>
      <div hidden>Hidden panel</div>
      <footer><p>Footer links</p></footer>
      <p>Body</p>`),
    PAGE_URL,
  );

  assert.equal(markdown, "# Title\n\nBody\n");
});

test("keeps the desktop variant of responsive blocks only", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Contact</h1>
      <div class="hidden min-[767px]:flex"><p>Desktop contact</p></div>
      <div class="flex min-[767px]:hidden"><p>Mobile contact</p></div>
      <div class="max-[992px]:flex hidden"><p>Mobile menu</p></div>
      <div class="max-[992px]:hidden"><p>Desktop sidebar</p></div>
      <h2 class="sr-only">Screen reader heading</h2>`),
    PAGE_URL,
  );

  assert.equal(
    markdown,
    "# Contact\n\nDesktop contact\n\nDesktop sidebar\n\n## Screen reader heading\n",
  );
});

test("separates sibling elements laid out with flex gaps", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Grid</h1>
      <a href="/works/bee"><div><span>Bee</span><span>Article</span></div>
      <p>An AI wearable.</p></a>`),
    PAGE_URL,
  );

  assert.match(
    markdown,
    /\[Bee Article An AI wearable\.\]\(https:\/\/www\.anagram\.club\/works\/bee\)/,
  );
});

test("renders informative images once and skips decorative ones", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Gallery</h1>
      <img alt="Fortuneo card" src="/_next/image?url=%2Fworks%2FFortuneo%2F1.webp&amp;w=3840&amp;q=75">
      <img alt="Fortuneo card" src="/works/Fortuneo/1.webp">
      <img alt="" src="/works/Fortuneo/texture.webp">`),
    PAGE_URL,
  );

  assert.equal(
    markdown,
    "# Gallery\n\n![Fortuneo card](https://www.anagram.club/works/Fortuneo/1.webp)\n",
  );
});

test("renders tables with a header row", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Cookies</h1><table>
      <tr><th>Name</th><th>Purpose</th></tr>
      <tr><td>_ga</td><td>Analytics | stats</td></tr>
    </table>`),
    PAGE_URL,
  );

  assert.match(
    markdown,
    /\| Name \| Purpose \|\n\| --- \| --- \|\n\| _ga \| Analytics \\\| stats \|/,
  );
});

test("falls back to the page title and description when there is no H1", () => {
  const markdown = htmlToMarkdown(
    page(
      `<img alt="Phone case render" src="/lab/1/image01.jpg">`,
      `<title>Lab | anagram</title><meta name="description" content="Creative explorations.">`,
    ),
    "https://www.anagram.club/lab",
  );

  assert.equal(
    markdown,
    "# Lab | anagram\n\nCreative explorations.\n\n![Phone case render](https://www.anagram.club/lab/1/image01.jpg)\n",
  );
});

test("escapes brackets in text so link syntax stays valid", () => {
  const markdown = htmlToMarkdown(
    page(`<h1>Notes</h1><p><a href="/about">[Studio] notes</a></p>`),
    PAGE_URL,
  );

  assert.match(markdown, /\[\\\[Studio\\\] notes\]\(https:\/\/www\.anagram\.club\/about\)/);
});
