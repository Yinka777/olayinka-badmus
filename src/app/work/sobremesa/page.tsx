import { ProjectHeroTemplateOne } from "@/features/projects/components/ProjectHeroTemplateOne";

export default function SobremesaPage() {
  return (
    <main>
      <ProjectHeroTemplateOne
        title="Sobremesa"
        year="2024–Present"
        description="An editorial platform exploring the conversations, images, rituals and ideas that emerge when people remain together after a meal."
        disciplines={[
          "Editorial Design",
          "Art Direction",
          "Photography",
          "Writing",
          "Events",
        ]}
        role="Co-founder and Creative Director"
        collaborators={[
          "Ejiro Ogagan",
          "Nate Ogunbiyi",
          "YEN Studios",
        ]}
        callout="A magazine, gathering space and ongoing study of what happens when people stay at the table."
        heroImage={{
          src: "/images/sobremesa/hero.jpg",
          alt: "Sobremesa magazine and editorial project",
          objectPosition: "center",
          caption: "Sobremesa, 2024–Present",
        }}
        slides={[
          {
            src: "/images/sobremesa/frontcover.jpg",
            alt: "Sobremesa #1 Front Cover",
            caption: "Editorial design and publishing",
          },
          {
            src: "/images/sobremesa/backcover.jpeg",
            alt: "Sobremesa #2 Back Cover",
            caption: "Photography and art direction",
          },
        ]}
      />
    </main>
  );
}