import { type Locale } from "@/lib/i18n";
import styles from "./SkillsRibbon.module.css";

type SkillsRibbonProps = {
  locale: Locale;
};

type SkillText = {
  en: string;
  he: string;
};

const skills: SkillText[] = [
  { en: "Project Management", he: "ניהול פרויקטים" },
  { en: "Product Management", he: "ניהול מוצר" },
  { en: "Agile / Scrum", he: "אג'ייל / סקרם" },
  { en: "UX / UI", he: "חוויית משתמש / ממשק משתמש" },
  { en: "Market & User Research", he: "מחקר שוק ומשתמשים" },
  { en: "Product Analytics (GA / Mixpanel)", he: "אנליטיקת מוצר (GA / Mixpanel)" },
  { en: "Prototyping", he: "בניית אב-טיפוס" },
  { en: "PRD Writing", he: "כתיבת PRD" },
  { en: "Specification Documents", he: "כתיבת מסמכי אפיון" },
  { en: "API Integration", he: "אינטגרציית API" },
  { en: "Team & Vendor Management", he: "ניהול צוותים וספקים" },
  { en: "Process Engineering", he: "הנדסת תהליכים" },
  { en: "Data", he: "נתונים" },
  { en: "BI", he: "בינה עסקית (BI)" },
  { en: "Roadmapping", he: "בניית מפת דרכים" },
  { en: "Backlog Prioritization", he: "תיעדוף בקלוג" },
  { en: "Stakeholder Management", he: "ניהול בעלי עניין" },
  { en: "Cross-Team Leadership", he: "הובלה בין-צוותית" },
  { en: "MVP Delivery", he: "הובלת MVP" },
  { en: "Go-To-Market", he: "אסטרטגיית השקה לשוק" },
  { en: "A/B Testing", he: "בדיקות A/B" },
  { en: "KPI-Driven Execution", he: "ביצוע ממוקד KPI" },
  { en: "Go-To-Market Strategy", he: "אסטרטגיית Go-To-Market" },
  { en: "Product Strategy", he: "אסטרטגיית מוצר" },
  { en: "Product Discovery", he: "דיסקברי מוצר" },
  { en: "Problem Framing", he: "הגדרת בעיה מוצרית" },
  { en: "Opportunity Assessment", he: "הערכת הזדמנויות" },
  { en: "Prioritization Frameworks", he: "מסגרות תיעדוף" },
  { en: "Outcome-Driven Product Thinking", he: "חשיבה מוצרית מוכוונת תוצאות" },
  { en: "Customer Journey Mapping", he: "מיפוי מסע לקוח" },
  { en: "User Story Mapping", he: "מיפוי סיפורי משתמש" },
  { en: "Jobs To Be Done (JTBD)", he: "גישת Jobs To Be Done" },
  { en: "Experiment Design", he: "תכנון ניסויים" },
  { en: "Hypothesis-Driven Development", he: "פיתוח מבוסס היפותזות" },
  { en: "Feature Prioritization", he: "תיעדוף פיצ'רים" },
  { en: "Product Positioning", he: "מיצוב מוצר" },
  { en: "Value Proposition Design", he: "בניית הצעת ערך" },
  { en: "Competitive Analysis", he: "ניתוח מתחרים" },
  { en: "Business Model Thinking", he: "חשיבה על מודל עסקי" },
  { en: "Monetization Strategy", he: "אסטרטגיית מוניטיזציה" },
  { en: "Retention & Engagement", he: "שימור ומעורבות משתמשים" },
  { en: "Funnel Optimization", he: "אופטימיזציית משפך" },
  { en: "Adoption Strategy", he: "אסטרטגיית אימוץ מוצר" },
  { en: "Change Management", he: "ניהול שינוי" },
  { en: "Risk Management", he: "ניהול סיכונים" },
  { en: "Decision Making Under Uncertainty", he: "קבלת החלטות בתנאי אי-ודאות" },
  { en: "Technical Product Understanding", he: "הבנה טכנולוגית-מוצרית" },
  { en: "Systems Thinking", he: "חשיבה מערכתית" },
  { en: "Platform Thinking", he: "חשיבה פלטפורמית" },
  { en: "Operational Excellence", he: "מצוינות תפעולית" },
  { en: "Release Planning", he: "תכנון גרסאות" },
  { en: "Success Metrics Definition", he: "הגדרת מדדי הצלחה" },
  { en: "Voice of Customer", he: "קול הלקוח" }
];

const ariaLabelByLocale: Record<Locale, string> = {
  en: "Skills",
  he: "מיומנויות"
};

const titleByLocale: Record<Locale, string> = {
  en: "Skills",
  he: "מיומנויות"
};

const LOOP_GROUPS = 4;

export function SkillsRibbon({ locale }: SkillsRibbonProps) {
  const localizedSkills = skills.map((skill) => skill[locale]);
  const rtlClassName = locale === "he" ? styles.rtl : "";

  return (
    <section className={`${styles.section} ${rtlClassName}`} aria-label={ariaLabelByLocale[locale]}>
      <h1 className={styles.title}>{titleByLocale[locale]}</h1>
      <div className={styles.bar}>
        <div className={styles.strip}>
          <div className={styles.track}>
            {Array.from({ length: LOOP_GROUPS }, (_, copyIndex) => (
              <div className={styles.group} aria-hidden={copyIndex > 0} key={`skill-group-${copyIndex}`}>
                {localizedSkills.map((skill, skillIndex) => (
                  <span className={styles.item} key={`${copyIndex}-${skill}-${skillIndex}`}>
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
