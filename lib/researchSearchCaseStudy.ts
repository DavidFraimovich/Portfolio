import type { Locale } from "@/lib/i18n";

const ltr = (value: string): string => `\u2066${value}\u2069`;

export type ResearchSearchMetadataIconKey =
  | "productType"
  | "stage"
  | "duration"
  | "role"
  | "team"
  | "users";

export type ResearchSearchSectionIconKey =
  | "overview"
  | "challenge"
  | "lead"
  | "solution"
  | "impact"
  | "teaser";

type ResearchSearchMetadataItem = {
  label: string;
  value: string;
  icon: ResearchSearchMetadataIconKey;
  hero?: boolean;
};

type ResearchSearchSection = {
  title: string;
  icon: ResearchSearchSectionIconKey;
  paragraphs?: string[];
  bullets?: string[];
};

type ResearchSearchCaseStudyContent = {
  title: string;
  subtitle: string;
  shortDescription: string;
  scrollLabel: string;
  metadataTitle: string;
  metadata: ResearchSearchMetadataItem[];
  sections: ResearchSearchSection[];
  teaserTitle: string;
  teaser: string;
};

export const researchSearchCaseStudyContent = {
  en: {
    title: "Research Search Engine Based on RAG",
    subtitle:
      "Making research knowledge accessible through recordings, transcripts, and internal content sources",
    shortDescription:
      "An intelligent search platform built to turn unstructured knowledge — recordings, transcripts, and accumulated research content — into a more accessible, reliable, and useful knowledge source for researchers and faculty teams.",
    scrollLabel: "Scroll to explore",
    metadataTitle: "Metadata",
    metadata: [
      {
        label: "Product type",
        value: "AI Search / RAG / Knowledge Retrieval",
        icon: "productType"
      },
      {
        label: "Stage",
        value: "Research to MVP",
        icon: "stage",
        hero: true
      },
      {
        label: "Duration",
        value: "6 months",
        icon: "duration",
        hero: true
      },
      {
        label: "Role",
        value: "Product Manager",
        icon: "role",
        hero: true
      },
      {
        label: "Team",
        value: "Cross-functional product and development team",
        icon: "team"
      },
      {
        label: "Users",
        value: "Researchers, faculty members, academic knowledge users",
        icon: "users"
      }
    ],
    sections: [
      {
        title: "Project overview",
        icon: "overview",
        paragraphs: [
          "This project was created to address a real knowledge accessibility gap. A large portion of the organization’s research knowledge existed in recordings and transcripts, but in practice it was difficult to search, retrieve, and reuse efficiently. This made knowledge preservation harder and limited long-term research continuity.",
          "During the research phase, we explored existing technologies in the market as well as startup solutions in the RAG and AI Search space. One of the main challenges at the time was the tendency of AI models to generate answers even when no sufficiently reliable source had been found. That created a clear gap between an advanced AI experience and the level of trust required in an academic and research-oriented environment.",
          "To address this challenge, we defined a RAG-based solution built on top of the organization’s own content sources — accurate recordings and transcripts — combining text search, semantic retrieval, and context-aware answer generation.",
          "The system combined OpenAI API, Elasticsearch, a vector search layer, and a dedicated user interface in order to improve access to relevant information, strengthen research knowledge preservation, and transform unstructured content into a usable asset for the faculty and university."
        ]
      },
      {
        title: "The challenge",
        icon: "challenge",
        paragraphs: [
          "The core challenge was not only to build a better search engine, but to design a system that could return more useful answers without relying on unsupported model completions.",
          "At the same time, the project had to move forward under a very limited budget, with a broader-than-expected execution scope, in a technological domain that was still relatively new to the team. In practice, the work required substantial time for research, experimentation, comparison between different approaches, and hands-on learning."
        ]
      },
      {
        title: "What I led",
        icon: "lead",
        bullets: [
          "Market research and solution review across AI Search and RAG products",
          "Definition of the product problem and translation into a practical solution",
          "Connecting research needs with realistic technical decisions",
          "Supporting product direction under tight budget constraints",
          "Prioritizing the right balance between accuracy, usability, and cost",
          "Translating technical complexity into clear user value"
        ]
      },
      {
        title: "The solution",
        icon: "solution",
        paragraphs: [
          "The solution was designed as a RAG-based intelligent search engine that retrieves relevant segments from recordings, transcripts, and internal knowledge sources before generating an answer grounded in the retrieved content.",
          "Instead of relying on the model alone, the system combined:"
        ],
        bullets: [
          "Elasticsearch for text search and indexing",
          "Vector Search for semantic retrieval",
          "OpenAI API for context-aware answer generation",
          "React for the user interface",
          "Umbraco for content management",
          "Google Maps for displaying historical locations of figures"
        ]
      },
      {
        title: "Impact",
        icon: "impact",
        paragraphs: [
          "The platform created meaningful value around research knowledge preservation and accessibility. It enabled faster access to accumulated information, improved the ability to locate relevant sources, and supported research workflows grounded in existing content rather than fragmented institutional memory."
        ]
      }
    ],
    teaserTitle: "Short teaser",
    teaser:
      "A RAG-based intelligent search platform built to make research knowledge more accessible through recordings and transcripts, reduce unsupported AI answers, and improve the speed and quality of information retrieval."
  },
  he: {
    title: "מנוע חיפוש מחקרי מבוסס RAG",
    subtitle: "הנגשת ידע מחקרי מתוך הקלטות, תמלולים ומקורות תוכן פנימיים",
    shortDescription:
      "מנוע חיפוש חכם שנבנה כדי להפוך מאגרי ידע לא מובנים — הקלטות, תמלולים ותוכן מחקרי מצטבר — למקור ידע נגיש, מדויק ושימושי יותר עבור חוקרים ואנשי סגל.",
    scrollLabel: "גללו כדי להמשיך",
    metadataTitle: "מטא־דאטה",
    metadata: [
      {
        label: "סוג מוצר",
        value: `${ltr("AI Search")} / ${ltr("RAG")} / ${ltr("Knowledge Retrieval")}`,
        icon: "productType"
      },
      {
        label: "שלב",
        value: ltr("Research to MVP"),
        icon: "stage",
        hero: true
      },
      {
        label: "משך הפרויקט",
        value: "6 חודשים",
        icon: "duration",
        hero: true
      },
      {
        label: "תפקיד",
        value: ltr("Product Manager"),
        icon: "role",
        hero: true
      },
      {
        label: "צוות",
        value: "צוות מוצר ופיתוח רב־תחומי",
        icon: "team"
      },
      {
        label: "משתמשים",
        value: "חוקרים, אנשי סגל, משתמשי ידע אקדמי",
        icon: "users"
      }
    ],
    sections: [
      {
        title: "תקציר הפרויקט",
        icon: "overview",
        paragraphs: [
          "הפרויקט נולד מתוך צורך ממשי להנגיש ידע מחקרי שהצטבר לאורך זמן, אך נשמר בפועל בפורמטים שקשה מאוד לחפש בהם ביעילות. חלק משמעותי מהמידע היה קיים בהקלטות ובתמלולים, אך האיתור שלו דרש זמן רב והקשה על שימור ידע והמשכיות מחקרית.",
          `בשלב המחקר נבדקו טכנולוגיות קיימות בשוק לצד פתרונות של סטארטאפים בתחום ה־${ltr(
            "RAG"
          )} וה־${ltr("AI Search")}. אחת הבעיות המרכזיות באותה תקופה הייתה שמודלי ${ltr(
            "AI"
          )} נטו לייצר תשובות גם כאשר לא נמצא מקור אמין מספיק, מה שיצר פער בין חוויית שימוש מתקדמת לבין רמת מהימנות שנדרשה בסביבה מחקרית.`,
          `כדי להתמודד עם האתגר הזה, גובש פתרון מבוסס ${ltr(
            "RAG"
          )} שנשען על מקורות התוכן של הארגון עצמו — הקלטות ותמלולים מדויקים — ושילב בין חיפוש טקסטואלי, שליפה סמנטית ויצירת תשובות מבוססות הקשר.`,
          `המערכת שילבה ${ltr("OpenAI API")}, מנוע ${ltr(
            "Elasticsearch"
          )}, שכבת ${ltr(
            "Vector Search"
          )} וממשק משתמש ייעודי, במטרה לשפר את היכולת לאתר מידע רלוונטי, לשמר ידע מחקרי ולהפוך תוכן לא מובנה לנכס ידע שימושי עבור הפקולטה והאוניברסיטה.`
        ]
      },
      {
        title: "האתגר",
        icon: "challenge",
        paragraphs: [
          "האתגר המרכזי לא היה רק לבנות מנוע חיפוש טוב יותר, אלא לייצר מערכת שמסוגלת להחזיר תשובות שימושיות יותר בלי להישען על השלמות לא מבוססות של מודל השפה.",
          "לצד זאת, הפרויקט התבצע תחת תקציב מצומצם יחסית, עם היקף עבודה רחב מהמתוכנן, ובתחום טכנולוגי שהיה חדש לצוות. בפועל, מעבר לפיתוח עצמו, נדרש זמן משמעותי למחקר, ניסוי, השוואה בין גישות שונות ולמידה של טכנולוגיות חדשות."
        ]
      },
      {
        title: "מה הובלתי",
        icon: "lead",
        bullets: [
          `מחקר שוק וסקירת פתרונות בתחום ${ltr("AI Search")} ו־${ltr("RAG")}`,
          "הגדרת הבעיה המוצרית והמרתה לפתרון ישים",
          "חיבור בין צרכים מחקריים לבין בחירות טכנולוגיות פרקטיות",
          "סיוע בבחירת כיוון מוצרי תחת מגבלות תקציב",
          "תעדוף נכון בין דיוק, שימושיות ועלות",
          "תרגום מורכבות טכנולוגית לערך ברור עבור המשתמשים"
        ]
      },
      {
        title: "הפתרון",
        icon: "solution",
        paragraphs: [
          `הפתרון נבנה כמנוע חיפוש חכם מבוסס ${ltr(
            "RAG"
          )}, שמאתר מקטעים רלוונטיים מתוך הקלטות, תמלולים ומאגרי תוכן פנימיים, ורק לאחר מכן מייצר תשובה הנשענת על החומר שנשלף.`,
          "במקום להסתמך רק על המודל, המערכת שילבה בין:"
        ],
        bullets: [
          `${ltr("Elasticsearch")} לחיפוש טקסטואלי ואינדוקס`,
          `${ltr("Vector Search")} לצורך שליפה סמנטית`,
          `${ltr("OpenAI API")} ליצירת תשובות מבוססות הקשר`,
          `${ltr("React")} לממשק המשתמש`,
          `${ltr("Umbraco")} לניהול מעטפת התוכן`,
          `${ltr("Google Maps")} להצגת מיקומים היסטוריים של דמויות`
        ]
      },
      {
        title: "הערך שנוצר",
        icon: "impact",
        paragraphs: [
          "המערכת יצרה ערך משמעותי עבור שימור והנגשת ידע מחקרי. היא אפשרה גישה מהירה יותר למידע מצטבר, חיזקה את היכולת לאתר מקורות רלוונטיים, ותמכה בעבודה מחקרית מבוססת תוכן קיים במקום על זיכרון ארגוני מפוזר."
        ]
      }
    ],
    teaserTitle: "טיזר קצר",
    teaser:
      "פלטפורמת חיפוש חכמה מבוססת RAG, שנבנתה כדי להנגיש ידע מחקרי מתוך הקלטות ותמלולים, לצמצם תשובות לא מבוססות, ולשפר את היכולת לאתר מידע רלוונטי במהירות."
  }
} satisfies Record<Locale, ResearchSearchCaseStudyContent>;
