"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import type { PanInfo } from "motion/react";
import { useRef, useState } from "react";
import styles from "./ProjectBodyTemplateTwo.module.css";

const MORPH_END = 0.65;
const RING_RADIUS = 650;

const DRAG_SENSITIVITY = 0.18;

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

type ProjectBodyTemplateTwoProps = {
  title: string;
  year: string;
  description: string;
  disciplines: string[];
  collaborators?: string[];
  role?: string;
  media: MediaItem[];
};

type CarouselItemProps = {
  item: MediaItem;
  index: number;
  total: number;
  activeIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isCarouselReady: boolean;
  onSelect: (index: number) => void;
  onOpen: (index: number) => void;
  didPan: React.RefObject<boolean>;
};

function CarouselItem({
  item,
  index,
  total,
  activeIndex,
  scrollYProgress,
  isCarouselReady,
  onSelect,
  onOpen,
  didPan,
}: CarouselItemProps) {
  const angleStep = 360 / total;

  const flatX =
    (index - (total - 1) / 2) * 17;

  const ringAngle = index * angleStep;

  const x = useTransform(
    scrollYProgress,
    [0, MORPH_END, 1],
    [`${flatX}vw`, "0vw", "0vw"],
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, MORPH_END, 1],
    [0, ringAngle, ringAngle],
  );

  const depth = useTransform(
    scrollYProgress,
    [0, MORPH_END, 1],
    [0, RING_RADIUS, RING_RADIUS],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, MORPH_END, 1],
    [1, 0.92, 0.92],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, MORPH_END, 1],
    [1, 1, 1],
  );

  const transform = useMotionTemplate`
    translateX(${x})
    rotateY(${rotateY}deg)
    translateZ(${depth}px)
    scale(${scale})
  `;

  return (
    <motion.figure
      className={styles.carouselItem}
      style={{
        transform,
        opacity,
      }}
    >
      <button
        type="button"
        className={styles.carouselItemButton}
        onClick={() => {
          if (!isCarouselReady) return;
          if (didPan.current) {
            didPan.current = false;
            return;
          }

          if (index === activeIndex) {
            onOpen(index);
          } else {
            onSelect(index);
          }
        }}
        aria-label={
            index === activeIndex
              ? `Enlarge media ${index + 1}`
              : `Show media ${index + 1}`
        }
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt ?? ""}
            fill
            sizes="25vw"
            className={styles.media}
          />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            className={styles.media}
          />
        )}
      </button>
    </motion.figure>
  );
}

export function ProjectBodyTemplateTwo({
  title,
  year,
  description,
  disciplines,
  collaborators = [],
  role,
  media,
}: ProjectBodyTemplateTwoProps) {
  const carouselRef = useRef<HTMLElement>(null);

  const [isCarouselReady, setIsCarouselReady] =
    useState(false);

  const [expandedIndex, setExpandedIndex] =
    useState<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationStep, setRotationStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start 80%", "end 20%"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const ready = latest >= MORPH_END;

      setIsCarouselReady((current) => {
        return current === ready ? current : ready;
      });

      if (!ready) {
        setActiveIndex(0);
        setRotationStep(0);
        dragRotation.set(0);
      }
    },
  );

  const didPan = useRef(false);

  const dragRotation = useMotionValue(0);
  const dragStartRotation = useRef(0);

  const angleStep = 360 / media.length;

  function selectImage(targetIndex: number) {
    if (targetIndex === activeIndex) return;

    let difference = targetIndex - activeIndex;

    // Find shortest path around the ring
    if (difference > media.length / 2) {
        difference -= media.length;
    }

    if (difference < -media.length / 2) {
        difference += media.length;
    }

    moveToStep(rotationStep + difference,);
  }

  function moveToStep(step: number) {
    if (media.length === 0) return;
    const nextIndex =
        ((step % media.length) + media.length) %
        media.length;

    setRotationStep(step);
    setActiveIndex(nextIndex);

    animate(
        dragRotation,
        -step * angleStep,
        {
        type: "spring",
        stiffness: 180,
        damping: 25,
        },
    );
  }

  function handlePan(
    _: PointerEvent,
    info: PanInfo,
  ) {
    if (!isCarouselReady) return;

    if (Math.abs(info.offset.x) > 6) {
        didPan.current = true;
    }

    dragRotation.set(
        dragStartRotation.current + 
          info.offset.x * DRAG_SENSITIVITY,
    );
  }

  function handlePanStart() {
    if (!isCarouselReady) return;

    didPan.current = false;

    dragStartRotation.current =
        -rotationStep * angleStep;
  }

  function handlePanEnd(
    _: PointerEvent,
    info: PanInfo,
    ) {
        if (!isCarouselReady) return;
        if (media.length === 0) return;

        const dragDegrees =
            info.offset.x * DRAG_SENSITIVITY;

        const movedSteps = Math.round(
            -dragDegrees / angleStep,
        );

        const nextRotationStep =
            rotationStep + movedSteps;

        moveToStep(nextRotationStep);
  }

  function showNext() {
    moveToStep(rotationStep + 1);
  }

  function showPrevious() {
    moveToStep(rotationStep - 1);
  }


  return (
    <section className={styles.body}>
      <section
        ref={carouselRef}
        className={styles.carouselSection}
      >
        <div className={styles.carouselStage}>
          <motion.div 
            className={styles.carouselScene}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            <motion.div
              className={styles.carouselRing}
              style={{
                rotateY: dragRotation,
              }}
            >
              {media.map((item, index) => (
                <CarouselItem
                  key={`${item.src}-${index}`}
                  item={item}
                  index={index}
                  total={media.length}
                  activeIndex={activeIndex}
                  scrollYProgress={
                    scrollYProgress
                  }
                  isCarouselReady={
                    isCarouselReady
                  }
                  onSelect={selectImage}
                  onOpen={setExpandedIndex}
                  didPan={didPan}
                />
              ))}
            </motion.div>
          </motion.div>

          {isCarouselReady && media.length > 1 && (
            <div
              className={
                styles.carouselControls
              }
            >
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
              >
                ←
              </button>

              <span>
                {String(
                  activeIndex + 1,
                ).padStart(2, "0")}
                {" / "}
                {String(
                  media.length,
                ).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.info}>
        <div className={styles.meta}>
          <div>
            <p className={styles.label}>
              Title / Year
            </p>

            <p>
              {title}, {year}
            </p>
          </div>

          <div>
            <p className={styles.label}>
              Disciplines
            </p>

            <p>
              {disciplines.join(", ")}
            </p>
          </div>

          {collaborators.length > 0 && (
            <div>
              <p className={styles.label}>
                Collaborators
              </p>

              <p>
                {collaborators.join(", ")}
              </p>
            </div>
          )}

          {role && (
            <div>
              <p className={styles.label}>
                Role
              </p>

              <p>{role}</p>
            </div>
          )}
        </div>

        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </section>
    </section>
  );
}