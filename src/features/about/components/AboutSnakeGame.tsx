"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./AboutSnakeGame.module.css";

type Point = {
  x: number;
  y: number;
};

type Direction = {
  x: number;
  y: number;
};

const CELL_SIZE = 18;
const GAME_SPEED = 110;

const INITIAL_LENGTH = 5;

export function AboutSnakeGame() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const snakeRef = useRef<Point[]>([]);
  const foodRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const directionRef =
    useRef<Direction>({
      x: -1,
      y: 0,
    });

  const nextDirectionRef =
    useRef<Direction>({
      x: -1,
      y: 0,
    });

  const intervalRef =
    useRef<number | null>(null);

  const columnsRef = useRef(0);
  const rowsRef = useRef(0);

  const touchStartRef = useRef<Point | null>(
    null,
  );

  const [isTouchDevice, setIsTouchDevice] =
    useState(false);

  const [status, setStatus] =
    useState<
      "idle" | "playing" | "gameover"
    >("idle");

  const statusRef =
    useRef<
      "idle" | "playing" | "gameover"
    >("idle");

  function updateStatus(
    value:
      | "idle"
      | "playing"
      | "gameover",
  ) {
    statusRef.current = value;
    setStatus(value);
  }

  /* -----------------------------
     DRAW
  ------------------------------ */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context =
      canvas.getContext("2d");

    if (!context) return;

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const snake = snakeRef.current;

    /*
     * Snake
     */
    context.fillStyle = "#111111";

    snake.forEach((segment) => {
      context.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
      );
    });

    /*
     * Apple
     */
    const food = foodRef.current;

    const centerX =
        food.x * CELL_SIZE +
        CELL_SIZE / 2;

    const centerY =
        food.y * CELL_SIZE +
        CELL_SIZE / 2;

    const appleRadius =
        CELL_SIZE * 0.3;

    /*
    * Apple body
    */
    context.fillStyle = "#8b1e1e";

    context.beginPath();

    context.arc(
        centerX - appleRadius * 0.35,
        centerY,
        appleRadius,
        0,
        Math.PI * 2,
    );

    context.arc(
        centerX + appleRadius * 0.35,
        centerY,
        appleRadius,
        0,
        Math.PI * 2,
    );

    context.fill();

    /*
    * Slight bottom body
    */
    context.beginPath();

    context.ellipse(
        centerX,
        centerY + appleRadius * 0.35,
        appleRadius * 0.95,
        appleRadius * 0.85,
        0,
        0,
        Math.PI * 2,
    );

    context.fill();

    /*
    * Stem
    */
    context.strokeStyle = "#111111";
    context.lineWidth = 1.5;
    context.lineCap = "round";

    context.beginPath();

    context.moveTo(
        centerX,
        centerY - appleRadius * 0.75,
    );

    context.lineTo(
        centerX + appleRadius * 0.1,
        centerY - appleRadius * 1.35,
    );

    context.stroke();

    /*
    * Leaf
    */
    context.fillStyle = "#111111";

    context.beginPath();

    context.ellipse(
        centerX + appleRadius * 0.55,
        centerY - appleRadius * 1.1,
        appleRadius * 0.5,
        appleRadius * 0.22,
        -0.5,
        0,
        Math.PI * 2,
    );

    context.fill();
  }, []);

  /* -----------------------------
     FOOD
  ------------------------------ */

  const placeFood = useCallback(() => {
    const columns = columnsRef.current;
    const rows = rowsRef.current;

    if (!columns || !rows) return;

    let candidate: Point;

    do {
      candidate = {
        x: Math.floor(
          Math.random() * columns,
        ),

        y: Math.floor(
          Math.random() * rows,
        ),
      };
    } while (
      snakeRef.current.some(
        (segment) =>
          segment.x === candidate.x &&
          segment.y === candidate.y,
      )
    );

    foodRef.current = candidate;
  }, []);

  /* -----------------------------
     RESET / START
  ------------------------------ */

  const resetGame =
    useCallback(() => {
      const columns =
        columnsRef.current;

      const rows =
        rowsRef.current;

      if (!columns || !rows) return;

      /*
       * Start near bottom-right,
       * moving toward the left.
       */
      const startX =
        Math.max(
          INITIAL_LENGTH + 2,
          columns - 5,
        );

      const startY =
        Math.max(
          2,
          rows - 4,
        );

      snakeRef.current =
        Array.from(
          {
            length:
              INITIAL_LENGTH,
          },
          (_, index) => ({
            x: startX + index,
            y: startY,
          }),
        );

      directionRef.current = {
        x: -1,
        y: 0,
      };

      nextDirectionRef.current = {
        x: -1,
        y: 0,
      };

      placeFood();
      draw();
    }, [draw, placeFood]);

  const stopGame =
    useCallback(() => {
      if (
        intervalRef.current !== null
      ) {
        window.clearInterval(
          intervalRef.current,
        );

        intervalRef.current = null;
      }
    }, []);

  /* -----------------------------
     GAME STEP
  ------------------------------ */

  const step = useCallback(() => {
    const snake =
      snakeRef.current;

    if (!snake.length) return;

    directionRef.current =
      nextDirectionRef.current;

    const direction =
      directionRef.current;

    const head = snake[0];

    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    const columns =
      columnsRef.current;

    const rows =
      rowsRef.current;

    const hitWall =
      nextHead.x < 0 ||
      nextHead.x >= columns ||
      nextHead.y < 0 ||
      nextHead.y >= rows;

    const hitSelf =
      snake.some(
        (segment) =>
          segment.x === nextHead.x &&
          segment.y === nextHead.y,
      );

    if (hitWall || hitSelf) {
      stopGame();
      updateStatus("gameover");
      draw();

      return;
    }

    snake.unshift(nextHead);

    const food = foodRef.current;

    const ateFood =
      nextHead.x === food.x &&
      nextHead.y === food.y;

    if (ateFood) {
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }, [
    draw,
    placeFood,
    stopGame,
  ]);

  const startGame =
    useCallback(() => {
      stopGame();

      resetGame();

      updateStatus("playing");

      intervalRef.current =
        window.setInterval(
          step,
          GAME_SPEED,
        );
    }, [
      resetGame,
      step,
      stopGame,
    ]);

  /* -----------------------------
      POINTER HANDLER FUNCTIONS
  ------------------------------ */

  function handlePointerDown(
    event: React.PointerEvent,
  ) {
    if (
      !isTouchDevice ||
      statusRef.current !== "playing"
    ) {
      return;
    }

    touchStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handlePointerUp(
    event: React.PointerEvent,
  ) {
    if (
      !isTouchDevice ||
      statusRef.current !== "playing" ||
      !touchStartRef.current
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      touchStartRef.current.x;

    const deltaY =
      event.clientY -
      touchStartRef.current.y;

    touchStartRef.current = null;

    /*
    * Ignore accidental tiny movements.
    */
    const SWIPE_THRESHOLD = 20;

    if (
      Math.abs(deltaX) <
        SWIPE_THRESHOLD &&
      Math.abs(deltaY) <
        SWIPE_THRESHOLD
    ) {
      return;
    }

    const current =
      directionRef.current;

    /*
    * Horizontal swipe
    */
    if (
      Math.abs(deltaX) >
      Math.abs(deltaY)
    ) {
      if (
        deltaX > 0 &&
        current.x !== -1
      ) {
        nextDirectionRef.current = {
          x: 1,
          y: 0,
        };
      } else if (
        deltaX < 0 &&
        current.x !== 1
      ) {
        nextDirectionRef.current = {
          x: -1,
          y: 0,
        };
      }
    }

    /*
    * Vertical swipe
    */
    else {
      if (
        deltaY > 0 &&
        current.y !== -1
      ) {
        nextDirectionRef.current = {
          x: 0,
          y: 1,
        };
      } else if (
        deltaY < 0 &&
        current.y !== 1
      ) {
        nextDirectionRef.current = {
          x: 0,
          y: -1,
        };
      }
    }
  }

  /* -----------------------------
     RESIZE CANVAS
  ------------------------------ */

  useEffect(() => {
    const container =
      containerRef.current;

    const canvas =
      canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    function resize() {
      const rect =
        container.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      const width =
        Math.floor(
          rect.width / CELL_SIZE,
        ) * CELL_SIZE;

      const height =
        Math.floor(
          rect.height / CELL_SIZE,
        ) * CELL_SIZE;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");

      if (context) {
        context.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0,
        );
      }

      columnsRef.current =
        Math.floor(
          width / CELL_SIZE,
        );

      rowsRef.current =
        Math.floor(
          height / CELL_SIZE,
        );

      if (
        statusRef.current !==
        "playing"
      ) {
        resetGame();
      }

      draw();
    }

    const observer =
      new ResizeObserver(resize);

    observer.observe(container);

    resize();

    return () => {
      observer.disconnect();
    };
  }, [draw, resetGame]);

  /* -----------------------------
     KEYBOARD CONTROLS
  ------------------------------ */
  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia(
        "(hover: none), (pointer: coarse)",
      ).matches,
    );
  }, []);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      const target =
        event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (
        event.code === "Space"
      ) {
        event.preventDefault();

        if (
          statusRef.current !==
          "playing"
        ) {
          startGame();
        }

        return;
      }

      if (
        statusRef.current !==
        "playing"
      ) {
        return;
      }

      const current =
        directionRef.current;

      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          event.preventDefault();

          if (current.y !== 1) {
            nextDirectionRef.current =
              {
                x: 0,
                y: -1,
              };
          }

          break;

        case "ArrowDown":
        case "s":
        case "S":
          event.preventDefault();

          if (current.y !== -1) {
            nextDirectionRef.current =
              {
                x: 0,
                y: 1,
              };
          }

          break;

        case "ArrowLeft":
        case "a":
        case "A":
          event.preventDefault();

          if (current.x !== 1) {
            nextDirectionRef.current =
              {
                x: -1,
                y: 0,
              };
          }

          break;

        case "ArrowRight":
        case "d":
        case "D":
          event.preventDefault();

          if (current.x !== -1) {
            nextDirectionRef.current =
              {
                x: 1,
                y: 0,
              };
          }

          break;
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      stopGame();
    };
  }, [startGame, stopGame]);

  return (
    <div
      ref={containerRef}
      className={`${styles.game} ${
        status === "playing"
          ? styles.gamePlaying
          : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />

      <div
        className={styles.gameStatus}
      >
        {status === "idle" && (
          <button
            type="button"
            className={styles.startButton}
            onClick={startGame}
          >
            {isTouchDevice
              ? "Tap to play"
              : "Space to play. Arrow keys/WASD to move"}
          </button>
        )}

        {status ===
          "gameover" && (
          <span>
            Game over — space to
            restart
          </span>
        )}
      </div>
    </div>
  );
}