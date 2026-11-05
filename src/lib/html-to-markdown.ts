import { parse, NodeType } from "node-html-parser";
import type { HTMLElement, Node } from "node-html-parser";

// Site chrome, embeds and form controls carry no page content for agents
// (per acceptmarkdown.com's "generating Markdown" guide).
const SKIPPED_TAGS = new Set([
  "script",
  "style",
  "noscript",
  "template",
  "svg",
  "canvas",
  "iframe",
  "video",
  "audio",
  "nav",
  "footer",
  "form",
  "input",
  "select",
  "textarea",
  "dialog",
]);

const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "dd",
  "details",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
]);

function tagOf(node: HTMLElement) {
  return node.rawTagName?.toLowerCase() ?? "";
}

function isElement(node: Node): node is HTMLElement {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

const DESKTOP_VARIANT = /^(?:sm|md|lg|xl|2xl|min-\[[^\]]+\]):(.+)$/;
const DISPLAY_UTILITIES = new Set([
  "block",
  "contents",
  "flex",
  "grid",
  "inline",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "table",
]);

// Responsive layouts render desktop and mobile variants of the same block
// (footer, navigation). Keeping only what a desktop viewport shows avoids
// emitting every block twice; Tailwind classes are the only signal in raw HTML.
function isHiddenOnDesktop(node: HTMLElement) {
  const classes = (node.getAttribute("class") ?? "").split(/\s+/);
  let hidden = classes.includes("hidden");

  for (const name of classes) {
    const utility = DESKTOP_VARIANT.exec(name)?.[1];
    if (utility === "hidden") return true;
    if (utility && DISPLAY_UTILITIES.has(utility)) hidden = false;
  }
  return hidden;
}

function isHidden(node: HTMLElement) {
  return (
    SKIPPED_TAGS.has(tagOf(node)) ||
    node.hasAttribute("hidden") ||
    node.getAttribute("aria-hidden") === "true" ||
    isHiddenOnDesktop(node)
  );
}

function containsBlock(node: HTMLElement): boolean {
  return node.childNodes.some(
    (child) =>
      isElement(child) &&
      !isHidden(child) &&
      (BLOCK_TAGS.has(tagOf(child)) || containsBlock(child)),
  );
}

function collapse(text: string) {
  return text.replace(/\s+/g, " ");
}

class MarkdownWriter {
  private blocks: string[] = [];
  private inline = "";

  constructor(private readonly baseUrl: string) {}

  resolveHref(href: string) {
    try {
      return new URL(href, this.baseUrl).toString();
    } catch {
      return href;
    }
  }

  private lastWasElement = false;
  private images = new Set<string>();

  claimImage(href: string) {
    if (this.images.has(href)) return false;
    this.images.add(href);
    return true;
  }

  pushText(text: string, fromElement: boolean) {
    if (!text) return;
    if (
      fromElement &&
      this.lastWasElement &&
      !/\s$/.test(this.inline) &&
      !/^\s/.test(text)
    ) {
      this.inline += " ";
    }
    this.inline += text;
    this.lastWasElement = fromElement;
  }

  flush() {
    const paragraph = collapse(this.inline).trim();
    if (paragraph) this.blocks.push(paragraph);
    this.inline = "";
    this.lastWasElement = false;
  }

  pushBlock(block: string) {
    this.flush();
    if (block.trim()) this.blocks.push(block.trimEnd());
  }

  toString() {
    this.flush();
    return this.blocks.join("\n\n");
  }
}

// Sibling elements are usually laid out with flex gaps rather than spaces, so
// "<span>Title</span><span>Label</span>" must not collapse into "TitleLabel".
function joinChildren(node: HTMLElement, render: (child: Node) => string) {
  let output = "";
  let previousWasElement = false;

  for (const child of node.childNodes) {
    const text = render(child);
    if (!text) continue;
    const element = isElement(child);
    if (element && previousWasElement && !/\s$/.test(output) && !/^\s/.test(text)) {
      output += " ";
    }
    output += text;
    previousWasElement = element;
  }
  return output;
}

function imageMarkdown(node: HTMLElement, writer: MarkdownWriter) {
  const alt = collapse(node.getAttribute("alt") ?? "").trim();
  const src = node.getAttribute("src");
  // Empty alt marks a decorative image (WCAG); it has nothing to tell an agent.
  if (!alt || !src || src.startsWith("data:")) return "";

  const resolved = writer.resolveHref(src);
  // next/image wraps assets in /_next/image?url=…; the original file is the
  // stable URL worth handing to an agent.
  const original = resolved.includes("/_next/image?")
    ? new URL(resolved).searchParams.get("url")
    : null;
  const href = original ? writer.resolveHref(original) : resolved;
  // Marquees and carousels clone their slides; one mention per image is enough.
  if (!writer.claimImage(href)) return "";

  return ` ![${alt.replace(/[[\]]/g, "\\$&")}](${href}) `;
}

function inlineText(node: Node, writer: MarkdownWriter): string {
  if (!isElement(node)) {
    // Escape at the source so link labels can safely wrap image syntax.
    return node.nodeType === NodeType.TEXT_NODE
      ? collapse(node.text).replace(/[[\]]/g, "\\$&")
      : "";
  }
  if (isHidden(node)) return "";

  const tag = tagOf(node);
  if (tag === "br") return " ";
  if (tag === "img") return imageMarkdown(node, writer);

  const inner = joinChildren(node, (child) => inlineText(child, writer));
  // Block children inside inline content (cards, link wrappers) still need a
  // word boundary, otherwise "Title" + "Description" glue into one word.
  const content = BLOCK_TAGS.has(tag) ? ` ${inner} ` : inner;
  const trimmed = collapse(content).trim();
  if (!trimmed) return content.length ? " " : "";

  if (tag === "a") {
    const href = node.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
      return content;
    }
    return ` [${trimmed}](${writer.resolveHref(href)}) `;
  }
  if (tag === "strong" || tag === "b") return ` **${trimmed}** `;
  if (tag === "em" || tag === "i") return ` *${trimmed}* `;
  if (tag === "code") return `\`${trimmed}\``;
  return content;
}

function renderList(node: HTMLElement, writer: MarkdownWriter, depth: number) {
  const ordered = tagOf(node) === "ol";
  const lines: string[] = [];
  let index = 1;

  for (const child of node.childNodes) {
    if (!isElement(child) || isHidden(child) || tagOf(child) !== "li") continue;

    const nested = child.childNodes.filter(
      (grandChild): grandChild is HTMLElement =>
        isElement(grandChild) && ["ul", "ol"].includes(tagOf(grandChild)),
    );
    const text = collapse(
      child.childNodes
        .filter((grandChild) => !nested.includes(grandChild as HTMLElement))
        .map((grandChild) => inlineText(grandChild, writer))
        .join(""),
    ).trim();

    const indent = "  ".repeat(depth);
    if (text) lines.push(`${indent}${ordered ? `${index}.` : "-"} ${text}`);
    index += 1;
    for (const list of nested) lines.push(renderList(list, writer, depth + 1));
  }

  return lines.filter(Boolean).join("\n");
}

function renderTable(node: HTMLElement, writer: MarkdownWriter) {
  const rows = node
    .querySelectorAll("tr")
    .map((row) =>
      row
        .querySelectorAll("th, td")
        .map((cell) =>
          collapse(inlineText(cell, writer)).trim().replace(/\|/g, "\\|"),
        ),
    )
    .filter((cells) => cells.length > 0);
  if (rows.length === 0) return "";

  const width = Math.max(...rows.map((cells) => cells.length));
  const pad = (cells: string[]) =>
    `| ${[...cells, ...Array(width - cells.length).fill("")].join(" | ")} |`;

  return [
    pad(rows[0]),
    `| ${Array(width).fill("---").join(" | ")} |`,
    ...rows.slice(1).map(pad),
  ].join("\n");
}

function renderBlocks(node: HTMLElement, writer: MarkdownWriter) {
  for (const child of node.childNodes) {
    if (!isElement(child)) {
      writer.pushText(inlineText(child, writer), false);
      continue;
    }
    if (isHidden(child)) continue;

    const tag = tagOf(child);
    const heading = /^h([1-6])$/.exec(tag);

    if (heading) {
      const text = collapse(inlineText(child, writer)).trim();
      if (text) writer.pushBlock(`${"#".repeat(Number(heading[1]))} ${text}`);
    } else if (tag === "ul" || tag === "ol") {
      writer.pushBlock(renderList(child, writer, 0));
    } else if (tag === "table") {
      writer.pushBlock(renderTable(child, writer));
    } else if (tag === "pre") {
      writer.pushBlock(`\`\`\`\n${child.text.trimEnd()}\n\`\`\``);
    } else if (tag === "hr") {
      writer.pushBlock("---");
    } else if (tag === "blockquote") {
      const text = collapse(inlineText(child, writer)).trim();
      if (text) writer.pushBlock(`> ${text}`);
    } else if (
      tag === "p" ||
      (tag === "a" && containsBlock(child)) ||
      (BLOCK_TAGS.has(tag) && !containsBlock(child))
    ) {
      writer.pushBlock(collapse(inlineText(child, writer)).trim());
    } else if (BLOCK_TAGS.has(tag)) {
      writer.flush();
      renderBlocks(child, writer);
      writer.flush();
    } else {
      writer.pushText(inlineText(child, writer), true);
    }
  }
}

/**
 * Converts a rendered page to Markdown. Only `<main>` is converted when the
 * page has one, so site-wide chrome is not repeated on every page. Relative
 * links and images are resolved against `pageUrl`.
 */
export function htmlToMarkdown(html: string, pageUrl: string): string {
  const root = parse(html);
  const content =
    root.querySelector("main") ?? root.querySelector("body") ?? root;
  const writer = new MarkdownWriter(pageUrl);
  renderBlocks(content, writer);
  const body = writer.toString();

  if (/^# /m.test(body)) return `${body}\n`;

  // Visual-only pages (e.g. a gallery) still need a heading and a summary.
  const title = collapse(root.querySelector("title")?.text ?? "").trim();
  const description = collapse(
    root.querySelector('meta[name="description"]')?.getAttribute("content") ??
      "",
  ).trim();
  return `${[title && `# ${title}`, description, body].filter(Boolean).join("\n\n")}\n`;
}
