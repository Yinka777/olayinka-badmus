import { HomeIdentity } from "@/features/home/components/HomeIdentity";
import { HomeProjectMorph } from "@/features/home/components/HomeProjectMorph";
import { homeProjects } from "@/features/home/data/homeProjects";

export default function HomePage() {
  return (
    <main>
      <section
        style={{
          minHeight: "100svh",
          display: "grid",
          gridTemplateColumns: "minmax(14rem, 0.35fr) minmax(0, 1.65fr)",
          alignItems: "center",
          width: "90vw",
          marginInline: "auto",
        }}
      >
        <HomeIdentity />

        <HomeProjectMorph projects={homeProjects} />
      </section>
    </main>
  );
}