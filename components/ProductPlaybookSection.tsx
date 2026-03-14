"use client";

import { type ReactElement, useEffect, useId, useState } from "react";
import { type Locale } from "@/lib/i18n";
import styles from "./ProductPlaybookSection.module.css";

type ProductPlaybookSectionProps = {
  locale: Locale;
};

type PlaybookStage = {
  body: string;
  gate: string;
  id: string;
  kicker: string;
  number: string;
  outputs: string[];
  signals: string[];
  summary: string;
  title: string;
};

type Principle = {
  body: string;
  icon: "focus" | "iteration" | "speed";
  note: string;
  title: string;
};

type PlaybookCopy = {
  decisionLabel: string;
  eyebrow: string;
  interactionHint: string;
  outputsLabel: string;
  pinnedLabel: string;
  previewLabel: string;
  principlesEyebrow: string;
  principlesSubtitle: string;
  principlesTitle: string;
  processLabel: string;
  processText: string;
  signalsLabel: string;
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
    processText: "Each chapter removes a different layer of risk before I advance the product.",
    interactionHint: "Hover to preview a chapter. Click to keep it open.",
    decisionLabel: "Decision gate",
    outputsLabel: "What this stage resolves",
    signalsLabel: "Signals that unlock the next move",
    pinnedLabel: "Pinned",
    previewLabel: "Preview",
    principlesEyebrow: "Execution Mode",
    principlesTitle: "How I execute",
    principlesSubtitle: "The framework stays adaptive. The standard stays high.",
    stages: [
      {
        id: "frame",
        number: "01",
        kicker: "Clarity before motion",
        title: "Frame the real problem",
        summary: "Turn a vague request into a sharp product decision.",
        body:
          "I align the business goal, user tension, and technical constraints into one crisp problem statement so the team knows exactly what we are solving.",
        gate: "We move only once success, scope pressure, and non-negotiables are explicit.",
        outputs: [
          "Define the north-star outcome and the fixed constraints",
          "Separate the real problem from stakeholder noise",
          "Set the success frame before discussing solutions"
        ],
        signals: ["Business tension named", "User pain validated", "Constraints visible"]
      },
      {
        id: "discover",
        number: "02",
        kicker: "Signal over noise",
        title: "Find the evidence that matters",
        summary: "Collect only the inputs that actually change the decision.",
        body:
          "I map the missing information, speak with the right people, and focus on evidence that reduces risk instead of creating research theater.",
        gate: "We move once the biggest unknowns are named and the assumptions are testable.",
        outputs: [
          "Validate the user's job and core friction",
          "Expose dependency risk early",
          "Separate useful signal from internal opinion"
        ],
        signals: ["Top risks ranked", "Assumptions written", "Users and stakeholders heard"]
      },
      {
        id: "shape",
        number: "03",
        kicker: "Direction with intent",
        title: "Shape strategy and tradeoffs",
        summary: "Choose the smartest path, not the biggest one.",
        body:
          "I compare options, define what we will not do, and build a plan the team can actually ship with confidence.",
        gate: "We move only when priorities are clear enough to protect focus during delivery.",
        outputs: [
          "Rank options by impact, effort, and leverage",
          "Lock the first version around value, not volume",
          "Align stakeholders on why this path wins now"
        ],
        signals: ["Tradeoffs accepted", "Scope protected", "Ownership aligned"]
      },
      {
        id: "deliver",
        number: "04",
        kicker: "Alignment in motion",
        title: "Drive execution with control",
        summary: "Keep design, engineering, and business moving in one lane.",
        body:
          "I translate strategy into flows, milestones, and crisp decisions so momentum stays high without losing product quality.",
        gate: "We move once teams can execute without ambiguity or cross-team drift.",
        outputs: [
          "Convert intent into milestones and decision checkpoints",
          "Resolve blockers before they become delivery debt",
          "Protect the user experience while shipping fast"
        ],
        signals: ["Dependencies visible", "Blockers surfaced early", "Team decisions stay synced"]
      },
      {
        id: "measure",
        number: "05",
        kicker: "Learning as leverage",
        title: "Measure, learn, and compound",
        summary: "Launch is the start of learning, not the end of work.",
        body:
          "I read product signals after release, compare them against the original bet, and decide whether to iterate, scale, or reset the approach.",
        gate: "We move once data and qualitative feedback tell the same story clearly enough to act.",
        outputs: [
          "Read adoption, friction, and behavior changes",
          "Turn findings into a sharper next iteration",
          "Compound wins instead of celebrating activity"
        ],
        signals: ["KPIs compared to baseline", "Feedback patterns repeat", "The next bet becomes obvious"]
      }
    ],
    principles: [
      {
        icon: "speed",
        title: "Speed with guardrails",
        body: "Move fast because the decision gates are clear, not because quality is optional.",
        note: "Fast, not rushed."
      },
      {
        icon: "focus",
        title: "Focus that protects leverage",
        body: "Say no to noisy ideas and keep energy on the few moves that actually shift outcomes.",
        note: "Fewer bets. Stronger impact."
      },
      {
        icon: "iteration",
        title: "Iteration that builds control",
        body: "Ship, read the signal, and refine without ego so the product gets sharper every cycle.",
        note: "Launch. Learn. Tighten."
      }
    ]
  },
  he: {
    eyebrow: "Product Playbook",
    title: "המתודולוגיה המוצרית שלי",
    subtitle: "מערכת עבודה מוצרית שמתרגמת עמימות ליישור קו, ביצוע בשליטה והחלטות עם תוצאה ברורה.",
    processLabel: "מערכת החלטה ב-5 שלבים",
    processText: "כל פרק סוגר שכבת סיכון אחרת לפני שממשיכים לשלב הבא.",
    interactionHint: "מעבר עכבר מציג פרק. לחיצה משאירה אותו פתוח.",
    decisionLabel: "שער החלטה",
    outputsLabel: "מה השלב הזה סוגר",
    signalsLabel: "הסיגנלים שמעבירים הלאה",
    pinnedLabel: "מקובע",
    previewLabel: "בתצוגה",
    principlesEyebrow: "Execution Mode",
    principlesTitle: "איך זה נראה בביצוע",
    principlesSubtitle: "המסגרת נשארת אדפטיבית. הרף נשאר גבוה.",
    stages: [
      {
        id: "frame",
        number: "01",
        kicker: "בהירות לפני תנועה",
        title: "ממסגרים את הבעיה האמיתית",
        summary: "הופכים בקשה עמומה להחלטת מוצר חדה.",
        body:
          "אני מחבר בין היעד העסקי, כאב המשתמש והאילוצים הטכניים כדי לנסח בעיה אחת מדויקת שהצוות באמת צריך לפתור.",
        gate: "ממשיכים רק כשברור איך נראית הצלחה, איפה הלחץ, ומה לא זז.",
        outputs: [
          "מגדיר תוצאה רצויה ואילוצים שלא נוגעים בהם",
          "מפריד בין הבעיה האמיתית לרעש סביבתי",
          "מיישר קו על הצלחה עוד לפני שמדברים פתרון"
        ],
        signals: ["המתח העסקי ברור", "כאב המשתמש מגובה", "האילוצים גלויים"]
      },
      {
        id: "discover",
        number: "02",
        kicker: "סיגנל לפני רעש",
        title: "אוספים רק את הראיות שמשנות החלטה",
        summary: "מביאים פנימה רק מידע שמקטין סיכון.",
        body:
          "אני ממפה את המידע החסר, מדבר עם האנשים הנכונים ומתמקד בראיות שמצמצמות סיכון במקום לייצר תיאטרון מחקר.",
        gate: "ממשיכים כשהלא-נודע המרכזי ממופה וההנחות ניתנות לבדיקה.",
        outputs: [
          "מאמת את המשימה והחיכוך של המשתמש",
          "מציף מוקדם תלויות וסיכוני מערכת",
          "מפריד בין סיגנל שימושי לדעה פנימית"
        ],
        signals: ["הסיכונים מדורגים", "ההנחות כתובות", "הקולות הנכונים נשמעו"]
      },
      {
        id: "shape",
        number: "03",
        kicker: "כיוון עם כוונה",
        title: "בוחרים אסטרטגיה וטריידאופים",
        summary: "בוחרים את הנתיב החכם ביותר, לא את הגדול ביותר.",
        body:
          "אני משווה חלופות, מגדיר למה אומרים לא, ובונה תוכנית שהצוות באמת יכול לשחרר בביטחון.",
        gate: "ממשיכים רק כשהעדיפויות מספיק חדות כדי להגן על פוקוס בזמן ביצוע.",
        outputs: [
          "מדרג חלופות לפי אימפקט, מאמץ ומנוף",
          "נועל גרסה ראשונה סביב ערך ולא סביב נפח",
          "מיישר בעלי עניין על למה זה הכיוון הנכון עכשיו"
        ],
        signals: ["הטריידאופים מוסכמים", "הסקופ מוגן", "הבעלות ברורה"]
      },
      {
        id: "deliver",
        number: "04",
        kicker: "יישור קו בתנועה",
        title: "מובילים ביצוע עם שליטה",
        summary: "שומרים את design, engineering והעסק באותו נתיב.",
        body:
          "אני מתרגם אסטרטגיה לפלואו, אבני דרך והחלטות חדות כדי לשמור מומנטום בלי לאבד איכות מוצר.",
        gate: "ממשיכים כשהצוותים יכולים לבצע בלי עמימות ובלי drift בין גורמים.",
        outputs: [
          "מתרגם כוונה לאבני דרך ולנקודות החלטה",
          "פותח חסמים לפני שהם נהפכים לחוב מסירה",
          "שומר על חוויית המשתמש גם כשזזים מהר"
        ],
        signals: ["התלויות גלויות", "חסמים עולים מוקדם", "החלטות הצוות נשארות מסונכרנות"]
      },
      {
        id: "measure",
        number: "05",
        kicker: "למידה כמנוף",
        title: "מודדים, לומדים ומכפילים",
        summary: "השקה היא תחילת הלמידה, לא סוף העבודה.",
        body:
          "אני קורא את סיגנלי המוצר אחרי השחרור, משווה אותם להימור המקורי ומחליט אם ללטש, להרחיב או לאפס את הכיוון.",
        gate: "ממשיכים כשהדאטה והפידבק האיכותני מספרים סיפור מספיק ברור כדי לפעול.",
        outputs: [
          "קורא אימוץ, חיכוך ושינוי התנהגות",
          "מתרגם ממצאים לאיטרציה חדה יותר",
          "מגדיל ניצחונות במקום לחגוג עשייה"
        ],
        signals: ["ה-KPIs מול הבייסליין", "דפוסי פידבק חוזרים", "המהלך הבא ברור"]
      }
    ],
    principles: [
      {
        icon: "speed",
        title: "מהירות עם guardrails",
        body: "זזים מהר כי שערי ההחלטה ברורים, לא כי אפשר לוותר על איכות.",
        note: "מהר, לא בפזיזות."
      },
      {
        icon: "focus",
        title: "פוקוס ששומר על מנוף",
        body: "אומרים לא לרעש, ומשאירים מקום רק למהלכים שבאמת משנים תוצאה.",
        note: "פחות הימורים. יותר אימפקט."
      },
      {
        icon: "iteration",
        title: "איטרציה שמגדילה שליטה",
        body: "משחררים, קוראים את הסיגנל, ומשייפים בלי אגו כדי שהמוצר יתחזק בכל סבב.",
        note: "משיקים. לומדים. מדייקים."
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
  const activeButtonId = `${buttonIdPrefix}-${activeStage.id}`;
  const rtlClassName = locale === "he" ? styles.rtl : "";

  useEffect(() => {
    setPinnedStageId(defaultStageId);
    setHoveredStageId(null);
  }, [defaultStageId]);

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
          <div className={styles.processIntro}>
            <div className={styles.processLead}>
              <span className={styles.processTag}>{copy.processLabel}</span>
              <p className={styles.processText}>{copy.processText}</p>
            </div>
            <p className={styles.interactionHint}>{copy.interactionHint}</p>
          </div>

          <div className={styles.processLayout}>
            <div className={styles.stageRail} onMouseLeave={() => setHoveredStageId(null)}>
              <span className={styles.stageTrack} aria-hidden="true" />
              <ul className={styles.stageList}>
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
                        onClick={() => setPinnedStageId(stage.id)}
                        onFocus={() => setHoveredStageId(stage.id)}
                        onMouseEnter={() => setHoveredStageId(stage.id)}
                      >
                        <span className={styles.stageNumber}>{stage.number}</span>
                        <span className={styles.stageMain}>
                          <span className={styles.stageKicker}>{stage.kicker}</span>
                          <span className={styles.stageTitle}>{stage.title}</span>
                        </span>
                        <span className={styles.stageSummary}>{stage.summary}</span>
                        <span className={styles.stageFooter}>
                          {isPinned ? <span className={styles.stageStatePinned}>{copy.pinnedLabel}</span> : null}
                          {isActive && !isPinned ? <span className={styles.stageStatePreview}>{copy.previewLabel}</span> : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <article
              id={detailId}
              className={styles.detailCard}
              aria-labelledby={activeButtonId}
              aria-live="polite"
            >
              <div key={activeStage.id} className={styles.detailContent}>
                <div className={styles.detailTop}>
                  <div className={styles.detailBadgeRow}>
                    <span className={styles.detailNumber}>{activeStage.number}</span>
                    <span className={styles.detailKicker}>{activeStage.kicker}</span>
                  </div>
                </div>

                <div className={styles.detailIntro}>
                  <h3 className={styles.detailTitle}>{activeStage.title}</h3>
                  <p className={styles.detailLead}>{activeStage.summary}</p>
                  <p className={styles.detailBody}>{activeStage.body}</p>
                </div>

                <div className={styles.decisionBlock}>
                  <span className={styles.blockLabel}>{copy.decisionLabel}</span>
                  <p className={styles.detailGate}>{activeStage.gate}</p>
                </div>

                <div className={styles.detailGrid}>
                  <section className={styles.detailBlock} aria-label={copy.outputsLabel}>
                    <span className={styles.blockLabel}>{copy.outputsLabel}</span>
                    <ul className={styles.detailList}>
                      {activeStage.outputs.map((item) => (
                        <li key={item} className={styles.detailItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.detailBlock} aria-label={copy.signalsLabel}>
                    <span className={styles.blockLabel}>{copy.signalsLabel}</span>
                    <div className={styles.signalList}>
                      {activeStage.signals.map((signal) => (
                        <span key={signal} className={styles.signal}>
                          {signal}
                        </span>
                      ))}
                    </div>
                  </section>
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
              <article key={principle.title} className={styles.principleCard}>
                <span className={styles.principleIcon} aria-hidden="true">
                  {renderPrincipleIcon(principle.icon)}
                </span>
                <h4 className={styles.principleTitle}>{principle.title}</h4>
                <p className={styles.principleBody}>{principle.body}</p>
                <p className={styles.principleNote}>{principle.note}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderPrincipleIcon(icon: Principle["icon"]): ReactElement {
  if (icon === "speed") {
    return (
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M4 14.5h4.5m-2.5 4H3m8-11 4-3m-3 7 7-7m-1 6.5 3-3M13.5 20a6.5 6.5 0 1 0-6-9"
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
