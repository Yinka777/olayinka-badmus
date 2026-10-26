import { ProjectHeroTemplateOne } from "@/features/projects/components/ProjectHeroTemplateOne";
import { ProjectBodyTemplateOne, type ProjectItem } from "@/features/projects/components/ProjectBodyTemplateOne";

export default function GalleriesPage() {
  const galleriesItems = [
    {
      thumbnail: {
        src: "/images/galleries/cads-graphic-thumb.png",
        alt: "CADS",
      },

      caption: "The Contemporary Arts & Design Show @ Drexel",

      bodyText:
        "A ",

      secondarySlides: [
        {
          type: "image",
          src: "/images/galleries/cads-flyer.png",
          alt: "CADS Schedule Flyer",
          caption: "CADS Schedule Flyer",
        },
        {
          type: "image",
          src: "/images/galleries/editorial-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
        {
          type: "image",
          src: "/images/galleries/interview-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/galleries/yen-gallery-thumb.png",
        alt: "Threaded & Looped Gallery",
      },

      caption: "Threaded & Looped Gallery by YEN Studios",

      bodyText:
        "The first issue established Sobremesa as an editorial space for long-form conversations, visual experimentation and cultural observation.",

      secondarySlides: [
        {
          type: "image",
          src: "/images/galleries/yen-wall1.jpg",
          alt: "Sobremesa Issue 01 cover",
          caption: "Issue 01 cover",
        },
        {
          type: "image",
          src: "/images/galleries/editorial-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
        {
          type: "image",
          src: "/images/galleries/interview-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
      ],
    },
  ] satisfies ProjectItem[];

  return (
    <main>
      <ProjectHeroTemplateOne
        title="Gallery Installations"
        year="2022–Present"
        description="Gallery Installations blah blah."
        disciplines={[
          "Curatorial Design",
          "Creative Direction",
        ]}
        role="Curator & Installer"
        collaborators={[]}
        callout="Sobremesa means 'upon the table', the tradition of relaxing at the table after a meal."
        heroImage={{
          src: "/images/galleries/hero.jpeg",
          alt: "Sobremesa magazine and editorial project",
          objectPosition: "center",
          caption: "Sobremesa, 2024–Present",
        }}
        slides={[
          {
            src: "/images/galleries/sob-iss1.jpeg",
            alt: "Sobremesa #1 Front Cover",
            caption: "Editorial design and publishing",
          },
          {
            src: "/images/galleries/backcover.jpeg",
            alt: "Sobremesa #2 Back Cover",
            caption: "Photography and art direction",
          },
        ]}
      />

      <ProjectBodyTemplateOne
        title="Gallery Installations"
        year="2022–Present"
        description="Gallery Installations blah blah."
        disciplines={[
          "Curatorial Design",
          "Creative Direction",
        ]}
        collaborators={[]}
        bodyText="Sobremesa operates as a space for conversations that continue beyond the immediate subject. Through interviews, essays, photography, art and printed matter, the publication creates an environment where ideas can overlap, contradict one another and continue evolving."
        items={galleriesItems}
      />
    </main>
  );
}