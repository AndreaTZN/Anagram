"use client";

import Link from "next/link";
import { globalLenisRef } from "@/lib/lenis";
import { useCookieConsent } from "@/components/cmp";

const Divider = () => {
  return (
    <div className="nextcase_separator bg-[#0c0c0c]/15 w-full h-[0.5px]"></div>
  );
};

const sitemapLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/works" },
  { label: "Studio", href: "/about" },
  { label: "Lab", href: "/lab" },
];

const desktopSocialLinks = [
  { label: "X", href: "https://x.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

const brands = ["Arpe", "Voff"];

function handleBackToTop() {
  globalLenisRef.current?.scrollTo(0);
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { setOpen } = useCookieConsent();

  return (
    <footer className="text-[#0c0c0c] text-sm">
      {/* Desktop */}
      <div
        id="footer-desktop"
        className="hidden min-[767px]:flex flex-col gap-6 pt-6"
      >
        <Divider />

        <div className="flex gap-6 items-start">
          <div
            id="footer-desktop-contact"
            className="flex flex-col gap-16 flex-1"
          >
            <p className="text-[#7c7c7c] text-[0.8125rem]">Contact</p>
            <div className="flex flex-col gap-8 font-medium text-sm">
              <div className="flex flex-col gap-1">
                <p className="leading-[1.1]">Anagram</p>
                <p className="leading-[1.1]">Paris / New York</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="leading-[1.1]">Book a call</p>
                <a
                  href="mailto:hello@anagram.club"
                  className="leading-[1.1]  hover:text-[#0c0c0c]/70 transition-colors duration-300 ease-linear"
                >
                  hello@anagram.club
                </a>
              </div>
            </div>
          </div>

          <div
            id="footer-desktop-sitemap"
            className="flex flex-1 flex-col gap-16"
          >
            <p className="text-[#7c7c7c] text-[0.8125rem]">Sitemap</p>
            <div className="flex flex-col items-start gap-1 whitespace-nowrap has-[:hover]:[&>*:not(:hover)]:text-[#0c0c0c]/30">
              {sitemapLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="leading-[1.1] font-medium text-sm transition-colors duration-300 ease-linear"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            id="footer-desktop-links"
            className="flex flex-1 flex-col gap-16"
          >
            <p className="text-[#7c7c7c] text-[0.8125rem]">Links</p>
            <div className="flex flex-col gap-1 whitespace-nowrap has-[:hover]:[&>*:not(:hover)]:text-[#0c0c0c]/30">
              {desktopSocialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="leading-[1.1] font-medium text-sm transition-colors duration-300 ease-linear"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* <div
            id="footer-desktop-brands"
            className="flex flex-1 flex-col gap-16 whitespace-nowrap"
          >
            <p className="text-[#7c7c7c] text-[0.8125rem]">Our brands</p>
            <div className="flex flex-col gap-1 font-medium text-sm">
              {brands.map((brand) => (
                <p key={brand} className="leading-[1.1]">
                  {brand}
                </p>
              ))}
            </div>
          </div> */}
        </div>

        <div id="footer-desktop-bottom" className="flex gap-6 items-end mt-32">
          <p className="flex-1 leading-[1.1]">
            © Anagram Brand design studio {year}
          </p>
          <div className="flex-1">
            <Link
              href="/privacy"
              className="leading-[1.1] hover:text-[#0c0c0c]/70 transition-colors duration-300 ease-linear"
            >
              Privacy Policy
            </Link>
          </div>

          {/* <button
            id="footer-desktop-cookie-settings"
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 text-left leading-[1.1] cursor-pointer"
          >
            Cookie settings
          </button> */}
          <div className="flex-1">
            <button
              type="button"
              onClick={handleBackToTop}
              className="text-left leading-[1.1] cursor-pointer hover:text-[#0c0c0c]/70 transition-colors duration-100 ease-linear"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        id="footer-mobile"
        className="flex min-[767px]:hidden flex-col justify-between leading-[0.9] py-6"
      >
        <Divider />
        <div className="flex flex-1 flex-col gap-6 pt-6">
          <div id="footer-mobile-row-top" className="flex gap-4 items-start">
            <div
              id="footer-mobile-contact"
              className="flex flex-1 min-w-px flex-col gap-6"
            >
              <p className="text-[#7c7c7c] text-sm leading-[0.9]">Contact</p>
              <div className="flex flex-col gap-6 font-medium text-base leading-[0.9] text-[#0c0c0c]">
                <div className="flex flex-col gap-2 ">
                  <p>Anagram</p>
                  <p>Paris / New York</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Book a call</p>
                  <a href="mailto:hello@anagram.club">hello@anagram.club</a>
                </div>
              </div>
            </div>

            <div
              id="footer-mobile-sitemap"
              className="flex flex-1 min-w-px flex-col gap-6"
            >
              <p className="text-[#7c7c7c] text-sm leading-[0.9]">Sitemap</p>
              <div className="flex flex-col gap-2 font-medium text-base leading-[0.9] text-[#0c0c0c]">
                {sitemapLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div id="footer-mobile-row-bottom" className="flex gap-4 items-start">
            <div
              id="footer-mobile-links"
              className="flex flex-1 min-w-px flex-col gap-6"
            >
              <p className="text-[#7c7c7c] text-sm leading-[0.9]">Links</p>
              <div className="flex flex-col gap-2 font-medium text-base leading-[0.9] text-[#0c0c0c] whitespace-nowrap">
                {desktopSocialLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* <div
              id="footer-mobile-brands"
              className="flex flex-1 min-w-px flex-col gap-6 whitespace-nowrap"
            >
              <p className="text-[#7c7c7c] text-sm leading-[0.9]">Our brands</p>
              <div className="flex flex-col gap-2 font-medium text-base leading-[0.9] text-[#0c0c0c]">
                {brands.map((brand) => (
                  <p key={brand}>{brand}</p>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        <div
          id="footer-mobile-bottom"
          className="flex flex-col gap-6 justify-end pt-12 text-sm leading-[0.9] text-[#0c0c0c]"
        >
          <div className="flex gap-6 items-center">
            <Link href="/privacy" className="flex-1 min-w-px">
              Privacy Policy
            </Link>
            {/* <button
              id="footer-mobile-cookie-settings"
              type="button"
              onClick={() => setOpen(true)}
              className="flex-1 min-w-px text-left cursor-pointer"
            >
              Cookie settings
            </button> */}
            <button
              type="button"
              onClick={handleBackToTop}
              className="flex-1 min-w-px text-left cursor-pointer"
            >
              Back to top
            </button>
          </div>
          <p>© Anagram Brand design studio {year}</p>
        </div>
      </div>
    </footer>
  );
}
