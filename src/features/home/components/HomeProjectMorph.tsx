"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import { useEffect, useState } from "react";

import type { HomeProject } from "../data/homeProjects";

import styles from "./HomeProjectMorph.module.css";

import { TransitionLink } from "@/components/transitions/TransitionLink";

type HomeProjectMorphProps = {
  projects: HomeProject[];
};

const MORPH_DURATION = 2.2;
const MEDIA_FADE_DURATION = 0.9;

export function HomeProjectMorph({
  projects,
}: HomeProjectMorphProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isHovering, setIsHovering] =
    useState(false);

  const [isExpanded, setIsExpanded] =
    useState(false);

  const activeProject =
    projects[activeIndex];

  const holdDuration =
  activeProject.holdDuration ?? 2500;

  const effectiveHoldDuration = isHovering
      ? holdDuration * 1.8
      : holdDuration;

  useEffect(() => {
    if (isExpanded) return;
    if (projects.length < 2) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => {
        return (
          (current + 1) %
          projects.length
        );
      });
    }, effectiveHoldDuration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    activeIndex,
    isHovering,
    isExpanded,
    projects.length,
    effectiveHoldDuration,
  ]);

  if (!activeProject) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (isExpanded) {
          setIsExpanded(false);
        }
      }}
    >
      <button
        type="button"
        className={styles.projectLink}
        onMouseEnter={() =>
          setIsHovering(true)
        }
        onMouseLeave={() =>
          setIsHovering(false)
        }
        style={{
          pointerEvents: isExpanded ? "none" : "auto",
        }}
        onClick={(event) => {
          event.stopPropagation();
          setIsExpanded(true);
        }}
      >
        <motion.div
          className={styles.shape}
          animate={{
            clipPath:
              activeProject.shape,
              scale: isExpanded ? 0.96 : 1,
          }}
          transition={{
            duration: MORPH_DURATION,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence
            mode="sync"
            initial={false}
          >
            <motion.div
              key={
                activeProject.media.src
              }
              className={
                styles.mediaLayer
              }
              initial={{
                opacity: 0,
                scale: 1.03,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.985,
              }}
              transition={{
                duration: 1,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              {activeProject.media
                .type === "image" ? (
                <Image
                  src={
                    activeProject.media
                      .src
                  }
                  alt={
                    activeProject.media
                      .alt ?? ""
                  }
                  fill
                  priority={
                    activeIndex === 0
                  }
                  sizes="70vw"
                  className={
                    styles.media
                  }
                />
              ) : (
                <video
                  src={
                    activeProject.media
                      .src
                  }
                  poster={
                    activeProject.media
                      .poster
                  }
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={
                    styles.media
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={
            styles.projectLabel
          }
          animate={{
            left:
              activeProject
                .labelPosition.left,
            top:
              activeProject
                .labelPosition.top,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {activeProject.title}
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            key={`expanded-${activeProject.title}`}
            className={styles.explodedLayer}
          >
            <svg
              className={styles.connectionLines}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {activeProject.subprojects.map(
                (subproject) => (
                  <motion.line
                    key={subproject.href}
                    x1={activeProject.connectionOrigin.x}
                    y1={activeProject.connectionOrigin.y}
                    x2={
                      50 +
                      subproject.position.x
                    }
                    y2={
                      50 +
                      subproject.position.y
                    }
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      transition: {
                        pathLength: {
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.05,
                      },
                    }}
                  />
                ),
              )}
            </svg>

            {activeProject.subprojects.map(
              (subproject, index) => (
                <motion.div
                  key={subproject.href}
                  className={styles.subproject}
                  initial={{
                    left: "50%",
                    top: "50%",
                    scale: 0.3,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    left: `${
                      50 +
                      subproject.position.x
                    }%`,

                    top: `${
                      50 +
                      subproject.position.y
                    }%`,

                    scale: 1,
                    opacity: 1,

                    rotate:
                      subproject.rotation ??
                      0,
                  }}
                  exit={{
                    left: `${activeProject.connectionOrigin.x}%`,
                    top: `${activeProject.connectionOrigin.y}%`,
                    scale: 0.2,
                    opacity: 0,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 18,
                    delay: index * 0.05,
                  }}
                >
                  <TransitionLink
                    href={subproject.href}
                    className={
                      styles.subprojectLink
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <span
                      className={
                        styles.subprojectImage
                      }
                    >
                      <Image
                        src={
                          subproject.image.src
                        }
                        alt={
                          subproject.image.alt
                        }
                        fill
                        sizes="150px"
                        className={styles.subprojectImageMedia}
                      />
                    </span>

                    <span
                      className={
                        styles.subprojectTitle
                      }
                    >
                      {subproject.title}
                    </span>
                  </TransitionLink>
                </motion.div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}