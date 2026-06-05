import CaseNavSetter from "@/components/CaseNavSetter";
import type { CaseNavData } from "@/contexts/CaseNavContext";

const navData: CaseNavData = {
  title: "Perma",
  description:
    "A social platform built around shared interests and local communities, seeking a brand identity that feels warm, spontaneous, and genuinely human.",
  liveUrl: "#",
};

export default function PermaCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10">
        <p className="opacity-30 text-sm">perma</p>
      </div>
    </main>
  );
}
