"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ProjectBodyTemplateOne.module.css";

type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};

type ProjectItem = {
  thumbnail: ProjectImage;
  caption?: string;
  bodyText: string;
  secondaryImages: ProjectImage[];
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
  const secondaryImages = selectedItem.secondaryImages;
  const secondaryImage = secondaryImages[secondaryIndex];

  function selectItem(index: number) {
    setSelectedItemIndex(index);
    setSecondaryIndex(0);
  }

  function nextSecondaryImage() {
    if (secondaryImages.length < 2) return;

    setSecondaryIndex((current) => {
      return (current + 1) % secondaryImages.length;
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

          {secondaryImages.length > 0 && (
            <figure className={styles.secondaryMedia}>
              <button
                type="button"
                className={styles.secondaryAdvance}
                onClick={nextSecondaryImage}
                aria-label="Show next image"
              >
                <Image
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  fill
                  sizes="60vw"
                  className={styles.secondaryImage}
                  style={{
                    objectPosition:
                      secondaryImage.objectPosition ?? "center",
                  }}
                />
              </button>

              <figcaption className={styles.secondaryCaption}>
                <span>
                  {String(secondaryIndex + 1).padStart(2, "0")} /{" "}
                  {String(secondaryImages.length).padStart(2, "0")}
                </span>

                {secondaryImage.caption && (
                  <span>{secondaryImage.caption}</span>
                )}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}