import { ProjectHeroTemplateTwo } from "@/features/projects/components/ProjectHeroTemplateTwo";
import { ProjectBodyTemplateTwo } from "@/features/projects/components/ProjectBodyTemplateTwo";

export default function PosterDesignPage() {
  return (
    <main>
      <ProjectHeroTemplateTwo
        title="Poster Design"
        year="2019-present"
      />

      <ProjectBodyTemplateTwo
        title="Poster Design"
        year="2019-present"
        description="A short project statement describing the work, its context and the ideas behind it."
        disciplines={[
          "Art Direction",
          "Photography",
          "Object Design",
        ]}
        collaborators={[
          "Collaborator One",
          "Collaborator Two",
        ]}
        role="Creative Direction"
        media={[
          {
            type: "image",
            src: "/images/poster-design/p2.png",
            alt: "Project image 1",
          },
          {
            type: "image",
            src: "/images/poster-design/join.png",
            alt: "Project image 2",
          },
          {
            type: "image",
            src: "/images/poster-design/dat_oxo.png",
            alt: "Project image 3"
          },
          {
            type: "image",
            src: "/images/poster-design/pride.png",
            alt: "Project image 4",
          },
          {
            type: "image",
            src: "/images/poster-design/levijeans.jpg",
            alt: "Project image 5",
          },
          {
            type: "image",
            src: "/images/poster-design/bonist.png",
            alt: "Project image 6",
          },
          {
            type: "image",
            src: "/images/poster-design/eyetest.png",
            alt: "Project image 7",
          },
          {
            type: "image",
            src: "/images/poster-design/muller.png",
            alt: "Project image 8",
          },
          {
            type: "image",
            src: "/images/poster-design/bony.png",
            alt: "Project image 9",
          },
          {
            type: "image",
            src: "/images/poster-design/smm.png",
            alt: "Project image 10",
          },
        ]}
      />
    </main>
  );
}