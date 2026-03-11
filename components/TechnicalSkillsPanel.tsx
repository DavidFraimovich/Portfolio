import { type Locale } from "@/lib/i18n";
import styles from "./TechnicalSkillsPanel.module.css";

type TechnicalSkillsPanelProps = {
  locale: Locale;
};

type ParagraphCopy = {
  start: string;
  highlight: string;
  end: string;
};

type BadgeTone =
  | "node"
  | "nginx"
  | "mysql"
  | "aws"
  | "postgres"
  | "github"
  | "bitbucket"
  | "html"
  | "css"
  | "js"
  | "ts"
  | "nuxt"
  | "vue"
  | "react"
  | "umbraco";

type TechBadge = {
  id: string;
  label: string;
  tone: BadgeTone;
};

type SkillGroup = {
  title: string;
  badges: TechBadge[];
};

type PanelCopy = {
  title: string;
  introTop: ParagraphCopy;
  introBottom: ParagraphCopy;
  groups: {
    backend: SkillGroup;
    infra: SkillGroup;
    frontend: SkillGroup;
  };
};

const PANEL_COPY: Record<Locale, PanelCopy> = {
  en: {
    title: "Technical skills",
    introTop: {
      start: "I may not code every day, ",
      highlight: "but",
      end: " I've built a strong technical foundation over the years."
    },
    introBottom: {
      start: "I believe a strong Product Manager should have enough technical understanding to answer basic questions, ",
      highlight: "speed up problem-solving, and communicate",
      end: " effectively with both developers and clients."
    },
    groups: {
      backend: {
        title: "Backend & Data",
        badges: [
          { id: "node", label: "Node", tone: "node" },
          { id: "nginx", label: "NGINX", tone: "nginx" },
          { id: "mysql", label: "MySQL", tone: "mysql" }
        ]
      },
      infra: {
        title: "Infra & Collaboration",
        badges: [
          { id: "aws", label: "AWS", tone: "aws" },
          { id: "postgres", label: "PostgreSQL", tone: "postgres" },
          { id: "github", label: "GitHub", tone: "github" },
          { id: "bitbucket", label: "Bitbucket", tone: "bitbucket" }
        ]
      },
      frontend: {
        title: "Frontend",
        badges: [
          { id: "html", label: "HTML5", tone: "html" },
          { id: "css", label: "CSS3", tone: "css" },
          { id: "js", label: "JS", tone: "js" },
          { id: "ts", label: "TS", tone: "ts" },
          { id: "nuxt", label: "Nuxt", tone: "nuxt" },
          { id: "vue", label: "Vue", tone: "vue" },
          { id: "react", label: "React", tone: "react" },
          { id: "umbraco", label: "Umbraco", tone: "umbraco" }
        ]
      }
    }
  },
  he: {
    title: "מיומנויות טכניות",
    introTop: {
      start: "אני לא כותב קוד בכל יום, ",
      highlight: "אבל",
      end: " לאורך השנים בניתי בסיס טכני חזק."
    },
    introBottom: {
      start: "אני מאמין שמנהל מוצר חזק צריך מספיק הבנה טכנית כדי לענות על שאלות בסיסיות, ",
      highlight: "להאיץ פתרון בעיות ולתקשר",
      end: " בצורה מדויקת עם מפתחים ולקוחות."
    },
    groups: {
      backend: {
        title: "Backend & Data",
        badges: [
          { id: "node", label: "Node", tone: "node" },
          { id: "nginx", label: "NGINX", tone: "nginx" },
          { id: "mysql", label: "MySQL", tone: "mysql" }
        ]
      },
      infra: {
        title: "Infra & Collaboration",
        badges: [
          { id: "aws", label: "AWS", tone: "aws" },
          { id: "postgres", label: "PostgreSQL", tone: "postgres" },
          { id: "github", label: "GitHub", tone: "github" },
          { id: "bitbucket", label: "Bitbucket", tone: "bitbucket" }
        ]
      },
      frontend: {
        title: "Frontend",
        badges: [
          { id: "html", label: "HTML5", tone: "html" },
          { id: "css", label: "CSS3", tone: "css" },
          { id: "js", label: "JS", tone: "js" },
          { id: "ts", label: "TS", tone: "ts" },
          { id: "nuxt", label: "Nuxt", tone: "nuxt" },
          { id: "vue", label: "Vue", tone: "vue" },
          { id: "react", label: "React", tone: "react" },
          { id: "umbraco", label: "Umbraco", tone: "umbraco" }
        ]
      }
    }
  }
};

export function TechnicalSkillsPanel({ locale }: TechnicalSkillsPanelProps) {
  const copy = PANEL_COPY[locale];
  const headingId = `technical-skills-title-${locale}`;
  const rtlClassName = locale === "he" ? styles.rtl : "";

  return (
    <section className={`${styles.section} ${rtlClassName}`} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.copyColumn}>
          <h2 className={styles.title} id={headingId}>
            {copy.title}
          </h2>

          <p className={styles.topParagraph}>
            {copy.introTop.start}
            <span className={styles.highlight}>{copy.introTop.highlight}</span>
            {copy.introTop.end}
          </p>

          <p className={styles.bottomParagraph}>
            {copy.introBottom.start}
            <span className={styles.highlight}>{copy.introBottom.highlight}</span>
            {copy.introBottom.end}
          </p>
        </div>

        <div className={styles.skillsColumn}>
          <article className={`${styles.group} ${styles.groupBackend}`}>
            <h3 className={styles.groupTitle}>{copy.groups.backend.title}</h3>
            <ul className={styles.badges}>
              {copy.groups.backend.badges.map((badge) => (
                <li key={badge.id}>
                  <span className={`${styles.badge} ${styles[badge.tone]}`}>{badge.label}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.group} ${styles.groupInfra}`}>
            <h3 className={styles.groupTitle}>{copy.groups.infra.title}</h3>
            <ul className={styles.badges}>
              {copy.groups.infra.badges.map((badge) => (
                <li key={badge.id}>
                  <span className={`${styles.badge} ${styles[badge.tone]}`}>{badge.label}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.group} ${styles.groupFrontend}`}>
            <h3 className={styles.groupTitle}>{copy.groups.frontend.title}</h3>
            <ul className={`${styles.badges} ${styles.frontendBadges}`}>
              {copy.groups.frontend.badges.map((badge) => (
                <li key={badge.id}>
                  <span className={`${styles.badge} ${styles[badge.tone]}`}>{badge.label}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
