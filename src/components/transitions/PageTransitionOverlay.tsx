"use client";

import { AnimatePresence } from "motion/react";

import type {
  ExpandTransitionData,
  TransitionType,
} from "./PageTransitionProvider";

import type {
  CurtainPhase,
} from "./animations/CurtainTransition";

import type {
  PolygonPhase,
} from "./animations/PolygonTransition";

import type {
  ExpandPhase,
} from "./animations/ExpandTransition";

import { CurtainTransition } from "./animations/CurtainTransition";
import { PolygonTransition } from "./animations/PolygonTransition";
import { ExpandTransition } from "./animations/ExpandTransition";

type Props = {
  type: TransitionType;

  destination: string | null;

  expandData:
    | ExpandTransitionData
    | null;

  active: boolean;

  curtainPhase:
    | CurtainPhase
    | null;

  polygonPhase:
    | PolygonPhase
    | null;

  expandPhase:
    | ExpandPhase
    | null;

  onCovered: (
    href: string,
  ) => void;

  onComplete: () => void;
};

export function PageTransitionOverlay({
  type,
  destination,
  expandData,
  active,
  curtainPhase,
  polygonPhase,
  expandPhase,
  onCovered,
  onComplete,
}: Props) {
  if (
    !active ||
    !destination
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      {type === "polygon" &&
        polygonPhase && (
          <PolygonTransition
            key={`polygon-${destination}`}
            phase={polygonPhase}
            destination={
              destination
            }
            onCovered={
              onCovered
            }
            onComplete={
              onComplete
            }
          />
        )}

      {type === "curtain" &&
        curtainPhase && (
          <CurtainTransition
            key="curtain"
            phase={curtainPhase}
            destination={
              destination
            }
            onCovered={
              onCovered
            }
            onComplete={
              onComplete
            }
          />
        )}

      {type === "expand" &&
        expandPhase && (
          <ExpandTransition
            key={`expand-${destination}`}
            phase={expandPhase}
            destination={destination}
            data={expandData}
            onCovered={onCovered}
            onComplete={onComplete}
          />
        )}
    </AnimatePresence>
  );
}