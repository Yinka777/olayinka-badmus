"use client";

import Image from "next/image";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import styles from "./ProjectMuseumGallery.module.css";

export type MuseumFrame =
  | "thin"
  | "mat"
  | "double"
  | "ornate"
  | "baroque";

export type MuseumSize =
  | "small"
  | "medium"
  | "large";

export type MuseumGalleryItem = {
  src: string;
  alt: string;

  frame?: MuseumFrame;
  size?: MuseumSize;

  aspectRatio?: string;
};

type Props = {
  images: MuseumGalleryItem[];
};

export function ProjectMuseumGallery({
  images,
}: Props) {
  const [
    expandedIndex,
    setExpandedIndex,
  ] = useState<number | null>(
    null,
  );

  const expandedImage =
    expandedIndex !== null
      ? images[expandedIndex]
      : null;

  const showPrevious =
    useCallback(() => {
      setExpandedIndex(
        (current) => {
          if (current === null) {
            return null;
          }

          return (
            current -
            1 +
            images.length
          ) % images.length;
        },
      );
    }, [images.length]);

  const showNext =
    useCallback(() => {
      setExpandedIndex(
        (current) => {
          if (current === null) {
            return null;
          }

          return (
            current + 1
          ) % images.length;
        },
      );
    }, [images.length]);

  useEffect(() => {
    if (
      expandedIndex === null
    ) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape"
      ) {
        setExpandedIndex(null);
        return;
      }

      if (
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        showPrevious();
      }

      if (
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        showNext();
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
  }, [
    expandedIndex,
    showPrevious,
    showNext,
  ]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section
        className={styles.gallery}
        aria-label="Photography gallery"
      >
        {images.map(
          (image, index) => {
            const frame =
              image.frame ??
              "thin";

            const size =
              image.size ??
              "medium";

            return (
              <figure
                key={`${image.src}-${index}`}
                className={`
                  ${styles.galleryItem}
                  ${styles[`size_${size}`]}
                `}
              >
                <button
                  type="button"
                  className={
                    styles.frameButton
                  }
                  onClick={() => {
                    setExpandedIndex(
                      index,
                    );
                  }}
                  aria-label={`Enlarge ${image.alt}`}
                >
                  <div
                    className={`
                      ${styles.frame}
                      ${styles[`frame_${frame}`]}
                    `}
                  >
                    <div
                      className={
                        styles.imageArea
                      }
                      style={{
                        aspectRatio:
                          image.aspectRatio ??
                          "4 / 5",
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="
                          (max-width: 700px) 65vw,
                          (max-width: 1100px) 40vw,
                          30vw
                        "
                        className={
                          styles.image
                        }
                      />
                    </div>
                  </div>
                </button>
              </figure>
            );
          },
        )}
      </section>

      {expandedImage && (
        <div
          className={
            styles.lightbox
          }
          role="dialog"
          aria-modal="true"
          aria-label={
            expandedImage.alt
          }
          onClick={() => {
            setExpandedIndex(
              null,
            );
          }}
        >
          <button
            type="button"
            className={
              styles.closeButton
            }
            onClick={(event) => {
              event.stopPropagation();

              setExpandedIndex(
                null,
              );
            }}
            aria-label="Close image"
          >
            Close
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`
                  ${styles.navButton}
                  ${styles.previousButton}
                `}
                onClick={(
                  event,
                ) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous image"
              >
                ←
              </button>

              <button
                type="button"
                className={`
                  ${styles.navButton}
                  ${styles.nextButton}
                `}
                onClick={(
                  event,
                ) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <div
            className={
              styles.expandedImage
            }
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Image
              src={
                expandedImage.src
              }
              alt={
                expandedImage.alt
              }
              fill
              sizes="95vw"
              className={
                styles.expandedMedia
              }
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}