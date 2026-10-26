import { ProjectHeroTemplateOne } from "@/features/projects/components/ProjectHeroTemplateOne";
import { ProjectBodyTemplateOne, type ProjectItem } from "@/features/projects/components/ProjectBodyTemplateOne";

export default function PoetryPage() {
  const poetryItems = [
    {
      thumbnail: {
        src: "/images/poetry/backcover.jpeg",
        alt: "Poetry Issue 01",
      },

      caption: "Issue 01",

      bodyText:
        "A",

      secondarySlides: [
        {
          type: "image",
          src: "/images/poetry/issue-01-cover.jpg",
          alt: "",
          caption: "Issue 01 cover",
        },
        {
          type: "image",
          src: "/images/poetry/editorial-01.jpg",
          alt: "",
          caption: "Editorial spread",
        },
        {
          type: "image",
          src: "/images/poetry/interview-01.jpg",
          alt: "",
          caption: "Editorial spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/poetry/backcover.jpeg",
        alt: "",
      },

      caption: "Issue 01",

      bodyText:
        "B",

      secondarySlides: [
        {
          type: "image",
          src: "/images/poetry/issue-01-cover.jpg",
          alt: "",
          caption: "Issue 01 cover",
        },
        {
          type: "image",
          src: "/images/poetry/editorial-01.jpg",
          alt: "",
          caption: "Editorial spread",
        },
        {
          type: "image",
          src: "/images/poetry/interview-01.jpg",
          alt: "",
          caption: "Editorial spread",
        },
      ],
    },
  ] satisfies ProjectItem[];

  return (
    <main>
      <ProjectHeroTemplateOne
        title="Poetry"
        year="2024–Present"
        description="A print magazine focusing on the conversations, images, rituals and ideas that emerge from YEN Studios and their surrounding environment."
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
        callout="poems that might or might not be bullshit."
        heroImage={{
          src: "/images/poetry/hero.jpg",
          alt: "",
          objectPosition: "center",
          caption: "",
        }}
        slides={[
          {
            src: "/images/poetry/sob-iss1.jpeg",
            alt: "",
            caption: "Editorial design and publishing",
          },
          {
            src: "/images/poetry/backcover.jpeg",
            alt: "",
            caption: "Photography and art direction",
          },
        ]}
      />

      <ProjectBodyTemplateOne
        title="Poetry"
        year="2023-Present"
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
        bodyText="Yeah Yeah"
        items={poetryItems}
      />
    </main>
  );
}