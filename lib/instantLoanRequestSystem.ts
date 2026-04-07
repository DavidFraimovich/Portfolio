import type { Locale } from "@/lib/i18n";

const ltr = (value: string): string => `\u2066${value}\u2069`;

export type InstantLoanMetadataIconKey =
  | "timeline"
  | "role"
  | "team"
  | "type"
  | "validation"
  | "client";

export type InstantLoanMetricIconKey =
  | "dropoff"
  | "setup"
  | "completion"
  | "firstValue"
  | "activation"
  | "errors";

type InstantLoanMetadataItem = {
  label: string;
  value: string;
  icon: InstantLoanMetadataIconKey;
};

type InstantLoanMetricValueCard = {
  kind: "value";
  value: string;
  label: string;
  description: string;
  icon: InstantLoanMetricIconKey;
};

type InstantLoanMetricConceptCard = {
  kind: "concept";
  title: string;
  subtitle: string;
  description: string;
  icon: InstantLoanMetricIconKey;
};

type InstantLoanMetricCard = InstantLoanMetricValueCard | InstantLoanMetricConceptCard;

type InstantLoanSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  wide?: boolean;
};

type InstantLoanCaseStudyContent = {
  title: string;
  valueStatement: string;
  summary: string;
  metadataTitle: string;
  metadata: InstantLoanMetadataItem[];
  metricsTitle: string;
  metricsAriaLabel: string;
  metrics: InstantLoanMetricCard[];
  sections: InstantLoanSection[];
};

export const instantLoanRequestSystemCaseStudyContent = {
  en: {
    title: "Instant Loan Request System",
    valueStatement:
      "Turning a complex process into a simple, fast digital flow that is easy to implement.",
    summary:
      "I led product work for a digital platform designed to simplify a complex business process, shorten handling times, and create a clearer experience for end users and business partners.",
    metadataTitle: "Project details",
    metadata: [
      {
        label: "Project Start",
        value: "12/2023",
        icon: "timeline"
      },
      {
        label: "My role",
        value: "Product Manager · System Analysis · UX Specification",
        icon: "role"
      },
      {
        label: "Team",
        value: "Cross-functional matrix team",
        icon: "team"
      },
      {
        label: "Type",
        value: "B2B2C · SaaS · Digital Process Platform",
        icon: "type"
      },
      {
        label: "Validation",
        value: "Conversations with potential users and validation against a real business need",
        icon: "validation"
      },
      {
        label: "Client example",
        value: "Confidential",
        icon: "client"
      }
    ],
    metricsTitle: "Key product metrics",
    metricsAriaLabel: "Instant loan request system KPI cards",
    metrics: [
      {
        kind: "value",
        value: "20%",
        label: "Drop-off Reduction",
        description: "Reduce drop-off by 20% at a critical step in the flow.",
        icon: "dropoff"
      },
      {
        kind: "value",
        value: "15 min",
        label: "Setup Time",
        description: "Bring initial setup time down to less than 15 minutes.",
        icon: "setup"
      },
      {
        kind: "value",
        value: "70%+",
        label: "Onboarding Completion",
        description: "Reach a 70%+ completion rate in the initial onboarding flow.",
        icon: "completion"
      },
      {
        kind: "concept",
        title: "Time to First Value",
        subtitle: "First meaningful outcome",
        description: "Shorten the time until the user or partner reaches their first clear point of value.",
        icon: "firstValue"
      },
      {
        kind: "value",
        value: "30%",
        label: "Activation Uplift",
        description: "Improve first-time activation among new users by 30%.",
        icon: "activation"
      },
      {
        kind: "value",
        value: "24h",
        label: "Error Detection",
        description: "Identify critical issues in less than 24 hours.",
        icon: "errors"
      }
    ],
    sections: [
      {
        title: "Background",
        wide: true,
        paragraphs: [
          "The starting point was a clear business need: take a process with many steps, dependencies on different stakeholders, and operational friction points, and turn it into a simple, fast digital flow that would be easier to implement.",
          "Early in the work, I focused on understanding the business problem, identifying the main friction points across the process, and translating the business need into a product solution that could launch quickly and improve in a measurable way."
        ]
      },
      {
        title: "Product Challenge",
        intro: "The central challenge was to balance several needs at the same time:",
        bullets: [
          "Create a simple and clear process for end users.",
          "Support work with additional business stakeholders across the ecosystem.",
          "Shorten setup and activation time.",
          "Enable fast detection of failure points and continuous improvement.",
          "Build a product foundation that supports both business flexibility and operational simplicity."
        ]
      },
      {
        title: "What I Led",
        intro: "As part of the role, I led the product work end to end, including:",
        bullets: [
          "Refining the problem and defining the product concept.",
          "Translating business needs into clear product flows.",
          "Specifying screens, business logic, and user processes.",
          "Connecting business, technology, and operations around product decisions.",
          "Prioritizing what belonged in the MVP and what should wait for later stages.",
          "Defining metrics for usage, operations, friction, and process quality."
        ]
      },
      {
        title: "Product Approach",
        intro:
          "Instead of starting with a large and complex system, we built the thinking around a rapid launch of a focused version that would allow us to learn from the field, identify blockers early, and continuously improve the process.",
        bullets: [
          "Reduce complexity for the user.",
          "Create a clear experience without dependence on lengthy training.",
          "Build a process that is easy to measure, analyze, and improve.",
          "Create an infrastructure that can support future product evolution."
        ]
      },
      {
        title: "What the Project Required From Me",
        wide: true,
        paragraphs: [
          "The project required me to combine business thinking, systems analysis, UX specification, and strong translation skills across different stakeholders.",
          "In practice, the work included:"
        ],
        bullets: [
          "Breaking down a complex business need into clear product components.",
          "Building a process that could launch quickly and still improve over time.",
          "Defining the right priorities for the MVP.",
          "Connecting business goals, user experience, and technical implementation.",
          "Creating a measurement framework that supports data-informed decisions."
        ]
      }
    ]
  },
  he: {
    title: "מערכת לבקשת הלוואות מיידיות",
    valueStatement:
      "להפוך תהליך מורכב לזרימה דיגיטלית פשוטה, מהירה וקלה להטמעה.",
    summary:
      "הובלתי עבודת מוצר עבור פלטפורמה דיגיטלית שנועדה לפשט תהליך עסקי מורכב, לקצר זמני טיפול, ולייצר חוויה ברורה יותר עבור משתמשי קצה ושותפים עסקיים.",
    metadataTitle: "פרטי הפרויקט",
    metadata: [
      {
        label: "תאריך התחלה",
        value: "12/2023",
        icon: "timeline"
      },
      {
        label: "My role",
        value: ltr("Product Manager · System Analysis · UX Specification"),
        icon: "role"
      },
      {
        label: "Team",
        value: "צוות מטריציוני חוצה פונקציות",
        icon: "team"
      },
      {
        label: "Type",
        value: ltr("B2B2C · SaaS · Digital Process Platform"),
        icon: "type"
      },
      {
        label: "Validation",
        value: "שיחות עם משתמשים פוטנציאליים ובחינת התאמה לצורך עסקי",
        icon: "validation"
      },
      {
        label: "Client example",
        value: ltr("Confidential"),
        icon: "client"
      }
    ],
    metricsTitle: "מדדי הצלחה",
    metricsAriaLabel: "כרטיסיות KPI של מערכת לבקשת הלוואות מיידיות",
    metrics: [
      {
        kind: "value",
        value: "20%",
        label: ltr("Drop-off Reduction"),
        description: "הורדת שיעור הנטישה בשלב מרכזי בתהליך ב־20%.",
        icon: "dropoff"
      },
      {
        kind: "value",
        value: "15 min",
        label: ltr("Setup Time"),
        description: "קיצור זמן ההקמה הראשוני לפחות מ־15 דקות.",
        icon: "setup"
      },
      {
        kind: "value",
        value: "70%+",
        label: ltr("Onboarding Completion"),
        description: "הגעה לשיעור השלמה של 70%+ בתהליך הראשוני.",
        icon: "completion"
      },
      {
        kind: "concept",
        title: ltr("Time to First Value"),
        subtitle: "קיצור הזמן עד לערך הראשון",
        description: "קיצור הזמן עד ליצירת ערך ראשון למשתמש או לשותף.",
        icon: "firstValue"
      },
      {
        kind: "value",
        value: "30%",
        label: ltr("Activation Uplift"),
        description: "שיפור שיעור ההפעלה הראשונית של משתמשים חדשים ב־30%.",
        icon: "activation"
      },
      {
        kind: "value",
        value: "24h",
        label: ltr("Error Detection"),
        description: "זיהוי תקלות קריטיות תוך פחות מ־24 שעות.",
        icon: "errors"
      }
    ],
    sections: [
      {
        title: "רקע",
        wide: true,
        paragraphs: [
          "נקודת הפתיחה הייתה צורך עסקי ברור: לקחת תהליך בעל ריבוי שלבים, תלות בגורמים שונים ונקודות חיכוך תפעוליות, ולהפוך אותו לזרימה דיגיטלית פשוטה, מהירה וקלה יותר להטמעה.",
          "בשלב מוקדם של העבודה התמקדתי בהבנת הבעיה העסקית, בזיהוי נקודות החיכוך המרכזיות לאורך התהליך, ובתרגום הצורך העסקי לפתרון מוצרי שניתן להשיק במהירות ולשפר באופן מדיד."
        ]
      },
      {
        title: "האתגר המוצרי",
        intro: "האתגר המרכזי היה לאזן בין כמה צרכים במקביל:",
        bullets: [
          "יצירת תהליך פשוט וברור למשתמשי הקצה",
          "התאמה לעבודה עם גורמים עסקיים נוספים באקוסיסטם",
          "קיצור זמן ההקמה וההפעלה",
          "יכולת לזהות במהירות נקודות כשל ולשפר אותן לאורך הדרך",
          "בניית בסיס מוצרי שיכול לתמוך גם בגמישות עסקית וגם בפשטות תפעולית"
        ]
      },
      {
        title: "מה הובלתי",
        intro: "במסגרת התפקיד הובלתי את העבודה המוצרית מקצה לקצה, כולל:",
        bullets: [
          "חידוד הבעיה והגדרת הקונספט המוצרי",
          "תרגום צרכים עסקיים לזרימות מוצר ברורות",
          "אפיון מסכים, לוגיקה עסקית ותהליכי משתמש",
          "חיבור בין גורמים עסקיים, טכנולוגיים ותפעוליים סביב החלטות מוצר",
          "תעדוף בין מה שנדרש ל-MVP לבין מה שנכון לדחות לשלבים הבאים",
          "הגדרת מדדים שיאפשרו לבחון שימוש, תפעול, חיכוך ואיכות התהליך"
        ]
      },
      {
        title: "הגישה המוצרית",
        intro:
          "במקום להתחיל ממערכת גדולה ומורכבת, בנינו את החשיבה סביב השקה מהירה של גרסה ממוקדת, שתאפשר ללמוד מהשטח, לזהות חסמים מוקדם, ולשפר את התהליך באופן רציף.",
        bullets: [
          "הפחתת מורכבות למשתמש",
          "יצירת חוויית שימוש ברורה ללא תלות בהדרכה ממושכת",
          "בניית תהליך שקל למדוד, לנתח ולשפר",
          "יצירת תשתית שתאפשר התפתחות מוצרית בהמשך"
        ]
      },
      {
        title: "מה הפרויקט דרש ממני כמנהל מוצר",
        wide: true,
        paragraphs: [
          "הפרויקט דרש ממני לשלב בין חשיבה עסקית, ניתוח מערכות, אפיון UX ויכולת תרגום גבוהה בין בעלי עניין שונים.",
          "בפועל, העבודה כללה:"
        ],
        bullets: [
          "פירוק צורך עסקי מורכב למרכיבי מוצר ברורים",
          "בניית תהליך שניתן גם להשיק מהר וגם לשפר בהמשך",
          "הגדרת סדרי עדיפויות נכונים ל-MVP",
          "חיבור בין מטרות עסקיות, חוויית משתמש ומימוש טכנולוגי",
          "יצירת מסגרת מדידה שתאפשר קבלת החלטות מבוססת נתונים"
        ]
      }
    ]
  }
} satisfies Record<Locale, InstantLoanCaseStudyContent>;
