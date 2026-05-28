import "./globals.css";
import NavWrapper from "@/components/NavWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import PageTheme from "@/components/PageTheme";
import { CaseNavProvider } from "@/contexts/CaseNavContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased overflow-hidden">
        <CaseNavProvider>
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
