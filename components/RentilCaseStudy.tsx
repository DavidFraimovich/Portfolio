import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CreditCard,
  Database,
  FileText,
  FolderOpen,
  LayoutGrid,
  MapPinned,
  Rocket,
  Route,
  ShieldCheck,
  UsersRound,
  Workflow,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { CaseStudyZoomableImage } from "@/components/CaseStudyImageGallery";
import styles from "@/components/RentilCaseStudy.module.css";
import type { Locale } from "@/lib/i18n";
import {
  type RentilCapabilityIconKey,
  rentilCaseStudyContent,
  type RentilChallengeIconKey,
  type RentilHighlightIconKey,
  type RentilMetadataIconKey,
  type RentilRoleIconKey
} from "@/lib/rentilCaseStudy";
import { withVersionedAssetPath } from "@/lib/site";

type Props = {
  locale: Locale;
};

const METADATA_ICONS: Record<RentilMetadataIconKey, LucideIcon> = {
  productType: LayoutGrid,
  stage: Rocket,
  role: BriefcaseBusiness,
  period: CalendarDays,
  team: UsersRound,
  scope: Workflow,
  integration: MapPinned
};

const HIGHLIGHT_ICONS: Record<RentilHighlightIconKey, LucideIcon> = {
  operations: Building2,
  architecture: Database,
  continuity: ShieldCheck
};

const ROLE_ICONS: Record<RentilRoleIconKey, LucideIcon> = {
  vision: LayoutGrid,
  specification: FileText,
  database: Database,
  workflow: Route,
  continuity: ShieldCheck
};

const CHALLENGE_ICONS: Record<RentilChallengeIconKey, LucideIcon> = {
  database: Database,
  payments: CreditCard,
  team: UsersRound
};

const CAPABILITY_ICONS: Record<RentilCapabilityIconKey, LucideIcon> = {
  properties: Building2,
  tenants: UsersRound,
  lease: Route,
  payments: CreditCard,
  tasks: Wrench,
  map: MapPinned,
  roles: ShieldCheck,
  reporting: BarChart3,
  documents: FolderOpen
};

function MetadataIcon({ icon }: { icon: RentilMetadataIconKey }) {
  const Icon = METADATA_ICONS[icon];

  return <Icon className={styles.metadataIcon} aria-hidden="true" strokeWidth={1.85} />;
}

function HighlightIcon({ icon }: { icon: RentilHighlightIconKey }) {
  const Icon = HIGHLIGHT_ICONS[icon];

  return <Icon className={styles.highlightIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function RoleIcon({ icon }: { icon: RentilRoleIconKey }) {
  const Icon = ROLE_ICONS[icon];

  return <Icon className={styles.cardIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function ChallengeIcon({ icon }: { icon: RentilChallengeIconKey }) {
  const Icon = CHALLENGE_ICONS[icon];

  return <Icon className={styles.cardIcon} aria-hidden="true" strokeWidth={1.9} />;
}

function CapabilityIcon({ icon }: { icon: RentilCapabilityIconKey }) {
  const Icon = CAPABILITY_ICONS[icon];

  return <Icon className={styles.capabilityIcon} aria-hidden="true" strokeWidth={1.9} />;
}

export function RentilCaseStudy({ locale }: Props) {
  const content = rentilCaseStudyContent[locale];

  return (
    <div className={styles.root} data-locale={locale}>
      <section className={styles.summarySection} aria-labelledby={`rentil-title-${locale}`}>
        <div className={styles.summaryShell}>
          <div className={styles.heroVisual}>
            <CaseStudyZoomableImage
              ariaLabel={content.hero.heroImageAlt}
              classNames={{
                button: styles.heroMediaButton,
                image: styles.heroMediaImage,
                root: styles.heroMediaWrap
              }}
              dialogLabel={content.hero.heroImageAlt}
              image={{
                alt: content.hero.heroImageAlt,
                loading: "eager",
                orientation: "landscape",
                src: withVersionedAssetPath("/images/case-studies/rentil/hero-system.svg")
              }}
              locale={locale}
            />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroHeadingBlock}>
                <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
                <h1 className={styles.titleMain} id={`rentil-title-${locale}`}>
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

      <section className={styles.surfaceSection} aria-labelledby={`rentil-highlights-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`rentil-highlights-${locale}`}>
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

      <section className={styles.surfaceSection} aria-labelledby={`rentil-overview-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`rentil-overview-${locale}`}>
              {content.overview.title}
            </h2>
          </div>

          <p className={styles.sectionLead}>{content.overview.text}</p>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`rentil-role-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`rentil-role-${locale}`}>
              {content.role.title}
            </h2>
          </div>

          <div className={styles.detailGrid} aria-label={content.role.ariaLabel}>
            {content.role.items.map((item) => (
              <article className={`${styles.card} ${styles.compactCard}`} key={item.title}>
                <span className={styles.cardIconWrap}>
                  <RoleIcon icon={item.icon} />
                </span>
                <h3 className={styles.compactCardTitle}>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`rentil-challenges-${locale}`}>
        <div className={styles.surface}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`rentil-challenges-${locale}`}>
              {content.challenges.title}
            </h2>
          </div>

          <div className={styles.challengeGrid} aria-label={content.challenges.ariaLabel}>
            {content.challenges.items.map((item) => (
              <article className={`${styles.card} ${styles.compactCard}`} key={item.title}>
                <span className={styles.cardIconWrap}>
                  <ChallengeIcon icon={item.icon} />
                </span>
                <h3 className={styles.compactCardTitle}>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`rentil-capabilities-${locale}`}>
        <div className={`${styles.surface} ${styles.capabilitySurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`rentil-capabilities-${locale}`}>
              {content.capabilities.title}
            </h2>
          </div>

          <div className={styles.capabilityStage}>
            <div className={styles.capabilityGrid} aria-label={content.capabilities.ariaLabel}>
              {content.capabilities.items.map((item) => (
                <article className={styles.capabilityNode} key={item.title}>
                  <span className={styles.capabilityGlow} aria-hidden="true" />
                  <span className={styles.capabilityIconBadge}>
                    <CapabilityIcon icon={item.icon} />
                  </span>
                  <h3 className={styles.capabilityTitle}>{item.title}</h3>
                  <span className={styles.capabilityAnchor} aria-hidden="true">
                    <span className={styles.capabilityAnchorDot} />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.surfaceSection} aria-labelledby={`rentil-framing-${locale}`}>
        <div className={`${styles.surface} ${styles.emphasisSurface}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} id={`rentil-framing-${locale}`}>
              {content.framing.title}
            </h2>
          </div>

          <p className={styles.sectionLead}>{content.framing.text}</p>
        </div>
      </section>
    </div>
  );
}
