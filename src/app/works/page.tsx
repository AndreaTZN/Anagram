import WorksGrid from "@/components/WorksGrid";
import Footer from "@/components/Footer";
export default function WorksPage() {
  return (
    <main className=" flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4 ">
      <section>
        <WorksGrid />
      </section>
      <Footer />
    </main>
  );
}
