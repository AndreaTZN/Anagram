export const SITE_URL = "https://www.anagram.club";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function serializeJsonLd(data: Record<string, unknown>): string {
  // Escape HTML delimiters so content cannot close the inline script tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
