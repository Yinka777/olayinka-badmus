"use client";

import { motion } from "motion/react";

import type {
  ExpandTransitionData,
} from "../PageTransitionProvider";

import styles from "../PageTransition.module.css";

export type ExpandPhase =
  | "expanding"
  | "covered"
  | "revealing";

type Props = {
  phase: ExpandPhase;

  data:
    | ExpandTransitionData
    | null;

  destination: string;

  onCovered: (
    href: string,
  ) => void;

  onComplete: () => void;
};

export function ExpandTransition({
  phase,
  data,
  destination,
  onCovered,
  onComplete,
}: Props) {
  if (!data) {
    return null;
  }

  /*
   * Use the clicked row as the location,
   * but don't use its actual dimensions.
   *
   * Otherwise a wide, short index row
   * would make the image begin as a
   * horizontal strip.
   */
  const startWidth = Math.min(
    140,
    Math.max(90, data.rect.width * 0.2),
  );

  const startHeight =
    startWidth * 1.25;

  const startLeft =
    data.rect.left +
    data.rect.width / 2 -
    startWidth / 2;

  const startTop =
    data.rect.top +
    data.rect.height / 2 -
    startHeight / 2;

  const isRevealing =
    phase === "revealing";

  return (
    <motion.div
      className={
        styles.expandTransition
      }
      initial={{
        left: startLeft,
        top: startTop,
        width: startWidth,
        height: startHeight,
        opacity: 1,
      }}
      animate={{
        left: 0,
        top: 0,

        width: "100vw",
        height: "100svh",

        opacity:
          isRevealing
            ? 0
            : 1,
      }}
      transition={{
        left: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },

        top: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },

        width: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },

        height: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },

        opacity: {
          duration:
            isRevealing
              ? 0.3
              : 0,
        },
      }}
      onAnimationComplete={() => {
        if (phase === "expanding") {
          onCovered(destination);
        }

        if (phase === "revealing") {
          onComplete();
        }
      }}
    >
      <img
        src={data.src}
        alt={data.alt ?? ""}
        className={
          styles.expandImage
        }
      />
    </motion.div>
  );
}