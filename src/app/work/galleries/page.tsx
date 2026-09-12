import { ProjectHeroTemplateOne } from "@/features/projects/components/ProjectHeroTemplateOne";
import { ProjectBodyTemplateOne } from "@/features/projects/components/ProjectBodyTemplateOne";

export default function GalleriesPage() {
  const galleriesItems = [
    {
      thumbnail: {
        src: "/images/galleries/backcover.jpeg",
        alt: "Sobremesa Issue 01",
      },

      caption: "Issue 01",

      bodyText:
        "The first issue established Sobremesa as an editorial space for long-form conversations, visual experimentation and cultural observation.",

      secondaryImages: [
        {
          src: "/images/galleries/issue-01-cover.jpg",
          alt: "Sobremesa Issue 01 cover",
          caption: "Issue 01 cover",
        },
        {
          src: "/images/galleries/editorial-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
        {
          src: "/images/galleries/interview-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/galleries/backcover.jpeg",
        alt: "Sobremesa Issue 01",
      },

      caption: "Issue 01",

      bodyText:
        "The first issue established Sobremesa as an editorial space for long-form conversations, visual experimentation and cultural observation.",

      secondaryImages: [
        {
          src: "/images/galleries/issue-01-cover.jpg",
          alt: "Sobremesa Issue 01 cover",
          caption: "Issue 01 cover",
        },
        {
          src: "/images/galleries/editorial-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
        {
          src: "/images/galleries/interview-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/galleries/interview-01.jpg",
        alt: "Sobremesa interview",
      },

      caption: "Interviews",

      bodyText:
        "Interviews function as conversations rather than conventional profiles, allowing subjects to move through ideas, memory, culture and personal experience.",

      secondaryImages: [
        {
          src: "/images/galleries/interview-01.jpg",
          alt: "Sobremesa interview spread",
          caption: "Interview feature",
        },
        {
          src: "/images/galleries/photoshoot-01.jpg",
          alt: "Sobremesa interview portrait",
          caption: "Portrait from interview",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/galleries/crossword-01.jpg",
        alt: "Sobremesa crossword",
      },

      caption: "Crosswords",

      bodyText:
        "The crossword transforms the magazine from something that is simply read into something that asks for participation.",

      secondaryImages: [
        {
          src: "/images/galleries/crossword-01.jpg",
          alt: "Sobremesa crossword",
          caption: "Crossword",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/galleries/photoshoot-01.jpg",
        alt: "Sobremesa photoshoots",
      },

      caption: "Photoshoots",

      bodyText:
        "The crossword transforms the magazine from something that is simply read into something that asks for participation.",

      secondaryImages: [
        {
          src: "/images/galleries/crossword-01.jpg",
          alt: "Sobremesa crossword",
          caption: "Crossword",
        },
      ],
    },
  ];

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
        collaborators={[
          "Ejiro Ogagan",
          "Nate Ogunbiyi",
        ]}
        bodyText="Sobremesa operates as a space for conversations that continue beyond the immediate subject. Through interviews, essays, photography, art and printed matter, the publication creates an environment where ideas can overlap, contradict one another and continue evolving."
        items={galleriesItems}
      />
    </main>
  );
}