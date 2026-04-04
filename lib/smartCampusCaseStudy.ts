import type { Locale } from "@/lib/i18n";

const ltr = (value: string): string => `\u2066${value}\u2069`;

export type SmartCampusMetadataIconKey =
  | "productType"
  | "role"
  | "duration"
  | "period"
  | "team"
  | "focus";

export type SmartCampusHighlightIconKey = "integration" | "analysis" | "deployment";

export type SmartCampusAccordionIconKey =
  | "context"
  | "challenge"
  | "alternatives"
  | "role"
  | "installation"
  | "pilot"
  | "impact";

export type SmartCampusEmphasisIconKey = "flow" | "integration" | "resilience" | "field";

type SmartCampusMetadataItem = {
  label: string;
  value: string;
  icon: SmartCampusMetadataIconKey;
};

type SmartCampusHighlightCard = {
  title: string;
  text: string;
  icon: SmartCampusHighlightIconKey;
};

type SmartCampusAccordionBlock =
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

type SmartCampusAccordionItem = {
  title: string;
  preview: string;
  icon: SmartCampusAccordionIconKey;
  blocks: SmartCampusAccordionBlock[];
};

type SmartCampusEmphasisCard = {
  title: string;
  icon: SmartCampusEmphasisIconKey;
};

export type SmartCampusScreen = {
  src: string;
  alt: string;
  orientation: "landscape" | "portrait";
};

export type SmartCampusGalleryCopy = {
  close: string;
  dialogLabel: string;
  next: string;
  open: string;
  previous: string;
  zoomIn: string;
  zoomOut: string;
};

type SmartCampusCaseStudyContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    heroImageAlt: string;
    chipsAriaLabel: string;
    chips: string[];
    metadataTitle: string;
    metadata: SmartCampusMetadataItem[];
    scrollLabel: string;
  };
  highlightsTitle: string;
  highlightsAriaLabel: string;
  highlights: SmartCampusHighlightCard[];
  accordionTitle: string;
  accordion: SmartCampusAccordionItem[];
  screensTitle: string;
  screensAriaLabel: string;
  gallery: SmartCampusGalleryCopy;
  screens: SmartCampusScreen[];
  processTitle: string;
  processSteps: string[];
  emphasisTitle: string;
  emphasisCards: SmartCampusEmphasisCard[];
};

export const smartCampusCaseStudyContent = {
  en: {
    hero: {
      eyebrow: "Case Study",
      title: "Smart Campus - Access Control for Educational Institutions",
      subtitle: "An IoT module for real-time entry and exit management",
      description:
        "A case study of a hardware-software product initiative that connected an ERP-based leave approval module with controllers, cameras, QR scanners, and NFC sensors - improving operational visibility and access control across educational institutions and youth villages.",
      heroImageAlt: "Smart Campus access control module hero visual",
      chipsAriaLabel: "Smart Campus project tags",
      chips: [
        "IoT",
        "Hardware Integration",
        "Access Control",
        "Security Ops",
        "Security Innovation",
        "EdTech",
        "ERP Integration",
        "Secure API",
        "QR",
        "NFC",
        "Cameras",
        "Field Pilot",
        "Systems Analysis",
        "Secure Connectivity",
        "Operational Monitoring"
      ],
      metadataTitle: "Project metadata",
      metadata: [
        {
          label: "Product Type",
          value: "EdTech / ERP / IoT",
          icon: "productType"
        },
        {
          label: "Role",
          value: "Systems Analyst / Associate Product Manager",
          icon: "role"
        },
        {
          label: "Duration",
          value: "1 Year",
          icon: "duration"
        },
        {
          label: "Period",
          value: "06/2018 - 06/2019",
          icon: "period"
        },
        {
          label: "Team",
          value: "Backend, Client, Design",
          icon: "team"
        },
        {
          label: "Focus",
          value: "Access control & exit management",
          icon: "focus"
        }
      ],
      scrollLabel: "Scroll to explore"
    },
    highlightsTitle: "Core strengths",
    highlightsAriaLabel: "Smart Campus key strengths",
    highlights: [
      {
        title: "ERP-to-Field Integration",
        text: "Connecting digital leave approvals with physical controllers, cameras, and identity verification points in real time.",
        icon: "integration"
      },
      {
        title: "End-to-End Systems Analysis",
        text: "Defining flows, entities, statuses, edge cases, and business logic for a sensitive operational process.",
        icon: "analysis"
      },
      {
        title: "Pilot & Operational Deployment",
        text: "Evaluating alternatives, running field installations, and validating the solution under real-world conditions.",
        icon: "deployment"
      }
    ],
    accordionTitle: "Systems story",
    accordion: [
      {
        title: "Business Context & Need",
        preview: "How do you connect digital permissions with real control at the gate?",
        icon: "context",
        blocks: [
          {
            type: "paragraph",
            text: "Smart Campus is a management platform for educational institutions and youth villages. This project focused on building a module that could improve control over student exits, returns, and visitor access. The goal was to create real-time visibility, reduce reliance on manual processes, and connect the ERP layer with physical infrastructure in the field."
          }
        ]
      },
      {
        title: "The System Challenge",
        preview: "This was not just a new screen - it was a full hardware-software system.",
        icon: "challenge",
        blocks: [
          {
            type: "paragraph",
            text: "The solution had to combine multiple layers:"
          },
          {
            type: "list",
            items: [
              "ERP leave approval module",
              "app / QR-based student identification",
              "external access controller",
              "camera / scanner / NFC devices",
              "network connectivity",
              "secure API layer",
              "logging and entry/exit event tracking"
            ]
          },
          {
            type: "paragraph",
            text: "The core challenge was to design a process that was reliable, fast, secure, and operationally simple for both staff and end users."
          }
        ]
      },
      {
        title: "Evaluating Alternatives",
        preview: "Multiple technological approaches were tested before selecting the right one.",
        icon: "alternatives",
        blocks: [
          {
            type: "paragraph",
            text: "Different alternatives were explored:"
          },
          {
            type: "list",
            items: [
              "different camera types",
              "NFC controllers",
              "QR scanners",
              "ready-made face recognition systems",
              "combinations of cameras with additional identification layers",
              "different controllers and proximity sensors"
            ]
          },
          {
            type: "paragraph",
            text: "Selection criteria included cost-effectiveness, reliability in field conditions, ease of integration, security, response time, and installation and maintenance simplicity. Eventually, the team selected the option that delivered the best cost-benefit ratio and enabled a practical, profitable pilot."
          }
        ]
      },
      {
        title: "My Role as a Systems Analyst",
        preview: "This is where process design, integration thinking, and edge-case definition came in.",
        icon: "role",
        blocks: [
          {
            type: "paragraph",
            text: "My role combined systems analysis and product support responsibilities, including:"
          },
          {
            type: "list",
            items: [
              "analyzing the business flow of student exits and returns",
              "writing business and technical requirements",
              "specifying the integration between ERP and the controller",
              "defining a secure API wrapper",
              "translating hardware and operational constraints into system specifications",
              "designing flows, statuses, entities, and business rules",
              "supporting the pilot and field deployment"
            ]
          },
          {
            type: "subsection",
            title: "Key Systems Analysis Contributions",
            items: [
              "defining core entities",
              "managing statuses and permissions",
              "handling edge cases",
              "synchronizing physical events with business events",
              "planning offline / failover behavior",
              "logging, audit, and traceability"
            ]
          }
        ]
      },
      {
        title: "Installation Architecture",
        preview: "The solution was designed for field installers, not just software users.",
        icon: "installation",
        blocks: [
          {
            type: "paragraph",
            text: "The system was designed as a practical installation unit that included:"
          },
          {
            type: "list",
            items: [
              "wall-mounted box",
              "UPS",
              "motherboard",
              "hardware controller",
              "router with SIM / RJ45",
              "wiring",
              "camera",
              "access controller / QR scanner / NFC reader"
            ]
          },
          {
            type: "paragraph",
            text: "This reflects broader product thinking: not just software, but a deployable operational unit built for real-world installation and use."
          }
        ]
      },
      {
        title: "Pilot, Fieldwork & Learning",
        preview: "The real validation happened outside the screen.",
        icon: "pilot",
        blocks: [
          {
            type: "paragraph",
            text: "As part of the pilot, physical installations were carried out in the field, alongside connectivity checks, operational testing, and validation under real-world constraints. This made it possible to assess:"
          },
          {
            type: "list",
            items: [
              "identification speed",
              "connection stability",
              "installation simplicity",
              "user behavior",
              "system reliability in actual environments"
            ]
          }
        ]
      },
      {
        title: "Impact & Outcome",
        preview: "The solution connected ERP logic with field operations and created real operational value.",
        icon: "impact",
        blocks: [
          {
            type: "paragraph",
            text: "The system enabled:"
          },
          {
            type: "list",
            items: [
              "accurate monitoring of entries and exits",
              "continuous visibility into student presence",
              "a direct link between leave approvals and actual gate passage",
              "improved operational control",
              "a faster process for visitors and guests",
              "a foundation for rollout to additional institutions"
            ]
          },
          {
            type: "closing",
            text: "Through the right technology choices, precise system definition, and field-based learning, the project delivered a practical, scalable, and commercially viable solution."
          }
        ]
      }
    ],
    screensTitle: "Project screens",
    screensAriaLabel: "Smart Campus project screens",
    gallery: {
      close: "Close gallery",
      dialogLabel: "Smart Campus project screens gallery",
      next: "Next screen",
      open: "Open image",
      previous: "Previous screen",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out"
    },
    screens: [
      {
        src: "/images/case-studies/smart-campus-security-module/Permission.png",
        alt: "Smart Campus permission management dashboard",
        orientation: "landscape"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/Permission%20(Students).png",
        alt: "Smart Campus student permission screen",
        orientation: "landscape"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/Frame%203492.png",
        alt: "Smart Campus mobile access flow screen",
        orientation: "portrait"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/X%20-%2025.png",
        alt: "Smart Campus mobile approval journey screen",
        orientation: "portrait"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/Bid%202.png",
        alt: "Smart Campus mobile confirmation screen",
        orientation: "portrait"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/iPhone%208%20-%2041.png",
        alt: "Smart Campus long mobile project screen",
        orientation: "portrait"
      }
    ],
    processTitle: "Delivery path",
    processSteps: [
      "Alternative Research",
      "Process Definition",
      "API Integration",
      "Field Pilot",
      "Rollout & Expansion"
    ],
    emphasisTitle: "What stands out here from a systems analysis perspective?",
    emphasisCards: [
      {
        title: "Translating an operational need into a system flow",
        icon: "flow"
      },
      {
        title: "Secure ERP-to-controller integration",
        icon: "integration"
      },
      {
        title: "Edge-case definition and system resilience",
        icon: "resilience"
      },
      {
        title: "Connecting digital product thinking with real field deployment",
        icon: "field"
      }
    ]
  },
  he: {
    hero: {
      eyebrow: "מחקר מקרה",
      title: "Smart Campus - בקרת כניסה למוסדות חינוך",
      subtitle: "מודול IoT לניהול כניסה ויציאה בזמן אמת",
      description:
        `מחקר מקרה על פרויקט משולב חומרה-תוכנה, שחיבר בין מודול אישורי יציאה במערכת ${ltr(
          "ERP"
        )} לבין בקרים, מצלמות, סורקי ${ltr("QR")} וחיישני ${ltr(
          "NFC"
        )} - לטובת שליטה תפעולית טובה יותר במוסדות חינוך וכפרי נוער.`,
      heroImageAlt: "תצוגת הירו של מודול בקרת הכניסה Smart Campus",
      chipsAriaLabel: "תגיות פרויקט Smart Campus",
      chips: [
        "IoT",
        "אינטגרציית חומרה",
        "בקרת כניסה",
        "תפעול ואבטחה",
        "חדשנות אבטחתית",
        "EdTech",
        `אינטגרציית ${ltr("ERP")}`,
        `מעטפת ${ltr("API")} מאובטחת`,
        "QR",
        "NFC",
        "מצלמות",
        "פיילוט שטח",
        "ניתוח מערכות",
        "קישוריות מאובטחת",
        "ניטור תפעולי"
      ],
      metadataTitle: "מטא-דאטה של הפרויקט",
      metadata: [
        {
          label: "סוג מוצר",
          value: ltr("EdTech / ERP / IoT"),
          icon: "productType"
        },
        {
          label: "תפקיד",
          value: "מנתח מערכות / עוזר מנהל מוצר",
          icon: "role"
        },
        {
          label: "משך",
          value: "שנה",
          icon: "duration"
        },
        {
          label: "תקופה",
          value: ltr("06/2018 - 06/2019"),
          icon: "period"
        },
        {
          label: "צוות",
          value: "פיתוח Backend, פיתוח Client, עיצוב",
          icon: "team"
        },
        {
          label: "פוקוס",
          value: "בקרת כניסה וניהול יציאות",
          icon: "focus"
        }
      ],
      scrollLabel: "גללו כדי להמשיך"
    },
    highlightsTitle: "מוקדי החוזק",
    highlightsAriaLabel: "מוקדי החוזק של Smart Campus",
    highlights: [
      {
        title: "אינטגרציית ERP לשטח",
        text: `חיבור בין אישורי יציאה דיגיטליים לבין בקרי כניסה, מצלמות ואמצעי זיהוי פיזיים בזמן אמת.`,
        icon: "integration"
      },
      {
        title: "ניתוח מערכות מקצה לקצה",
        text: "אפיון תהליכים, ישויות, סטטוסים, מקרי קצה וחוקי מערכת עבור תהליך רגיש ותפעולי.",
        icon: "analysis"
      },
      {
        title: "פיילוט והטמעה מבצעית",
        text: "בחינת חלופות, התקנות שטח ולמידה אמיתית מהעולם הפיזי עד לפתרון ישים ורווחי.",
        icon: "deployment"
      }
    ],
    accordionTitle: "המהלך המערכתי",
    accordion: [
      {
        title: "הרקע והצורך העסקי",
        preview: "איך מחברים בין אישורי יציאה דיגיטליים לבין שליטה אמיתית בשער הכניסה?",
        icon: "context",
        blocks: [
          {
            type: "paragraph",
            text: `Smart Campus היא מערכת לניהול מוסדות חינוך וכפרי נוער. במסגרת הפרויקט פותח מודול שנועד לייצר שליטה מדויקת יותר על יציאת חניכים, חזרתם למתחם וניהול כניסת מבקרים. המטרה היתה לייצר תמונת מצב בזמן אמת, להפחית תלות בתהליכים ידניים, ולחבר בין המערכת הארגונית לבין תשתית פיזית בשטח.`
          }
        ]
      },
      {
        title: "הבעיה המערכתית",
        preview: "האתגר לא היה רק מסך חדש, אלא מערכת חומרה-תוכנה שלמה.",
        icon: "challenge",
        blocks: [
          {
            type: "paragraph",
            text: "הפתרון נדרש לשלב בין כמה שכבות:"
          },
          {
            type: "list",
            items: [
              `מודול אישורי יציאה ב-${ltr("ERP")}`,
              `אפליקציה / ${ltr("QR")} לזיהוי תלמיד`,
              "בקר כניסה חיצוני",
              `מצלמה / סורק / ${ltr("NFC")}`,
              "תקשורת רשת",
              `${ltr("API")} מאובטח`,
              "רישום לוגים ואירועי כניסה/יציאה"
            ]
          },
          {
            type: "paragraph",
            text: "האתגר המרכזי היה לייצר תהליך אמין, מהיר, מאובטח, וקל לתפעול גם עבור הצוות וגם עבור המשתמשים בקצה."
          }
        ]
      },
      {
        title: "בחינת חלופות",
        preview: "נבחנו כמה טכנולוגיות עד למציאת החלופה המשתלמת ביותר.",
        icon: "alternatives",
        blocks: [
          {
            type: "paragraph",
            text: "נבדקו חלופות שונות:"
          },
          {
            type: "list",
            items: [
              "מצלמות מסוגים שונים",
              `בקרי ${ltr("NFC")}`,
              `סורקי ${ltr("QR")}`,
              "מערכות זיהוי פנים מוכנות",
              "שילוב מצלמות עם מנגנוני זיהוי נוספים",
              "סוגי בקרים וחיישנים שונים"
            ]
          },
          {
            type: "paragraph",
            text: "שיקולי הבחירה כללו עלות מול תועלת, אמינות בשטח, קלות אינטגרציה, אבטחת מידע, זמן תגובה, ונוחות התקנה ותחזוקה. לבסוף נבחרה חלופה שאפשרה לצאת לפיילוט ישים ורווחי."
          }
        ]
      },
      {
        title: "העבודה שלי כמנתח מערכות",
        preview: "כאן נכנס החלק של אפיון, אינטגרציה, תהליכים ומקרי קצה.",
        icon: "role",
        blocks: [
          {
            type: "paragraph",
            text: "בפרויקט לקחתי חלק כמנתח מערכות ועוזר מנהל מוצר, עם אחריות על:"
          },
          {
            type: "list",
            items: [
              "חקר תהליך עסקי של יציאה וחזרה של חניכים",
              "כתיבת דרישות עסקיות וטכניות",
              `אפיון אינטגרציה בין ${ltr("ERP")} לבקר`,
              `תכנון מעטפת ${ltr("API")} מאובטחת`,
              "תרגום אילוצי חומרה ותפעול למסמכי אפיון",
              "הגדרת זרימות, סטטוסים, ישויות וחוקי מערכת",
              "ליווי פיילוט והטמעה בשטח"
            ]
          },
          {
            type: "subsection",
            title: "נקודות ניתוח מערכות בולטות",
            items: [
              "הגדרת ישויות מרכזיות",
              "ניהול סטטוסים והרשאות",
              "טיפול במקרי קצה",
              "סנכרון בין אירוע פיזי לאירוע עסקי",
              `תכנון התנהגות ${ltr("Offline")} ו-${ltr("Failover")}`,
              "לוגים, Audit ותיעוד"
            ]
          }
        ]
      },
      {
        title: "ארכיטקטורת ההתקנה",
        preview: "הפתרון תוכנן גם למתקין בשטח, לא רק למשתמש במערכת.",
        icon: "installation",
        blocks: [
          {
            type: "paragraph",
            text: "המערכת נבנתה כיחידת התקנה נוחה שכללה:"
          },
          {
            type: "list",
            items: [
              "קופסה נתלית",
              "UPS",
              "לוח אם",
              "בקר חומרה",
              `ראוטר עם ${ltr("SIM / RJ45")}`,
              "חיווט",
              "מצלמה",
              `בקר כניסה / סורק ${ltr("QR")} / קורא ${ltr("NFC")}`
            ]
          },
          {
            type: "paragraph",
            text: "הדגש כאן הוא על חשיבה מוצרית רחבה: לא רק תוכנה, אלא יחידת התקנה תפעולית מלאה שמאפשרת פריסה אמיתית בשטח."
          }
        ]
      },
      {
        title: "פיילוט, שטח ולמידה",
        preview: "הוולידציה האמיתית קרתה מחוץ למסך.",
        icon: "pilot",
        blocks: [
          {
            type: "paragraph",
            text: "כחלק מהרצת הפיילוט בוצעו התקנות פיזיות בשטח, בדיקות חיבוריות, תפעול והבנת מגבלות העולם האמיתי. זה אפשר לבדוק:"
          },
          {
            type: "list",
            items: [
              "מהירות זיהוי",
              "יציבות חיבור",
              "נוחות התקנה",
              "התנהגות משתמשים",
              "אמינות המערכת בתנאי אמת"
            ]
          }
        ]
      },
      {
        title: "הערך והתוצאה",
        preview: "הפתרון חיבר בין עולם ה-ERP לעולם השטח וייצר ערך תפעולי אמיתי.",
        icon: "impact",
        blocks: [
          {
            type: "paragraph",
            text: "המערכת אפשרה:"
          },
          {
            type: "list",
            items: [
              "ניטור מדויק של כניסה ויציאה",
              "מידע שוטף על הימצאות חניכים",
              "חיבור בין אישורי יציאה לבין מעבר בפועל",
              "שיפור שליטה תפעולית",
              "תהליך מהיר יותר גם עבור אורחים ומבקרים",
              "בסיס לפריסה במוסדות נוספים"
            ]
          },
          {
            type: "closing",
            text: "באמצעות בחירות טכנולוגיות נכונות, אפיון מדויק ולמידה מהשטח, הצלחנו לייצר פתרון ישים, סקיילבילי ורווחי."
          }
        ]
      }
    ],
    screensTitle: "מסכים מהפרוייקט",
    screensAriaLabel: "מסכים מתוך פרויקט Smart Campus",
    gallery: {
      close: "סגור גלריה",
      dialogLabel: "גלריית המסכים של פרויקט Smart Campus",
      next: "למסך הבא",
      open: "פתח תמונה",
      previous: "למסך הקודם",
      zoomIn: "הגדל",
      zoomOut: "הקטן"
    },
    screens: [
      {
        src: "/images/case-studies/smart-campus-security-module/Permission.png",
        alt: "מסך ניהול אישורים של Smart Campus",
        orientation: "landscape"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/Permission%20(Students).png",
        alt: "מסך אישורי תלמידים של Smart Campus",
        orientation: "landscape"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/Frame%203492.png",
        alt: "מסך מובייל של זרימת בקרת הכניסה",
        orientation: "portrait"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/X%20-%2025.png",
        alt: "מסך מובייל של תהליך אישור וגישה",
        orientation: "portrait"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/Bid%202.png",
        alt: "מסך מובייל של אישור פעולה",
        orientation: "portrait"
      },
      {
        src: "/images/case-studies/smart-campus-security-module/iPhone%208%20-%2041.png",
        alt: "מסך מובייל ארוך מתוך הפרויקט",
        orientation: "portrait"
      }
    ],
    processTitle: "תהליך היישום של הפרוייקט",
    processSteps: [
      "מחקר חלופות",
      "אפיון תהליך",
      "אינטגרציית API",
      "פיילוט בשטח",
      "פריסה והרחבה"
    ],
    emphasisTitle: "מה בולט כאן מבחינת ניתוח מערכות?",
    emphasisCards: [
      {
        title: "תרגום צורך תפעולי לזרימה מערכתית",
        icon: "flow"
      },
      {
        title: "אינטגרציה מאובטחת בין ERP לבקר",
        icon: "integration"
      },
      {
        title: "אפיון מקרי קצה ושרידות מערכת",
        icon: "resilience"
      },
      {
        title: "חיבור בין מוצר דיגיטלי להתקנת שטח אמיתית",
        icon: "field"
      }
    ]
  }
} satisfies Record<Locale, SmartCampusCaseStudyContent>;
