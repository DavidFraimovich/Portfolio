import type { Locale } from "@/lib/i18n";

const ltr = (value: string): string => `\u2066${value}\u2069`;

export const signyNotionEmbedUrls = {
  en: "https://parallel-muscari-313.notion.site/ebd//32a2cb3aad77802a93f7feead01bdebf",
  he: "https://parallel-muscari-313.notion.site/ebd//1392cb3aad778090bd2eed2f34142976"
} satisfies Record<Locale, string>;

export type SignyIconKey =
  | "product"
  | "stage"
  | "startDate"
  | "team"
  | "role"
  | "validation"
  | "client";

type SignyMetadataItem = {
  label: string;
  value: string;
  icon: SignyIconKey;
};

type SignyMetric = {
  value: string;
  label: string;
  description: string;
};

type SignyPainPoint = {
  title: string;
  pain: string;
  solution: string;
  outcome: string;
};

type SignySpotlight = {
  eyebrow: string;
  value: string;
  label: string;
  description: string;
  noteLabel: string;
  note: string;
};

type SignyPainLabels = {
  pain: string;
  solution: string;
  outcome: string;
};

type SignyCaseStudyContent = {
  title: string;
  valueStatement: string;
  summary: string;
  chipsAriaLabel: string;
  embedAriaLabel: string;
  metadata: SignyMetadataItem[];
  metricsTitle: string;
  metrics: SignyMetric[];
  painsTitle: string;
  painLabels: SignyPainLabels;
  pains: SignyPainPoint[];
  spotlight: SignySpotlight;
  chips: string[];
};

export const signyCaseStudyContent = {
  en: {
    title: "Signy — Digital Signature",
    valueStatement:
      "A digital signature solution built around the full business flow, not just the signing moment",
    summary:
      "Signy is a B2B document management and digital signature platform built around a clear market gap: most solutions handled only one part of the process, but failed to preserve the full workflow — from an existing document, through editing, sending, tracking, and signing, to a legally valid final output.",
    chipsAriaLabel: "Signy positioning",
    embedAriaLabel: "Signy Notion embed",
    metadata: [
      {
        label: "Product type",
        value: "B2B SaaS / Document Workflow",
        icon: "product"
      },
      {
        label: "Stage",
        value: "0→1 MVP",
        icon: "stage"
      },
      {
        label: "Project Start",
        value: "04/2021",
        icon: "startDate"
      },
      {
        label: "Team",
        value: "6-person cross-functional team",
        icon: "team"
      },
      {
        label: "My role",
        value: "Product Manager / Project Manager / System Analyst",
        icon: "role"
      },
      {
        label: "Validation",
        value: "10 interviews, 4 pilot-ready customers",
        icon: "validation"
      },
      {
        label: "Client example",
        value: "Jerusalem Symphony Orchestra",
        icon: "client"
      }
    ],
    metricsTitle: "Key Product Metrics",
    metrics: [
      {
        value: "6 months",
        label: "Time to first MVP",
        description: "From product definition to a first usable release."
      },
      {
        value: "~3 min",
        label: "Average sender flow",
        description: "Document setup and send path stayed short and clear."
      },
      {
        value: "Under 1 min",
        label: "Average signer flow",
        description: "Signing could be completed in a near-frictionless flow."
      }
    ],
    painsTitle: "Core pain points and what I solved",
    painLabels: {
      pain: "Pain",
      solution: "What I solved",
      outcome: "Outcome"
    },
    pains: [
      {
        title: "The market was fragmented across tools that solved only one part of the workflow",
        pain:
          "Organizations had to stitch together document creation, editing, routing, tracking, signing, and final output on their own.",
        solution:
          "We built a platform that preserved the full operational flow end to end within one connected workflow.",
        outcome:
          "Less tool switching, lower process friction, and a solution that felt complete rather than incremental."
      },
      {
        title: "Customers did not want to abandon the way they already worked",
        pain:
          "Replacing an existing organizational workflow is expensive, risky, and often resisted internally.",
        solution:
          "I defined a product that modernized the process without forcing organizations to abandon their current way of working.",
        outcome:
          "Lower adoption barriers and a solution perceived as practical, not disruptive for its own sake."
      },
      {
        title: "A 0→1 product needed clarity before scaling development",
        pain:
          "Without strong product direction, teams lose time to rework, ambiguity, and late-stage decisions.",
        solution:
          "I led market research, validation, workflow definition, roadmap planning, system logic, and delivery prioritization.",
        outcome:
          "A more focused build, less uncertainty, and better alignment around the product direction."
      },
      {
        title: "Document and signature flows tend to become slow and friction-heavy",
        pain: "Every extra step increases drop-off, delays, and confusion.",
        solution:
          "I designed a fast, clear flow for both senders and signers, with minimal friction and full process visibility.",
        outcome:
          "A sender flow that could be completed in about 3 minutes, and a signer flow in under a minute."
      },
      {
        title: "Distributed teams under operational constraints lose momentum easily",
        pain:
          "Time zones, partial availability, and unstable operating conditions create delivery risk.",
        solution:
          "I created clear cadence, ownership, and focused priorities while keeping execution moving under constraints.",
        outcome: "Steady delivery rhythm and continued progress throughout the project."
      }
    ],
    spotlight: {
      eyebrow: "Metric Spotlight",
      value: "18.4 min",
      label: "Average Session Duration",
      description:
        "In workflow products, time spent is not a goal on its own — but here it acts as a strong signal of meaningful in-flow engagement. It suggests users were not just visiting the system, but actually progressing through a valuable process.",
      noteLabel: "Interpretation",
      note: "Strong indication of meaningful workflow interaction rather than shallow browsing."
    },
    chips: [
      "B2B SaaS",
      "Document Workflow",
      "Digital Signature",
      "Market Validation",
      "Pilot Design",
      "Product Strategy",
      "System Analysis",
      "Cross-functional Leadership",
      "MVP Delivery",
      "Go-to-Market Foundations"
    ]
  },
  he: {
    title: "Signy — חתימה דיגיטלית",
    valueStatement: "פתרון חתימה דיגיטלית ששומר על כל הרצף העסקי, לא רק על רגע החתימה",
    summary:
      "Signy היא פלטפורמת B2B לניהול מסמכים וחתימות דיגיטליות, שנבנתה סביב פער שוק ברור: רוב הפתרונות ידעו לטפל רק בחלק אחד מהתהליך, אבל לא לשמור על כל הרצף העסקי — ממסמך קיים, דרך עריכה, שליחה, מעקב וחתימה, ועד פלט סופי בעל תוקף משפטי.",
    chipsAriaLabel: "מיצוב מקצועי של Signy",
    embedAriaLabel: "הטמעת Notion של Signy",
    metadata: [
      {
        label: "סוג מוצר",
        value: ltr("B2B SaaS / Document Workflow"),
        icon: "product"
      },
      {
        label: "שלב",
        value: ltr("0→1 MVP"),
        icon: "stage"
      },
      {
        label: "תאריך התחלה",
        value: "04/2021",
        icon: "startDate"
      },
      {
        label: "צוות",
        value: "צוות קרוס-פונקציונלי של 6 אנשים",
        icon: "team"
      },
      {
        label: "התפקיד שלי",
        value: ltr("Product Manager / Project Manager / System Analyst"),
        icon: "role"
      },
      {
        label: "ולידציה",
        value: "10 ראיונות, 4 לקוחות לפיילוט",
        icon: "validation"
      },
      {
        label: "לקוח לדוגמה",
        value: ltr("Jerusalem Symphony Orchestra"),
        icon: "client"
      }
    ],
    metricsTitle: "מדדי מוצר מרכזיים",
    metrics: [
      {
        value: "6 חודשים",
        label: "זמן ל-MVP ראשון",
        description: "מהגדרת מוצר ועד גרסה ראשונה שמישה."
      },
      {
        value: "~3 דקות",
        label: "זמן ממוצע למסלול שולח",
        description: "הקמה ושליחה של מסמך נשארו קצרים וברורים."
      },
      {
        value: "פחות מדקה",
        label: "זמן ממוצע למסלול חותם",
        description: "החתימה הושלמה ב-flow קצר עם מינימום חיכוך."
      }
    ],
    painsTitle: "הכאבים המרכזיים ומה פתרתי",
    painLabels: {
      pain: "הכאב",
      solution: "מה פתרתי",
      outcome: "מה יצא מזה"
    },
    pains: [
      {
        title: "השוק היה מפוצל בין כלים שלא סוגרים את כל התהליך",
        pain:
          "ארגונים נדרשו לחבר בעצמם בין יצירת מסמך, עריכה, שליחה, מעקב, חתימה ופלט סופי.",
        solution:
          "בנינו פלטפורמה ששומרת על הרצף התפעולי מקצה לקצה בתוך workflow אחד מחובר.",
        outcome:
          "פחות מעבר בין כלים, פחות חיכוך בתהליך, ופתרון שנתפס כמלא ולא כעוד תוסף נקודתי."
      },
      {
        title: "לקוחות לא רצו לשבור את דרך העבודה הקיימת שלהם",
        pain: "החלפת workflow ארגוני היא תהליך יקר, מסוכן ומעורר התנגדות.",
        solution:
          "הגדרתי מוצר שמבצע מודרניזציה לתהליך בלי לדרוש מהארגון לוותר על הדרך שבה הוא כבר עובד.",
        outcome: "חסם adoption נמוך יותר ופתרון שנתפס כמעשי ולא רק חדשני."
      },
      {
        title: "במוצר 0→1 היה צורך לייצר בהירות לפני ריצה לפיתוח",
        pain:
          "בלי כיוון מוצרי חד, צוותים מבזבזים זמן על rework והחלטות מאוחרות.",
        solution:
          "הובלתי מחקר שוק, ולידציה, הגדרת workflow, roadmap, לוגיקה מערכתית ותעדוף delivery.",
        outcome: "קצב פיתוח יציב יותר, פחות אי-ודאות, והתקדמות סביב מוצר ברור יותר."
      },
      {
        title: "תהליכי חתימה ומסמכים נוטים להיות איטיים ומלאי חיכוך",
        pain: "כל שלב נוסף בתהליך מגדיל נטישה, שאלות ועיכובים.",
        solution:
          "תכננתי flow מהיר וברור גם לשולח וגם לחותם, עם מינימום חיכוך ועם מעקב לאורך הדרך.",
        outcome: "מסלול שולח של כ-3 דקות ומסלול חותם שיכול להסתיים בפחות מדקה."
      },
      {
        title: "צוות מבוזר תחת אילוצים תפעוליים מאבד בקלות מומנטום",
        pain:
          "עבודה בין אזורי זמן, זמינות חלקית ותנאים לא יציבים פוגעים ב-delivery.",
        solution:
          "יצרתי cadence ברור, ownership ותעדוף חד, תוך שמירה על קצב ביצוע גם בתנאים מורכבים.",
        outcome: "רציפות פיתוח והתקדמות יציבה לאורך הפרויקט."
      }
    ],
    spotlight: {
      eyebrow: ltr("Metric Spotlight"),
      value: ltr("18.4 min"),
      label: ltr("Average Session Duration"),
      description:
        "במוצרי workflow, זמן שימוש אינו מטרה בפני עצמה — אבל כאן הוא משמש סיגנל למעורבות אמיתית בתהליך. הוא מרמז שהמשתמשים לא רק נכנסו למערכת, אלא ביצעו אינטראקציה משמעותית לאורך ה-flow.",
      noteLabel: ltr("Interpretation"),
      note: "מעיד על שימוש בעל ערך בתוך המערכת, ולא על ביקור שטחי בלבד."
    },
    chips: [
      "B2B SaaS",
      "Document Workflow",
      "Digital Signature",
      "Market Validation",
      "Pilot Design",
      "Product Strategy",
      "System Analysis",
      "Cross-functional Leadership",
      "MVP Delivery",
      "Go-to-Market Foundations"
    ]
  }
} satisfies Record<Locale, SignyCaseStudyContent>;
