import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="not-found-root"
      className="flex flex-col items-center justify-center flex-1 gap-6 text-center"
    >
      <p className="text-[#7e7e7e] text-sm leading-[0.9]">404</p>

      <h1
        className="text-[#0c0c0c] leading-[0.9] tracking-[-0.04em]"
        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
      >
        Page <br />
        not found.
      </h1>

      <Link
        href="/"
        className="flex items-center bg-[#0c0c0c] text-white text-sm leading-[0.9] px-5 py-4 rounded-full"
      >
        Back to home
      </Link>
    </main>
  );
}
