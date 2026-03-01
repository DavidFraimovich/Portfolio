"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import styles from "./Hero.module.css";

const LINKS = {
  whatsapp: "https://wa.me/972452114929",
  email: "mailto:davidfr97@gmail.com",
  cvHe: "/cv/David-Fraimovich-CV-HE.pdf",
  cvEn: "/cv/David-Fraimovich-CV-EN.pdf",
  linkedin: "https://www.linkedin.com/in/david-fraimovich-843207172"
} as const;

type IconName = "mail" | "linkedin" | "cv";

type QuickLink = { label: string; href: string; icon: IconName; external?: boolean };
type StatChip = { title: string; detail: string };
type HeroCopy = {
  credibility: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  linksAriaLabel: string;
  panelKicker: string;
  panelTitle: string;
  panelText: string;
  quickLinks: QuickLink[];
  statChips: StatChip[];
};

const heroCopy: Record<Locale, HeroCopy> = {
  en: {
    credibility: "Product-first | Data-informed | Engineering-ready",
    title: "Product thinking. Engineering execution.",
    subtitle:
      "I turn messy requirements into clear roadmaps, polished experiences, and production software that ships quickly and moves measurable business metrics.",
    primaryCta: "Contact",
    secondaryCta: "Download CV",
    linksAriaLabel: "Direct links",
    panelKicker: "Execution Snapshot",
    panelTitle: "Build direction, design confidence, and shipping momentum.",
    panelText: "One workflow from discovery to release, tuned for signal, speed, and maintainable delivery.",
    quickLinks: [
      { label: "Email", href: LINKS.email, icon: "mail" },
      { label: "LinkedIn", href: LINKS.linkedin, icon: "linkedin", external: true },
      { label: "CV (HE)", href: LINKS.cvHe, icon: "cv", external: true },
      { label: "CV (EN)", href: LINKS.cvEn, icon: "cv", external: true }
    ],
    statChips: [
      { title: "PM mindset", detail: "Clear priorities and useful tradeoffs" },
      { title: "Full-stack", detail: "Strategy, UX, and engineering execution" },
      { title: "Fast shipping", detail: "Short cycles with measurable outcomes" }
    ]
  },
  he: {
    credibility: "מוצר תחילה | מבוסס דאטה | מוכן להנדסה",
    title: "חשיבה מוצרית. ביצוע הנדסי.",
    subtitle:
      "אני הופך דרישות מורכבות למפת דרך ברורה, חוויית משתמש מדויקת ותוכנה יציבה שנשלחת מהר ומייצרת אימפקט מדיד.",
    primaryCta: "יצירת קשר",
    secondaryCta: 'הורדת קו"ח',
    linksAriaLabel: "קישורים מהירים",
    panelKicker: "תמונת מצב",
    panelTitle: "כיוון מוצרי ברור, חוויית משתמש מדויקת וקצב שילוח מהיר.",
    panelText: "תהליך אחד מקצה לקצה: מבעיה, דרך החלטות מוצר, עד השקה יציבה עם תוצאות מדידות.",
    quickLinks: [
      { label: "אימייל", href: LINKS.email, icon: "mail" },
      { label: "לינקדאין", href: LINKS.linkedin, icon: "linkedin", external: true },
      { label: 'קו"ח (HE)', href: LINKS.cvHe, icon: "cv", external: true },
      { label: 'קו"ח (EN)', href: LINKS.cvEn, icon: "cv", external: true }
    ],
    statChips: [
      { title: "מיינדסט PM", detail: "פוקוס על עדיפויות ופשרות נכונות" },
      { title: "פול-סטאק", detail: "אסטרטגיה, UX וביצוע הנדסי" },
      { title: "משלוח מהיר", detail: "מחזורי פיתוח קצרים עם תוצאות" }
    ]
  }
};

const particles: Array<{ size: number; left: number; top: number; duration: number; delay: number }> = [
  { size: 5, left: 12, top: 17, duration: 8, delay: 0.2 },
  { size: 7, left: 23, top: 28, duration: 10, delay: 0.6 },
  { size: 4, left: 34, top: 58, duration: 9, delay: 0.1 },
  { size: 6, left: 43, top: 19, duration: 11, delay: 0.8 },
  { size: 5, left: 52, top: 40, duration: 8.8, delay: 0.4 },
  { size: 8, left: 66, top: 26, duration: 10.5, delay: 1.1 },
  { size: 4, left: 74, top: 63, duration: 9.5, delay: 0.3 },
  { size: 6, left: 82, top: 46, duration: 10.8, delay: 1.4 },
  { size: 5, left: 91, top: 22, duration: 8.2, delay: 0.7 }
];

function LinkIcon({ name }: { name: IconName }) {
  if (name === "mail") {
    return (
      <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
        <path d="M3.2 5.6h13.6v8.8H3.2V5.6Zm1.7 1.3 5.1 4.2 5.1-4.2" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg className={styles.linkedinGlyph} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M7.2 8.4a1.92 1.92 0 1 1 0-3.84 1.92 1.92 0 0 1 0 3.84ZM8.86 19.3H5.56V9.64h3.3v9.66ZM20 19.3h-3.3v-4.7c0-1.23-.47-2.08-1.63-2.08-.88 0-1.4.59-1.64 1.16-.08.2-.1.46-.1.73v4.89h-3.3V9.64h3.3v1.37c.44-.67 1.23-1.62 3-1.62 2.18 0 3.67 1.42 3.67 4.46v5.45Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
      <path d="M5 3.8h7.1l2.9 2.9v9.5H5V3.8Zm6.8 0V7h2.2M7.6 10.1h4.9M7.6 12.7h4.9" />
    </svg>
  );
}

type HeroProps = {
  locale?: Locale;
};

export function Hero({ locale = "en" }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const copy = heroCopy[locale];
  const ctaCvLink = locale === "he" ? LINKS.cvHe : LINKS.cvEn;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 75, damping: 20, mass: 0.75 };
  const farX = useSpring(useTransform(pointerX, (value) => value * -12), springConfig);
  const farY = useSpring(useTransform(pointerY, (value) => value * -12), springConfig);
  const midX = useSpring(useTransform(pointerX, (value) => value * -8), springConfig);
  const midY = useSpring(useTransform(pointerY, (value) => value * -8), springConfig);
  const nearX = useSpring(useTransform(pointerX, (value) => value * 10), springConfig);
  const nearY = useSpring(useTransform(pointerY, (value) => value * 10), springConfig);
  const panelX = useSpring(useTransform(pointerX, (value) => value * 12), springConfig);
  const panelY = useSpring(useTransform(pointerY, (value) => value * 12), springConfig);

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncTouchState = () => setIsTouchDevice(query.matches);
    syncTouchState();

    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", syncTouchState);
      return () => query.removeEventListener("change", syncTouchState);
    }

    query.addListener(syncTouchState);
    return () => query.removeListener(syncTouchState);
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || isTouchDevice) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const enterTransition = (delay: number) => ({
    duration: shouldReduceMotion ? 0 : 0.72,
    delay: shouldReduceMotion ? 0 : delay
  });

  const hoverAnimation = shouldReduceMotion ? undefined : { y: -2, scale: 1.01 };
  const tapAnimation = shouldReduceMotion ? undefined : { scale: 0.99 };

  return (
    <section
      className={`${styles.hero} ${styles.heroAnimatedBg} ${shouldReduceMotion ? styles.reduced : ""}`}
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.background} aria-hidden="true">
        <motion.div className={styles.layerFar} style={{ x: farX, y: farY }}>
          <motion.div className={styles.gradientVeil} />
          <motion.div
            className={styles.ambientGlowOne}
            animate={shouldReduceMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={styles.ambientGlowTwo}
            animate={shouldReduceMotion ? undefined : { x: [0, -14, 0], y: [0, 10, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div className={styles.layerMid} style={{ x: midX, y: midY }}>
          <div className={styles.dotMatrix} />
          <div className={styles.movingLine} />
        </motion.div>

        <motion.div className={styles.layerNear} style={{ x: nearX, y: nearY }}>
          <div className={styles.orbitRing} />
          <div className={styles.particles}>
            {particles.map((particle, index) => (
              <motion.span
                key={`particle-${index}`}
                className={styles.particle}
                style={
                  {
                    "--size": `${particle.size}px`,
                    "--left": `${particle.left}%`,
                    "--top": `${particle.top}%`
                  } as CSSProperties
                }
                animate={shouldReduceMotion ? undefined : { y: [0, -14, 0], opacity: [0.28, 0.78, 0.28] }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.p
            className={styles.credibility}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition(0.04)}
          >
            {copy.credibility}
          </motion.p>

          <motion.h1
            id="hero-title"
            className={styles.title}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition(0.1)}
          >
            {copy.title}
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition(0.2)}
          >
            {copy.subtitle}
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition(0.3)}
          >
            <motion.a
              href={LINKS.whatsapp}
              className={`${styles.button} ${styles.primaryButton}`}
              target="_blank"
              rel="noreferrer"
              whileHover={hoverAnimation}
              whileTap={tapAnimation}
            >
              {copy.primaryCta}
            </motion.a>
            <motion.a
              href={ctaCvLink}
              className={`${styles.button} ${styles.secondaryButton}`}
              target="_blank"
              rel="noreferrer"
              whileHover={hoverAnimation}
              whileTap={tapAnimation}
            >
              {copy.secondaryCta}
            </motion.a>
          </motion.div>

          <motion.nav
            className={styles.linksRow}
            aria-label={copy.linksAriaLabel}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition(0.35)}
          >
            {copy.quickLinks.map((item) => (
              <a
                key={item.label}
                className={styles.linkItem}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                <span
                  className={`${styles.linkIcon} ${item.icon === "linkedin" ? styles.linkedinIcon : ""}`}
                >
                  <LinkIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </motion.nav>
        </div>

        <motion.aside
          className={styles.panel}
          style={shouldReduceMotion || isTouchDevice ? undefined : { x: panelX, y: panelY }}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enterTransition(0.22)}
        >
          <p className={styles.panelKicker}>{copy.panelKicker}</p>
          <h2 className={styles.panelTitle}>{copy.panelTitle}</h2>
          <p className={styles.panelText}>{copy.panelText}</p>
          <div className={styles.statGrid}>
            {copy.statChips.map((chip) => (
              <div key={chip.title} className={styles.statChip}>
                <p className={styles.statTitle}>{chip.title}</p>
                <p className={styles.statDetail}>{chip.detail}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
