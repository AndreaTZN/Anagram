import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";

const navData: CaseNavData = {
  title: "Wastetide",
  description: "Wastetide reframes waste as untapped value. Built on the belief that nothing is truly discarded, the brand positions industrial waste as a resource. A hidden asset waiting to be captured, optimized, and monetized.",
  liveUrl: "https://www.wastetide.ai/",
  release: {
    sections: [],
  },
};

export default function WastetidePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-6">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-6">
              <Frame01
                src="/works/Wastetide/1.jpg"
                alt="Wastetide release 1"
              />
            </div>
          }
        />
      </div>
    </main>
  );
}
