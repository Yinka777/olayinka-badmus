"use client";

import { motion } from "motion/react";

import styles from "../PageTransition.module.css";

export type CurtainPhase =
  | "covering"
  | "covered"
  | "revealing";

type Props = {
  phase: CurtainPhase;
  destination: string;

  onCovered: (
    href: string,
  ) => void;

  onComplete: () => void;
};

export function CurtainTransition({
  phase,
  destination,
  onCovered,
  onComplete,
}: Props) {
  const isRevealing =
    phase === "revealing";

  return (
    <motion.div
      className={
        styles.curtainTransition
      }
      initial={{
        y: "100%",
      }}
      animate={{
        y: isRevealing
          ? "-100%"
          : "0%",
      }}
      transition={{
        duration:
          isRevealing
            ? 0.55
            : 0.45,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
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