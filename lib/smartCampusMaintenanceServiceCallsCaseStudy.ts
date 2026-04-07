import type { Locale } from "@/lib/i18n";

const smartCampusLink = "https://www.smart-campus.co.il/";
const ltr = (value: string): string => `\u2066${value}\u2069`;

export type SmartCampusMaintenanceMetadataIconKey =
  | "productType"
  | "role"
  | "team"
  | "stage"
  | "version"
  | "users"
  | "duration"
  | "period";

export type SmartCampusMaintenanceHighlightIconKey = "field" | "workflow" | "impact";

export type SmartCampusMaintenanceAccordionIconKey =
  | "context"
  | "problem"
  | "solution"
  | "role"
  | "outcomes"
  | "redesign"
  | "market"
  | "strategy";

export type SmartCampusMaintenanceMetricIconKey =
  | "launch"
  | "staff"
  | "workflow"
  | "speed"
  | "redesign"
  | "inventory";

export type SmartCampusMaintenanceEmphasisIconKey =
  | "manualToDigital"
  | "bottlenecks"
  | "permissions"
  | "evolution";

type SmartCampusMaintenanceMetadataItem = {
  label: string;
  value: string;
  icon: SmartCampusMaintenanceMetadataIconKey;
};

type SmartCampusMaintenanceHighlightCard = {
  title: string;
  text: string;
  icon: SmartCampusMaintenanceHighlightIconKey;
};

type SmartCampusMaintenanceAccordionBlock =
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
    type: "supporting";
    text: string;
  }
  | {
    type: "closing";
    text: string;
  };

export type SmartCampusMaintenanceAccordionItem = {
  title: string;
  preview: string;
  icon: SmartCampusMaintenanceAccordionIconKey;
  blocks: SmartCampusMaintenanceAccordionBlock[];
};

type SmartCampusMaintenanceMetricCard = {
  accent: string;
  label: string;
  icon: SmartCampusMaintenanceMetricIconKey;
};

type SmartCampusMaintenanceProcessStep = {
  primary: string;
  secondary: string;
};

type SmartCampusMaintenanceEmphasisCard = {
  text: string;
  icon: SmartCampusMaintenanceEmphasisIconKey;
};

type SmartCampusMaintenancePlatformContext = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type SmartCampusMaintenanceCaseStudyContent = {
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
    metadata: SmartCampusMaintenanceMetadataItem[];
    mediaLabel: string;
  };
  highlightsAriaLabel: string;
  highlights: SmartCampusMaintenanceHighlightCard[];
  accordionAriaLabel: string;
  accordion: SmartCampusMaintenanceAccordionItem[];
  metricsAriaLabel: string;
  metrics: SmartCampusMaintenanceMetricCard[];
  processAriaLabel: string;
  processSteps: SmartCampusMaintenanceProcessStep[];
  emphasisTitle: string;
  emphasisCards: SmartCampusMaintenanceEmphasisCard[];
  platform: SmartCampusMaintenancePlatformContext;
};

export const smartCampusMaintenanceServiceCallsCaseStudyContent = {
  en: {
    hero: {
      eyebrow: "Case Study",
      title: "Smart Campus — Maintenance & Service Module",
      subtitle: "First module to launch with, built around a real need from maintenance team in youth villages",
      description:
        "One of the most foundational Smart Campus modules — a maintenance and service-call system built for maintenance departments. The module emerged from a real user need and replaced paperwork, delays, and operational ambiguity with one digital workflow tailored to the education sector.",
      externalLinkLabel: "Visit Smart Campus",
      externalLinkHref: smartCampusLink,
      chipsAriaLabel: "Maintenance and service module tags",
      chips: [
        "EdTech",
        "ERP",
        "Service Management",
        "Maintenance Operations",
        "Systems Analysis",
        "Process Mapping",
        "Bottleneck Analysis",
        "Workflow Design",
        "MVP",
        "Redesign",
        "Operational Efficiency",
        "Inventory",
        "Digital Transformation",
        "Go-to-Market Foundations"
      ],
      metadataTitle: "Project metadata",
      metadata: [
        {
          label: "Product Type",
          value: "EdTech / ERP / Operations",
          icon: "productType"
        },
        {
          label: "Role",
          value: "Systems Analyst",
          icon: "role"
        },
        {
          label: "Team",
          value: "1 Backend Developer",
          icon: "team"
        },
        {
          label: "Product Stage",
          value: "First Module to Launch",
          icon: "stage"
        },
        {
          label: "Version",
          value: "MVP + Redesign One Year Later",
          icon: "version"
        },
        {
          label: "Users",
          value: "Maintenance Departments in Youth Villages",
          icon: "users"
        },
        {
          label: "Project Start",
          value: "06/2018",
          icon: "period"
        }
      ],
      mediaLabel: "Smart Campus maintenance and service module hero image"
    },
    highlightsAriaLabel: "Maintenance and service module highlights",
    highlights: [
      {
        title: "Real Field Need",
        text: "The module was built around the daily needs of maintenance departments, with teams ranging from 5 to 30 staff members across youth villages.",
        icon: "field"
      },
      {
        title: "End-to-End Workflow",
        text: "The system covered the full operational flow — from opening a digital service call, through tracking and handling, to inventory counting and departmental control.",
        icon: "workflow"
      },
      {
        title: "Major Operational Improvement",
        text: "Process definition and bottleneck analysis made it possible to dramatically shorten the time between issue discovery and initial treatment.",
        icon: "impact"
      }
    ],
    accordionAriaLabel: "Maintenance and service module systems story",
    accordion: [
      {
        title: "Business Context & Need",
        preview: "This project marked the beginning of Smart Campus.",
        icon: "context",
        blocks: [
          {
            type: "paragraph",
            text: "The maintenance and service-calls module was the first module to launch with, built around a real need from maintenance teams across youth villages. These departments usually included between 5 and 30 staff members who handled issues, field tasks, equipment, and inventory through workflows that were not structured or digital enough."
          },
          {
            type: "paragraph",
            text: "As with the broader platform vision, the goal was to create one system specifically tailored to educational institutions rather than relying on generic solutions that did not truly fit this environment."
          }
        ]
      },
      {
        title: "The Problem Before the Module",
        preview: "Issues were discovered in real time, but reporting and treatment started much later.",
        icon: "problem",
        blocks: [
          {
            type: "paragraph",
            text: "Before the module, a significant part of the workflow relied on paperwork and manual routines."
          },
          {
            type: "paragraph",
            text: "When instructors identified an issue, the service call was not always opened immediately — sometimes only one or two days after discovery. From there, treatment would only begin when a maintenance staff member physically checked the relevant box or collection point and tried to understand what had been opened, what was urgent, and what required tools or immediate handling."
          },
          {
            type: "paragraph",
            text: "This created delays, uncertainty, and a major gap between issue discovery and the beginning of actual treatment."
          }
        ]
      },
      {
        title: "The Solution & Module Scope",
        preview: "The module was designed to support the entire department, not just the “open request” screen.",
        icon: "solution",
        blocks: [
          {
            type: "paragraph",
            text: "The service-calls module became one of the strongest solutions compared to competitors, based on prior market research. It was designed to support the maintenance department broadly — from opening a digital service call, through status management and tracking, all the way to equipment handling and inventory counts."
          },
          {
            type: "paragraph",
            text: "The focus was to build one system that addresses the department’s needs in a way tailored to educational institutions, rather than a narrow tool that only solves one small part of the workflow."
          }
        ]
      },
      {
        title: "My Role as a Systems Analyst",
        preview: "This is where workflow design, bottleneck analysis, and system logic came together.",
        icon: "role",
        blocks: [
          {
            type: "paragraph",
            text: "My role focused on systems analysis work, with emphasis on:"
          },
          {
            type: "list",
            items: [
              "defining the operational workflows of maintenance departments",
              "identifying bottlenecks in the existing process",
              "translating manual flows into digital workflows",
              "defining screens, actions, statuses, and permissions",
              "shaping logic that fits the nature of the department",
              "specifying a process that connects service calls, priorities, tasks, and equipment",
              "supporting the MVP and later the module’s maturity toward redesign"
            ]
          },
          {
            type: "subsection",
            title: "Key Systems Analysis Contributions",
            items: [
              "mapping the As-Is process versus the To-Be flow",
              "identifying bottlenecks and dependencies between roles",
              "defining statuses and transition rules between request states",
              "planning permissions and data visibility by user type",
              "connecting service call, resource, inventory, and field action",
              "designing a module that could be expanded later"
            ]
          }
        ]
      },
      {
        title: "Outcomes & Improvements",
        preview: "The biggest change was in the time between issue discovery and treatment initiation.",
        icon: "outcomes",
        blocks: [
          {
            type: "paragraph",
            text: "One of the central achievements of the module was a dramatic reduction in the time between issue discovery and actual treatment initiation — with an improvement of 1000%+."
          },
          {
            type: "supporting",
            text: "In the paper-based era, an issue would often be opened by instructors one or two days after it was discovered. After that, treatment would only begin once a maintenance staff member physically checked the relevant box or request collection point and tried to understand what had been opened and what required action.\n\nMoving to immediate digital service-call creation radically shortened the time between problem discovery and treatment start."
          }
        ]
      },
      {
        title: "MVP and Later Redesign",
        preview: "The first version launched quickly, but one year later the module went through a full redesign.",
        icon: "redesign",
        blocks: [
          {
            type: "paragraph",
            text: "The module first launched as an MVP, with the goal of shipping a working solution quickly and learning from real usage. One year after launch, the module went through a full end-to-end redesign."
          },
          {
            type: "paragraph",
            text: "This reflects a pragmatic product-and-systems approach: first deliver a usable solution tied to a real operational need, then improve structure, usability, and workflow clarity based on accumulated learning."
          }
        ]
      },
      {
        title: "Why It Stood Out in the Market",
        preview: "The module was informed by market research and addressed a deeper need than competing tools.",
        icon: "market",
        blocks: [
          {
            type: "paragraph",
            text: "Based on prior market research, the service-calls module proved to be one of the strongest systems compared to alternatives in the market. One of the main reasons was that it was not built only around “opening a request,” but around the broader work of the department."
          },
          {
            type: "paragraph",
            text: "It connected requests, execution, equipment, inventory, and operations — creating a deeper fit for the organization’s real needs."
          }
        ]
      },
      {
        title: "Strategic Meaning for the Product",
        preview: "As the first launch module, it helped define how Smart Campus began to grow.",
        icon: "strategy",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond the immediate operational value, the project also had strategic significance: it was one of the earliest modules that shaped the product direction of Smart Campus. It proved that a real internal pain point in educational institutions could be analyzed deeply and turned into a meaningful system module."
          },
          {
            type: "paragraph",
            text: "As the first module to launch with, it created a foundation for the broader platform that followed and demonstrated how systems thinking can start from one clear problem and evolve into a full product ecosystem."
          },
          {
            type: "closing",
            text: "This project demonstrates how strong process analysis, bottleneck identification, and tailored system definition can turn a daily operational pain point into the foundation of a real product."
          }
        ]
      }
    ],
    metricsAriaLabel: "Maintenance and service module metrics",
    metrics: [
      {
        accent: "First",
        label: "Module to Launch",
        icon: "launch"
      },
      {
        accent: "5–30",
        label: "Staff per Maintenance Department",
        icon: "staff"
      },
      {
        accent: "End-to-End",
        label: "Workflow Coverage",
        icon: "workflow"
      },
      {
        accent: "1000%+",
        label: "Faster Issue Treatment Initiation",
        icon: "speed"
      },
      {
        accent: "MVP →",
        label: "Full Redesign After 1 Year",
        icon: "redesign"
      },
      {
        accent: "From Service Call",
        label: "to Inventory Counts",
        icon: "inventory"
      }
    ],
    processAriaLabel: "Maintenance and service module process strip",
    processSteps: [
      {
        primary: "Real Need",
        secondary: "צורך שטח"
      },
      {
        primary: "Process Mapping",
        secondary: "מיפוי תהליך"
      },
      {
        primary: "MVP",
        secondary: "MVP"
      },
      {
        primary: "Field Learning",
        secondary: "למידה מהשטח"
      },
      {
        primary: "Redesign",
        secondary: "Redesign"
      }
    ],
    emphasisTitle: "What stands out here from a systems analysis perspective?",
    emphasisCards: [
      {
        text: "Translating a manual workflow into a digital flow",
        icon: "manualToDigital"
      },
      {
        text: "Identifying bottlenecks between issue discovery and treatment",
        icon: "bottlenecks"
      },
      {
        text: "Defining statuses, permissions, and logic for a maintenance department",
        icon: "permissions"
      },
      {
        text: "Building an MVP that can evolve into a more mature module",
        icon: "evolution"
      }
    ],
    platform: {
      title: "About Smart Campus",
      description:
        "Smart Campus is positioned as a platform for non-formal educational institutions, boarding frameworks, youth villages, and operational centers, with emphasis on organizational workflows, operational control, data collection, and dedicated modules for different needs.",
      href: smartCampusLink,
      linkLabel: "Visit Smart Campus"
    }
  },
  he: {
    hero: {
      eyebrow: "מחקר מקרה",
      title: "Smart Campus — מודול אחזקה וקריאות שירות",
      subtitle: "המודול הראשון להשקה במערכת, שנבנה סביב צורך שטח אמיתי של מחלקות אחזקה בכפרי נוער",
      description:
        "אחד המודולים המרכזיים בתחילת הדרך של Smart Campus — מערכת קריאות שירות ואחזקה. המודול נולד מתוך צורך אמיתי של משתמשים, ואיפשר מעבר מתהליכי ניירת, עיכובים וחוסר שליטה, למערכת דיגיטלית אחת המותאמת לסקטור החינוכי.",
      externalLinkLabel: "לאתר Smart Campus",
      externalLinkHref: smartCampusLink,
      chipsAriaLabel: "תגיות מודול אחזקה וקריאות שירות",
      chips: [
        "EdTech",
        "ERP",
        "Service Management",
        "Maintenance Operations",
        "Systems Analysis",
        "Process Mapping",
        "Bottleneck Analysis",
        "Workflow Design",
        "MVP",
        "Redesign",
        "Operational Efficiency",
        "Inventory",
        "Digital Transformation",
        "Go-to-Market Foundations"
      ],
      metadataTitle: "נתוני הפרויקט",
      metadata: [
        {
          label: "סוג מוצר",
          value: "EdTech / ERP / Operations",
          icon: "productType"
        },
        {
          label: "תפקיד",
          value: "מנתח מערכות",
          icon: "role"
        },
        {
          label: "צוות",
          value: "מפתח Backend אחד",
          icon: "team"
        },
        {
          label: "שלב מוצר",
          value: "First Module to Launch",
          icon: "stage"
        },
        {
          label: "גרסה",
          value: "MVP + Redesign לאחר שנה",
          icon: "version"
        },
        {
          label: "משתמשים",
          value: "מחלקות אחזקה בכפרי נוער",
          icon: "users"
        },
        {
          label: "משך הפרוייקט",
          value: "חצי שנה",
          icon: "duration"
        },
        {
          label: "תאריך התחלה",
          value: "06/2018",
          icon: "period"
        }
      ],
      mediaLabel: "תמונת hero של מודול אחזקה וקריאות שירות של Smart Campus"
    },
    highlightsAriaLabel: "היילייטים של מודול אחזקה וקריאות שירות",
    highlights: [
      {
        title: "צורך שטח אמיתי",
        text: "המודול נבנה סביב הצרכים היומיומיים של מחלקות אחזקה, עם צוותים של 5 עד 30 אנשי צוות בכפרי נוער שונים.",
        icon: "field"
      },
      {
        title: "תהליך מלא מקצה לקצה",
        text: "המערכת כיסתה את כל רצף העבודה — מפתיחת קריאה דיגיטלית, דרך טיפול ומעקב, ועד ספירות מלאי ושליטה תפעולית.",
        icon: "workflow"
      },
      {
        title: "שיפור תפעולי דרמטי",
        text: "אפיון תהליכים וצווארי בקבוק אפשר לקצר משמעותית את זמן פתיחת הקריאה והטיפול הראשוני בתקלה.",
        icon: "impact"
      }
    ],
    accordionAriaLabel: "סיפור המערכת של מודול אחזקה וקריאות שירות",
    accordion: [
      {
        title: "הרקע והצורך העסקי",
        preview: "הפרויקט הזה סימן את תחילת הדרך של Smart Campus.",
        icon: "context",
        blocks: [
          {
            type: "paragraph",
            text: "מודול האחזקה וקריאות השירות היה המודול הראשון להתחיל איתו, והוא נבנה מתוך צורך אמיתי של משתמשים במחלקות האחזקה בכפרי נוער שונים. המחלקות כללו בדרך כלל בין 5 ל-30 אנשי צוות, שניהלו תקלות, משימות שטח, ציוד ומלאי בתהליכים שלא היו מספיק סדורים או דיגיטליים."
          },
          {
            type: "paragraph",
            text: "הרעיון הרחב, כמו בכלל המערכת, היה ליצור מערכת אחת המותאמת לסקטור של מוסדות חינוך — ולא להשתמש בפתרונות כלליים שלא באמת מבינים את סביבת העבודה הזו."
          }
        ]
      },
      {
        title: "הבעיה לפני המודול",
        preview: "תקלות התגלו בזמן אמת, אבל הדיווח והטיפול התחילו הרבה יותר מאוחר.",
        icon: "problem",
        blocks: [
          {
            type: "paragraph",
            text: "לפני המודול, חלק משמעותי מהתהליך התבסס על ניירת והרגלי עבודה ידניים."
          },
          {
            type: "paragraph",
            text: "כאשר מדריכים זיהו תקלה, פתיחת הקריאה לא תמיד הייתה מיידית — לעיתים רק יום או יומיים לאחר הגילוי. משם, הטיפול היה מתחיל רק כאשר איש האחזקה היה ניגש פיזית לכוורת או למקום שבו רוכזו הפניות, ומנסה להבין מה נפתח, מה דחוף ומה דורש ציוד או טיפול מיידי."
          },
          {
            type: "paragraph",
            text: "המצב הזה יצר עיכובים, חוסר ודאות, ופער בין גילוי התקלה לבין תחילת הטיפול בה."
          }
        ]
      },
      {
        title: "הפתרון והיקף המודול",
        preview: "המודול נבנה כדי לתת מענה למחלקה כולה, לא רק למסך פתיחת קריאה.",
        icon: "solution",
        blocks: [
          {
            type: "paragraph",
            text: "מודול קריאות השירות נבנה כאחד המודולים המוצלחים ביותר מול הפתרונות המתחרים, בהתבסס על מחקר שוק מקדים שבוצע. הוא נועד לתת מענה רחב למחלקת האחזקה — החל מפתיחת קריאה דיגיטלית, דרך ניהול סטטוסים ומעקב, ועד לניהול ציוד וספירות מלאי."
          },
          {
            type: "paragraph",
            text: "המיקוד היה לבנות מערכת אחת שמכסה את צורכי המחלקה באופן מותאם למוסדות חינוך, ולא מוצר צר שמטפל רק בחלק קטן מהתהליך."
          }
        ]
      },
      {
        title: "העבודה שלי כמנתח מערכות",
        preview: "כאן נכנסו אפיון תהליכים, איתור צווארי בקבוק ותרגום עבודה ידנית למערכת.",
        icon: "role",
        blocks: [
          {
            type: "paragraph",
            text: "בפרויקט לקחתי חלק כמנתח מערכות, עם דגש על:"
          },
          {
            type: "list",
            items: [
              "אפיון תהליכי העבודה של מחלקות האחזקה",
              "זיהוי צווארי בקבוק בתהליך הקיים",
              "תרגום זרימות ידניות לזרימות דיגיטליות",
              "הגדרת מסכים, פעולות, סטטוסים והרשאות",
              "בניית לוגיקת עבודה שתתאים לאופי המחלקה",
              "אפיון תהליך שמחבר בין קריאות שירות, סדרי עדיפויות, משימות וציוד",
              "תמיכה ב-MVP ובהמשך גם בהבשלת המודול לקראת redesign"
            ]
          },
          {
            type: "subsection",
            title: "נקודות ניתוח מערכות בולטות",
            items: [
              "מיפוי תהליך As-Is לעומת To-Be",
              "זיהוי צווארי בקבוק ותלויות בין בעלי תפקידים",
              "הגדרת סטטוסים וחוקי מעבר בין מצבי קריאה",
              "אפיון הרשאות וחשיפת מידע לפי משתמש",
              "חיבור בין קריאה, משאב, מלאי ופעולת שטח",
              "תכנון מודול שניתן להרחיב בהמשך"
            ]
          }
        ]
      },
      {
        title: "הישגים ותוצאות",
        preview: "השינוי הגדול ביותר היה בזמן שבין גילוי התקלה לבין תחילת הטיפול.",
        icon: "outcomes",
        blocks: [
          {
            type: "paragraph",
            text: "אחד ההישגים המרכזיים של המודול היה הקטנה דרמטית של זמני הטיפול בתקלה מרגע שהתגלתה — בשיפור של 1000%+."
          },
          {
            type: "supporting",
            text: "בעידן הניירת, תקלה הייתה נפתחת על ידי המדריכים בהפרש של יום-יומיים מרגע הגילוי. לאחר מכן, הטיפול היה מתחיל רק כאשר איש האחזקה היה בודק פיזית את הכוורת או את נקודת הריכוז של הפניות, ומנסה להבין מה נפתח ומה דורש טיפול.\n\nהמעבר לפתיחת קריאה דיגיטלית מיידית קיצר בצורה קיצונית את הזמן שבין גילוי הבעיה לבין התחלת הטיפול."
          }
        ]
      },
      {
        title: "MVP ולאחר מכן redesign",
        preview: "הגרסה הראשונה השיקה מהר, אבל שנה לאחר מכן המודול עבר עיצוב מחדש מקצה לקצה.",
        icon: "redesign",
        blocks: [
          {
            type: "paragraph",
            text: "המודול עלה תחילה כגרסת MVP, מתוך מטרה להוציא פתרון עובד במהירות וללמוד מהשטח. שנה לאחר העלייה לאוויר, המודול עבר redesign מלא מקצה לקצה."
          },
          {
            type: "paragraph",
            text: "המהלך הזה משקף גישת מוצר ומערכות פרגמטית: קודם לייצר גרסה שימושית שמתחברת לצורך אמיתי, ולאחר מכן לשפר מבנה, חוויית שימוש ובהירות תפעולית בהתאם ללמידה שהצטברה."
          }
        ]
      },
      {
        title: "למה זה בלט גם מול השוק",
        preview: "המודול נבנה מתוך מחקר שוק וענה על צורך עמוק יותר מהפתרונות המתחרים.",
        icon: "market",
        blocks: [
          {
            type: "paragraph",
            text: "ממחקר שוק מקדים שנעשה, מודול קריאות השירות התברר כאחד מבין המערכות המוצלחות ביותר ביחס למתחרים. אחת הסיבות המרכזיות לכך הייתה שהוא לא נבנה רק סביב “פתיחת קריאה”, אלא סביב כלל עבודת המחלקה."
          },
          {
            type: "paragraph",
            text: "הוא חיבר בין קריאות, טיפול, ציוד, מלאי ותפעול — ובכך נתן מענה עמוק יותר לצרכים האמיתיים של הארגון."
          }
        ]
      },
      {
        title: "המשמעות האסטרטגית למוצר",
        preview: "כמודול הראשון, הוא עזר להגדיר איך Smart Campus מתחילה לצמוח.",
        icon: "strategy",
        blocks: [
          {
            type: "paragraph",
            text: "מעבר לערך התפעולי המיידי, לפרויקט הייתה גם משמעות אסטרטגית: זה היה אחד המודולים הראשונים שעליהם נבנה כיוון המוצר של Smart Campus. הוא הוכיח שאפשר לקחת צורך פנימי אמיתי של מוסדות חינוך, לאפיין אותו לעומק, ולהפוך אותו למודול מערכת בעל ערך."
          },
          {
            type: "paragraph",
            text: "כמודול הראשון להשקה, הוא יצר בסיס להמשך בניית מערכת רחבה יותר המותאמת לסקטור, והמחיש כיצד חשיבה מערכתית יכולה להתחיל מבעיה אחת ברורה ולהתפתח לפלטפורמה שלמה."
          },
          {
            type: "closing",
            text: "זהו פרויקט שמדגים כיצד ניתוח תהליכים נכון, זיהוי צווארי בקבוק ואפיון מערכת מותאמת יכולים להפוך כאב תפעולי יומיומי לבסיס למוצר אמיתי."
          }
        ]
      }
    ],
    metricsAriaLabel: "מדדי מודול אחזקה וקריאות שירות",
    metrics: [
      {
        accent: "המודול הראשון",
        label: "להשקה",
        icon: "launch"
      },
      {
        accent: ltr("5–30"),
        label: "אנשי צוות בכל מחלקת אחזקה",
        icon: "staff"
      },
      {
        accent: "כיסוי תהליך",
        label: "מקצה לקצה",
        icon: "workflow"
      },
      {
        accent: ltr("1000%+"),
        label: "שיפור במהירות תחילת הטיפול בתקלה",
        icon: "speed"
      },
      {
        accent: "MVP →",
        label: "Redesign מלא לאחר שנה",
        icon: "redesign"
      },
      {
        accent: "מקריאת שירות",
        label: "ועד ספירות מלאי",
        icon: "inventory"
      }
    ],
    processAriaLabel: "רצועת התהליך של מודול אחזקה וקריאות שירות",
    processSteps: [
      {
        primary: "צורך שטח",
        secondary: "Real Need"
      },
      {
        primary: "מיפוי תהליך",
        secondary: "Process Mapping"
      },
      {
        primary: "MVP",
        secondary: "MVP"
      },
      {
        primary: "למידה מהשטח",
        secondary: "Field Learning"
      },
      {
        primary: "Redesign",
        secondary: "Redesign"
      }
    ],
    emphasisTitle: "מה בולט כאן מבחינת ניתוח מערכות?",
    emphasisCards: [
      {
        text: "מיפוי תהליך ידני והמרתו לזרימה דיגיטלית",
        icon: "manualToDigital"
      },
      {
        text: "זיהוי צווארי בקבוק בין גילוי התקלה לטיפול",
        icon: "bottlenecks"
      },
      {
        text: "הגדרת סטטוסים, הרשאות ולוגיקת עבודה למחלקת אחזקה",
        icon: "permissions"
      },
      {
        text: "בניית MVP שממנו אפשר לצמוח למודול בשל יותר",
        icon: "evolution"
      }
    ],
    platform: {
      title: "About Smart Campus",
      description:
        "Smart Campus מוצגת כפלטפורמה לניהול מוסדות חינוך בלתי פורמליים, פנימיות, כפרי נוער ומרכזי פעילות, עם דגש על תהליכים תפעוליים, שליטה ארגונית, איסוף נתונים ומודולים ייעודיים לצרכים שונים.",
      href: smartCampusLink,
      linkLabel: "לאתר Smart Campus"
    }
  }
} satisfies Record<Locale, SmartCampusMaintenanceCaseStudyContent>;
