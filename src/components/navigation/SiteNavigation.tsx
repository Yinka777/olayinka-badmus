"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { TransitionLink } from "@/components/transitions/TransitionLink";

import {
  homeProjects,
} from "@/features/home/data/homeProjects";

import styles from "./SiteNavigation.module.css";

type SiteNavigationProps = {
  title: string;
  subtitle: string;
};

export function SiteNavigation({
  title,
  subtitle,
}: SiteNavigationProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] =
    useState(false);

  const navigationRef =
    useRef<HTMLElement>(null);

  const isAboutPage =
    pathname === "/about" ||
    pathname.startsWith("/about/");

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(
      event: PointerEvent,
    ) {
      if (!isOpen) return;

      const navigation =
        navigationRef.current;

      if (
        navigation &&
        !navigation.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [isOpen]);

  function handleTitleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {

    const isTouchLike =
      window.matchMedia(
        "(hover: none), (pointer: coarse)",
      ).matches;

    if (!isTouchLike) {
      return;
    }

    if (!isOpen) {
      event.preventDefault();
      setIsOpen(true);
    }
  }

  return (
    <header 
      ref={navigationRef}
      className={`${styles.navigation} ${
        isOpen ? styles.open : ""
      }`}
    >
      <div className={styles.row}>
        <div className={styles.titleGroup}>
          <TransitionLink
            href="/"
            className={styles.siteTitle}
            onClick={handleTitleClick}
          >
            {title}
          </TransitionLink>

          <span className={styles.subtitle}>
            {subtitle}
          </span>
        </div>

        <nav
          className={styles.links}
          aria-label="Main navigation"
        >
          {isAboutPage ? (
            <TransitionLink href="/">
              Projects
            </TransitionLink>
          ) : (
            <TransitionLink href="/about">
              About
            </TransitionLink>
          )}

          <a href="mailto:contact@olayinka-badmus.com">
            Contact
          </a>

          <TransitionLink href="/index">
            Index
          </TransitionLink>
        </nav>
      </div>
    </header>
  );
}