"use client";

import {
  MouseEvent,
  ReactNode,
} from "react";

import { usePageTransition } from "./PageTransitionProvider";

type TransitionLinkProps = 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
    className?: string;

    transitionImage?: {
      src: string;
      alt?: string;
    };

    transitionSourceSelector?: string;

    onClick?: (
      event: MouseEvent<HTMLAnchorElement>,
    ) => void;
  };

export function TransitionLink({
  href,
  children,
  className,
  transitionImage,
  transitionSourceSelector,
  onClick,
  ...anchorProps
}: TransitionLinkProps) {
  const { navigate } =
    usePageTransition();

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    let sourceElement:
      | Element
      | null = event.currentTarget;

    if (transitionSourceSelector) {
      sourceElement =
        document.querySelector(
          transitionSourceSelector,
        );
    }

    const rect =
      sourceElement?.getBoundingClientRect() ??
      event.currentTarget.getBoundingClientRect();

    navigate(href, {
      expand: transitionImage
        ? {
            src: transitionImage.src,
            alt: transitionImage.alt,
            rect,
          }
        : undefined,
    });
  }

  return (
    <a
      {...anchorProps}
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}