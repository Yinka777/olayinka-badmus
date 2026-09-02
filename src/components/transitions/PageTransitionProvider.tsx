"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";

import { PageTransitionOverlay } from "./PageTransitionOverlay";

import type {
  CurtainPhase,
} from "./animations/CurtainTransition";

import type {
  PolygonPhase,
} from "./animations/PolygonTransition";

import type {
  ExpandPhase,
} from "./animations/ExpandTransition";

export type TransitionType =
  | "polygon"
  | "curtain"
  | "expand"
  | "none";

export type ExpandTransitionData = {
  src: string;
  alt?: string;
  rect: DOMRect;

  projectHref?: string;
};

type TransitionContextValue = {
  navigate: (
    href: string,
    options?: {
      expand?: ExpandTransitionData;
    },
  ) => void;

  isTransitioning: boolean;
};

const TransitionContext =
  createContext<TransitionContextValue | null>(
    null,
  );

function isProjectRoute(pathname: string) {
  return pathname.startsWith("/work/");
}

function getTransitionType(
  from: string,
  to: string,
): TransitionType {
  const fromHome = from === "/";
  const toHome = to === "/";

  const fromAbout = from === "/about";
  const toAbout = to === "/about";

  const fromIndex = from === "/index";
  const toIndex = to === "/index";

  const fromProject = isProjectRoute(from);
  const toProject = isProjectRoute(to);

  /*
   * Home ↔ Project
   */
  if (
    (fromHome && toProject) ||
    (fromProject && toHome)
  ) {
    return "polygon";
  }

  /*
   * Index ↔ Project
   */
  if (
    (fromIndex && toProject)
  ) {
    return "expand";
  }

  /*
   * Project → Index
   */
  if (
    fromProject &&
    toIndex
  ) {
    return "curtain";
  }

  /*
   * Project → About
   */
  if (
    fromProject &&
    toAbout
  ) {
    return "curtain";
  }

  const utilityRoutes = [
    "/",
    "/about",
    "/index",
  ];

  if (
    utilityRoutes.includes(from) &&
    utilityRoutes.includes(to)
  ) {
    return "curtain";
  }

  return "none";
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [destination, setDestination] =
    useState<string | null>(null);
  
  const [transition, setTransition] =
    useState<TransitionType>("none");

  const [expandData, setExpandData] =
    useState<ExpandTransitionData | null>(
      null,
    );

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const [
    curtainPhase,
    setCurtainPhase,
  ] = useState<CurtainPhase | null>(
    null,
  );

  const [
    polygonPhase,
    setPolygonPhase,
  ] = useState<PolygonPhase | null>(
    null,
  );

  const [
    expandPhase,
    setExpandPhase,
  ] = useState<ExpandPhase | null>(
    null,
  );

  const navigate = useCallback(
    (
      href: string,
      options?: {
        expand?: ExpandTransitionData;
      },
    ) => {
      if (
        isTransitioning ||
        href === pathname
      ) {
        return;
      }

      const type = getTransitionType(
        pathname,
        href,
      );

      if (type === "none") {
        router.push(href);
        return;
      }

      setDestination(href);
      setTransition(type);
      setExpandData(
        options?.expand
          ? {
              ...options.expand,
              projectHref:
                isProjectRoute(pathname)
                  ? pathname
                  : href,
            }
          : null,
      );

      if (type === "curtain") {
        setCurtainPhase("covering");
      }

      if (type === "polygon") {
        setPolygonPhase("covering");
      }

      if (type === "expand") {
        setExpandPhase(
          "expanding",
        );
      }

      setIsTransitioning(true);
    },
    [
      isTransitioning,
      pathname,
      router,
    ],
  );

  function handleCovered(
    href: string,
  ) {
    if (
      transition === "curtain"
    ) {
      setCurtainPhase(
        "covered",
      );
    }

    if (
      transition === "polygon"
    ) {
      setPolygonPhase(
        "covered",
      );
    }

    if (transition === "expand") {
      setExpandPhase(
        "covered",
      );
    }

    router.push(href);
  }

  function handleComplete() {
    setIsTransitioning(false);

    setTransition("none");
    setExpandData(null);
    setDestination(null);

    setCurtainPhase(null);
    setPolygonPhase(null);
    setExpandPhase(null);
  }

  useEffect(() => {
    if (
      !destination ||
      pathname !== destination
    ) {
      return;
    }

    if (
      transition === "curtain" &&
      curtainPhase === "covered"
    ) {
      const frame =
        requestAnimationFrame(() => {
          setCurtainPhase(
            "revealing",
          );
        });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    if (
      transition === "polygon" &&
      polygonPhase === "covered"
    ) {
      const frame =
        requestAnimationFrame(() => {
          setPolygonPhase(
            "revealing",
          );
        });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    if (
      transition === "expand" &&
      expandPhase === "covered"
    ) {
      const frame =
        requestAnimationFrame(() => {
          setExpandPhase(
            "revealing",
          );
        });

      return () => {
        cancelAnimationFrame(frame);
      };
    }
  }, [
    pathname,
    destination,
    transition,
    curtainPhase,
    polygonPhase,
  ]);

  return (
    <TransitionContext.Provider
      value={{
        navigate,
        isTransitioning,
      }}
    >
      {children}

      <PageTransitionOverlay
        type={transition}
        destination={destination}
        expandData={expandData}
        active={isTransitioning}
        curtainPhase={curtainPhase}
        polygonPhase={polygonPhase}
        expandPhase={expandPhase}
        onCovered={handleCovered}
        onComplete={handleComplete}
      />
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context =
    useContext(TransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used inside PageTransitionProvider",
    );
  }

  return context;
}