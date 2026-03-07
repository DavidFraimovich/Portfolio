"use client";

import { useEffect, useRef } from "react";
import { type Locale, withLocalePath } from "@/lib/i18n";
import { BubbleBackground } from "./BubbleBackground";
import styles from "./Hero.module.css";

const LINKS = {
  whatsapp: "https://wa.me/972542114929",
  linkedin: "https://www.linkedin.com/in/david-fraimovich-843207172",
  cvHe: "/cv/David-Fraimovich-CV-HE.pdf",
  cvEn: "/cv/David-Fraimovich-CV-EN.pdf"
} as const;

const HERO_PROFILE_IMAGE = "/images/hero/David-Fraimovich.png";

type HeroCopy = {
  hello: string;
  titleIntro: string;
  titleName: string;
  titleRole: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  linkedinCta: string;
  cvCta: string;
  panelImageAlt: string;
};

const heroCopy: Record<Locale, HeroCopy> = {
  en: {
    hello: "Hello",
    titleIntro: "I'm",
    titleName: "David,",
    titleRole: "Product Manager",
    subtitle: "From product direction to measurable delivery.",
    primaryCta: "Portfolio",
    secondaryCta: "Contact",
    linkedinCta: "LinkedIn",
    cvCta: "Download CV",
    panelImageAlt: "Portrait image"
  },
  he: {
    hello: "היי",
    titleIntro: "אני",
    titleName: "דוד,",
    titleRole: "מנהל מוצר",
    subtitle: "מכיוון מוצרי ברור ועד ביצוע עם תוצאות מדידות.",
    primaryCta: "לתיק עבודות",
    secondaryCta: "יצירת קשר",
    linkedinCta: "LinkedIn",
    cvCta: "הורדת קו\"ח",
    panelImageAlt: "תמונת פרופיל"
  }
};

type HeroProps = {
  locale?: Locale;
};

export function Hero({ locale = "en" }: HeroProps) {
  const copy = heroCopy[locale];
  const ctaCvLink = locale === "he" ? LINKS.cvHe : LINKS.cvEn;
  const heroRef = useRef<HTMLElement | null>(null);
  const rippleLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const rippleLayerEl = rippleLayerRef.current;
    if (!heroEl || !rippleLayerEl) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    let rafId: number | null = null;
    let targetX = 50;
    let targetY = 42;
    let currentX = 50;
    let currentY = 42;
    const easing = 0.16;

    const setPointerVars = (x: number, y: number) => {
      heroEl.style.setProperty("--mx", `${x.toFixed(2)}%`);
      heroEl.style.setProperty("--my", `${y.toFixed(2)}%`);
    };

    const animatePointer = () => {
      rafId = null;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      setPointerVars(currentX, currentY);

      const distance = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
      if (distance > 0.04) {
        rafId = window.requestAnimationFrame(animatePointer);
      }
    };

    const schedulePointer = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(animatePointer);
      }
    };

    const updatePointerTarget = (clientX: number, clientY: number) => {
      const rect = heroEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const px = ((clientX - rect.left) / rect.width) * 100;
      const py = ((clientY - rect.top) / rect.height) * 100;
      targetX = Math.max(0, Math.min(100, px));
      targetY = Math.max(0, Math.min(100, py));
      schedulePointer();
    };

    const createRipple = (clientX: number, clientY: number) => {
      if (reduceMotionQuery.matches) return;

      const rect = heroEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const ripple = document.createElement("span");
      ripple.className = styles.clickRipple;
      ripple.style.setProperty("--x", `${x.toFixed(2)}px`);
      ripple.style.setProperty("--y", `${y.toFixed(2)}px`);
      rippleLayerEl.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reduceMotionQuery.matches || coarsePointerQuery.matches) return;
      updatePointerTarget(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      targetX = 50;
      targetY = 42;
      schedulePointer();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      createRipple(event.clientX, event.clientY);
    };

    setPointerVars(currentX, currentY);
    heroEl.addEventListener("pointermove", handlePointerMove, { passive: true });
    heroEl.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    heroEl.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      heroEl.removeEventListener("pointermove", handlePointerMove);
      heroEl.removeEventListener("pointerleave", handlePointerLeave);
      heroEl.removeEventListener("pointerdown", handlePointerDown);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className={`${styles.hero} ${styles.heroAnimatedBg}`} aria-labelledby="hero-title">
      <div className={styles.background}>
        <BubbleBackground className={styles.bubbleBackground} interactive />
        <div ref={rippleLayerRef} className={styles.rippleLayer} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.helloPill}>{copy.hello}</span>
          <h1 id="hero-title" className={styles.title}>
            <span>{copy.titleIntro} </span>
            <span className={styles.titleAccent}>{copy.titleName}</span>
            <br />
            <span>{copy.titleRole}</span>
          </h1>
          <p className={styles.subtitle}>{copy.subtitle}</p>

          <div className={styles.ctaRow}>
            <a href={withLocalePath(locale, "/case-studies")} className={`${styles.button} ${styles.primaryButton}`}>
              {copy.primaryCta}
            </a>
            <a href={LINKS.whatsapp} className={`${styles.button} ${styles.secondaryButton}`} target="_blank" rel="noreferrer">
              {copy.secondaryCta}
            </a>
          </div>

          <div className={styles.quickRow}>
            <a
              href={LINKS.linkedin}
              className={`${styles.quickButton} ${styles.quickLinkedin}`}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.linkedinCta}
            >
              <span className={styles.quickIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M7.2 8.4a1.92 1.92 0 1 1 0-3.84 1.92 1.92 0 0 1 0 3.84ZM8.86 19.3H5.56V9.64h3.3v9.66ZM20 19.3h-3.3v-4.7c0-1.23-.47-2.08-1.63-2.08-.88 0-1.4.59-1.64 1.16-.08.2-.1.46-.1.73v4.89h-3.3V9.64h3.3v1.37c.44-.67 1.23-1.62 3-1.62 2.18 0 3.67 1.42 3.67 4.46v5.45Z" />
                </svg>
              </span>
              <span>{copy.linkedinCta}</span>
            </a>
            <a
              href={ctaCvLink}
              className={`${styles.quickButton} ${styles.quickCv}`}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.cvCta}
            >
              <span className={styles.quickIcon} aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path d="M5 3.8h7.1l2.9 2.9v9.5H5V3.8Zm6.8 0V7h2.2M7.6 10.1h4.9M7.6 12.7h4.9" />
                </svg>
              </span>
              <span>{copy.cvCta}</span>
            </a>
          </div>
        </div>

        <div className={styles.visualStage} aria-hidden="true">
          <div className={styles.visualBase} />
          <div className={styles.profileOrb}>
            <img src={HERO_PROFILE_IMAGE} alt={copy.panelImageAlt} className={styles.profileImage} />
          </div>
        </div>
      </div>
    </section>
  );
}
