import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  Cpu,
  HardDrive,
  LayoutGrid,
  MapPinned,
  Package,
  Rocket,
  Route,
  Scale,
  Search,
  ShieldCheck,
  TriangleAlert,
  UsersRound,
  Workflow,
  type LucideIcon
} from "lucide-react";
import styles from "@/components/SmartCampusCaseStudy.module.css";
import {
  CaseStudyImageGridGallery,
  CaseStudyZoomableImage
} from "@/components/CaseStudyImageGallery";
import {
  smartCampusCaseStudyContent,
  type SmartCampusAccordionIconKey,
  type SmartCampusEmphasisIconKey,
  type SmartCampusHighlightIconKey,
  type SmartCampusMetadataIconKey
} from "@/lib/smartCampusCaseStudy";
import type { Locale } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";

type Props = {
  locale: Locale;
};

const METADATA_ICONS: Record<SmartCampusMetadataIconKey, LucideIcon> = {
  productType: LayoutGrid,
  role: BriefcaseBusiness,
  duration: Clock3,
  period: CalendarDays,
  team: UsersRound,
  focus: ShieldCheck
};

const ACCORDION_ICONS: Record<SmartCampusAccordionIconKey, LucideIcon> = {
  context: Building2,
  challenge: Cpu,
  alternatives: Scale,
  role: BriefcaseBusiness,
  installation: HardDrive,
  pilot: MapPinned,
  impact: BarChart3
};

const HIGHLIGHT_ICONS: Record<SmartCampusHighlightIconKey, LucideIcon> = {
  integration: Workflow,
  analysis: Search,
  deployment: Rocket
};

const EMPHASIS_ICONS: Record<SmartCampusEmphasisIconKey, LucideIcon> = {
  flow: Route,
  integration: ShieldCheck,
  resilience: TriangleAlert,
  field: Package
};

function MetadataIcon({ icon }: { icon: SmartCampusMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function AccordionIcon({ icon }: { icon: SmartCampusAccordionIconKey }) {
  const Icon = ACCORDION_ICONS[icon];

  return <Icon className={styles.accordionIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function HighlightIcon({ icon }: { icon: SmartCampusHighlightIconKey }) {
  const Icon = HIGHLIGHT_ICONS[icon];

  return <Icon className={styles.highlightIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function EmphasisIcon({ icon }: { icon: SmartCampusEmphasisIconKey }) {
  const Icon = EMPHASIS_ICONS[icon];

  return <Icon className={styles.cardIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function SmartCampusCaseStudy({ locale }: Props) {
  const content = smartCampusCaseStudyContent[locale];

  return (
    <div className={styles.root} data-locale={locale}>
      <section className={styles.summarySection} aria-labelledby={`smart-campus-title-${locale}`}>
        <div className={styles.summaryShell}>
          <div className={styles.heroVisual}>
            <CaseStudyZoomableImage
              ariaLabel={content.hero.heroImageAlt}
              classNames={{
                button: styles.heroMediaButton,
                image: styles.heroMediaImage,
                root: styles.heroMediaWrap
              }}
              copy={content.gallery}
              dialogLabel={content.hero.heroImageAlt}
              image={{
                alt: content.hero.heroImageAlt,
                loading: "eager",
                orientation: "landscape",
                src: withVersionedAssetPath("/images/case-studies/smart-campus-security-module/hero.png")
              }}
              locale={locale}
            />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroHeadingBlock}>
                <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
                <h1 className={styles.titleMain} id={`smart-campus-title-${locale}`}>
                  {content.hero.title}
                </h1>
                <h2 className={styles.titleSub}>{content.hero.subtitle}</h2>
              </div>

              <div className={styles.heroBody}>
                <p className={styles.valueStatement}>{content.hero.description}</p>
              </div>

              <div className={styles.chipsRow} aria-label={content.hero.chipsAriaLabel}>
                {content.hero.chips.map((chip) => (
                  <span className={styles.chip} key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.metadataPanel}>
              <dl className={styles.metadataGrid} aria-label={content.hero.metadataTitle}>
                {content.hero.metadata.map((item) => (
                  <div className={styles.metadataCard} key={item.label}>
                    <dt className={styles.metadataLabel}>
                      <MetadataIcon icon={item.icon} />
                      <span className={styles.metadataLabelText}>{item.label}</span>
                    </dt>
                    <dd className={styles.metadataValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.scrollCue} aria-hidden="true">
              <span className={styles.scrollLine} />
              <span className={styles.scrollLabel}>{content.hero.scrollLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`smart-campus-highlights-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`smart-campus-highlights-${locale}`}>
              {content.highlightsTitle}
            </h2>
          </div>

          <div className={styles.highlightGrid} aria-label={content.highlightsAriaLabel}>
            {content.highlights.map((item) => (
              <article className={styles.highlightRegion} key={item.title}>
                <HighlightIcon icon={item.icon} />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`smart-campus-story-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`smart-campus-story-${locale}`}>
              {content.accordionTitle}
            </h2>
          </div>

          <div className={styles.accordionList}>
            {content.accordion.map((item, index) => (
              <details className={styles.accordionItem} key={item.title} open={index === 0}>
                <summary className={styles.accordionSummary}>
                  <span className={styles.accordionSummaryInner}>
                    <span className={styles.accordionMeta}>
                      <span className={styles.accordionIconWrap}>
                        <AccordionIcon icon={item.icon} />
                      </span>
                      <span className={styles.accordionNumber}>{String(index + 1).padStart(2, "0")}</span>
                    </span>

                    <span className={styles.accordionCopy}>
                      <span className={styles.accordionTitle}>{item.title}</span>
                      <span className={styles.accordionPreview}>{item.preview}</span>
                    </span>
                  </span>

                  <span className={styles.accordionIndicator} aria-hidden="true" />
                </summary>

                <div className={styles.accordionBody}>
                  {item.blocks.map((block, blockIndex) => {
                    if (block.type === "paragraph") {
                      return (
                        <p className={styles.contentParagraph} key={`${item.title}-${blockIndex}`}>
                          {block.text}
                        </p>
                      );
                    }

                    if (block.type === "list") {
                      return (
                        <ul className={styles.contentList} key={`${item.title}-${blockIndex}`}>
                          {block.items.map((listItem) => (
                            <li className={styles.contentListItem} key={listItem}>
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === "subsection") {
                      return (
                        <div className={styles.subsectionBlock} key={`${item.title}-${blockIndex}`}>
                          <h3 className={styles.subsectionTitle}>{block.title}</h3>
                          <ul className={styles.contentList}>
                            {block.items.map((listItem) => (
                              <li className={styles.contentListItem} key={listItem}>
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    return (
                      <p className={styles.closingText} key={`${item.title}-${blockIndex}`}>
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`smart-campus-screens-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`smart-campus-screens-${locale}`}>
              {content.screensTitle}
            </h2>
          </div>

          <CaseStudyImageGridGallery
            ariaLabel={content.screensAriaLabel}
            copy={content.gallery}
            dialogLabel={content.gallery.dialogLabel}
            images={content.screens}
            locale={locale}
          />
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`smart-campus-process-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`smart-campus-process-${locale}`}>
              {content.processTitle}
            </h2>
          </div>

          <ol className={styles.processList}>
            {content.processSteps.map((step, index) => (
              <li className={styles.processStep} key={step}>
                <span className={styles.processMarker}>
                  <span className={styles.processMarkerInner}>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <p className={styles.processLabel}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`smart-campus-analysis-${locale}`}>
        <div className={`${styles.surface} ${styles.emphasisSurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`smart-campus-analysis-${locale}`}>
              {content.emphasisTitle}
            </h2>
          </div>

          <div className={styles.emphasisGrid}>
            {content.emphasisCards.map((item) => (
              <article className={`${styles.card} ${styles.emphasisCard}`} key={item.title}>
                <span className={styles.cardIconWrap}>
                  <EmphasisIcon icon={item.icon} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
