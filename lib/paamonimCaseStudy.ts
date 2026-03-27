import type { Locale } from "@/lib/i18n";

const ltr = (value: string): string => `\u2066${value}\u2069`;

export type PaamonimMetadataIconKey = "organization" | "product" | "team" | "tags";

export type PaamonimMetricIconKey = "adoption" | "retention" | "engagement";

export type PaamonimSectionIconKey = "challenges" | "advantages" | "delivery" | "goals";

type PaamonimMetadataItem = {
  label: string;
  value: string;
  icon: PaamonimMetadataIconKey;
};

type PaamonimMetricCard = {
  value: string;
  description: string;
  icon: PaamonimMetricIconKey;
};

type PaamonimSection = {
  title: string;
  bullets: string[];
  icon: PaamonimSectionIconKey;
};

type PaamonimCaseStudyContent = {
  title: string;
  valueStatement: string;
  summary: string;
  metadataTitle: string;
  metadata: PaamonimMetadataItem[];
  heroImageAlt: string;
  revealLabel: string;
  expandedImageAlt: string;
  metricsTitle: string;
  metricsAriaLabel: string;
  metrics: PaamonimMetricCard[];
  storyTitle: string;
  sections: PaamonimSection[];
};

export const paamonimCaseStudyContent = {
  en: {
    title: "Paamonim — Smart Financial Management App",
    valueStatement:
      "The app was developed as a central digital tool for day-to-day financial management, allowing users to manage the household from anywhere: income, expenses, debts, assets, and budget — all in one place. Alongside independent use, the system was also adapted for families receiving guidance from the organization’s volunteers, to enable efficient information sharing and a more precise guidance process.",
    summary:
      "Paamonim is a nonprofit social organization that works to promote balanced and responsible financial conduct among households in Israel. The organization provides financial guidance, knowledge, and practical tools to families and individuals, with the goal of strengthening economic independence and improving the quality of financial decision-making.",
    metadataTitle: "Project details",
    metadata: [
      {
        label: "Organization",
        value: "Nonprofit social organization",
        icon: "organization"
      },
      {
        label: "Product",
        value: "Smart financial management app",
        icon: "product"
      },
      {
        label: "Team",
        value: "Product Manager, Project Manager / Scrum Master, Designer, Senior Frontend Developer, QA",
        icon: "team"
      },
      {
        label: "Tags",
        value:
          "Nonprofit, Fintech, Financial Management, UX, Mobile, iOS, Android, Product Management, React Native",
        icon: "tags"
      }
    ],
    heroImageAlt: "Paamonim mobile app screens shown inside the case study hero",
    revealLabel: "Show more",
    expandedImageAlt: "Expanded Paamonim system screens",
    metricsTitle: "Success metrics",
    metricsAriaLabel: "Paamonim KPI cards",
    metrics: [
      {
        value: "80%",
        description: "80% of user traffic shifted to working from within the app",
        icon: "adoption"
      },
      {
        value: "15%",
        description: "User return rate increased by 15%",
        icon: "retention"
      },
      {
        value: "20%",
        description: "Time spent in the app increased by about 20%",
        icon: "engagement"
      }
    ],
    storyTitle: "Product story",
    sections: [
      {
        title: "Core challenges",
        icon: "challenges",
        bullets: [
          "A very limited budget of about 200 monthly hours for the entire team",
          "A constant balance between developing new features and handling bugs and stability improvements",
          "Aggressive prioritization of scope to maximize business value within budget constraints",
          "A need to improve the user experience in an existing system, without harming users’ workflow continuity"
        ]
      },
      {
        title: "Project advantages",
        icon: "advantages",
        bullets: [
          "A clear, agreed roadmap built together with the client",
          "An active product with existing users, which made it possible to continuously improve it based on needs from the field",
          "Collaboration with an organization that has a clear social mission and real value for end users"
        ]
      },
      {
        title: "What I did in the project",
        icon: "delivery",
        bullets: [
          "Initiated and led new features according to the needs of the organization and the users",
          "Improved the user experience while aligning with the product language and the existing flows",
          "Re-examined existing features, reduced duplication, and improved the value they create",
          "Translated business needs and user insights into practical product decisions",
          "Worked closely with development, design, and QA under time and budget constraints"
        ]
      },
      {
        title: "Project goals",
        icon: "goals",
        bullets: [
          "Increase the usability and day-to-day value of the app",
          "Respond faster to business needs coming from the field",
          "Create a continuous learning process through conversations with end users",
          "Improve the system’s ability to be adopted through digital tools",
          "Renew old infrastructures without harming existing capabilities and the user experience"
        ]
      }
    ]
  },
  he: {
    title: "פעמונים — אפליקציית ניהול פיננסי חכמה",
    valueStatement:
      "האפליקציה פותחה ככלי דיגיטלי מרכזי לניהול כלכלי יומיומי, המאפשר למשתמשים לנהל את משק הבית מכל מקום: הכנסות, הוצאות, חובות, נכסים ותקציב — הכל במקום אחד. לצד שימוש עצמאי, המערכת הותאמה גם למשפחות שמקבלות ליווי ממתנדבי הארגון, כדי לאפשר שיתוף מידע יעיל ותהליך ליווי מדויק יותר.",
    summary:
      "פעמונים היא עמותה חברתית ללא מטרות רווח, הפועלת לקידום התנהלות כלכלית מאוזנת ואחראית בקרב משקי בית בישראל. הארגון מעניק ליווי פיננסי, ידע וכלים פרקטיים למשפחות וליחידים, במטרה לחזק עצמאות כלכלית ולשפר את איכות קבלת ההחלטות הפיננסיות.",
    metadataTitle: "פרטי הפרויקט",
    metadata: [
      {
        label: "Organization",
        value: "עמותה חברתית ללא מטרות רווח",
        icon: "organization"
      },
      {
        label: "Product",
        value: "אפליקציית ניהול פיננסי חכמה",
        icon: "product"
      },
      {
        label: "Team",
        value: "מנהל מוצר, מנהל פרויקט / Scrum Master, מעצב, מפתח Frontend בכיר, QA",
        icon: "team"
      },
      {
        label: "Tags",
        value: `עמותה, ${ltr("Fintech")}, התנהלות פיננסית, ${ltr("UX")}, ${ltr(
          "Mobile"
        )}, ${ltr("iOS")}, ${ltr("Android")}, ${ltr("Product Management")}, ${ltr(
          "React Native"
        )}`,
        icon: "tags"
      }
    ],
    heroImageAlt: "מסכי אפליקציית פעמונים בתוך אזור ההירו של מחקר המקרה",
    revealLabel: "הצג עוד",
    expandedImageAlt: "תצוגה מורחבת של מסכי מערכת פעמונים",
    metricsTitle: "מדדי הצלחה",
    metricsAriaLabel: "כרטיסיות KPI של פעמונים",
    metrics: [
      {
        value: "80%",
        description: "80% מתעבורת המשתמשים עברה לעבודה מתוך האפליקציה",
        icon: "adoption"
      },
      {
        value: "15%",
        description: "החזרתיות של המשתמשים גדלה ב־15%",
        icon: "retention"
      },
      {
        value: "20%",
        description: "זמן השהייה באפליקציה עלה בכ־20%",
        icon: "engagement"
      }
    ],
    storyTitle: "המהלך המוצרי",
    sections: [
      {
        title: "האתגרים המרכזיים",
        icon: "challenges",
        bullets: [
          "תקציב מצומצם מאוד של כ־200 שעות חודשיות לכלל הצוות",
          "איזון מתמיד בין פיתוח פיצ’רים חדשים לבין טיפול בבאגים ושיפור יציבות",
          "תעדוף אגרסיבי של התכולה כדי למקסם ערך עסקי במסגרת מגבלות התקציב",
          "צורך לשפר חוויית שימוש במערכת קיימת, בלי לפגוע ברציפות העבודה של המשתמשים"
        ]
      },
      {
        title: "יתרונות הפרויקט",
        icon: "advantages",
        bullets: [
          "Roadmap ברור ומוסכם שנבנה יחד עם הלקוח",
          "מוצר פעיל עם משתמשים קיימים, שאפשר לבצע עליו שיפור מתמשך מבוסס צרכים מהשטח",
          "שיתוף פעולה עם ארגון בעל מטרה חברתית ברורה וערך ממשי למשתמשי הקצה"
        ]
      },
      {
        title: "מה עשיתי בפרויקט",
        icon: "delivery",
        bullets: [
          "ייזום והובלת פיצ’רים חדשים בהתאם לצורכי הארגון והמשתמשים",
          "שיפור חוויית המשתמש תוך התאמה לשפה המוצרית ולזרימות הקיימות",
          "בחינה מחודשת של פיצ’רים קיימים, צמצום כפילויות ושיפור הערך שהם מייצרים",
          "תרגום צרכים עסקיים ותובנות משתמשים להחלטות מוצר פרקטיות",
          "עבודה שוטפת מול צוות הפיתוח, העיצוב והבדיקות תחת מגבלות זמן ותקציב"
        ]
      },
      {
        title: "מטרות הפרויקט",
        icon: "goals",
        bullets: [
          "להעלות את השימושיות והערך היומיומי של האפליקציה",
          "להגיב מהר יותר לצרכים עסקיים שעולים מהשטח",
          "לייצר תהליך למידה רציף דרך שיחות עם משתמשי קצה",
          "לשפר את יכולת ההטמעה של המערכת באמצעות כלים דיגיטליים",
          "לחדש תשתיות ישנות מבלי לפגוע ביכולות קיימות ובחוויית המשתמש"
        ]
      }
    ]
  }
} satisfies Record<Locale, PaamonimCaseStudyContent>;
