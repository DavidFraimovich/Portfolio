import { type Locale } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
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
  | "umbraco"
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
  | "react";

type TechBadge = {
  id: string;
  label: string;
  tone: BadgeTone;
  icon: string;
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
          { id: "node", label: "Node", tone: "node", icon: "/images/tech-skills/node.svg" },
          { id: "nginx", label: "NGINX", tone: "nginx", icon: "/images/tech-skills/nginx.svg" },
          { id: "mysql", label: "MySQL", tone: "mysql", icon: "/images/tech-skills/mysql.svg" },
          { id: "umbraco", label: "Umbraco", tone: "umbraco", icon: "/images/tech-skills/umbraco.svg" }
        ]
      },
      infra: {
        title: "Infra & Collaboration",
        badges: [
          { id: "aws", label: "AWS", tone: "aws", icon: "/images/tech-skills/aws.svg" },
          { id: "postgres", label: "PostgreSQL", tone: "postgres", icon: "/images/tech-skills/postgresql.svg" },
          { id: "github", label: "GitHub", tone: "github", icon: "/images/tech-skills/github.svg" },
          { id: "bitbucket", label: "Bitbucket", tone: "bitbucket", icon: "/images/tech-skills/bitbucket.svg" }
        ]
      },
      frontend: {
        title: "Frontend",
        badges: [
          { id: "html", label: "HTML5", tone: "html", icon: "/images/tech-skills/html5.svg" },
          { id: "css", label: "CSS3", tone: "css", icon: "/images/tech-skills/css3.svg" },
          { id: "js", label: "JS", tone: "js", icon: "/images/tech-skills/javascript.svg" },
          { id: "ts", label: "TypeScript", tone: "ts", icon: "/images/tech-skills/typescript.svg" },
          { id: "nuxt", label: "Nuxt", tone: "nuxt", icon: "/images/tech-skills/nuxt.svg" },
          { id: "vue", label: "Vue", tone: "vue", icon: "/images/tech-skills/vue.svg" },
          { id: "react", label: "React", tone: "react", icon: "/images/tech-skills/react.svg" }
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
          { id: "node", label: "Node", tone: "node", icon: "/images/tech-skills/node.svg" },
          { id: "nginx", label: "NGINX", tone: "nginx", icon: "/images/tech-skills/nginx.svg" },
          { id: "mysql", label: "MySQL", tone: "mysql", icon: "/images/tech-skills/mysql.svg" },
          { id: "umbraco", label: "Umbraco", tone: "umbraco", icon: "/images/tech-skills/umbraco.svg" }
        ]
      },
      infra: {
        title: "Infra & Collaboration",
        badges: [
          { id: "aws", label: "AWS", tone: "aws", icon: "/images/tech-skills/aws.svg" },
          { id: "postgres", label: "PostgreSQL", tone: "postgres", icon: "/images/tech-skills/postgresql.svg" },
          { id: "github", label: "GitHub", tone: "github", icon: "/images/tech-skills/github.svg" },
          { id: "bitbucket", label: "Bitbucket", tone: "bitbucket", icon: "/images/tech-skills/bitbucket.svg" }
        ]
      },
      frontend: {
        title: "Frontend",
        badges: [
          { id: "html", label: "HTML5", tone: "html", icon: "/images/tech-skills/html5.svg" },
          { id: "css", label: "CSS3", tone: "css", icon: "/images/tech-skills/css3.svg" },
          { id: "js", label: "JS", tone: "js", icon: "/images/tech-skills/javascript.svg" },
          { id: "ts", label: "TypeScript", tone: "ts", icon: "/images/tech-skills/typescript.svg" },
          { id: "nuxt", label: "Nuxt", tone: "nuxt", icon: "/images/tech-skills/nuxt.svg" },
          { id: "vue", label: "Vue", tone: "vue", icon: "/images/tech-skills/vue.svg" },
          { id: "react", label: "React", tone: "react", icon: "/images/tech-skills/react.svg" },
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
                  <span className={styles.badge}>
                    <img
                      src={withVersionedAssetPath(badge.icon)}
                      alt={`${badge.label} logo`}
                      className={`${styles.badgeIcon} ${styles[badge.tone]}`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.group} ${styles.groupInfra}`}>
            <h3 className={styles.groupTitle}>{copy.groups.infra.title}</h3>
            <ul className={styles.badges}>
              {copy.groups.infra.badges.map((badge) => (
                <li key={badge.id}>
                  <span className={styles.badge}>
                    <img
                      src={withVersionedAssetPath(badge.icon)}
                      alt={`${badge.label} logo`}
                      className={`${styles.badgeIcon} ${styles[badge.tone]}`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.group} ${styles.groupFrontend}`}>
            <h3 className={styles.groupTitle}>{copy.groups.frontend.title}</h3>
            <ul className={`${styles.badges} ${styles.frontendBadges}`}>
              {copy.groups.frontend.badges.map((badge) => (
                <li key={badge.id}>
                  <span className={styles.badge}>
                    <img
                      src={withVersionedAssetPath(badge.icon)}
                      alt={`${badge.label} logo`}
                      className={`${styles.badgeIcon} ${styles[badge.tone]}`}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
