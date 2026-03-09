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
  { en: "0->1 MVP Delivery", he: "הובלת MVP מ-0 ל-1" },
  { en: "Go-To-Market", he: "אסטרטגיית השקה לשוק" },
  { en: "A/B Testing", he: "בדיקות A/B" },
  { en: "KPI-Driven Execution", he: "ביצוע ממוקד KPI" }
];

const ariaLabelByLocale: Record<Locale, string> = {
  en: "Skill set",
  he: "סט מיומנויות"
};

const headingByLocale: Record<Locale, string> = {
  en: "Skill Set",
  he: "סט מיומנויות"
};

export function SkillsRibbon({ locale }: SkillsRibbonProps) {
  const localizedSkills = skills.map((skill) => skill[locale]);
  const rtlClassName = locale === "he" ? styles.rtl : "";

  return (
    <section className={`${styles.section} ${rtlClassName}`} aria-label={ariaLabelByLocale[locale]}>
      <h2 className={styles.srOnly}>{headingByLocale[locale]}</h2>
      <div className={styles.bar}>
        <div className={styles.strip}>
          <div className={styles.track}>
            {[0, 1].map((copyIndex) => (
              <div className={styles.group} aria-hidden={copyIndex === 1} key={`skill-group-${copyIndex}`}>
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
