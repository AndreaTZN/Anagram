"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Studio", href: "/about" },
  { label: "Lab", href: "/lab" },
  { label: "Store", href: "/store" },
];

const works = [
  {
    name: "Planity",
    href: "/works/planity",
    category: "Fintech",
    type: "image" as const,
    image: "/navigation/planity.jpg",
  },
  {
    name: "Fortuneo",
    href: "/works/fortuneo",
    category: "Banking",
    type: "image" as const,
    image: "/navigation/fortuneo.jpg",
  },
  {
    name: "Founders future",
    href: "/works/founders-future",
    category: "Investment",
    type: "icon" as const,
    svgIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        fill="none"
        viewBox="0 0 39 39"
      >
        <g id="icon">
          <rect width="38.496" height="38.496" fill="#0C0C0C" rx="3.208" />
          <path
            id="Union"
            fill="#fff"
            d="M19.286 11.908H17.65c-1.488 0-1.783.416-1.783 1.689v.788h3.42v2.768h-3.42v11.998h-3.699V17.153H9.883v-2.768h2.284v-.788c0-3.336 1.474-4.429 5.218-4.429h1.901v2.74Zm9.404 0h-1.635c-1.489 0-1.784.415-1.784 1.689v.788h3.42v2.768h-3.42v11.998h-3.699V17.153h-2.284v-2.768h2.284v-.788c0-3.335 1.474-4.429 5.217-4.429h1.901v2.74Z"
          />
        </g>
      </svg>
    ),
    iconBg: "#0c0c0c",
  },
  {
    name: "Perma",
    href: "/works/perma",
    category: "Social",
    type: "icon" as const,
    icon: "/navigation/perma.png",
    iconCover: true,
  },
  {
    name: "Semplice",
    href: "/works/semplice",
    category: "Motion",
    type: "icon" as const,
    svgIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        fill="none"
        viewBox="0 0 39 39"
      >
        <g id="icon">
          <rect width="38.496" height="38.496" fill="#FFD300" rx="3.208" />
          <g id="Group">
            <path
              id="Vector"
              fill="#0C0C0C"
              d="m21.264 10.35 1.426-2.412s-1.42-.67-1.526.798c-.041.581-.405.81-.74.81a.669.669 0 0 1 .006-1.338.85.85 0 0 1 .141.011c.2-.645-.417-.845-.78-.645 0 0 .093-.581-.476-.863-.61.264-.476.863-.476.863-.358-.2-.98 0-.78.645 0 0 .058-.011.14-.011a.669.669 0 0 1 .006 1.338c-.334 0-.698-.229-.74-.81-.105-1.467-1.59-.904-1.59-.904l1.485 2.518h3.904Z"
            />
            <path
              id="Vector_2"
              fill="#0C0C0C"
              d="M30.218 18.427c2.237-.27 2.213-2.084 2.213-2.084-2.806.482-4.373-1.074-4.373-1.074s1.761.746 3.164 0c1.38-.733 1.186-2.277 1.186-2.277-3.252 1.062-4.42-.088-4.42-.088s1.315.276 2.418-.387c1.52-.91.851-2.266.851-2.266-2.453 1.15-3.563.57-3.563.57s1.239-.024 1.937-1.404c.546-1.074-.358-1.901-.358-1.901-1.232 1.825-3.199 1.561-4.532 2.33-.886.51-.082 1.45-.082 1.45.863-.323 1.626.64 1.626 2.078 0 2.048-1.678 3.18-3.457 3.18-1.808 0-2.607-.786-2.607-2.646 0-.775.188-1.08.764-1.08.575 0 .798.416.798.416s.346-.493.346-1.18c0-.892-.634-1.109-1.373-1.109h-3.698c0 .493.158 1.05.686 1.221 0 0-.17 1.415-.37 2.976-.129 1.01-.921 1.403-1.796 1.403-1.667 0-3.463-1.057-3.463-3.181 0-1.221.657-2.43 1.626-2.078.3-.34.563-.992-.012-1.403-1.004-.716-3.41-.523-4.602-2.372 0 0-.898.822-.358 1.902.692 1.38 1.937 1.403 1.937 1.403s-1.115.581-3.563-.57c0 0-.67 1.35.851 2.266 1.104.664 2.418.388 2.418.388s-1.174 1.15-4.42.088c0 0-.188 1.544 1.186 2.277 1.403.746 3.164 0 3.164 0s-1.561 1.55-4.373 1.068c0 0-.024 1.814 2.213 2.084 1.773.217 3.24-1.033 3.24-1.033s-.452 1.714-4.59 2.29c0 0 1.039 1.819 3.551 1.173 1.679-.428 2.695-1.907 2.695-1.907s-.687 2.171-4.215 3.486c0 0 1.097 1.239 3.451.264 1.985-.821 2.812-2.817 2.812-2.817s-.258 1.814-1.978 3.622c0 0 .534.129.98-.053 1.632-.67 2.665-1.744 2.93-3.428 0 0 .475.458.358 1.373-.165 1.262-2.266 2.677-2.266 2.677l.287.428c-.516.306-1.297.763-1.59.934-.611-.376-1.374-.834-1.527-.928-.546-.323-1.608-.3-1.743.992.505-.557.939-.475 1.497-.194.094.047.563.323.992.582a16.68 16.68 0 0 0-.505.293c-.546.323-1.027 1.274.047 2.008-.253-.71.03-1.051.54-1.415.047-.035.317-.2.687-.417.223.141.534.358.593.4.499.375.769.727.493 1.426 1.092-.699.64-1.667.105-2.008-.023-.017-.27-.188-.422-.282.205-.123.84-.498 1.268-.757l.276.417 1.808-1.098c.023.188.04.447.011.693-.164 1.332-.898 2.553-2.553 3.657 0 0 .246.886 1.338.886.834 0 1.391-.933 1.703-1.743-.37 1.444-.34 2.57.733 3.533 1.04-.939 1.116-2.09.746-3.533.317.81.869 1.743 1.702 1.743 1.092 0 1.339-.886 1.339-.886-1.65-1.104-2.39-2.319-2.554-3.657a2.972 2.972 0 0 1 .012-.693l1.802 1.098.276-.417 1.274.757c-.153.094-.4.265-.423.282-.534.34-.986 1.303.106 2.008-.276-.705-.006-1.057.493-1.427a18.2 18.2 0 0 1 .593-.399c.364.217.634.382.68.417.511.358.793.704.54 1.415 1.075-.734.593-1.685.048-2.008-.03-.018-.23-.13-.505-.293.422-.259.898-.535.992-.582.557-.281.992-.363 1.497.194-.135-1.291-1.204-1.315-1.744-.992-.152.094-.916.552-1.526.928-.294-.17-1.08-.634-1.597-.934l.288-.422s-2.078-1.42-2.26-2.677c-.135-.933.358-1.373.358-1.373.194 1.532 1.291 2.835 2.947 3.398.458.159.963.082.963.082-1.72-1.808-1.979-3.621-1.979-3.621s.828 1.995 2.812 2.817c2.354.975 3.452-.264 3.452-.264-3.528-1.315-4.215-3.486-4.215-3.486s1.015 1.479 2.694 1.907c2.519.646 3.552-1.174 3.552-1.174-4.139-.575-4.59-2.289-4.59-2.289s1.485 1.244 3.257 1.027Z"
            />
          </g>
        </g>
      </svg>
    ),
    iconBg: "#ffd300",
  },
  {
    name: "Inbolt",
    href: "/works/inbolt",
    category: "Production",
    type: "icon" as const,
    svgIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        fill="none"
        viewBox="0 0 39 39"
      >
        <g id="icon">
          <rect width="38.496" height="38.496" fill="#fff" rx="3.208" />
          <g id="Group 2147257284">
            <g id="Group 589">
              <path
                id="Polygon 1 (Stroke)"
                fill="#0C0C0C"
                stroke="#0C0C0C"
                strokeWidth=".25"
                d="M17.242 6.822a4.013 4.013 0 0 1 4.013 0l7.752 4.476a4.013 4.013 0 0 1 2.006 3.475v8.95a4.013 4.013 0 0 1-2.006 3.475l-7.752 4.476a4.013 4.013 0 0 1-4.013 0L9.49 27.198a4.013 4.013 0 0 1-2.006-3.474v-8.951c0-1.434.765-2.759 2.006-3.475l7.752-4.476Zm3.402 1.059a2.79 2.79 0 0 0-2.79 0l-7.752 4.473-.082.05a2.792 2.792 0 0 0-1.314 2.369v8.95c0 .998.532 1.92 1.396 2.418l7.752 4.475a2.79 2.79 0 0 0 2.547.125l.162-.08.082-.046 7.75-4.474a2.79 2.79 0 0 0 1.394-2.324l.002-.093v-8.951a2.79 2.79 0 0 0-1.396-2.417l-7.751-4.475Z"
              />
              <path
                id="Polygon 2"
                fill="#0C0C0C"
                d="M18.398 9.54a1.699 1.699 0 0 1 1.699 0l6.745 3.895a.85.85 0 0 1 .021 1.459l-6.098 3.757a2.549 2.549 0 0 1-2.628.028l-6.46-3.794a.85.85 0 0 1 .006-1.468l6.715-3.877Z"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
    iconBg: "#ffffff",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      className={`relative flex flex-col bg-white  h-dvh max-h-screen${pathname === "/about" ? "" : ""}`}
    >
      <div className="flex flex-col gap-10 pl-4 pr-1.5 pt-6">
        {/* Logo */}
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
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
        </Link>

        <div className="flex flex-col gap-8">
          {/* CTA card */}
          <div className="flex flex-col gap-6">
            <p className="text-[#0c0c0c] leading-[1.1] text-xl tracking-[-0.12px]">
              We shape brands that need no introduction.
            </p>

            <a
              href="mailto:hello@anagram.club"
              className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-3 self-start"
            >
              <span className="text-[#0c0c0c] leading-[0.9] text-sm tracking-[-0.07px]">
                hello@anagram.club
              </span>
            </a>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#0c0c0c] font-medium leading-[0.8] text-sm transition-opacity"
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Works list + Show all works */}
      <div className="relative flex flex-col flex-1 overflow-hidden mt-14">
        <div className="flex flex-col gap-1.5 pl-3 pr-1.5 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden pb-24">
          {works.map((work) => (
            <Link key={work.name} href={work.href}>
              <div className="flex items-center gap-3 p-2 rounded-sm transition-colors bg-[#f9f9f9] hover:bg-[#ededed]">
                <div className="relative shrink-0 rounded-sm overflow-hidden w-25 h-15">
                  {work.type === "image" ? (
                    <Image
                      src={work.image}
                      alt={work.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="relative w-full h-full flex items-center justify-center rounded-sm overflow-hidden"
                      style={{ backgroundColor: work.iconBg }}
                    >
                      {"svgIcon" in work ? (
                        <div className="scale-[2.07]">{work.svgIcon}</div>
                      ) : (
                        <Image
                          src={work.icon}
                          alt={work.name}
                          fill
                          sizes="100px"
                          className={
                            work.iconCover
                              ? "object-cover"
                              : "object-contain p-3"
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#7c7c7c] text-sm  leading-[0.8] font-normal">
                    {work.category}
                  </span>
                  <span className="text-[#0c0c0c] text-sm  leading-[0.8] font-medium">
                    {work.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
