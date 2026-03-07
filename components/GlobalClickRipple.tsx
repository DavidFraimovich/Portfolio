"use client";

import { useEffect, useRef } from "react";
import styles from "./GlobalClickRipple.module.css";

export function GlobalClickRipple() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layerEl = layerRef.current;
    if (!layerEl) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) return;

    const createRipple = (clientX: number, clientY: number) => {
      const ripple = document.createElement("span");
      ripple.className = styles.ripple;
      ripple.style.setProperty("--x", `${clientX.toFixed(2)}px`);
      ripple.style.setProperty("--y", `${clientY.toFixed(2)}px`);
      layerEl.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      createRipple(event.clientX, event.clientY);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return <div ref={layerRef} className={styles.layer} aria-hidden="true" />;
}

