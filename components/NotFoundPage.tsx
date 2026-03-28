"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./NotFoundPage.module.css";

export type NotFoundCopy = {
  title: string;
  description: string;
  homeCta: string;
  caseStudiesCta: string;
};

type Props = {
  copyByLocale: Record<"en" | "he", NotFoundCopy>;
};

const localeOptions = ["en", "he"] as const;

function resolveLocaleFromPathname(pathname: string): "en" | "he" | null {
  const segments = pathname.split("/").filter(Boolean);

  for (const segment of segments) {
    if (segment === "en" || segment === "he") {
      return segment;
    }
  }

  return null;
}

function getPathnameForDisplay(pathname: string): string {
  if (!pathname || pathname === "/") return "";
  return pathname;
}

function LocaleActions({ locale, copy }: { locale: "en" | "he"; copy: NotFoundCopy }) {
  return (
    <div className={styles.actions}>
      <Link className={styles.primaryAction} href={`/${locale}`}>
        {copy.homeCta}
      </Link>
      <Link className={styles.secondaryAction} href={`/${locale}/case-studies`}>
        {copy.caseStudiesCta}
      </Link>
    </div>
  );
}

export function NotFoundPage({ copyByLocale }: Props) {
  const pathname = usePathname() ?? "";
  const [browserPathname, setBrowserPathname] = useState("");

  useEffect(() => {
    setBrowserPathname(window.location.pathname);
  }, []);

  const resolvedPathname = browserPathname || pathname;
  const displayPathname = getPathnameForDisplay(resolvedPathname);
  const activeLocale = resolveLocaleFromPathname(resolvedPathname);

  if (activeLocale) {
    const copy = copyByLocale[activeLocale];

    return (
      <section className={styles.shell} aria-labelledby="not-found-title">
        <div className={styles.backdrop} aria-hidden="true" />
        <div className={styles.panel}>
          <p className={styles.code}>404</p>
          <div
            className={styles.localeContent}
            data-locale={activeLocale}
            dir={activeLocale === "he" ? "rtl" : "ltr"}
            lang={activeLocale}
          >
            <h1 className={styles.title} id="not-found-title">
              {copy.title}
            </h1>
            <p className={styles.description}>{copy.description}</p>
            {displayPathname ? <p className={styles.pathChip}>{displayPathname}</p> : null}
            <LocaleActions locale={activeLocale} copy={copy} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.shell} aria-labelledby="not-found-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.panel}>
        <p className={styles.code}>404</p>
        <div className={styles.fallbackHeader}>
          <h1 className={styles.title} id="not-found-title">
            {copyByLocale.en.title} / {copyByLocale.he.title}
          </h1>
          {displayPathname ? <p className={styles.pathChip}>{displayPathname}</p> : null}
        </div>
        <div className={styles.localeGrid}>
          {localeOptions.map((locale) => {
            const copy = copyByLocale[locale];

            return (
              <article
                key={locale}
                className={styles.localeCard}
                data-locale={locale}
                dir={locale === "he" ? "rtl" : "ltr"}
                lang={locale}
              >
                <h2 className={styles.cardTitle}>{copy.title}</h2>
                <p className={styles.cardDescription}>{copy.description}</p>
                <LocaleActions locale={locale} copy={copy} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
