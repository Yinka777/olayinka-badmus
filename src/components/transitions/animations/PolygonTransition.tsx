"use client";

import { motion } from "motion/react";

import styles from "../PageTransition.module.css";

export type PolygonPhase =
  | "covering"
  | "covered"
  | "revealing";

type Props = {
  phase: PolygonPhase;
  destination: string;

  onCovered: (
    href: string,
  ) => void;

  onComplete: () => void;
};

const START_SHAPE =
  "polygon(46% 46%, 56% 42%, 60% 55%, 44% 59%)";

const FULL_SHAPE =
  "polygon(-20% -20%, 120% -20%, 120% 120%, -20% 120%)";

const END_SHAPE =
  "polygon(43% 44%, 58% 47%, 54% 60%, 41% 54%)";

export function PolygonTransition({
  phase,
  destination,
  onCovered,
  onComplete,
}: Props) {
  let clipPath = FULL_SHAPE;

  if (phase === "covering") {
    clipPath = FULL_SHAPE;
  }

  if (phase === "revealing") {
    clipPath = END_SHAPE;
  }

  return (
    <motion.div
      className={
        styles.polygonTransition
      }
      initial={{
        clipPath: START_SHAPE,
      }}
      animate={{
        clipPath:
            phase === "revealing"
            ? END_SHAPE
            : phase === "covering"
                ? [
                    START_SHAPE,
                    START_SHAPE,
                    FULL_SHAPE,
                ]
                : FULL_SHAPE,
      }}
      transition={{
        duration:
          phase === "revealing"
            ? 0.6
            : 0.9,

        times:
            phase === "covering"
            ? [0, 0.13, 1]
            : undefined,

        ease: 
          phase === "revealing"
            ? [0.22, 1, 0.36, 1]
            : [0.45, 0, 0.25, 1],
        }}
      onAnimationComplete={() => {
        if (phase === "covering") {
          onCovered(destination);
        }

        if (phase === "revealing") {
          onComplete();
        }
      }}
    />
  );
}