"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ProjectBodyTemplateOne.module.css";

type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};

type SecondaryImageSlide = {
  type: "image";

  src: string;
  alt: string;

  caption?: string;
  objectPosition?: string;

  display?: "contain" | "cover" | "scroll";
};

type SecondaryTextSlide = {
  type: "text";

  title?: string;

  /*
   * A string preserves deliberate
   * line breaks for poetry.
   *
   * An array renders as paragraphs
   * for essays/articles.
   */
  content: string | string[];

  caption?: string;

  variant?:
    | "excerpt"
    | "poem"
    | "article";
};

export type SecondarySlide =
  | SecondaryImageSlide
  | SecondaryTextSlide;

export type ProjectItem = {
  thumbnail: ProjectImage;
  caption?: string;
  bodyText: string;
  secondarySlides: SecondarySlide[];
};

type ProjectBodyTemplateOneProps = {
  title: string;
  year: string;
  description: string;
  disciplines: string[];
  collaborators?: string[];

  bodyText: string;

  items: ProjectItem[];
};

export function ProjectBodyTemplateOne({
  title,
  year,
  description,
  disciplines,
  collaborators = [],
  bodyText,
  items = [],
}: ProjectBodyTemplateOneProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [secondaryIndex, setSecondaryIndex] = useState(0);

  const selectedItem = items[selectedItemIndex];
  const secondarySlides = selectedItem.secondarySlides;
  const secondarySlide = secondarySlides[secondaryIndex];

  const [
    expandedSecondaryImage,
    setExpandedSecondaryImage,
  ] = useState<SecondaryImageSlide | null>(
    null,
  );

  function selectItem(index: number) {
    setSelectedItemIndex(index);
    setSecondaryIndex(0);
  }

  useEffect(() => {
    if (!expandedSecondaryImage) return;

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        setExpandedSecondaryImage(null);
      }
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [expandedSecondaryImage]);

  function previousSecondarySlide() {
    if (secondarySlides.length < 2) return;

    setSecondaryIndex((current) => {
      return (
        current -
        1 +
        secondarySlides.length
      ) % secondarySlides.length;
    });
  }

  function nextSecondarySlide() {
    if (secondarySlides.length < 2) return;

    setSecondaryIndex((current) => {
      return (
        current + 1
      ) % secondarySlides.length;
    });
  }

  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  function scrollThumbnails(direction: "left" | "right") {
    const strip = thumbnailStripRef.current;

    if (!strip) return;

    const amount = strip.clientWidth * 0.75;

    strip.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        {/* LEFT */}
        <aside className={styles.leftColumn}>
          <div className={styles.identity}>
            <div className={styles.heading}>
              <h2>{title}</h2>
              <span>{year}</span>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.metaGroup}>
              <div>
                <span className={styles.metaLabel}>Disciplines</span>
                <p>{disciplines.join(", ")}</p>
              </div>

              {collaborators.length > 0 && (
                <div>
                  <span className={styles.metaLabel}>Collaborators</span>
                  <p>{collaborators.join(", ")}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.thumbnailArea}>
            <div className={styles.thumbnailHeader}>
                <span className={styles.thumbnailLabel}>Explore</span>

                <div className={styles.thumbnailControls}>
                <button
                    type="button"
                    className={styles.thumbnailArrow}
                    onClick={() => scrollThumbnails("left")}
                    aria-label="Show previous project sections"
                >
                    ←
                </button>

                <button
                    type="button"
                    className={styles.thumbnailArrow}
                    onClick={() => scrollThumbnails("right")}
                    aria-label="Show more project sections"
                >
                    →
                </button>
                </div>
            </div>

            <div
                ref={thumbnailStripRef}
                className={styles.thumbnailStrip}
            >
                {items.map((item, index) => (
                <button
                    type="button"
                    key={`${item.thumbnail.src}-${index}`}
                    className={`${styles.thumbnailButton} ${
                    index === selectedItemIndex
                        ? styles.thumbnailButtonActive
                        : ""
                    }`}
                    onClick={() => selectItem(index)}
                    aria-label={`Show ${item.caption ?? `section ${index + 1}`}`}
                >
                    <span className={styles.thumbnailMedia}>
                    <Image
                        src={item.thumbnail.src}
                        alt=""
                        fill
                        sizes="120px"
                        className={styles.thumbnailImage}
                    />
                    </span>
                </button>
                ))}
            </div>

            <div className={styles.selectedInfo}>
                <div className={styles.selectedCaption}>
                <span className={styles.selectedCount}>
                    {String(selectedItemIndex + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                </span>

                <p>
                    {selectedItem.caption ??
                    selectedItem.thumbnail.caption}
                </p>
                </div>

                <p className={styles.selectedBody}>
                {selectedItem.bodyText}
                </p>
            </div>
          </div>
        </aside>

        {/* RIGHT */}
        <div className={styles.rightColumn}>
          <article className={styles.textPanel}>
            <p>{bodyText}</p>
          </article>

          {secondarySlides.length > 0 && (
            <figure
              className={styles.secondaryMedia}
            >
              <div
                className={
                  styles.secondaryContent
                }
              >
                {secondarySlide.type ===
                "image" ? (
                  secondarySlide.display === "scroll" ? (
                    <button
                      type="button"
                      className={styles.secondaryScrollExpand}
                      onClick={() =>
                        setExpandedSecondaryImage(
                          secondarySlide
                        )
                      }
                      aria-label={`Enlarge ${secondarySlide.alt}`}
                    >
                      <div
                        className={
                          styles.secondaryScrollViewport
                        }
                      >
                        <Image
                          src={secondarySlide.src}
                          alt={secondarySlide.alt}
                          width={1600}
                          height={2200}
                          sizes="60vw"
                          className={
                            styles.secondaryScrollImage
                          }
                        />
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.secondaryExpand}
                      onClick={() =>
                        setExpandedSecondaryImage(
                          secondarySlide
                        )
                      }
                      aria-label={`Enlarge ${secondarySlide.alt}`}
                    >
                      <Image
                        src={secondarySlide.src}
                        alt={secondarySlide.alt}
                        fill
                        sizes="60vw"
                        className={
                          secondarySlide.display === "cover"
                            ? styles.secondaryImageCover
                            : styles.secondaryImageContain
                        }
                        style={{
                          objectPosition:
                            secondarySlide.objectPosition ??
                            "center",
                        }}
                      />
                    </button>
                  )
                ) : (
                  <div
                    className={`
                      ${styles.secondaryText}
                      ${
                        styles[
                          `secondaryText_${secondarySlide.variant ?? "excerpt"}`
                        ]
                      }
                    `}
                  >
                    {secondarySlide.title && (
                      <h3>
                        {
                          secondarySlide.title
                        }
                      </h3>
                    )}

                    {Array.isArray(
                      secondarySlide.content,
                    ) ? (
                      secondarySlide.content.map(
                        (
                          paragraph,
                          index,
                        ) => (
                          <p key={index}>
                            {paragraph}
                          </p>
                        ),
                      )
                    ) : (
                      <p
                        className={
                          styles.textWithBreaks
                        }
                      >
                        {
                          secondarySlide.content
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>

              <figcaption
                className={
                  styles.secondaryCaption
                }
              >
                <span>
                  {String(
                    secondaryIndex + 1,
                  ).padStart(2, "0")}
                  {" / "}
                  {String(
                    secondarySlides.length,
                  ).padStart(2, "0")}
                </span>

                {secondarySlide.caption && (
                  <span>
                    {
                      secondarySlide.caption
                    }
                  </span>
                )}

                {secondarySlides.length >
                  1 && (
                  <div
                    className={
                      styles.secondaryControls
                    }
                  >
                    <button
                      type="button"
                      className={
                        styles.secondaryArrow
                      }
                      onClick={
                        previousSecondarySlide
                      }
                      aria-label="Show previous slide"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className={
                        styles.secondaryArrow
                      }
                      onClick={
                        nextSecondarySlide
                      }
                      aria-label="Show next slide"
                    >
                      →
                    </button>
                  </div>
                )}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}