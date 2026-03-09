"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { type CSSProperties, type MouseEvent, useRef, useState } from "react";
import { type Locale, withLocalePath } from "@/lib/i18n";
import styles from "./ProductGoalsPanel.module.css";

type ProductGoalsPanelProps = {
  locale: Locale;
};

type PanelCopy = {
  title: string;
  subtitle: string;
  helper: string;
  contactCta: string;
  chips: string[];
};

type SignalChip = {
  id: string;
  label: string;
  x: number;
  y: number;
  durationMs: number;
  driftX: number;
  driftY: number;
};

type ChipStyle = CSSProperties & {
  "--chip-duration": string;
  "--chip-drift-x": string;
  "--chip-drift-y": string;
};

const PANEL_COPY: Record<Locale, PanelCopy> = {
  en: {
    title: "Measured product goals",
    subtitle: "Clear targets. Visible impact. Continuous improvement.",
    helper: "Click to reveal clear product signals",
    contactCta: "Contact",
    chips: [
      "CTR +0.8%",
      "Activation ↑",
      "Drop-off ↓",
      "Retention +1.4%",
      "Conversion +0.6%",
      "Latency -12ms",
      "Flow improved",
      "Priority set",
      "Scope refined",
      "Insight found",
      "Friction ↓",
      "Time-to-value ↓",
      "Activation Rate",
      "Time to Value",
      "Onboarding Completion Rate",
      "Day 7 Retention",
      "Feature Adoption Rate",
      "Conversion Rate",
      "Drop-off Rate",
      "WAU/MAU Stickiness",
      "Repeat Usage Rate",
      "Task Completion Rate"
    ]
  },
  he: {
    title: "יעדי מוצר מדידים",
    subtitle: "יעדים ברורים. השפעה גלויה. שיפור מתמשך.",
    helper: "עברו עם העכבר או לחצו כדי לראות מדדים מוצריים שאני משתמש בהם ביום יום ברורים",
    contactCta: "יצירת קשר",
    chips: [
      "CTR +0.8%",
      "אקטיבציה ↑",
      "נטישה ↓",
      "שימור +1.4%",
      "המרה +0.6%",
      "זמן תגובה -12ms",
      "הפלואו שופר",
      "עדיפות הוגדרה",
      "הסקופ דויק",
      "תובנה זוהתה",
      "חיכוך ↓",
      "זמן-עד-ערך ↓",
      "שיעור אקטיבציה",
      "זמן להגעה לערך",
      "שיעור השלמת אונבורדינג",
      "שימור ביום ה-7",
      "שיעור אימוץ פיצ'ר",
      "שיעור המרה",
      "שיעור נטישה",
      "דביקות שימוש WAU/MAU",
      "שיעור שימוש חוזר",
      "שיעור השלמת משימה"
    ]
  }
};

const OVERLAY_PADDING = 26;
const HOVER_SIGNAL_DELAY_MS = 680;
const HOVER_MIN_MOVE_PX = 14;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function pickRandomLabel(labels: string[]): string {
  return labels[randomInt(0, labels.length - 1)] ?? labels[0] ?? "";
}

export function ProductGoalsPanel({ locale }: ProductGoalsPanelProps) {
  const copy = PANEL_COPY[locale];
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const chipCounterRef = useRef(0);
  const lastHoverSpawnAtRef = useRef(0);
  const lastHoverPointRef = useRef<{ x: number; y: number } | null>(null);
  const [chips, setChips] = useState<SignalChip[]>([]);

  const removeChip = (id: string): void => {
    setChips((currentChips) => currentChips.filter((chip) => chip.id !== id));
  };

  const spawnSignals = (originX: number, originY: number): void => {
    const panel = panelRef.current;
    if (!panel) return;

    const width = panel.clientWidth;
    const height = panel.clientHeight;
    const minRadius = reduceMotion ? 14 : 40;
    const maxRadius = reduceMotion ? 28 : 90;
    const angle = randomFloat(0, Math.PI * 2);
    const distance = randomFloat(minRadius, maxRadius);
    const label = pickRandomLabel(copy.chips);
    const x = clamp(originX + Math.cos(angle) * distance, OVERLAY_PADDING, width - OVERLAY_PADDING);
    const y = clamp(originY + Math.sin(angle) * distance, OVERLAY_PADDING, height - OVERLAY_PADDING);
    const durationMs = randomInt(2600, 3400);
    const driftX = reduceMotion ? 0 : randomFloat(-7, 7);
    const driftY = reduceMotion ? -3 : randomFloat(-26, -14);
    const now = Date.now();

    chipCounterRef.current += 1;
    const nextChip: SignalChip = {
      id: `signal-chip-${now}-${chipCounterRef.current}`,
      label,
      x,
      y,
      durationMs,
      driftX,
      driftY
    };

    setChips((currentChips) => [...currentChips, nextChip]);
  };

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>): void => {
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;

    spawnSignals(originX, originY);
  };

  const handlePanelMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;
    const now = Date.now();
    const lastHoverPoint = lastHoverPointRef.current;
    const movedEnough =
      !lastHoverPoint || Math.hypot(originX - lastHoverPoint.x, originY - lastHoverPoint.y) >= HOVER_MIN_MOVE_PX;

    if (!movedEnough || now - lastHoverSpawnAtRef.current < HOVER_SIGNAL_DELAY_MS) return;

    lastHoverPointRef.current = { x: originX, y: originY };
    lastHoverSpawnAtRef.current = now;
    spawnSignals(originX, originY);
  };

  const handlePanelMouseLeave = (): void => {
    lastHoverPointRef.current = null;
    lastHoverSpawnAtRef.current = 0;
  };

  return (
    <div className={styles.wrap}>
      <div
        ref={panelRef}
        className={styles.panel}
        onClick={handlePanelClick}
        onMouseMove={handlePanelMouseMove}
        onMouseLeave={handlePanelMouseLeave}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
          <p className={styles.helper}>{copy.helper}</p>
          <div className={styles.actions}>
            <Link href={withLocalePath(locale, "/contact")} className={styles.contactButton}>
              {copy.contactCta}
            </Link>
          </div>
        </div>

        <div className={styles.overlay} aria-hidden="true">
          {chips.map((chip) => {
            const chipStyle: ChipStyle = {
              left: `${chip.x.toFixed(2)}px`,
              top: `${chip.y.toFixed(2)}px`,
              "--chip-duration": `${chip.durationMs}ms`,
              "--chip-drift-x": `${chip.driftX.toFixed(2)}px`,
              "--chip-drift-y": `${chip.driftY.toFixed(2)}px`
            };

            return (
              <span key={chip.id} className={styles.chip} style={chipStyle} onAnimationEnd={() => removeChip(chip.id)}>
                {chip.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
