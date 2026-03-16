"use client";

import {
  Crosshair,
  Gauge,
  LineChart,
  ListChecks,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Target,
  type LucideIcon
} from "lucide-react";
import { useEffect, useId, useState } from "react";
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
  principlesTitle: string;
  stages: PlaybookStage[];
  subtitle: string;
  title: string;
  principles: Principle[];
};

const STAGE_ICONS: Record<PlaybookStage["icon"], LucideIcon> = {
  frame: Target,
  discover: Search,
  shape: SlidersHorizontal,
  deliver: ListChecks,
  measure: LineChart
};

const PRINCIPLE_ICONS: Record<Principle["icon"], LucideIcon> = {
  speed: Gauge,
  focus: Crosshair,
  iteration: RefreshCcw
};

const PLAYBOOK_COPY: Record<Locale, PlaybookCopy> = {
  en: {
    title: "Product Playbook",
    subtitle: "My systematic approach to taking products from idea to impact",
    principlesTitle: "How I work",
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
        title: "Gather evidence, not noise",
        summary: "Only information that reduces risk and sharpens direction gets in.",
        body:
          "I map what is still unknown, validate it with the right people, and prioritize insights that help the team choose well instead of running a bloated research process."
      },
      {
        id: "shape",
        icon: "shape",
        number: "03",
        title: "Set direction and make the hard calls",
        summary: "Good strategy is defined by what we do not do.",
        body:
          "I evaluate options, set priorities, and turn decisions into a plan the team can actually ship without losing focus."
      },
      {
        id: "deliver",
        icon: "deliver",
        number: "04",
        title: "Align design, engineering, and business around one direction",
        summary: "Close gaps before they turn into delays.",
        body:
          "I turn strategy into working flows, decision points, and clear milestones so the team can keep moving with clarity without compromising product quality."
      },
      {
        id: "measure",
        icon: "measure",
        number: "05",
        title: "Measure, learn, and improve forward",
        summary: "Launch is the start of learning, not the end of the process.",
        body:
          "I check performance against the original assumptions and decide whether to refine, expand, or change direction."
      }
    ],
    principles: [
      {
        icon: "speed",
        title: "Speed with clear limits",
        body: "Move fast because the guardrails are clear, not because quality is optional."
      },
      {
        icon: "focus",
        title: "Focus on leverage",
        body: "Say no to noise and keep energy on the few moves that truly change the outcome."
      },
      {
        icon: "iteration",
        title: "Iterate with control",
        body: "Ship, read the signal, and tighten the product without ego so every cycle gets sharper."
      }
    ]
  },
  he: {
    title: "המתודולוגיה המוצרית שלי",
    subtitle: "הגישה השיטתית שלי לקחת מוצרים מרעיון להשפעה",
    principlesTitle: "איך אני עובד",
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
        title: "אוספים ראיות, לא רעש",
        summary: "רק מידע שמקטין סיכון ומחדד את הכיוון נכנס פנימה.",
        body:
          "אני ממפה את מה שחסר לדעת, בודק אותו מול האנשים הנכונים, ומתעדף תובנות שעוזרות לבחור נכון במקום לייצר תהליך מחקרי מנופח."
      },
      {
        id: "shape",
        icon: "shape",
        number: "03",
        title: "מגדירים כיוון ומקבלים החלטות קשות",
        summary: "אסטרטגיה טובה נמדדת גם במה שלא עושים.",
        body:
          "אני בוחן חלופות, קובע סדרי עדיפויות, ומתרגם את ההחלטות לתוכנית שאפשר באמת לשחרר בלי להתפזר."
      },
      {
        id: "deliver",
        icon: "deliver",
        number: "04",
        title: "מיישרים את העיצוב, הפיתוח והעסק סביב אותו כיוון",
        summary: "מונעים פערים לפני שהם הופכים לעיכובים.",
        body:
          "אני הופך את האסטרטגיה לזרימות עבודה, נקודות הכרעה ואבני דרך ברורות כדי לשמור על התקדמות חדה בלי לפגוע באיכות המוצר."
      },
      {
        id: "measure",
        icon: "measure",
        number: "05",
        title: "מודדים, לומדים ומשפרים קדימה",
        summary: "השקה היא תחילת הלמידה, לא סוף העבודה.",
        body:
          "אני בודק את הביצועים מול ההנחות, ומחליט אם ללטש, להרחיב או לשנות כיוון."
      }
    ],
    principles: [
      {
        icon: "speed",
        title: "מהירות",
        body: "זזים מהר כי הגבולות ברורים, לא כי אפשר לוותר על איכות."
      },
      {
        icon: "focus",
        title: "פוקוס",
        body: "אומרים לא לרעש ומשאירים אנרגיה רק למהלכים שבאמת משנים את התוצאה."
      },
      {
        icon: "iteration",
        title: "איטרציות שמגדילות תוצאות",
        body: "משחררים, קוראים את הסיגנל ומדייקים בלי אגו כדי שכל סבב יחזק את המוצר."
      }
    ]
  }
};

export function ProductPlaybookSection({ locale }: ProductPlaybookSectionProps) {
  const copy = PLAYBOOK_COPY[locale];
  const defaultStageId = copy.stages[0]?.id ?? "";
  const [activeStageId, setActiveStageId] = useState(defaultStageId);
  const [canHover, setCanHover] = useState(false);
  const headingId = useId();
  const panelIdPrefix = useId();
  const buttonIdPrefix = useId();
  const rtlClassName = locale === "he" ? styles.rtl : "";

  useEffect(() => {
    setActiveStageId(defaultStageId);
  }, [defaultStageId]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 881px)");
    const updateCanHover = () => setCanHover(mediaQuery.matches);

    updateCanHover();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateCanHover);
      return () => mediaQuery.removeEventListener("change", updateCanHover);
    }

    mediaQuery.addListener(updateCanHover);
    return () => mediaQuery.removeListener(updateCanHover);
  }, []);

  if (!copy.stages.length) {
    return null;
  }

  return (
    <section className={`${styles.section} ${rtlClassName}`} aria-labelledby={headingId}>
      <div className={styles.shell}>
        <div className={styles.processSurface}>
          <div className={styles.processHeader}>
            <div className={styles.processCopy}>
              <h2 className={styles.title} id={headingId}>
                {copy.title}
              </h2>
              <p className={styles.subtitle}>{copy.subtitle}</p>
            </div>
          </div>

          <ul className={styles.accordion} aria-label={copy.title}>
            {copy.stages.map((stage) => {
              const isActive = activeStageId === stage.id;
              const buttonId = `${buttonIdPrefix}-${stage.id}`;
              const panelId = `${panelIdPrefix}-${stage.id}`;
              const Icon = STAGE_ICONS[stage.icon];

              return (
                <li
                  key={stage.id}
                  className={styles.panel}
                  data-active={isActive ? "true" : "false"}
                  onMouseEnter={() => {
                    if (canHover) {
                      setActiveStageId(stage.id);
                    }
                  }}
                >
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.panelTrigger}
                    aria-controls={panelId}
                    aria-expanded={isActive}
                    onClick={() => {
                      if (!canHover) {
                        setActiveStageId(stage.id);
                      }
                    }}
                    onFocus={() => setActiveStageId(stage.id)}
                  >
                    <span className={styles.panelMeta}>
                      <span className={styles.panelNumber}>{stage.number}</span>
                      <Icon className={styles.panelIcon} aria-hidden="true" strokeWidth={1.85} />
                    </span>
                    <span className={styles.panelTitle}>{stage.title}</span>
                  </button>

                  <div
                    id={panelId}
                    className={styles.panelBody}
                    aria-hidden={!isActive}
                    aria-labelledby={buttonId}
                  >
                    <p className={styles.panelSummary}>{stage.summary}</p>
                    <p className={styles.panelDescription}>{stage.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.principlesSurface}>
          <h3 className={styles.principlesTitle}>{copy.principlesTitle}</h3>

          <div className={styles.principlesGrid}>
            {copy.principles.map((principle) => {
              const Icon = PRINCIPLE_ICONS[principle.icon];

              return (
                <article key={principle.title} className={styles.principleItem}>
                  <Icon className={styles.principleIcon} aria-hidden="true" strokeWidth={1.85} />
                  <h4 className={styles.principleTitle}>{principle.title}</h4>
                  <p className={styles.principleBody}>{principle.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
