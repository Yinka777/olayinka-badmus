import { ProjectHeroTemplateOne } from "@/features/projects/components/ProjectHeroTemplateOne";
import { ProjectBodyTemplateOne, type ProjectItem } from "@/features/projects/components/ProjectBodyTemplateOne";

export default function SobremesaPage() {
  const sobremesaItems = [
    {
      thumbnail: {
        src: "/images/sobremesa/essays-thumb.jpeg",
        alt: "Essays",
      },

      caption: "Essays",

      bodyText:
        "A collection of essays surrounding theory and experience.",

      secondarySlides: [
        {
          type: "text",
          variant: "article",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia orci arcu, non iaculis magna lacinia sit amet. Praesent at tristique mi, et faucibus nisi. In euismod urna eros, id scelerisque libero lobortis non. Ut sed gravida odio, at vehicula justo. Quisque convallis, metus vitae malesuada maximus, tellus lorem tristique turpis, in hendrerit nunc risus sed tortor. Pellentesque finibus nec mauris eu interdum. Duis interdum laoreet auctor. Quisque efficitur interdum tincidunt. Ut odio nunc, lobortis vitae feugiat gravida, sagittis id enim.",
          caption: "A Post-hedonist Manifesto by YEN",
        },
        {
          type: "image",
          src: "/images/sobremesa/manifesto-spread.png",
          alt: "Post-hedonist manifesto spread",
          caption: "Editorial spread",
        },
        {
          type: "text",
          variant: "excerpt",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia orci arcu, non iaculis magna lacinia sit amet. Praesent at tristique mi, et faucibus nisi. In euismod urna eros, id scelerisque libero lobortis non. Ut sed gravida odio, at vehicula justo. Quisque convallis, metus vitae malesuada maximus, tellus lorem tristique turpis, in hendrerit nunc risus sed tortor. Pellentesque finibus nec mauris eu interdum. Duis interdum laoreet auctor. Quisque efficitur interdum tincidunt. Ut odio nunc, lobortis vitae feugiat gravida, sagittis id enim.",
          caption: "A Post-hedonist Manifesto Expansion of Beyond Pleasure to Purpose",
        },
        {
          type: "image",
          src: "/images/sobremesa/expansion-spread.png",
          alt: "Expansion of Beyond Pleasure to Purpose spread",
          caption: "Editorial spread",
        },
        {
          type: "text",
          variant: "excerpt",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia orci arcu, non iaculis magna lacinia sit amet. Praesent at tristique mi, et faucibus nisi. In euismod urna eros, id scelerisque libero lobortis non. Ut sed gravida odio, at vehicula justo. Quisque convallis, metus vitae malesuada maximus, tellus lorem tristique turpis, in hendrerit nunc risus sed tortor. Pellentesque finibus nec mauris eu interdum. Duis interdum laoreet auctor. Quisque efficitur interdum tincidunt. Ut odio nunc, lobortis vitae feugiat gravida, sagittis id enim.",
          caption: "Who Owns The Truth",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/interview-thumb.jpeg",
        alt: "Interviews",
      },

      caption: "Interviews",

      bodyText:
        "Documented conversations with friends, artists, & creators of interest.",

      secondarySlides: [
        {
          type: "image",
          src: "/images/sobremesa/modern-rep-spread.png",
          alt: "Modern Republic",
          caption: "Conversation with Modern Republic",
        },
        {
          type: "image",
          src: "/images/sobremesa/josue-spread.png",
          alt: "Josue Bessiake",
          caption: "Conversation with Josue Bessiake",
        },
        {
          type: "image",
          src: "/images/sobremesa/sidewalk-spread.png",
          alt: "Sidewalk",
          caption: "Conversation with Sidewalk",
        },
        {
          type: "image",
          src: "/images/sobremesa/spirit-artist-spread.png",
          alt: "Spirit Artist Spread",
          caption: "Interview with Kareem for Sobremesa's Spirit Artist segment",
        },
        {
          type: "image",
          src: "/images/sobremesa/interview-01.jpg",
          alt: "Almost Famous",
          caption: "Conversation with Almost Famous",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/opinions-thumb.png",
        alt: "Opinions",
      },

      caption: "Opinions",

      bodyText:
        "",

      secondarySlides: [
        {
          type: "image",
          src: "/images/sobremesa/exercise-spread.png",
          alt: "Abstract art spread",
          caption: "Exercise for Digesting Abstract Art Spread",
        },
        {
          type: "text",
          variant: "excerpt",
          content: "It’s not just that artists are genre-agnostic, it’s that the audience increasingly is too. Many listeners now organize their libraries by vibe, mood, or aesthetic rather than by genre label. \“Sad girl anthems,\” \“horror movie club music,\” or \“forest-core beats\” are the new descriptors. Playlists like shaking ass in the meadows, lofi chill, rage, or ecstatic avant-garde are often more meaningful than \“alternative\” or \“hip-hop.\” So if genre walls are eroding, why do they still matter?",
          caption: "Why Do We Still Use Genres to Critique Music? Excerpt",
        },
        {
          type: "image",
          src: "/images/sobremesa/genres-spread.png",
          alt: "Genres spread",
          caption: "Why Do We Still Use Genres to Critique Music? Spread",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/crossword-thumb.png",
        alt: "Crosswords",
      },

      caption: "Crosswords",

      bodyText:
        ".",

      secondarySlides: [
        {
          type: "image",
          src: "/images/sobremesa/crossword-1.png",
          alt: "Sobremesa crossword",
          caption: "Crossword from Sobremesa #1",
          display: "scroll",
        },
        {
          type: "image",
          src: "/images/sobremesa/crossword-2.png",
          alt: "Sobremesa crossword",
          caption: "Crossword from Sobremesa #2",
          display: "scroll",
        },
        {
          type: "image",
          src: "/images/sobremesa/crossword-01.jpg",
          alt: "Sobremesa crossword",
          caption: "Crossword from Sobremesa #3",
          display: "scroll",
        },
      ],
    },

    {
      thumbnail: {
        src: "/images/sobremesa/blogs-thumb.jpg",
        alt: "Sobremesa blogs",
      },

      caption: "Blogs",

      bodyText:
        "Bloooogs",

      secondarySlides: [
        {
          type: "text",
          variant: "excerpt",
          content: "Inspired by Dazed magazine's 2025 gift guide, I decided to curate my own list of the very specific, very dramatic personalities that coloured our year and help you shop for them without losing your mind or your budget. ... Read More",
          caption: "Christmas archetype gift guide",
        },
        {
          type: "text",
          variant: "excerpt",
          content: "There is no doubt movies are great for setting the mood but some films do more and create this mood. The defintion for the word aphrodisiac is \"an agent that arouses or is held to arouse sexual desire\", and with enough imagination movies fit this description. Here are 5 (pseudo-)erotic movies to pick from and enjoy this Valentine's Day... Read More",
          caption: "MOVIES ARE AN APHRODISIAC!",
        },
      ],
    },
  ] satisfies ProjectItem[];

  return (
    <main>
      <ProjectHeroTemplateOne
        title="Sobremesa"
        year="2024–Present"
        description="A print magazine focusing on the conversations, images, rituals and ideas that emerge from YEN Studios and their surrounding environment."
        disciplines={[
          "Editorial Design",
          "Art Direction",
          "Photography",
          "Writing",
        ]}
        role="Co-founder and Creative Director"
        collaborators={[
          "Ejiro Ogagan",
          "Nate Ogunbiyi",
          "YEN Studios",
        ]}
        callout="Sobremesa means 'upon the table', the tradition of relaxing at the table after a meal."
        heroImage={{
          src: "/images/sobremesa/hero.png",
          alt: "Sobremesa magazine and editorial project",
          objectPosition: "center",
          caption: "Sobremesa, 2024–Present",
        }}
        slides={[
          {
            src: "/images/sobremesa/sob-iss1.jpeg",
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
        year="2023-Present"
        description="An ongoing editorial and cultural project."
        disciplines={[
          "Editorial Design",
          "Art Direction",
          "Photography",
          "Writing",
        ]}
        collaborators={[
          "Ejiro Ogagan",
          "Nate Ogunbiyi",
          "YEN Studios"
        ]}
        bodyText="Sobremesa operates as a space for conversations that continue beyond the immediate subject. Through interviews, essays, reviews, photography, and art, the publication creates an environment where ideas can overlap, contradict one another and continue evolving."
        items={sobremesaItems}
      />
    </main>
  );
}