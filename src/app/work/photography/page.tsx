import { ProjectHeroTemplateTwo } from "@/features/projects/components/ProjectHeroTemplateTwo";
import { ProjectBodyTemplateTwo } from "@/features/projects/components/ProjectBodyTemplateTwo";

import type {
  MuseumFrame,
  MuseumGalleryItem,
  MuseumSize,
} from "@/features/projects/components/ProjectMuseumGallery";

const PHOTO_COUNT = 18;

const photos = Array.from(
  { length: PHOTO_COUNT },
  (_, index) => {
    const id = index + 1;

    return {
      id,
      src: `/images/photography/${id}.webp`,
      alt: `Photography image ${id}`,
    };
  },
);

const CAROUSEL_IDS = [
  1,
  3,
  6,
  9,
  12,
  15,
  18,
];

const carouselMedia = CAROUSEL_IDS.map(
  (id) => {
    const photo = photos[id - 1];

    return {
      type: "image" as const,
      src: photo.src,
      alt: photo.alt,
    };
  },
);

const FRAME_PATTERN: MuseumFrame[] = [
  "thin",
  "mat",
  "thin",
  "double",
  "thin",
  "ornate",
  "mat",
  "double",
  "thin",
  "mat",
  "thin",
];

const SIZE_PATTERN: MuseumSize[] = [
  "medium",
  "small",
  "large",
  "small",
  "medium",
  "medium",
  "large",
  "small",
  "small",
  "large",
  "medium",
];

const RATIO_PATTERN = [
  "4 / 5",
  "3 / 2",
  "4 / 5",
  "1 / 1",
  "2 / 3",
] as const;

const GALLERY_OVERRIDES: Partial<
  Record<
    number,
    Partial<
      Pick<
        MuseumGalleryItem,
        | "frame"
        | "size"
        | "aspectRatio"
      >
    >
  >
> = {
  1: {
    frame: "baroque",
    size: "large",
    aspectRatio: "3 / 2",
  },

  6: {
    size: "small",
    aspectRatio: "2 / 3",
  },

  11: {
    size: "medium",
  },

  13: {
    size: "large",
    frame: "baroque",
  },

  15: {
    frame: "double",
    size: "large",
    aspectRatio: "3 / 2",
  },
};

const gallery: MuseumGalleryItem[] =
  photos.map((photo, index) => {
    const override =
      GALLERY_OVERRIDES[photo.id];

    return {
      src: photo.src,
      alt: photo.alt,

      frame:
        override?.frame ??
        FRAME_PATTERN[
          index % FRAME_PATTERN.length
        ],

      size:
        override?.size ??
        SIZE_PATTERN[
          index % SIZE_PATTERN.length
        ],

      aspectRatio:
        override?.aspectRatio ??
        RATIO_PATTERN[
          index % RATIO_PATTERN.length
        ],
    };
  });

export default function PhotographyPage() {
  return (
    <main>
      <ProjectHeroTemplateTwo
        title="Photography"
        year="2019-present"
      />

      <ProjectBodyTemplateTwo
        title="Photography"
        year="2019-present"
        description="Some point & shoot from my POV. Film and Digital."
        disciplines={["Photography"]}
        collaborators={[]}
        role="Photographer & Editor"
        media={carouselMedia}
        gallery={gallery}
      />
    </main>
  );
}