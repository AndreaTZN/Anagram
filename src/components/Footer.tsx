"use client";

import Link from "next/link";
import { globalLenisRef } from "@/lib/lenis";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="102"
    fill="none"
    viewBox="0 0 102 18"
    aria-label="Anagram"
  >
    <path
      id="anagram"
      fill="#0C0C0C"
      d="M0 6.23c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.921-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C8.547.835 7.278 0 5.626 0 2.442 0 0 2.84 0 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247S9.337 4.37 9.337 6.231Zm6.205 5.97h3.28V6.373c0-2.292 1.15-3.39 2.658-3.39 1.364 0 2.106 1.05 2.106 2.77v6.445h3.28V5.204c0-3.103-1.723-5.204-4.62-5.204-1.556 0-2.801.668-3.424 1.623V.263h-3.28v11.936Zm13.566-5.97c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.92-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C37.655.835 36.386 0 34.734 0c-3.184 0-5.626 2.84-5.626 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247s3.017 1.385 3.017 3.247Zm5.965 6.71c.216 2.554 2.443 4.487 5.842 4.487 3.113 0 6.034-1.647 6.034-5.968V.263h-3.28V1.6C52.407.691 51.09 0 49.558 0c-3.112 0-5.65 2.674-5.65 6.04 0 3.342 2.538 6.016 5.65 6.016 1.532 0 2.85-.692 3.448-1.576v1.409c0 1.886-1.245 2.817-2.682 2.817-1.364 0-2.298-.55-2.729-1.767h-3.184Zm8.859-6.9c0 1.814-1.365 3.056-3.017 3.056s-3.04-1.242-3.04-3.056c0-1.838 1.388-3.056 3.04-3.056 1.652 0 3.017 1.218 3.017 3.056Zm6.204 6.16h3.28V6.493c0-1.958 1.03-3.176 2.586-3.176.526 0 .981.096 1.484.263V.263a3.776 3.776 0 0 0-1.101-.144c-1.341 0-2.562.884-2.969 2.053V.262h-3.28V12.2Zm8.282-5.97c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.921-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C76.302.835 75.033 0 73.38 0c-3.184 0-5.626 2.84-5.626 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247s3.017 1.385 3.017 3.247Zm6.205 5.97h3.28V6.373c0-2.292.982-3.39 2.394-3.39 1.293 0 1.868 1.074 1.868 2.841V12.2h3.28V6.374c0-2.292.981-3.39 2.394-3.39 1.292 0 1.867 1.074 1.867 2.841V12.2h3.28V5.276c0-3.223-1.628-5.276-4.477-5.276-1.365 0-2.969.716-3.71 2.196C92.752.812 91.508 0 89.76 0c-1.46 0-2.537.692-3.184 1.623V.263h-3.28v11.936Z"
    />
  </svg>
);

const DotDivider = () => (
  <div className="nextcase_separator flex items-center justify-between w-full">
    {Array.from({ length: 250 }).map((_, i) => (
      <div
        key={i}
        className="nextcase_dot bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
      />
    ))}
  </div>
);

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

const mobileSocialLinks = [
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
];

const brands = ["Arpe", "Voff"];

function handleBackToTop() {
  globalLenisRef.current?.scrollTo(0);
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-[#0c0c0c] text-sm">
      {/* Desktop */}
      <div id="footer-desktop" className="hidden min-[767px]:flex flex-col gap-6 pt-20">
        <DotDivider />

        <div className="flex gap-6 items-start">
          <div id="footer-desktop-contact" className="flex flex-col gap-16 w-125 shrink-0">
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

          <div id="footer-desktop-sitemap" className="flex flex-1 flex-col gap-16">
            <p className="text-[#7c7c7c] text-[0.8125rem]">Sitemap</p>
            <div className="flex flex-col gap-1 font-medium text-sm whitespace-nowrap">
              {sitemapLinks.map((link) => (
                <Link key={link.href} href={link.href} className="leading-[1.1]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div id="footer-desktop-links" className="flex flex-1 flex-col gap-16">
            <p className="text-[#7c7c7c] text-[0.8125rem]">Links</p>
            <div className="flex flex-col gap-1 font-medium text-sm whitespace-nowrap">
              {desktopSocialLinks.map((link) => (
                <a key={link.href} href={link.href} className="leading-[1.1]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div id="footer-desktop-brands" className="flex flex-1 flex-col gap-16 whitespace-nowrap">
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

        <div id="footer-desktop-bottom" className="flex gap-6 items-end pb-6">
          <p className="w-125 shrink-0 leading-[1.1]">
            © Anagram Brand design studio {year}
          </p>
          <Link href="/privacy" className="flex-1 leading-[1.1]">
            Privacy Policy
          </Link>
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
      <div id="footer-mobile" className="flex min-[767px]:hidden flex-col gap-6 pt-12 pb-6">
        <Logo />
        <div className="flex items-start justify-between whitespace-nowrap">
          <div id="footer-mobile-links" className="flex flex-col gap-2 font-medium">
            <Link href="/privacy" className="leading-[1.1] underline">
              Privacy
            </Link>
            <Link href="/terms" className="leading-[1.1] underline">
              Terms & Conditions
            </Link>
            <span className="leading-[1.1]">Website by Anagram</span>
            <span className="leading-[1.1] opacity-50">© {year} Anagram</span>
          </div>
          <div id="footer-mobile-socials" className="flex flex-col gap-2">
            {mobileSocialLinks.map((link) => (
              <a key={link.href} href={link.href} className="leading-[1.1]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
