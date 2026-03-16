"use client";

import { type ReactElement, useEffect, useId, useState } from "react";
import { type Locale } from "@/lib/i18n";
import styles from "./ProductPlaybookSection.module.css";

type ProductPlaybookSectionProps = {
  locale: Locale;
};

type PlaybookStage = {
  body: string;
  icon: "frame" | "discover" | "shape" | "deliver" | "measure";
  id: string;
  number: string;
  summary: string;
  title: string;
};

type Principle = {
  body: string;
  icon: "focus" | "iteration" | "speed";
  title: string;
};

type PlaybookCopy = {
  eyebrow: string;
  interactionHint: string;
  principlesEyebrow: string;
  principlesSubtitle: string;
  principlesTitle: string;
  processLabel: string;
  stages: PlaybookStage[];
  subtitle: string;
  title: string;
  principles: Principle[];
};

const PLAYBOOK_COPY: Record<Locale, PlaybookCopy> = {
  en: {
    eyebrow: "Product Playbook",
    title: "Product Playbook",
    subtitle:
      "A structured product system that turns ambiguity into alignment, controlled delivery, and measurable next moves.",
    processLabel: "5-stage decision system",
    interactionHint: "Hover to preview a chapter. Click to keep it open.",
    principlesEyebrow: "Execution Mode",
    principlesTitle: "How I execute",
    principlesSubtitle: "The framework stays adaptive. The standard stays high.",
    stages: [
      {
        id: "frame",
        icon: "frame",
        number: "01",
        title: "Frame the real problem",
        summary: "Turn a vague request into a sharp product decision.",
        body:
          "I align the business goal, user tension, and technical constraints into one crisp problem statement so the team knows exactly what we are solving."
      },
      {
        id: "discover",
        icon: "discover",
        number: "02",
        title: "Find the evidence that matters",
        summary: "Collect only the inputs that actually change the decision.",
        body:
          "I map the missing information, speak with the right people, and focus on evidence that reduces risk instead of creating research theater."
      },
      {
        id: "shape",
        icon: "shape",
        number: "03",
        title: "Shape strategy and tradeoffs",
        summary: "Choose the smartest path, not the biggest one.",
        body:
          "I compare options, define what we will not do, and build a plan the team can actually ship with confidence."
      },
      {
        id: "deliver",
        icon: "deliver",
        number: "04",
        title: "Drive execution with control",
        summary: "Keep design, engineering, and business moving in one lane.",
        body:
          "I translate strategy into flows, milestones, and crisp decisions so momentum stays high without losing product quality."
      },
      {
        id: "measure",
        icon: "measure",
        number: "05",
        title: "Measure, learn, and compound",
        summary: "Launch is the start of learning, not the end of work.",
        body:
          "I read product signals after release, compare them against the original bet, and decide whether to iterate, scale, or reset the approach."
      }
    ],
    principles: [
      {
        icon: "speed",
        title: "Speed with guardrails",
        body: "Move fast because the decision gates are clear, not because quality is optional."
      },
      {
        icon: "focus",
        title: "Focus that protects leverage",
        body: "Say no to noisy ideas and keep energy on the few moves that actually shift outcomes."
      },
      {
        icon: "iteration",
        title: "Iteration that builds control",
        body: "Ship, read the signal, and refine without ego so the product gets sharper every cycle."
      }
    ]
  },
  he: {
    eyebrow: "Product Playbook",
    title: "המתודולוגיה המוצרית שלי",
    subtitle: "מערכת עבודה מוצרית שמתרגמת עמימות ליישור קו, ביצוע בשליטה והחלטות עם תוצאה ברורה.",
    processLabel: "מערכת החלטה ב-5 שלבים",
    interactionHint: "מעבר עכבר מציג פרק. לחיצה משאירה אותו פתוח.",
    principlesEyebrow: "Execution Mode",
    principlesTitle: "איך זה נראה בביצוע",
    principlesSubtitle: "המסגרת נשארת אדפטיבית. הרף נשאר גבוה.",
    stages: [
      {
        id: "frame",
        icon: "frame",
        number: "01",
        title: "ממסגרים את הבעיה האמיתית",
        summary: "הופכים בקשה עמומה להחלטת מוצר חדה.",
        body:
          "אני מחבר בין היעד העסקי, כאב המשתמש והאילוצים הטכניים כדי לנסח בעיה אחת מדויקת שהצוות באמת צריך לפתור."
      },
      {
        id: "discover",
        icon: "discover",
        number: "02",
        title: "אוספים רק את הראיות שמשנות החלטה",
        summary: "מביאים פנימה רק מידע שמקטין סיכון.",
        body:
          "אני ממפה את המידע החסר, מדבר עם האנשים הנכונים ומתמקד בראיות שמצמצמות סיכון במקום לייצר תיאטרון מחקר."
      },
      {
        id: "shape",
        icon: "shape",
        number: "03",
        title: "בוחרים אסטרטגיה וטריידאופים",
        summary: "בוחרים את הנתיב החכם ביותר, לא את הגדול ביותר.",
        body:
          "אני משווה חלופות, מגדיר למה אומרים לא, ובונה תוכנית שהצוות באמת יכול לשחרר בביטחון."
      },
      {
        id: "deliver",
        icon: "deliver",
        number: "04",
        title: "מובילים ביצוע עם שליטה",
        summary: "שומרים את design, engineering והעסק באותו נתיב.",
        body:
          "אני מתרגם אסטרטגיה לפלואו, אבני דרך והחלטות חדות כדי לשמור מומנטום בלי לאבד איכות מוצר."
      },
      {
        id: "measure",
        icon: "measure",
        number: "05",
        title: "מודדים, לומדים ומכפילים",
        summary: "השקה היא תחילת הלמידה, לא סוף העבודה.",
        body:
          "אני קורא את סיגנלי המוצר אחרי השחרור, משווה אותם להימור המקורי ומחליט אם ללטש, להרחיב או לאפס את הכיוון."
      }
    ],
    principles: [
      {
        icon: "speed",
        title: "מהירות עם guardrails",
        body: "זזים מהר כי שערי ההחלטה ברורים, לא כי אפשר לוותר על איכות."
      },
      {
        icon: "focus",
        title: "פוקוס ששומר על מנוף",
        body: "אומרים לא לרעש, ומשאירים מקום רק למהלכים שבאמת משנים תוצאה."
      },
      {
        icon: "iteration",
        title: "איטרציה שמגדילה שליטה",
        body: "משחררים, קוראים את הסיגנל, ומשייפים בלי אגו כדי שהמוצר יתחזק בכל סבב."
      }
    ]
  }
};

export function ProductPlaybookSection({ locale }: ProductPlaybookSectionProps) {
  const copy = PLAYBOOK_COPY[locale];
  const defaultStageId = copy.stages[0]?.id ?? "";
  const [pinnedStageId, setPinnedStageId] = useState(defaultStageId);
  const [hoveredStageId, setHoveredStageId] = useState<string | null>(null);
  const headingId = useId();
  const detailId = useId();
  const buttonIdPrefix = useId();
  const activeStageId = hoveredStageId ?? pinnedStageId;
  const activeStage = copy.stages.find((stage) => stage.id === activeStageId) ?? copy.stages[0];
  const rtlClassName = locale === "he" ? styles.rtl : "";

  useEffect(() => {
    setPinnedStageId(defaultStageId);
    setHoveredStageId(null);
  }, [defaultStageId]);

  if (!activeStage) {
    return null;
  }

  return (
    <section className={`${styles.section} ${rtlClassName}`} aria-labelledby={headingId}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title} id={headingId}>
            {copy.title}
          </h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </header>

        <div className={styles.processSurface}>
          <div className={styles.processMeta}>
            <p className={styles.processLabel}>{copy.processLabel}</p>
            <p className={styles.interactionHint}>{copy.interactionHint}</p>
          </div>

          <div className={styles.stageArea} onMouseLeave={() => setHoveredStageId(null)}>
            <ul className={styles.stageGrid} aria-label={copy.processLabel}>
              {copy.stages.map((stage) => {
                const buttonId = `${buttonIdPrefix}-${stage.id}`;
                const isActive = activeStage.id === stage.id;
                const isPinned = pinnedStageId === stage.id;

                return (
                  <li key={stage.id}>
                    <button
                      id={buttonId}
                      type="button"
                      className={styles.stageButton}
                      data-active={isActive ? "true" : "false"}
                      data-pinned={isPinned ? "true" : "false"}
                      aria-controls={detailId}
                      aria-expanded={isActive}
                      aria-pressed={isPinned}
                      onBlur={() => {
                        setHoveredStageId((current) => (current === stage.id ? null : current));
                      }}
                      onClick={() => {
                        setPinnedStageId(stage.id);
                        setHoveredStageId(null);
                      }}
                      onFocus={() => setHoveredStageId(stage.id)}
                      onMouseEnter={() => setHoveredStageId(stage.id)}
                    >
                      <span className={styles.stageMeta}>
                        <span className={styles.stageIcon} aria-hidden="true">
                          {renderStageIcon(stage.icon)}
                        </span>
                        <span className={styles.stageNumber}>{stage.number}</span>
                      </span>
                      <span className={styles.stageTitle}>{stage.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <article
              id={detailId}
              className={styles.detailPanel}
              aria-labelledby={`${buttonIdPrefix}-${activeStage.id}`}
              aria-live="polite"
            >
              <div key={activeStage.id} className={styles.detailContent}>
                <span className={styles.detailNumber}>{activeStage.number}</span>
                <div className={styles.detailText}>
                  <h3 className={styles.detailTitle}>{activeStage.title}</h3>
                  <p className={styles.detailSummary}>{activeStage.summary}</p>
                  <p className={styles.detailBody}>{activeStage.body}</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className={styles.principlesSurface}>
          <div className={styles.principlesHeader}>
            <p className={styles.principlesEyebrow}>{copy.principlesEyebrow}</p>
            <h3 className={styles.principlesTitle}>{copy.principlesTitle}</h3>
            <p className={styles.principlesSubtitle}>{copy.principlesSubtitle}</p>
          </div>

          <div className={styles.principlesGrid}>
            {copy.principles.map((principle) => (
              <article key={principle.title} className={styles.principleItem}>
                <span className={styles.principleIcon} aria-hidden="true">
                  {renderPrincipleIcon(principle.icon)}
                </span>
                <div className={styles.principleText}>
                  <h4 className={styles.principleTitle}>{principle.title}</h4>
                  <p className={styles.principleBody}>{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderStageIcon(icon: PlaybookStage["icon"]): ReactElement {
  if (icon === "frame") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M8 5.5H5.5V8m10.5-2.5H18.5V8M8 18.5H5.5V16m10.5 2.5H18.5V16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "discover") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="10.5" cy="10.5" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m14.5 14.5 4 4M10.5 8.1v4.8M8.1 10.5h4.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (icon === "shape") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M6 6.5h8m-8 5.5h12m-12 5.5h8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <circle cx="16.5" cy="6.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8.5" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="17.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "deliver") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M5.5 7.5h13m-13 4.5h7m-7 4.5h13m-4.5-6 2.25 2.25L21 8.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        d="M5.5 18.5h13M7.5 15l3-3 2.6 2.6 4.4-5.1M17.5 9.5H14V6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function renderPrincipleIcon(icon: Principle["icon"]): ReactElement {
  if (icon === "speed") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M4.5 14.5H9m-2.5 4H3.5m8-11 4-3m-3 7 7-7m-1 6.5 3-3M13.5 20a6.5 6.5 0 1 0-6-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (icon === "focus") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        <path
          d="m15.9 8.1 2.9-2.9M18.8 5.2v4.1h-4.1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        d="M7 6.5A8 8 0 0 1 20 10m-3-3.5h3v3M17 17.5A8 8 0 0 1 4 14m3 3.5H4v-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
