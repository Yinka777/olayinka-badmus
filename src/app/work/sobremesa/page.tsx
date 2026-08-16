import { ProjectHeroTemplateOne } from "@/features/projects/components/ProjectHeroTemplateOne";
import { ProjectBodyTemplateOne } from "@/features/projects/components/ProjectBodyTemplateOne";

export default function SobremesaPage() {
  const sobremesaItems = [
    {
      thumbnail: {
        src: "/images/sobremesa/backcover.jpeg",
        alt: "Sobremesa Issue 01",
      },

      caption: "Issue 01",

      bodyText:
        "The first issue established Sobremesa as an editorial space for long-form conversations, visual experimentation and cultural observation.",

      secondaryImages: [
        {
          src: "/images/sobremesa/issue-01-cover.jpg",
          alt: "Sobremesa Issue 01 cover",
          caption: "Issue 01 cover",
        },
        {
          src: "/images/sobremesa/editorial-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
        {
          src: "/images/sobremesa/interview-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/backcover.jpeg",
        alt: "Sobremesa Issue 01",
      },

      caption: "Issue 01",

      bodyText:
        "The first issue established Sobremesa as an editorial space for long-form conversations, visual experimentation and cultural observation.",

      secondaryImages: [
        {
          src: "/images/sobremesa/issue-01-cover.jpg",
          alt: "Sobremesa Issue 01 cover",
          caption: "Issue 01 cover",
        },
        {
          src: "/images/sobremesa/editorial-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
        {
          src: "/images/sobremesa/interview-01.jpg",
          alt: "Sobremesa Issue 01 editorial spread",
          caption: "Editorial spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/interview-01.jpg",
        alt: "Sobremesa interview",
      },

      caption: "Interviews",

      bodyText:
        "Interviews function as conversations rather than conventional profiles, allowing subjects to move through ideas, memory, culture and personal experience.",

      secondaryImages: [
        {
          src: "/images/sobremesa/interview-01.jpg",
          alt: "Sobremesa interview spread",
          caption: "Interview feature",
        },
        {
          src: "/images/sobremesa/photoshoot-01.jpg",
          alt: "Sobremesa interview portrait",
          caption: "Portrait from interview",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/crossword-01.jpg",
        alt: "Sobremesa crossword",
      },

      caption: "Crosswords",

      bodyText:
        "The crossword transforms the magazine from something that is simply read into something that asks for participation.",

      secondaryImages: [
        {
          src: "/images/sobremesa/crossword-01.jpg",
          alt: "Sobremesa crossword",
          caption: "Crossword",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/photoshoot-01.jpg",
        alt: "Sobremesa photoshoots",
      },

      caption: "Photoshoots",

      bodyText:
        "The crossword transforms the magazine from something that is simply read into something that asks for participation.",

      secondaryImages: [
        {
          src: "/images/sobremesa/crossword-01.jpg",
          alt: "Sobremesa crossword",
          caption: "Crossword",
        },
      ],
    },
  ];

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

      <ProjectBodyTemplateOne
        title="Sobremesa"
        year="2024-Present"
        description="An ongoing editorial and cultural project."
        disciplines={[
          "Editorial Design",
          "Photography",
          "Writing",
          "Art Direction",
        ]}
        collaborators={[
          "Ejiro Ogagan",
          "Nate Ogunbiyi",
        ]}
        bodyText="Sobremesa operates as a space for conversations that continue beyond the immediate subject. Through interviews, essays, photography, games and printed matter, the publication creates an environment where ideas can overlap, contradict one another and continue evolving."
        items={sobremesaItems}
      />
    </main>
  );
}