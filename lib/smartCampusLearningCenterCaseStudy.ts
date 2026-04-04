import type { CaseStudyGalleryImage } from "@/lib/caseStudyImageGallery";
import type { Locale } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";

const smartCampusLink = "https://www.smart-campus.co.il/";
const ltr = (value: string): string => `\u2066${value}\u2069`;
const marketingSlideFilenames = [
  "Slide 16_9 - 1.png",
  "Slide 16_9 - 3.png",
  "Slide 16_9 - 4.png",
  "Slide 16_9 - 5.png",
  "Slide 16_9 - 6.png",
  "Slide 16_9 - 7.png",
  "Slide 16_9 - 8.png",
  "Slide 16_9 - 9.png",
  "Slide 16_9 - 11.png",
  "Slide 16_9 - 12.png",
  "Slide 16_9 - 13.png"
] as const;

function buildMarketingSlides(locale: Locale): CaseStudyGalleryImage[] {
  const slideLabel = locale === "he" ? "שקופית שיווק" : "Marketing slide";

  return marketingSlideFilenames.map((filename, index) => ({
    alt: `${slideLabel} ${String(index + 1).padStart(2, "0")}`,
    loading: index < 4 ? "eager" : "lazy",
    orientation: "landscape",
    src: withVersionedAssetPath(`/images/case-studies/smart-campus-study-center/${filename}`)
  }));
}

export type SmartCampusLearningCenterMetadataIconKey =
  | "productType"
  | "role"
  | "period"
  | "duration"
  | "client"
  | "nature";

export type SmartCampusLearningCenterHighlightIconKey = "system" | "permissions" | "insights";

export type SmartCampusLearningCenterAccordionIconKey =
  | "context"
  | "users"
  | "scope"
  | "role"
  | "kpi"
  | "expansion"
  | "challenges"
  | "outcome";

export type SmartCampusLearningCenterMetricIconKey =
  | "screens"
  | "workflows"
  | "lessons"
  | "savings"
  | "lateness"
  | "budget"
  | "adoption";

export type SmartCampusLearningCenterEmphasisIconKey =
  | "permissions"
  | "flows"
  | "reporting"
  | "expansion";

type SmartCampusLearningCenterMetadataItem = {
  label: string;
  value: string;
  icon: SmartCampusLearningCenterMetadataIconKey;
};

type SmartCampusLearningCenterHighlightCard = {
  title: string;
  text: string;
  icon: SmartCampusLearningCenterHighlightIconKey;
};

type SmartCampusLearningCenterAccordionBlock =
  | {
    type: "paragraph";
    text: string;
  }
  | {
    type: "list";
    items: string[];
  }
  | {
    type: "subsection";
    title: string;
    items: string[];
  }
  | {
    type: "closing";
    text: string;
  };

export type SmartCampusLearningCenterAccordionItem = {
  title: string;
  preview: string;
  icon: SmartCampusLearningCenterAccordionIconKey;
  blocks: SmartCampusLearningCenterAccordionBlock[];
};

type SmartCampusLearningCenterMetricCard = {
  value: string;
  label: string;
  icon: SmartCampusLearningCenterMetricIconKey;
};

type SmartCampusLearningCenterProcessStep = {
  title: string;
};

type SmartCampusLearningCenterMarketingSection = {
  title: string;
  ariaLabel: string;
  slides: CaseStudyGalleryImage[];
};

type SmartCampusLearningCenterEmphasisCard = {
  text: string;
  icon: SmartCampusLearningCenterEmphasisIconKey;
};

type SmartCampusLearningCenterPlatformContext = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type SmartCampusLearningCenterCaseStudyContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    externalLinkLabel: string;
    externalLinkHref: string;
    chipsAriaLabel: string;
    chips: string[];
    metadataTitle: string;
    metadata: SmartCampusLearningCenterMetadataItem[];
  };
  highlightsTitle: string;
  highlightsAriaLabel: string;
  highlights: SmartCampusLearningCenterHighlightCard[];
  accordionTitle: string;
  accordionAriaLabel: string;
  accordion: SmartCampusLearningCenterAccordionItem[];
  metricsTitle: string;
  metricsAriaLabel: string;
  metrics: SmartCampusLearningCenterMetricCard[];
  marketing: SmartCampusLearningCenterMarketingSection;
  processTitle: string;
  processAriaLabel: string;
  processSteps: SmartCampusLearningCenterProcessStep[];
  emphasisTitle: string;
  emphasisCards: SmartCampusLearningCenterEmphasisCard[];
  platform: SmartCampusLearningCenterPlatformContext;
};

export const smartCampusLearningCenterCaseStudyContent = {
  en: {
    hero: {
      eyebrow: "Case Study",
      title: "Smart Campus — Building a Learning Center Module for Youth Villages",
      subtitle: "A complex ERP module for schedules, users, permissions, attendance, and operational insights",
      description:
        "A case study about defining and launching a learning-center module for youth villages, designed to improve the daily work of instructors, teachers, management, and operational staff. The module was built as a multi-workflow, role-based system with a strong focus on privacy, daily operations, reporting, and future scalability.",
      externalLinkLabel: "Visit Smart Campus",
      externalLinkHref: smartCampusLink,
      chipsAriaLabel: "Learning center module tags",
      chips: [
        "EdTech",
        "Complex Systems",
        "Data Analysis",
        "Information Architecture",
        "BI Planning",
        "End-to-End Development",
        "Implementation",
        "MVP",
        "ERP",
        "Go-to-Market Foundations"
      ],
      metadataTitle: "Project metadata",
      metadata: [
        {
          label: "Product Type",
          value: "EdTech / ERP",
          icon: "productType"
        },
        {
          label: "Role",
          value: "Systems Analyst",
          icon: "role"
        },
        {
          label: "Period",
          value: "06/2019 – 06/2020",
          icon: "period"
        },
        {
          label: "Duration",
          value: "1 Year",
          icon: "duration"
        },
        {
          label: "Key Client",
          value: "Havat HaNoar HaTzioni",
          icon: "client"
        },
        {
          label: "Project Nature",
          value: "MVP + Pilot + Expansion Foundations",
          icon: "nature"
        }
      ]
    },
    highlightsTitle: "Core strengths",
    highlightsAriaLabel: "Learning center module highlights",
    highlights: [
      {
        title: "Multi-Process System",
        text: "A module with 50+ screens and 8+ business workflows, designed to bring structure, control, and operational consistency to the learning center.",
        icon: "system"
      },
      {
        title: "Multi-Role Permissions",
        text: "Distinct user experiences for instructors, social staff, school staff, management, and coordinators — with privacy-aware access by role.",
        icon: "permissions"
      },
      {
        title: "Data, BI & Operational Efficiency",
        text: "Measurement planning, reporting, and management visibility that help save time, improve attendance, and optimize budget usage.",
        icon: "insights"
      }
    ],
    accordionTitle: "Systems story",
    accordionAriaLabel: "Learning center module systems story",
    accordion: [
      {
        title: "Business Context & Need",
        preview: "How do you turn a fragmented manual learning-center process into one operational system?",
        icon: "context",
        blocks: [
          {
            type: "paragraph",
            text: "This project focused on improving the day-to-day workflows of the people interacting with the learning center in youth villages. The goal was to replace fragmented, manual, and partially managed processes with one platform that centralizes registration, scheduling, attendance, permissions, monitoring, and reporting."
          },
          {
            type: "paragraph",
            text: "The solution aligned with the broader Smart Campus vision as a platform for non-formal educational institutions, youth frameworks, and learning centers — with strong emphasis on operational control, data collection, monitoring, and process improvement."
          }
        ]
      },
      {
        title: "Users & Organizational Complexity",
        preview: "This was not a single-user product — it was a role-based operational system.",
        icon: "users",
        blocks: [
          {
            type: "paragraph",
            text: "The module was defined for a wide set of user groups, each with different needs, permissions, and workflows:"
          },
          {
            type: "list",
            items: [
              "educational staff / instructors",
              "social staff",
              "school staff",
              "management and coordinators",
              "boarding-school manager",
              "VPs",
              "village CEO"
            ]
          },
          {
            type: "paragraph",
            text: "Each role required a different operational view, different data exposure, and different actions inside the system. This required careful systems analysis around permissions, privacy, navigation, workflow design, and information visibility."
          }
        ]
      },
      {
        title: "Module Scope & Core Workflows",
        preview: "50+ screens and 8+ workflows, designed for real operational use.",
        icon: "scope",
        blocks: [
          {
            type: "paragraph",
            text: "The module included more than 50 screens and over 8 major business workflows, including:"
          },
          {
            type: "list",
            items: [
              "self-registration for students",
              "class schedule planning and organization",
              "teacher registration",
              "student registration by the learning-center manager / operator",
              "permissions-management module for system admins",
              "global calendar updates for breaks and holiday structures",
              "reminders workflow",
              "role-based views and operational flows"
            ]
          },
          {
            type: "paragraph",
            text: "The focus was not just UI creation, but building a process-driven module that supports ongoing operations, dynamic updates, and manageable complexity."
          }
        ]
      },
      {
        title: "My Role as a Systems Analyst",
        preview: "This is where requirements, permissions, information design, and process logic came together.",
        icon: "role",
        blocks: [
          {
            type: "paragraph",
            text: "My role focused on systems analysis responsibilities, including:"
          },
          {
            type: "list",
            items: [
              "researching the needs of multiple learning-center stakeholders",
              "defining screens, workflows, and user journeys",
              "writing system requirements",
              "planning permissions and data visibility by role",
              "defining entities and system relationships",
              "translating manual operations into structured digital workflows",
              "supporting MVP and pilot rollout",
              "thinking ahead about future module expansion"
            ]
          },
          {
            type: "subsection",
            title: "Key Systems Analysis Contributions",
            items: [
              "role and permissions modeling",
              "cross-screen workflow design",
              "contextual information architecture",
              "linking operations, attendance, payroll, and reporting",
              "scalability planning for future growth",
              "defining a module that could later support adjacent domains"
            ]
          }
        ]
      },
      {
        title: "Pilot Goals & KPI Framework",
        preview: "The module was designed to create measurable improvement, not just cleaner workflows.",
        icon: "kpi",
        blocks: [
          {
            type: "paragraph",
            text: "The pilot at Havat HaNoar HaTzioni was defined around clear goals:"
          },
          {
            type: "list",
            items: [
              "reduce late arrivals to the learning center by 20%",
              "reduce absenteeism in the learning center",
              "create practical annual savings of approximately ₪80,000, or about 30% of the budget, by reducing wasted lessons and inefficient payroll usage",
              "improve privacy so each student / teacher only sees the system relevant to them",
              "improve data control and management insights",
              "automate payroll calculation based on lessons actually delivered",
              "save operational time for learning-center managers",
              "support the ability to manage 400+ lessons per week"
            ]
          }
        ]
      },
      {
        title: "Growth, Pivot & Expansion Potential",
        preview: "During development, the module proved to be more extensible than originally planned.",
        icon: "expansion",
        blocks: [
          {
            type: "paragraph",
            text: "One of the most interesting aspects of the project was its expansion potential:"
          },
          {
            type: "list",
            items: [
              "using the existing entity architecture and ERP flexibility to add entities such as teachers, volunteers, and additional roles",
              "leveraging the scheduling engine for additional operational domains",
              "extending the module beyond the learning center into extracurricular activities, sports centers, music centers, and even agricultural operations"
            ]
          },
          {
            type: "paragraph",
            text: "This reflects systems thinking that does not stop at the MVP stage, but builds infrastructure that can support broader use cases later on."
          }
        ]
      },
      {
        title: "Key Challenges",
        preview: "The complexity was not just in the product, but also in the team, regulation, and scale planning.",
        icon: "challenges",
        blocks: [
          {
            type: "paragraph",
            text: "The project involved several major challenges:"
          },
          {
            type: "list",
            items: [
              "working with a new outsourced development team from Ukraine",
              "collaborating with two UX/UI designers on the same project",
              "maintaining information-security discipline and data exposure boundaries aligned with the sensitivity of educational data and Ministry of Education expectations",
              "planning a technical environment that would support continued scalability"
            ]
          },
          {
            type: "paragraph",
            text: "The project required coordination across disciplines, precise system definition, and architecture thinking for future growth."
          }
        ]
      },
      {
        title: "Outcome & Business Significance",
        preview: "What started as an operational module became a foundation for product expansion and commercial value.",
        icon: "outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Havat HaNoar HaTzioni was one of the first strategic clients where multiple pilots were run, making it a highly valuable environment for shaping the module thanks to strong collaboration with local teams."
          },
          {
            type: "paragraph",
            text: "The strategy was to pilot the project, refine it through real usage, and then roll it out to additional youth villages. Later on, about 30% of youth villages that purchased the system also purchased the learning-center module."
          },
          {
            type: "paragraph",
            text: "In addition, the module expanded beyond the learning center and became useful for managing extracurricular programs, specialized centers, and additional operational activities across youth villages."
          },
          {
            type: "closing",
            text: "This project demonstrates how strong systems analysis can turn a complex internal process into a product asset with operational, organizational, and commercial value."
          }
        ]
      }
    ],
    metricsTitle: "Success metrics",
    metricsAriaLabel: "Learning center module KPI cards",
    metrics: [
      {
        value: "50+",
        label: "Screens",
        icon: "screens"
      },
      {
        value: "8+",
        label: "Core Workflows",
        icon: "workflows"
      },
      {
        value: "400+",
        label: "Lessons / Week",
        icon: "lessons"
      },
      {
        value: "₪80K",
        label: "Annual Savings Potential",
        icon: "savings"
      },
      {
        value: "20%",
        label: "Target Reduction in Late Arrivals",
        icon: "lateness"
      },
      {
        value: "~30%",
        label: "Budget Efficiency Impact",
        icon: "budget"
      },
      {
        value: "30%",
        label: "Adoption Among Buying Youth Villages",
        icon: "adoption"
      }
    ],
    marketing: {
      title: "שיווק המודול שניבנה",
      ariaLabel: "Marketing module slide gallery",
      slides: buildMarketingSlides("en")
    },
    processTitle: "Delivery path",
    processAriaLabel: "Learning center module delivery process",
    processSteps: [
      {
        title: "Needs Research"
      },
      {
        title: "Module Definition"
      },
      {
        title: "MVP"
      },
      {
        title: "Pilot"
      },
      {
        title: "System Expansion"
      }
    ],
    emphasisTitle: "What stands out here from a systems analysis perspective?",
    emphasisCards: [
      {
        text: "Multi-role system and permissions modeling",
        icon: "permissions"
      },
      {
        text: "Translating daily operations into structured system flows",
        icon: "flows"
      },
      {
        text: "Designing information, reporting, and BI as part of the product",
        icon: "reporting"
      },
      {
        text: "Building an MVP module with commercial expansion potential",
        icon: "expansion"
      }
    ],
    platform: {
      title: "About Smart Campus",
      description:
        "Smart Campus is positioned as a platform for non-formal educational institutions, boarding frameworks, youth villages, and learning centers, with emphasis on operational control, data collection, monitoring, attendance, leave approvals, and additional dedicated modules.",
      href: smartCampusLink,
      linkLabel: "Visit Smart Campus"
    }
  },
  he: {
    hero: {
      eyebrow: "מחקר מקרה",
      title: "Smart Campus — מודול מרכז למידה",
      subtitle: "מודול ERP מורכב לניהול שיעורים, משתמשים, הרשאות, נוכחות ותובנות תפעוליות",
      description:
        "מחקר מקרה על אפיון והקמה של מודול מרכז למידה עבור כפרי נוער, שנועד לייעל את העבודה היומיומית של מדריכים, מורים, הנהלה ובעלי תפקידים נוספים. המודול נבנה כמערכת מרובת תהליכים ומרובת הרשאות, עם דגש על פרטיות, תפעול שוטף, מדידה, דוחות והכנה להתרחבות עתידית.",
      externalLinkLabel: "לאתר Smart Campus",
      externalLinkHref: smartCampusLink,
      chipsAriaLabel: "תגיות מודול מרכז הלמידה",
      chips: [
        "EdTech",
        "Complex Systems",
        "ניתוח נתונים",
        "ניתוח מידע",
        "תכנון BI",
        "פיתוח End-to-End",
        "הטמעה",
        "MVP",
        "ERP",
        "Go-to-Market Foundations"
      ],
      metadataTitle: "מטא-דאטה של הפרויקט",
      metadata: [
        {
          label: "סוג מוצר",
          value: "EdTech / ERP",
          icon: "productType"
        },
        {
          label: "תפקיד",
          value: "מנתח מערכות",
          icon: "role"
        },
        {
          label: "תקופה",
          value: ltr("06/2019 – 06/2020"),
          icon: "period"
        },
        {
          label: "משך",
          value: "שנה",
          icon: "duration"
        },
        {
          label: "לקוח מרכזי",
          value: "חוות הנוער הציוני",
          icon: "client"
        },
        {
          label: "אופי הפרויקט",
          value: ltr("MVP + Pilot + Expansion Foundations"),
          icon: "nature"
        }
      ]
    },
    highlightsTitle: "מוקדי החוזק",
    highlightsAriaLabel: "נקודות בולטות במודול מרכז הלמידה",
    highlights: [
      {
        title: "מערכת מרובת תהליכים",
        text: "מודול עם יותר מ-50 מסכים ו-8+ תהליכים עסקיים, שנבנה כדי לייצר סדר, שליטה ואחידות תפעולית במרכז הלמידה.",
        icon: "system"
      },
      {
        title: "ריבוי משתמשים והרשאות",
        text: "חוויות שימוש שונות למדריכים, צוות סוציאלי, בית הספר, הנהלה ורכזים — עם רמות חשיפה מותאמות לכל תפקיד.",
        icon: "permissions"
      },
      {
        title: "דאטה, BI ויעילות תפעולית",
        text: "תכנון מדידה, הפקת דוחות ותמונת מצב ניהולית שמסייעים לחסוך זמן, לשפר נוכחות ולייעל תקציב.",
        icon: "insights"
      }
    ],
    accordionTitle: "המהלך המערכתי",
    accordionAriaLabel: "הסיפור המערכתי של מודול מרכז הלמידה",
    accordion: [
      {
        title: "הרקע והצורך העסקי",
        preview: "איך הופכים מרכז למידה מתהליך ידני ומפוזר למערכת תפעולית אחת?",
        icon: "context",
        blocks: [
          {
            type: "paragraph",
            text: "הפרויקט עסק בייעול העבודה היומיומית של המשתמשים שבאים במגע עם מרכז הלמידה בכפרי הנוער. המטרה הייתה להחליף תהליכים מפוזרים, ידניים וחלקיים בפלטפורמה אחת שמרכזת רישום, תיאום שיעורים, נוכחות, הרשאות, מעקב ודיווח."
          },
          {
            type: "paragraph",
            text: "הפתרון נשען על חזון רחב יותר של Smart Campus כמערכת לניהול מוסדות חינוך בלתי פורמליים, מסגרות חוץ ומרכזי למידה, עם דגש על שליטה תפעולית, איסוף נתונים, בקרה ושיפור תהליכים."
          }
        ]
      },
      {
        title: "המשתמשים והמורכבות הארגונית",
        preview: "לא היה כאן משתמש אחד — אלא מערכת שלמה של בעלי תפקידים.",
        icon: "users",
        blocks: [
          {
            type: "paragraph",
            text: "המודול אופיין עבור מגוון רחב של משתמשים, שלכל אחד מהם צרכים, תצוגות והרשאות שונות:"
          },
          {
            type: "list",
            items: [
              "צוות חינוכי / מדריכים",
              "צוות סוציאלי",
              "צוות בית הספר",
              "דרג ניהולי ורכזים",
              "מנהל פנימיה",
              "סמנכ\"לים",
              "מנכ\"ל הכפר"
            ]
          },
          {
            type: "paragraph",
            text: "לכל אחד מהתפקידים הוגדרה מהות שימוש שונה, רמות חשיפה שונות לנתונים, ותהליכי עבודה שונים. זה דרש אפיון זהיר של הרשאות, פרטיות, ניווט, מסכים ותהליכי עבודה."
          }
        ]
      },
      {
        title: "היקף המודול והתהליכים המרכזיים",
        preview: "יותר מ-50 מסכים ו-8+ תהליכים — עם דגש על שימושיות ותפעול שוטף.",
        icon: "scope",
        blocks: [
          {
            type: "paragraph",
            text: "המודול כלל יותר מ-50 מסכים ולמעלה מ-8 תהליכים עסקיים מרכזיים, בהם:"
          },
          {
            type: "list",
            items: [
              "הרשמה עצמאית של חניכים למרכז",
              "סידור וארגון לו\"ז שיעורים",
              "הרשמת מורים",
              "הרשמת חניכים על ידי מנהל מרכז הלמידה / מתפעל",
              "מודול עריכת הרשאות על ידי מנהל מערכת",
              "שינוי מערכת גלובלי לחופשות ערוכות",
              "תהליך תזכורות",
              "ניהול תצוגות ותפעול לפי תפקיד"
            ]
          },
          {
            type: "paragraph",
            text: "הדגש היה לא רק על בניית מסכים, אלא על יצירת מערכת תהליכית שמאפשרת תפעול שוטף, עדכונים דינמיים ושליטה במורכבות."
          }
        ]
      },
      {
        title: "העבודה שלי כמנתח מערכות",
        preview: "כאן נכנסו אפיון, תהליכים, דאטה, הרשאות ותרגום צורך עסקי למערכת.",
        icon: "role",
        blocks: [
          {
            type: "paragraph",
            text: "בפרויקט לקחתי חלק כמנתח מערכות, עם אחריות על:"
          },
          {
            type: "list",
            items: [
              "חקר צרכים של צוותים שונים במרכז הלמידה",
              "אפיון מסכים, תהליכים וזרימות משתמש",
              "כתיבת דרישות מערכת",
              "תכנון הרשאות וחשיפת מידע לפי תפקיד",
              "הגדרת ישויות וקשרים מערכתיים",
              "תרגום עבודה ידנית לתהליך דיגיטלי סדור",
              "ליווי MVP ופיילוט",
              "חשיבה על הרחבה עתידית של המודול"
            ]
          },
          {
            type: "subsection",
            title: "נקודות ניתוח מערכות בולטות",
            items: [
              "אפיון ריבוי תפקידים והרשאות",
              "בניית תהליכים חוצי מסכים",
              "תכנון מידע ותצוגות לפי הקשר משתמש",
              "חיבור בין תפעול, נוכחות, שכר ודיווח",
              "תכנון סקיילביליות להרחבה עתידית",
              "אפיון מודול שיכול להפוך לבסיס לענפים נוספים"
            ]
          }
        ]
      },
      {
        title: "מטרות העל וה-KPI של הפיילוט",
        preview: "הפרויקט לא נבנה רק כדי “לסדר עבודה” — אלא כדי לייצר שיפור מדיד.",
        icon: "kpi",
        blocks: [
          {
            type: "paragraph",
            text: "הפיילוט בחוות הנוער הציוני הוגדר עם מטרות ברורות:"
          },
          {
            type: "list",
            items: [
              "הקטנת אחוז האיחורים למרכז הלמידה ב-20%",
              "הקטנת אחוז החיסורים במרכז הלמידה",
              "חיסכון פרקטי של כ-80,000 ₪ בשנה, או כ-30% מהתקציב, דרך צמצום שיעורים מבוזבזים והוצאות שכר לא יעילות",
              "הגברת הפרטיות: כל תלמיד / מורה רואה רק את המערכת הרלוונטית עבורו",
              "שליטה טובה יותר בנתונים והפקת תובנות ניהוליות",
              "חישוב אוטומטי של תשלום שכר לפי שיעורים שהתקיימו בפועל",
              "חיסכון בזמן למנהלי מרכז הלמידה בתפעול השוטף",
              "הגדלת היכולת לנהל 400+ שיעורים בשבוע"
            ]
          }
        ]
      },
      {
        title: "צמיחה, פיבוט והרחבה",
        preview: "במהלך הפיתוח התברר שהמודול יכול להיות בסיס רחב יותר ממה שתוכנן.",
        icon: "expansion",
        blocks: [
          {
            type: "paragraph",
            text: "אחת הנקודות המעניינות בפרויקט הייתה פוטנציאל ההתרחבות שלו:"
          },
          {
            type: "list",
            items: [
              "שימוש בארכיטקטורת ישויות קיימת ובגמישות ה-ERP לצורך הוספת ישויות כמו מורים, מתנדבים ובעלי תפקידים נוספים",
              "מינוף מנגנון ניהול הלו\"ז לעולמות נוספים",
              "הרחבת המודול מעבר למרכז הלמידה אל מערך חוגים, מרכז ספורט, מרכז מוזיקה ואף משק חקלאי"
            ]
          },
          {
            type: "paragraph",
            text: "זה מדגים חשיבה מערכתית שלא עוצרת ב-MVP, אלא בונה תשתית שמאפשרת שימושים נוספים בהמשך."
          }
        ]
      },
      {
        title: "האתגרים המרכזיים",
        preview: "המורכבות לא הייתה רק במוצר, אלא גם בצוות, רגולציה וסקלביליות.",
        icon: "challenges",
        blocks: [
          {
            type: "paragraph",
            text: "הפרויקט כלל מספר אתגרים משמעותיים:"
          },
          {
            type: "list",
            items: [
              "עבודה עם צוות פיתוח outsource חדש מאוקראינה",
              "עבודה עם שני מעצבי UX/UI באותו פרויקט",
              "שמירה על תקני אבטחת מידע וחשיפת נתונים בהתאם לרגישות המידע ולתקנון משרד החינוך",
              "תכנון סביבה טכנולוגית שתאפשר המשך סקלביליות"
            ]
          },
          {
            type: "paragraph",
            text: "האופי של הפרויקט דרש גם תיאום בין דיסציפלינות, גם אפיון מדויק, וגם חשיבה ארכיטקטונית קדימה."
          }
        ]
      },
      {
        title: "התוצאה והמשמעות העסקית",
        preview: "מה שהתחיל כמודול תפעולי הפך לבסיס למכירה, הרחבה ושימוש חוזר.",
        icon: "outcome",
        blocks: [
          {
            type: "paragraph",
            text: "חוות הנוער הציוני הייתה אחד הלקוחות האסטרטגיים הראשונים שעליהם בוצעו פיילוטים רבים, והיא שימשה קרקע משמעותית לבניית המודולים השונים בזכות שיתוף פעולה טוב עם הצוותים בכפר."
          },
          {
            type: "paragraph",
            text: "האסטרטגיה הייתה לדגום את הפרויקט, ללטש אותו בפיילוט, ולאחר מכן להרחיב אותו לכפרי נוער נוספים. בהמשך, כ-30% מכפרי הנוער שרכשו את המערכת רכשו גם את מודול מרכז הלמידה."
          },
          {
            type: "paragraph",
            text: "בנוסף, המודול הורחב לשימושים נוספים מעבר למרכז הלמידה, והפך לבסיס שימושי גם לניהול חוגים, מרכזים מקצועיים ופעילויות נוספות בכפרים."
          },
          {
            type: "closing",
            text: "זהו פרויקט שמדגים כיצד אפיון נכון של מערכת מורכבת יכול להפוך מתהליך פנימי לכלי עם ערך תפעולי, ארגוני ומסחרי."
          }
        ]
      }
    ],
    metricsTitle: "מדדי הצלחה",
    metricsAriaLabel: "כרטיסי KPI של מודול מרכז הלמידה",
    metrics: [
      {
        value: ltr("50+"),
        label: "מסכים",
        icon: "screens"
      },
      {
        value: ltr("8+"),
        label: "תהליכים מרכזיים",
        icon: "workflows"
      },
      {
        value: ltr("400+"),
        label: "שיעורים / שבוע",
        icon: "lessons"
      },
      {
        value: ltr("80,000 ₪"),
        label: "פוטנציאל חיסכון שנתי",
        icon: "savings"
      },
      {
        value: ltr("20%"),
        label: "יעד להפחתת איחורים",
        icon: "lateness"
      },
      {
        value: "כ-30%",
        label: "השפעה על יעילות התקציב",
        icon: "budget"
      },
      {
        value: ltr("30%"),
        label: "אימוץ בקרב כפרי הנוער הרוכשים",
        icon: "adoption"
      }
    ],
    marketing: {
      title: "שיווק המודול שניבנה",
      ariaLabel: "גלריית שקופיות לשיווק המודול שניבנה",
      slides: buildMarketingSlides("he")
    },
    processTitle: "תהליך היישום",
    processAriaLabel: "שלבי העבודה של מודול מרכז הלמידה",
    processSteps: [
      {
        title: "מחקר צרכים"
      },
      {
        title: "אפיון מודול"
      },
      {
        title: "MVP"
      },
      {
        title: "פיילוט"
      },
      {
        title: "הרחבה מערכתית"
      }
    ],
    emphasisTitle: "מה בולט כאן מבחינת ניתוח מערכות?",
    emphasisCards: [
      {
        text: "אפיון מערכת מרובת משתמשים והרשאות",
        icon: "permissions"
      },
      {
        text: "תרגום תפעול יומיומי לזרימות מערכתיות",
        icon: "flows"
      },
      {
        text: "תכנון מידע, דוחות ו-BI כחלק מהמוצר",
        icon: "reporting"
      },
      {
        text: "בניית מודול MVP עם פוטנציאל הרחבה מסחרי",
        icon: "expansion"
      }
    ],
    platform: {
      title: "About Smart Campus",
      description:
        "Smart Campus מוצגת כפלטפורמה לניהול מוסדות חינוך בלתי פורמליים, פנימיות, כפרי נוער ומרכזי למידה, עם דגש על שליטה תפעולית, איסוף נתונים, בקרה, נוכחות, אישורי יציאה ומודולים ייעודיים נוספים.",
      href: smartCampusLink,
      linkLabel: "לאתר Smart Campus"
    }
  }
} satisfies Record<Locale, SmartCampusLearningCenterCaseStudyContent>;
