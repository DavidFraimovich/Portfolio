import {
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Tags,
  Target,
  TriangleAlert,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import styles from "@/components/ResearchSearchCaseStudy.module.css";
import {
  researchSearchCaseStudyContent,
  type ResearchSearchMetadataIconKey,
  type ResearchSearchSectionIconKey
} from "@/lib/researchSearchCaseStudy";
import type { Locale } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";

type Props = {
  locale: Locale;
};

const HERO_IMAGE_SRC = withVersionedAssetPath("/images/case-studies/research-rag/hero-image.png");

const METADATA_ICONS: Record<ResearchSearchMetadataIconKey, LucideIcon> = {
  productType: Tags,
  stage: Target,
  duration: Clock3,
  role: BriefcaseBusiness,
  team: UsersRound,
  users: GraduationCap
};

const SECTION_ICONS: Record<ResearchSearchSectionIconKey, LucideIcon> = {
  overview: BookOpenText,
  challenge: TriangleAlert,
  lead: BriefcaseBusiness,
  solution: BrainCircuit,
  impact: ShieldCheck,
  teaser: Sparkles
};

function MetadataIcon({ icon }: { icon: ResearchSearchMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function SectionIcon({ icon }: { icon: ResearchSearchSectionIconKey }) {
  const Icon = SECTION_ICONS[icon];

  return <Icon className={styles.sectionIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function ResearchSearchCaseStudy({ locale }: Props) {
  const content = researchSearchCaseStudyContent[locale];
  const heroHighlights = content.metadata.filter((item) => item.hero);

  return (
    <div className={styles.root} data-locale={locale}>
      <section className={styles.heroSection} aria-labelledby={`research-search-title-${locale}`}>
        <div className={styles.heroShell}>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroImageWrap}>
              <img
                alt=""
                className={styles.heroImage}
                decoding="async"
                loading="eager"
                src={HERO_IMAGE_SRC}
              />
            </div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle} id={`research-search-title-${locale}`}>
                {content.title}
              </h1>
              <p className={styles.heroSubtitle}>{content.subtitle}</p>
              <p className={styles.heroDescription}>{content.shortDescription}</p>
            </div>

            <div className={styles.insightsPanel}>
              <dl className={styles.insightsGrid} aria-label={content.metadataTitle}>
                {heroHighlights.map((item) => (
                  <div className={styles.insightCard} key={item.label}>
                    <dt className={styles.insightLabel}>
                      <MetadataIcon icon={item.icon} />
                      <span className={styles.insightLabelText}>{item.label}</span>
                    </dt>
                    <dd className={styles.insightValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.scrollCue} aria-hidden="true">
              <span className={styles.scrollLine} />
              <span className={styles.scrollLabel}>{content.scrollLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.body}>
        {content.sections.map((section, index) => (
          <section
            className={styles.sectionBlock}
            key={section.title}
            aria-labelledby={`research-search-section-${locale}-${index}`}
          >
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIconWrap} aria-hidden="true">
                  <SectionIcon icon={section.icon} />
                </span>
                <h2 className={styles.sectionTitle} id={`research-search-section-${locale}-${index}`}>
                  {section.title}
                </h2>
              </div>
            </div>

            <div className={styles.sectionContent}>
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p className={styles.sectionParagraph} key={`${section.title}-paragraph-${paragraphIndex}`}>
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className={styles.sectionList}>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li className={styles.sectionListItem} key={`${section.title}-bullet-${bulletIndex}`}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}

        <section className={styles.sectionBlock} aria-labelledby={`research-search-metadata-${locale}`}>
          <div className={styles.sectionHeading}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionIconWrap} aria-hidden="true">
                <MetadataIcon icon="productType" />
              </span>
              <h2 className={styles.sectionTitle} id={`research-search-metadata-${locale}`}>
                {content.metadataTitle}
              </h2>
            </div>
          </div>

          <dl className={styles.metadataGrid}>
            {content.metadata.map((item) => (
              <div className={styles.metadataItem} key={item.label}>
                <dt className={styles.metadataLabel}>
                  <MetadataIcon icon={item.icon} />
                  <span>{item.label}</span>
                </dt>
                <dd className={styles.metadataValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className={`${styles.sectionBlock} ${styles.teaserSection}`}
          aria-labelledby={`research-search-teaser-${locale}`}
        >
          <div className={styles.sectionHeading}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionIconWrap} aria-hidden="true">
                <SectionIcon icon="teaser" />
              </span>
              <h2 className={styles.sectionTitle} id={`research-search-teaser-${locale}`}>
                {content.teaserTitle}
              </h2>
            </div>
          </div>

          <div className={styles.sectionContent}>
            <p className={styles.teaserText}>{content.teaser}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
