import "./globals.css";
import NavWrapper from "@/components/NavWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import PageTheme from "@/components/PageTheme";
import { CaseNavProvider } from "@/contexts/CaseNavContext";
import { MusicProvider } from "@/contexts/MusicContext";
import MobileNav from "@/components/MobileNav";
import CaseOriginTracker from "@/components/CaseOriginTracker";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/GoogleTagManager";
import { ConsentModeDefaults } from "@/components/ConsentModeDefaults";
import {
  CookieConsentProvider,
  CookieBanner,
  FloatingConsentInfo,
} from "@/components/cmp";
import { CookieServices } from "@/components/CookieServices";
import { GtmPageView } from "@/components/GtmPageView";

const SITE_URL = "https://anagram.club";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anagram Club — Shaping brands that need no introduction",
    template: "%s",
  },
  description:
    "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
  applicationName: "Anagram Club",
  keywords: [
    "branding studio",
    "brand identity",
    "creative studio",
    "design studio",
    "visual identity",
    "brand strategy",
    "product design",
    "web design",
    "art direction",
    "motion design",
    "branding agency Paris",
    "Anagram Club",
  ],
  authors: [{ name: "Anagram Club" }],
  creator: "Anagram Club",
  publisher: "Anagram Club",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Anagram Club",
    title: "Anagram Club — Shaping brands that need no introduction",
    description:
      "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
    images: [
      {
        url: "/opengraph.webp",
        width: 1200,
        height: 630,
        alt: "Anagram Club — Shaping brands that need no introduction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anagram Club — Shaping brands that need no introduction",
    description:
      "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process.",
    images: ["/opengraph.webp"],
  },
  icons: {
    icon: "/favicon.jpg",
    apple: "/webclip.jpg",
  },
  category: "design",
};

// One graph rather than two standalone blocks: the WebSite references the
// Organization by @id, so the studio is a single entity for crawlers instead
// of a full record plus a name-only duplicate.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Anagram Club",
      url: SITE_URL,
      logo: `${SITE_URL}/webclip.jpg`,
      description:
        "Anagram Club is a creative branding studio shaping market-defining brands through bold branding, product design, and a sharp creative process.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "hello@anagram.club",
          contactType: "customer support",
          areaServed: "Worldwide",
          availableLanguage: ["French", "English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Anagram Club",
      url: SITE_URL,
      description:
        "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Stays in <head> and stays a plain inline script: it must land on the
            dataLayer before gtm.js, and it reads headers()/cookies() server-side. */}
        <ConsentModeDefaults />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <GoogleTagManager />
      </head>
      <body className="antialiased overflow-hidden">
        <CookieConsentProvider privacyPolicyUrl="/privacy" reloadOnRevoke>
          <CookieServices />
          <GtmPageView />
          <MusicProvider>
            <CaseNavProvider>
              <CaseOriginTracker />
              <PageTheme>
                <FadeIn className="opacity-0">
                  <div className="sticky top-0 h-screen shrink-0 max-[992px]:hidden">
                    <NavWrapper />
                  </div>
                </FadeIn>
                <MobileNav />
                <SmoothScroll>{children}</SmoothScroll>
              </PageTheme>
            </CaseNavProvider>
          </MusicProvider>
          <CookieBanner />
        </CookieConsentProvider>
        <GoogleTagManagerNoScript />
      </body>
    </html>
  );
}
