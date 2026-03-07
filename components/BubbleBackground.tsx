"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, type SpringOptions, useMotionValue, useSpring } from "framer-motion";
import styles from "./BubbleBackground.module.css";

export interface BubbleBackgroundProps {
  className?: string;
  children?: ReactNode;
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
}

export function BubbleBackground({
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    first: "18,113,255",
    second: "221,74,255",
    third: "0,220,255",
    fourth: "200,50,50",
    fifth: "180,180,50",
    sixth: "140,100,255"
  }
}: BubbleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (!interactive) return;
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, handleMouseMove]);

  const makeGradient = (color: string) =>
    `radial-gradient(circle at center, rgba(${color}, 0.8) 0%, rgba(${color}, 0) 50%)`;

  return (
    <div ref={containerRef} className={[styles.root, className].filter(Boolean).join(" ")}>
      <svg className={styles.hiddenSvg} aria-hidden="true">
        <defs>
          <filter id="bubble-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={styles.gooLayer}>
        <motion.div
          className={styles.bubble}
          style={{
            width: "80%",
            height: "80%",
            top: "10%",
            left: "10%",
            background: makeGradient(colors.first)
          }}
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className={styles.orbitContainer}
          style={{ transformOrigin: "calc(50% - 400px) center" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className={styles.bubble}
            style={{
              width: "80%",
              height: "80%",
              background: makeGradient(colors.second)
            }}
          />
        </motion.div>

        <motion.div
          className={styles.orbitContainer}
          style={{ transformOrigin: "calc(50% + 400px) center" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className={styles.bubble}
            style={{
              width: "80%",
              height: "80%",
              top: "calc(50% + 200px)",
              left: "calc(50% - 500px)",
              background: makeGradient(colors.third)
            }}
          />
        </motion.div>

        <motion.div
          className={[styles.bubble, styles.soft].join(" ")}
          style={{
            width: "80%",
            height: "80%",
            top: "10%",
            left: "10%",
            background: makeGradient(colors.fourth)
          }}
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className={styles.orbitContainer}
          style={{ transformOrigin: "calc(50% - 800px) calc(50% + 200px)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          <div
            className={styles.bubble}
            style={{
              width: "160%",
              height: "160%",
              top: "calc(50% - 80%)",
              left: "calc(50% - 80%)",
              background: makeGradient(colors.fifth)
            }}
          />
        </motion.div>

        {interactive && (
          <motion.div
            className={styles.interactiveBubble}
            style={{
              width: "100%",
              height: "100%",
              background: makeGradient(colors.sixth),
              x: springX,
              y: springY
            }}
          />
        )}
      </div>

      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
