"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import styles from "./WindmillsCtaSection.module.css";

type Props = {
  locale: Locale;
};

type MarketingCopy = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

const sectionCopy: Record<Locale, MarketingCopy> = {
  en: {
    title: "When the winds of change blow,",
    subtitle: "some people build walls and others build windmills.",
    imageAlt: "Historic windmills near the water at Kinderdijk"
  },
  he: {
    title: "כשרוחות השינוי נושבות,",
    subtitle: "יש שבונים חומות ויש שבונים טחנות רוח.",
    imageAlt: "טחנות רוח היסטוריות לצד המים בקינדרדייק"
  }
};

const WINDMILLS_IMAGE = withVersionedAssetPath("/images/home/windmills-panorama.jpg");

export function WindmillsCtaSection({ locale }: Props) {
  const reducedMotion = useReducedMotion();
  const copy = sectionCopy[locale];

  return (
    <section
      className={styles.section}
      aria-labelledby="windmills-cta-title"
      data-footer-overlap-anchor="windmills"
    >
      <div className={styles.scene}>
        <motion.img
          src={WINDMILLS_IMAGE}
          alt={copy.imageAlt}
          className={styles.image}
          loading="lazy"
          initial={reducedMotion ? false : { y: -28, scale: 1.11 }}
          whileInView={reducedMotion ? undefined : { y: 0, scale: 1.03 }}
          viewport={{ amount: 0.45, once: false }}
          transition={{ duration: 1.1, ease: [0.2, 0.9, 0.26, 1] }}
        />

        <motion.div
          className={styles.copyWrap}
          initial={reducedMotion ? false : { y: 26, opacity: 0.72 }}
          whileInView={reducedMotion ? undefined : { y: 0, opacity: 1 }}
          viewport={{ amount: 0.5, once: false }}
          transition={{ duration: 0.8, ease: [0.24, 1, 0.34, 1] }}
        >
          <div className={`${styles.quoteIcon} ${styles.quoteStart}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <h2 id="windmills-cta-title" className={styles.title}>
            {copy.title}
          </h2>
          <h3 className={styles.subtitle}>{copy.subtitle}</h3>

          <div className={`${styles.quoteIcon} ${styles.quoteEnd}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
