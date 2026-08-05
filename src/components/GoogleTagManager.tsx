import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

// Only the dataLayer push is inlined. The original snippet also did its own
// `insertBefore` of gtm.js into <head>, which ran during parsing and left the
// hydrating tree with a node the server HTML never had — Next injects the tag
// below instead, outside the React tree.
const gtmSnippet = `window.dataLayer=window.dataLayer||[];
window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`;

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {gtmSnippet}
      </Script>
      {/* Served through the first-party /metrics proxy rather than
          googletagmanager.com, so the tag stays in a first-party context. */}
      <Script
        id="gtm-js"
        strategy="afterInteractive"
        src={`/metrics/gtm.js?id=${GTM_ID}`}
      />
    </>
  );
}

export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`/metrics/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
