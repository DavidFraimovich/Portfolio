import type { Locale } from "@/lib/i18n";

export const signyNotionEmbedUrls = {
  en: "https://parallel-muscari-313.notion.site/ebd//32a2cb3aad77802a93f7feead01bdebf",
  he: "https://parallel-muscari-313.notion.site/ebd//1392cb3aad778090bd2eed2f34142976"
} satisfies Record<Locale, string>;

type SignyHighlight = {
  label: string;
  value: string;
};

type SignySummary = {
  eyebrow: string;
  summary: string;
  highlights: SignyHighlight[];
};

export const signyExecutiveSummary = {
  en: {
    eyebrow: "Executive Summary",
    summary:
      "A market-validated B2B SaaS case that turned a fragmented document process into one end-to-end workflow for preparation, routing, tracking, and digital signature.",
    highlights: [
      {
        label: "Project time",
        value: "1 year"
      },
      {
        label: "Role",
        value: "Product Manager, Project Manager, System Analyst"
      },
      {
        label: "Validation",
        value: "10 customer interviews, 4 pilot commitments"
      },
      {
        label: "Outcome",
        value: "Differentiated MVP with pricing and go-to-market foundation"
      }
    ]
  },
  he: {
    eyebrow: "תקציר מנהלים",
    summary:
      "מקרה B2B SaaS עם ולידציה שוקית שהפך תהליך מסמכים מפוצל ל-workflow אחד מקצה לקצה עבור הכנה, ניתוב, מעקב וחתימה דיגיטלית.",
    highlights: [
      {
        label: "זמן הפרויקט",
        value: "שנה"
      },
      {
        label: "תפקיד",
        value: "מנהל מוצר, מנהל פרויקט, מנתח מערכות"
      },
      {
        label: "ולידציה",
        value: "10 ראיונות לקוחות, 4 התחייבויות לפיילוט"
      },
      {
        label: "תוצאה",
        value: "MVP מובחן עם בסיס לתמחור ול-go-to-market"
      }
    ]
  }
} satisfies Record<Locale, SignySummary>;
