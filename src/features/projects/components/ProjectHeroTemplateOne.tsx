"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import styles from "./ProjectHeroTemplateOne.module.css";

type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};

type ProjectHeroTemplateOneProps = {
  title: string;
  year: string;
  description: string;
  disciplines: string[];
  heroImage: ProjectImage;
  callout?: string;
  role?: string;
  collaborators?: string[];
  slides?: ProjectImage[];
};

type MetadataItemProps = {
  label: string;
  children: React.ReactNode;
};


function MetadataItem({ label, children }: MetadataItemProps) {
  return (
    <div className={styles.metadataItem}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function ProjectHeroTemplateOne({
  title,
  year,
  description,
  disciplines,
  heroImage,
  callout,
  role,
  collaborators = [],
  slides = [],
}: ProjectHeroTemplateOneProps) {
  const sequenceRef = useRef<HTMLElement>(null);

  const galleryImages = [
    heroImage,
    ...slides.filter((slide) => slide.src !== heroImage.src),
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowReady, setIsSlideshowReady] = useState(false);
  const [isIntroHidden, setIsIntroHidden] = useState(false);

  const introHiddenRef = useRef(false);

  const activeImage = galleryImages[currentSlide];

  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const HERO_START = 0;
  const DETAILS_FADE_START = 0.3;
  const DETAILS_FADE_END = 0.59;
  const TRANSITION_END = 0.71;
  const HERO_END = 1;

  /*
   * Image transition:
   * L-shaped crop → complete rectangle.
   */
  const clipLeft = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    [41, 0],
    { clamp: true },
  );

  const clipNotchY = useTransform(
    scrollYProgress,
    [0, TRANSITION_END],
    [71, 0],
    { clamp: true },
  );

  const imageClipPath = useMotionTemplate`
    polygon(
      ${clipLeft}% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% ${clipNotchY}%,
      ${clipLeft}% ${clipNotchY}%
    )
  `;

  /*
   * Initially, the bottom 8% is reserved for the callout.
   * The image expands into that space during the transition.
   */
  const imageBottom = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    ["8%", "0%"],
  );

  const imageScale = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    [1.025, 1],
  );

  /*
   * Description and project metadata disappear before
   * the transition reaches its final state.
   */
  const detailsOpacity = useTransform(
    scrollYProgress,
    [
      HERO_START, 
      DETAILS_FADE_START, 
      DETAILS_FADE_END,
      HERO_END
    ],
    [1, 1, 0, 0],
    { clamp: true },
  );

  const detailsY = useTransform(
    scrollYProgress,
    [
      HERO_START, 
      DETAILS_FADE_START, 
      DETAILS_FADE_END,
      HERO_END
    ],
    ["0rem", "0rem", "-1.5rem", "-1.5rem"],
    { clamp: true },
  );

  /*
   * Title and year remain, becoming a small vertical marker.
   */
  const titleRotate = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    [0, -90],
  );

  const titleScale = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    [1, 0.5],
  );

  const titleX = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    ["0rem", "-1rem"],
  );

  const titleY = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    ["0svh", "74svh"],
  );

  /*
   * The callout begins below the cropped image
   * and finishes as a strip at the top.
   */
  const calloutTop = useTransform(
    scrollYProgress,
    [HERO_START, TRANSITION_END],
    ["88%", "0%"],
  );

  /*
   * Scroll controls only the transition.
   * Once completed, clicking controls the slideshow.
   */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    /*
     * Once the transition completes, lock the introductory
     * content in its hidden state.
     */
    if (latest >= TRANSITION_END && !introHiddenRef.current) {
      introHiddenRef.current = true;
      setIsIntroHidden(true);
      setIsSlideshowReady(true);
    }

    /*
     * Only restore the introduction when the visitor returns
     * almost completely to the beginning.
     */
    if (latest <= 0.95 && introHiddenRef.current) {
      introHiddenRef.current = false;
      setIsIntroHidden(false);
      setIsSlideshowReady(false);
      setCurrentSlide(0);
    }
  });

  function showNextSlide() {
    if (!isSlideshowReady || galleryImages.length < 2) {
      return;
    }

    setCurrentSlide((previous) => {
      return (previous + 1) % galleryImages.length;
    });
  }

  const FULL_IMAGE_CLIP =
  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0% 0%)";

  return (
    <section
      ref={sequenceRef}
      className={styles.sequence}
      aria-label={`${title} project introduction`}
    >
      <div className={styles.stage}>
        <motion.figure
          className={styles.imageFrame}
          style={{
            clipPath: isSlideshowReady
              ? FULL_IMAGE_CLIP
              : imageClipPath,

            bottom: isSlideshowReady
              ? "0%"
              : imageBottom,

            scale: isSlideshowReady
              ? 1
              : imageScale,
          }}
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={activeImage.src}
              className={styles.activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                preload={currentSlide === 0}
                sizes="90vw"
                className={styles.image}
                style={{
                  objectPosition:
                    activeImage.objectPosition ?? "center",
                }}
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            className={styles.slideAdvance}
            onClick={showNextSlide}
            disabled={!isSlideshowReady}
            aria-label={
              isSlideshowReady
                ? "Show next Sobremesa image"
                : "Scroll to reveal the slideshow"
            }
          />
        </motion.figure>

        <motion.div
          className={styles.primaryIdentity}
          style={{
            rotate: titleRotate,
            scale: titleScale,
            x: titleX,
            y: titleY,
          }}
        >
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.year}>{year}</p>
        </motion.div>

        <motion.div
          className={`${styles.identityDetails} ${
            isIntroHidden ? styles.identityDetailsHidden : ""
          }`}
          style={{
            opacity: detailsOpacity,
            y: detailsY,
          }}
          aria-hidden={isIntroHidden}
        >
          <p className={styles.description}>{description}</p>

          <dl className={styles.metadata}>
            <MetadataItem label="Disciplines">
              <ul className={styles.inlineList}>
                {disciplines.map((discipline) => (
                  <li key={discipline}>{discipline}</li>
                ))}
              </ul>
            </MetadataItem>

            {role ? (
              <MetadataItem label="Role">{role}</MetadataItem>
            ) : null}

            {collaborators.length > 0 ? (
              <MetadataItem label="Collaborators">
                <ul className={styles.inlineList}>
                  {collaborators.map((collaborator) => (
                    <li key={collaborator}>{collaborator}</li>
                  ))}
                </ul>
              </MetadataItem>
            ) : null}
          </dl>
        </motion.div>

        {callout ? (
          <motion.aside
            className={styles.callout}
            style={{
              top: calloutTop,
            }}
          >
            <p className={styles.calloutLabel}>Project note</p>
            <p className={styles.calloutText}>{callout}</p>
          </motion.aside>
        ) : null}

        <motion.div
          className={styles.slideshowStatus}
          animate={{
            opacity: isSlideshowReady ? 1 : 0,
          }}
          aria-hidden="true"
        >
          <span>
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(galleryImages.length).padStart(2, "0")}
          </span>

          {galleryImages.length > 1 ? <span>Click for next</span> : null}
        </motion.div>
      </div>
    </section>
  );
}