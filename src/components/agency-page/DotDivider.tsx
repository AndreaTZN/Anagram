type Props = {
  id?: string;
  orientation?: "horizontal" | "vertical";
  dots?: number;
  dotsDesktop?: number;
  dotsMobile?: number;
  pull?: string;
};

function DotRow({ count }: { count: number }) {
  return Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className="bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
    />
  ));
}

export default function DotDivider({
  id,
  orientation = "horizontal",
  dots = 100,
  dotsDesktop = 80,
  dotsMobile = 40,
  pull = "-my-8",
}: Props) {
  if (orientation === "vertical") {
    return (
      <div
        id={id}
        className="flex flex-col items-center justify-between h-full max-[992px]:hidden"
      >
        <DotRow count={dots} />
      </div>
    );
  }

  return (
    <div id={id} className={`w-full ${pull}`}>
      <div className="flex items-center justify-between w-full max-[766px]:hidden">
        <DotRow count={dotsDesktop} />
      </div>
      <div className="hidden max-[766px]:flex items-center justify-between w-full">
        <DotRow count={dotsMobile} />
      </div>
    </div>
  );
}
