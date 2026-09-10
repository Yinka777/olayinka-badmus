export type HomeSubproject = {
  title: string;
  href: string;

  image: {
    src: string;
    alt: string;
  };

  position: {
    x: number;
    y: number;
  };

  rotation?: number;
};

export type HomeProject = {
  title: string;
  href: string;

  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
    poster?: string;
  };

  shape: string;

  labelPosition: {
    left: string;
    top: string;
  };

  connectionOrigin: {
    x: number;
    y: number;
  };

  holdDuration?: number;

  subprojects: HomeSubproject[];
};

const SHAPES = {
  dart:
    "polygon(50% 60%, 94% 10%, 70% 84%, 8% 82%)",

  concave:
    "polygon(49% 3%, 88% 99%, 49% 53%, 18% 95%)",

  convex:
    "polygon(12% 16%, 82% 18%, 46% 82%, 15% 78%)",

  wedge:
    "polygon(6% 45%, 94% 10%, 70% 84%, 6% 82%)",
};

export const homeProjects: HomeProject[] = [
  {
    title: "Editorial Systems",
    href: "/work/sobremesa",

    media: {
      type: "image",
      src: "/images/home/editorial.jpg",
      alt: "Editorial work",
    },

    shape: SHAPES.dart,

    labelPosition: {
      left: "43%",
      top: "45%",
    },

    connectionOrigin: {
      x: 65,
      y: 66,
    },

    holdDuration: 2500,

    subprojects: [
      {
        title: "Sobremesa",
        href: "/work/sobremesa",

        image: {
          src: "/images/home/sobremesa-thumb.jpg",
          alt: "Sobremesa",
        },

        position: {
          x: -44,
          y: -27,
        },

        rotation: -6,
      },
      {
        title: "Poetry",
        href: "/work/poetry",

        image: {
          src: "/images/home/poetry-thumb.png",
          alt: "Poetry",
        },

        position: {
          x: 44,
          y: 3,
        },

        rotation: 4,
      },
    ]
  },

  {
    title: "Motion & Play",
    href: "/work/project-two",

    media: {
      type: "video",
      src: "/videos/home/motion.mp4",
    },

    shape: SHAPES.wedge,

    labelPosition: {
      left: "12%",
      top: "35%",
    },

    connectionOrigin: {
      x: 40,
      y: 45,
    },

    holdDuration: 2000,

    subprojects: [
      {
        title: "Furniture Design",
        href: "/work/furniture-design",

        image: {
          src: "/images/home/sobremesa-thumb.jpg",
          alt: "Furniture Design",
        },

        position: {
          x: -44,
          y: -12,
        },

        rotation: 2,
      },
      {
        title: "Paintings",
        href: "/work/paintings",

        image: {
          src: "/images/home/paintings-thumb.jpg",
          alt: "Paintings",
        },

        position: {
          x: 34,
          y: -27,
        },

        rotation: -3,
      },
      {
        title: "Products",
        href: "/work/products",

        image: {
          src: "/images/home/products-thumb.jpg",
          alt: "Products",
        },

        position: {
          x: 45,
          y: 50,
        },

        rotation: 4,
      },
    ]
  },

  {
    title: "Brand & Identity",
    href: "/work/brand-project",

    media: {
      type: "image",
      src: "/images/home/brand.jpg",
      alt: "Brand and identity work",
    },

    shape: SHAPES.concave,

    labelPosition: {
      left: "50%",
      top: "79%",
    },

    connectionOrigin: {
      x: 40,
      y: 45,
    },

    holdDuration: 2200,

    subprojects: [
      {
        title: "Poster Design",
        href: "/work/poster-design",

        image: {
          src: "/images/home/posters-thumb.png",
          alt: "Poster Design",
        },

        position: {
          x: 14,
          y: 48,
        },

        rotation: -1,
      },
      {
        title: "Photography",
        href: "/work/photography",

        image: {
          src: "/images/home/photography-thumb.webp",
          alt: "Photography",
        },

        position: {
          x: -27,
          y: 0,
        },

        rotation: 2,
      },
      {
        title: "Art Direction & Production Design",
        href: "/work/art-direction",

        image: {
          src: "/images/home/artdirection-thumb.jpg",
          alt: "Art Direction & Production Design",
        },

        position: {
          x: 14,
          y: -37,
        },

        rotation: 6,
      },
    ]
  },

  {
    title: "Spatial Experiences",
    href: "/work/spatial-project",

    media: {
      type: "image",
      src: "/images/home/spatial.jpg",
      alt: "Spatial design work",
    },

    shape: SHAPES.convex,

    labelPosition: {
      left: "70%",
      top: "75%",
    },

    connectionOrigin: {
      x: 40,
      y: 45,
    },

    holdDuration: 2800,

    subprojects: [
      {
        title: "Gallery Installations",
        href: "/work/galleries",

        image: {
          src: "/images/home/galleries-thumb.jpg",
          alt: "Gallery Installations",
        },

        position: {
          x: 0,
          y: -38,
        },

        rotation: 0,
      },
      {
        title: "Community Events",
        href: "/work/events",

        image: {
          src: "/images/home/events-thumb.jpg",
          alt: "Community Events",
        },

        position: {
          x: -34,
          y: -27,
        },

        rotation: -3,
      },
    ]
  },
];