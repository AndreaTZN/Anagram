import "./globals.css";
import { headers } from "next/headers";
import NavWrapper from "@/components/NavWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import PageTheme from "@/components/PageTheme";
import { CaseNavProvider } from "@/contexts/CaseNavContext";
import MobileNav from "@/components/MobileNav";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.jpg",
    apple: "/webclip.jpg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isCasePage = /^\/works\/.+/.test(pathname);

  return (
    <html lang="fr">
      <body className="antialiased overflow-hidden">
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <CaseNavProvider isCasePage={isCasePage}>
          <PageTheme>
            <FadeIn id="home-main" className="opacity-0">
              <div className="sticky top-0 h-screen shrink-0 max-[992px]:hidden">
                <NavWrapper />
              </div>
            </FadeIn>
            <MobileNav />
            <SmoothScroll>{children}</SmoothScroll>
          </PageTheme>
        </CaseNavProvider>
      </body>
    </html>
  );
}
