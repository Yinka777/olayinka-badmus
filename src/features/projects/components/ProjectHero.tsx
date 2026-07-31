import Image from "next/image";

type ProjectHeroProps = {
  title: string;
  eyebrow?: string;
  description: string;
  year: string;
  disciplines: string[];
  role?: string;
  collaborators?: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function ProjectHero({
  title,
  eyebrow,
  description,
  year,
  disciplines,
  role,
  collaborators = [],
  image,
}: ProjectHeroProps) {
  return (
    <header className="project-hero">
      <div className="project-hero__intro">
        <div className="project-hero__title-group">
          {eyebrow ? (
            <p className="project-hero__eyebrow">{eyebrow}</p>
          ) : null}

          <h1 className="project-hero__title">{title}</h1>
        </div>

        <div className="project-hero__summary">
          <p className="project-hero__description">{description}</p>

          <dl className="project-hero__metadata">
            <div>
              <dt>Year</dt>
              <dd>{year}</dd>
            </div>

            <div>
              <dt>Disciplines</dt>
              <dd>{disciplines.join(", ")}</dd>
            </div>

            {role ? (
              <div>
                <dt>Role</dt>
                <dd>{role}</dd>
              </div>
            ) : null}

            {collaborators.length > 0 ? (
              <div>
                <dt>Collaborators</dt>
                <dd>{collaborators.join(", ")}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>

      <figure className="project-hero__media">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          sizes="100vw"
        />
      </figure>
    </header>
  );
}