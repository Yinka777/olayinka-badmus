"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const isAboutPage =
    pathname === "/about" ||
    pathname.startsWith("/about/");

  return (
    <header className={styles.navigation}>
      <div className={styles.row}>
        <div className={styles.titleGroup}>
          <Link
            href="/"
            className={styles.siteTitle}
          >
            {title}
          </Link>

          <span className={styles.subtitle}>
            {subtitle}
          </span>
        </div>

        <nav
          className={styles.links}
          aria-label="Main navigation"
        >
          {isAboutPage ? (
            <Link href="/">
              Projects
            </Link>
          ) : (
            <Link href="/about">
              About
            </Link>
          )}

          <a href="mailto:contact@olayinka-badmus.com">
            Contact
          </a>

          <Link href="/index">
            Index
          </Link>
        </nav>
      </div>
    </header>
  );
}