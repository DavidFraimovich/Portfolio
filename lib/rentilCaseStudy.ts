import type { Locale } from "@/lib/i18n";

const ltr = (value: string): string => `\u2066${value}\u2069`;

export type RentilMetadataIconKey =
  | "productType"
  | "stage"
  | "role"
  | "period"
  | "team"
  | "scope"
  | "integration";

export type RentilHighlightIconKey = "operations" | "architecture" | "continuity";

export type RentilRoleIconKey =
  | "vision"
  | "specification"
  | "database"
  | "workflow"
  | "continuity";

export type RentilChallengeIconKey = "database" | "payments" | "team";

export type RentilCapabilityIconKey =
  | "properties"
  | "tenants"
  | "lease"
  | "payments"
  | "tasks"
  | "map"
  | "roles"
  | "reporting"
  | "documents";

type RentilMetadataItem = {
  label: string;
  value: string;
  icon: RentilMetadataIconKey;
};

type RentilHighlightCard = {
  title: string;
  text: string;
  icon: RentilHighlightIconKey;
};

type RentilRoleCard = {
  title: string;
  icon: RentilRoleIconKey;
};

type RentilChallengeCard = {
  title: string;
  icon: RentilChallengeIconKey;
};

type RentilCapabilityItem = {
  title: string;
  icon: RentilCapabilityIconKey;
};

type RentilCaseStudyContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    heroImageAlt: string;
    chipsAriaLabel: string;
    chips: string[];
    metadataTitle: string;
    metadata: RentilMetadataItem[];
    scrollLabel: string;
  };
  highlightsTitle: string;
  highlightsAriaLabel: string;
  highlights: RentilHighlightCard[];
  overview: {
    title: string;
    text: string;
  };
  role: {
    title: string;
    ariaLabel: string;
    items: RentilRoleCard[];
  };
  challenges: {
    title: string;
    ariaLabel: string;
    items: RentilChallengeCard[];
  };
  capabilities: {
    title: string;
    ariaLabel: string;
    items: RentilCapabilityItem[];
  };
  framing: {
    title: string;
    text: string;
  };
};

export const rentilCaseStudyContent = {
  en: {
    hero: {
      eyebrow: "Case Study",
      title: "Rentil",
      subtitle: "Long-term rental management platform for property management companies.",
      description:
        "A B2B platform built for property management companies handling 50-500 properties, designed to centralize operational, financial, and service workflows in one system.",
      heroImageAlt: "Rentil rental management platform overview",
      chipsAriaLabel: "Rentil project tags",
      chips: [
        "Management Platform",
        "Property Operations",
        "CRM",
        "Custom CRM",
        "ERP",
        "Task Management System",
        "DB Design",
        "Payment Integration",
        "Workflow Automation",
        "Lease Management",
        "Tenant Management",
        "Google Maps Integration"
      ],
      metadataTitle: "Project metadata",
      metadata: [
        {
          label: "Product Type",
          value: "B2B / PropTech / ERP",
          icon: "productType"
        },
        {
          label: "Stage",
          value: "0->1 Product Build",
          icon: "stage"
        },
        {
          label: "Role",
          value: "Product Manager & Systems Analyst",
          icon: "role"
        },
        {
          label: "Project Start",
          value: "06/2020",
          icon: "period"
        },
        {
          label: "Team",
          value: "4 people",
          icon: "team"
        },
        {
          label: "Scope",
          value: "30 complex workflows",
          icon: "scope"
        },
        {
          label: "Integration",
          value: "Google Maps + Payment System",
          icon: "integration"
        }
      ],
      scrollLabel: "Scroll to explore"
    },
    highlightsTitle: "Highlights",
    highlightsAriaLabel: "Rentil highlights",
    highlights: [
      {
        title: "Built for real property operations",
        text: "Designed as an operational system for companies managing dozens to hundreds of long-term rental properties.",
        icon: "operations"
      },
      {
        title: "Complex system design from scratch",
        text: "Defined the product structure, core workflows, and a large-scale database model for a multi-entity platform.",
        icon: "architecture"
      },
      {
        title: "Product continuity under change",
        text: "Maintained product clarity and delivery momentum during the replacement of two backend developers.",
        icon: "continuity"
      }
    ],
    overview: {
      title: "Overview",
      text: "Rentil was created to support property management companies with a single platform connecting properties, tenants, contracts, payments, and operational tasks."
    },
    role: {
      title: "My Role",
      ariaLabel: "Rentil role scope",
      items: [
        {
          title: "Defined the product vision for property management companies",
          icon: "vision"
        },
        {
          title: "Led system specification from scratch",
          icon: "specification"
        },
        {
          title: "Planned a large and complex DB structure",
          icon: "database"
        },
        {
          title: "Designed end-to-end business workflows",
          icon: "workflow"
        },
        {
          title: "Maintained product continuity during backend team changes",
          icon: "continuity"
        }
      ]
    },
    challenges: {
      title: "Core Challenges",
      ariaLabel: "Rentil core challenges",
      items: [
        {
          title: "Large and complex DB planning",
          icon: "database"
        },
        {
          title: "Payment system integration",
          icon: "payments"
        },
        {
          title: "Operational continuity during backend developer replacement",
          icon: "team"
        }
      ]
    },
    capabilities: {
      title: "Platform Capabilities",
      ariaLabel: "Rentil platform capabilities",
      items: [
        {
          title: "Property and unit management",
          icon: "properties"
        },
        {
          title: "Tenant and contract management",
          icon: "tenants"
        },
        {
          title: "Lease lifecycle tracking",
          icon: "lease"
        },
        {
          title: "Payment and collection flows",
          icon: "payments"
        },
        {
          title: "Task and maintenance tracking",
          icon: "tasks"
        },
        {
          title: "Google Maps-based property view",
          icon: "map"
        },
        {
          title: "Role-based workflows",
          icon: "roles"
        },
        {
          title: "Operational reporting",
          icon: "reporting"
        },
        {
          title: "Centralized records and documents",
          icon: "documents"
        }
      ]
    },
    framing: {
      title: "Product Framing",
      text: "The goal was not to build just another CRM, but an operational platform tailored to the real workflows of rental management companies."
    }
  },
  he: {
    hero: {
      eyebrow: "מחקר מקרה",
      title: "Rentil",
      subtitle: `פלטפורמה לניהול השכרות ארוכות טווח עבור חברות ניהול נכסים.`,
      description:
        `פלטפורמת ${ltr("B2B")} שפותחה עבור חברות ניהול המנהלות ${ltr(
          "50-500"
        )} נכסים, במטרה לרכז תהליכים תפעוליים, פיננסיים ושירותיים במערכת אחת.`,
      heroImageAlt: "תצוגת מערכת Rentil לניהול השכרות ארוכות טווח",
      chipsAriaLabel: "תגיות פרויקט Rentil",
      chips: [
        "פלטפורמת ניהול",
        "תפעול נכסים",
        "CRM",
        `CRM מותאם`,
        "ERP",
        "מערכת ניהול משימות",
        `תכנון ${ltr("DB")}`,
        "אינטגרציית תשלומים",
        "אוטומציית תהליכים",
        "ניהול חוזי שכירות",
        "ניהול דיירים",
        `אינטגרציית ${ltr("Google Maps")}`
      ],
      metadataTitle: "מטא-דאטה של הפרויקט",
      metadata: [
        {
          label: "סוג מוצר",
          value: ltr("B2B / PropTech / ERP"),
          icon: "productType"
        },
        {
          label: "שלב",
          value: "הקמת מוצר מאפס",
          icon: "stage"
        },
        {
          label: "תפקיד",
          value: "מנהל מוצר ומנתח מערכות",
          icon: "role"
        },
        {
          label: "תאריך התחלה",
          value: "06/2020",
          icon: "period"
        },
        {
          label: "צוות",
          value: "4 אנשי צוות",
          icon: "team"
        },
        {
          label: "היקף",
          value: "30 תהליכים מורכבים",
          icon: "scope"
        },
        {
          label: "אינטגרציה",
          value: `${ltr("Google Maps")} + מערכת תשלומים`,
          icon: "integration"
        }
      ],
      scrollLabel: "גללו כדי להמשיך"
    },
    highlightsTitle: "נקודות מפתח",
    highlightsAriaLabel: "נקודות מפתח של Rentil",
    highlights: [
      {
        title: "נבנה עבור תפעול אמיתי של נכסים",
        text: "תוכנן כמערכת תפעולית עבור חברות המנהלות עשרות עד מאות נכסים להשכרה ארוכת טווח.",
        icon: "operations"
      },
      {
        title: "תכנון מערכת מורכבת מאפס",
        text: "הוגדרו מבנה המוצר, תהליכי הליבה ומודל בסיס נתונים רחב עבור פלטפורמה מרובת ישויות.",
        icon: "architecture"
      },
      {
        title: "רציפות מוצרית גם בתקופת שינוי",
        text: `נשמרו בהירות מוצרית וקצב התקדמות גם במהלך החלפת שני מפתחי ${ltr("Back-End")}.`,
        icon: "continuity"
      }
    ],
    overview: {
      title: "סקירה",
      text: "Rentil נבנתה כדי לאפשר לחברות ניהול נכסים לעבוד מתוך מערכת אחת שמחברת בין נכסים, דיירים, חוזים, תשלומים ומשימות תפעוליות."
    },
    role: {
      title: "התפקיד שלי",
      ariaLabel: "היקף התפקיד שלי בפרויקט Rentil",
      items: [
        {
          title: "הגדרת חזון המוצר עבור חברות ניהול נכסים",
          icon: "vision"
        },
        {
          title: "הובלת אפיון המערכת מאפס",
          icon: "specification"
        },
        {
          title: `תכנון בסיס נתונים גדול ומורכב`,
          icon: "database"
        },
        {
          title: "בניית תהליכים עסקיים מקצה לקצה",
          icon: "workflow"
        },
        {
          title: `שמירה על רציפות מוצרית בזמן שינויי צוות ${ltr("Back-End")}`,
          icon: "continuity"
        }
      ]
    },
    challenges: {
      title: "אתגרים מרכזיים",
      ariaLabel: "האתגרים המרכזיים של Rentil",
      items: [
        {
          title: `תכנון ${ltr("DB")} גדול ומסועף`,
          icon: "database"
        },
        {
          title: "אינטגרציה למערכת תשלומים",
          icon: "payments"
        },
        {
          title: `שמירה על רציפות תפעולית בזמן החלפת מפתחי ${ltr("Back-End")}`,
          icon: "team"
        }
      ]
    },
    capabilities: {
      title: "יכולות הפלטפורמה",
      ariaLabel: "יכולות הפלטפורמה של Rentil",
      items: [
        {
          title: "ניהול נכסים ויחידות",
          icon: "properties"
        },
        {
          title: "ניהול דיירים וחוזים",
          icon: "tenants"
        },
        {
          title: "מעקב אחר מחזור חיי השכירות",
          icon: "lease"
        },
        {
          title: "תהליכי גבייה ותשלומים",
          icon: "payments"
        },
        {
          title: "ניהול משימות ותחזוקה",
          icon: "tasks"
        },
        {
          title: `תצוגת נכסים מבוססת ${ltr("Google Maps")}`,
          icon: "map"
        },
        {
          title: "תהליכים לפי הרשאות ותפקידים",
          icon: "roles"
        },
        {
          title: "דוחות תפעוליים",
          icon: "reporting"
        },
        {
          title: "ריכוז מסמכים ורשומות במקום אחד",
          icon: "documents"
        }
      ]
    },
    framing: {
      title: "מסגור מוצרי",
      text: `המטרה לא הייתה לבנות עוד ${ltr("CRM")}, אלא פלטפורמה תפעולית שמותאמת לזרימות העבודה האמיתיות של חברות ניהול נכסים.`
    }
  }
} satisfies Record<Locale, RentilCaseStudyContent>;
