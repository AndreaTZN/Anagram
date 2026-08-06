"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { globalLenisRef } from "@/lib/lenis";
import { useCookieConsent } from "@/components/cmp";

// dot 1.5px + gap 4px = 5.5px of pitch, so the count follows the container
// width instead of a hardcoded length that over- or underflows on resize.
const DOT_PITCH = 5.5;

const DotDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setCount(Math.floor(el.clientWidth / DOT_PITCH));
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="nextcase_separator flex items-center justify-between w-full"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="nextcase_dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
        />
      ))}
    </div>
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
        <DotDivider />

        <div className="flex gap-6 items-start">
          <div
            id="footer-desktop-contact"
            className="flex flex-col gap-16 flex-3"
          >
            <p className="text-[#7c7c7c] text-[0.8125rem]">Contact</p>
            <div className="flex flex-col gap-8 font-medium text-sm">
              <div className="flex flex-col gap-1">
                <p className="leading-[1.1]">Anagram</p>
                <p className="leading-[1.1]">Paris / New York</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="leading-[1.1]">Book a call</p>
                <a href="mailto:hello@anagram.club" className="leading-[1.1]">
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
            <div className="flex flex-col gap-1 font-medium text-sm whitespace-nowrap">
              {sitemapLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="leading-[1.1]"
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
            <div className="flex flex-col gap-1 font-medium text-sm whitespace-nowrap">
              {desktopSocialLinks.map((link) => (
                <a key={link.href} href={link.href} className="leading-[1.1]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div
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
          </div>
        </div>

        <div id="footer-desktop-bottom" className="flex gap-6 items-end mt-32">
          <p className="flex-3 leading-[1.1]">
            © Anagram Brand design studio {year}
          </p>
          <Link href="/privacy" className="flex-1 leading-[1.1]">
            Privacy Policy
          </Link>

          <button
            id="footer-desktop-cookie-settings"
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 text-left leading-[1.1] cursor-pointer"
          >
            Cookie settings
          </button>

          <button
            type="button"
            onClick={handleBackToTop}
            className="flex-1 text-left leading-[1.1] cursor-pointer"
          >
            Back to top
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div
        id="footer-mobile"
        className="flex min-[767px]:hidden flex-col justify-between leading-[0.9] py-6"
      >
        <DotDivider />
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

            <div
              id="footer-mobile-brands"
              className="flex flex-1 min-w-px flex-col gap-6 whitespace-nowrap"
            >
              <p className="text-[#7c7c7c] text-sm leading-[0.9]">Our brands</p>
              <div className="flex flex-col gap-2 font-medium text-base leading-[0.9] text-[#0c0c0c]">
                {brands.map((brand) => (
                  <p key={brand}>{brand}</p>
                ))}
              </div>
            </div>
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
            <button
              id="footer-mobile-cookie-settings"
              type="button"
              onClick={() => setOpen(true)}
              className="flex-1 min-w-px text-left cursor-pointer"
            >
              Cookie settings
            </button>
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
