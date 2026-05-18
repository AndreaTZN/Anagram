import "./globals.css";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased flex h-screen overflow-hidden bg-white">
        <div className="sticky top-0 h-screen shrink-0">
          <Navigation />
        </div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
