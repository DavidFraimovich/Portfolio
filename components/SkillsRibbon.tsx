"use client";

import { useEffect, useRef, useState } from "react";
import { type Locale } from "@/lib/i18n";
import styles from "./SkillsRibbon.module.css";

type SkillsRibbonProps = {
  locale: Locale;
};

const skillsByLocale: Record<Locale, string[]> = {
  en: [
    "Project Management",
    "Product",
    "Agile / Scrum",
    "UX / UI",
    "Market & User Research",
    "Product Analytics (GA / Mixpanel)",
    "Prototyping",
    "PRD Writing",
    "Specification Documents",
    "API Integration",
    "Team & Vendor Management",
    "Process Engineering",
    "Data",
    "BI",
    "Roadmapping",
    "Backlog Prioritization",
    "Stakeholder Management",
    "Cross-Team Leadership",
    "0->1 MVP Delivery",
    "Go-To-Market",
    "A/B Testing",
    "KPI-Driven Execution"
  ],
  he: [
    "ניהול פרויקטים",
    "Product",
    "Agile / Scrum",
    "UX / UI",
    "מחקר שוק ומשתמשים",
    "ניתוח מוצרים (GA / Mixpanel)",
    "Prototyping",
    "בניית PRD",
    "כתיבת מסמכי אפיון",
    "API Integration",
    "ניהול צוותים וספקים",
    "Process Engineering",
    "Data",
    "BI",
    "ניהול Roadmap",
    "תיעדוף Backlog",
    "ניהול בעלי עניין",
    "הובלה בין-צוותית",
    "0->1 MVP",
    "Go-To-Market",
    "A/B Testing",
    "ביצוע ממוקד KPI"
  ]
};

const ariaLabelByLocale: Record<Locale, string> = {
  en: "Core skills",
  he: "יכולות מובילות"
};

const titleByLocale: Record<Locale, string> = {
  en: "Skills",
  he: "מיומנויות"
};

export function SkillsRibbon({ locale }: SkillsRibbonProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const skills = skillsByLocale[locale];
  const duplicatedSkills = [...skills, ...skills];
  const rtlClassName = locale === "he" ? styles.rtl : "";
  const activeClassName = hasStarted ? styles.active : "";

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setHasStarted(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(sectionEl);

    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${rtlClassName} ${activeClassName}`}
      aria-label={ariaLabelByLocale[locale]}
    >
      <div className={styles.shell}>
        <h2 className={styles.title}>{titleByLocale[locale]}</h2>
        <div className={styles.rail}>
          <div className={styles.track}>
            {duplicatedSkills.map((skill, index) => (
              <span className={styles.skillChip} key={`${skill}-${index}`}>
                <span className={styles.hashIcon} aria-hidden="true">
                  #
                </span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
