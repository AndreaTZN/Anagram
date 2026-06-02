import "./globals.css";
import { headers } from "next/headers";
import NavWrapper from "@/components/NavWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import PageTheme from "@/components/PageTheme";
import { CaseNavProvider } from "@/contexts/CaseNavContext";

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
        <CaseNavProvider isCasePage={isCasePage}>
          <PageTheme>
            <div className="sticky top-0 h-screen shrink-0">
              <NavWrapper />
            </div>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </PageTheme>
        </CaseNavProvider>
      </body>
    </html>
  );
}
