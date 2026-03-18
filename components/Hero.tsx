import { contactLinks, getLinkedInUrl, getResumeLink } from "@/lib/contactLinks";
import { TrackedLink } from "@/components/TrackedLink";
import { type Locale, withLocalePath } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";
import { BubbleBackground } from "./BubbleBackground";
import { LinkedInIcon, WhatsAppIcon } from "./SocialIcons";
import styles from "./Hero.module.css";

const LINKS = {
  whatsapp: contactLinks.whatsapp,
  linkedin: getLinkedInUrl()
} as const;

const HERO_PROFILE_IMAGE = withVersionedAssetPath("/images/hero/David-Fraimovich.png");

type HeroCopy = {
  titleIntro: string;
  titleName: string;
  titleRole: string;
  subtitle: string;
  primaryCta: string;
  cvCta: string;
  panelImageAlt: string;
};

const heroCopy: Record<Locale, HeroCopy> = {
  en: {
    titleIntro: "I'm",
    titleName: "David,",
    titleRole: "Product Manager",
    subtitle: "I turn business requirements into shipped impact — fast, measurable, and built to scale.",
    primaryCta: "Portfolio",
    cvCta: "Download CV",
    panelImageAlt: "Portrait image"
  },
  he: {
    titleIntro: "נעים מאוד, אני ",
    titleName: "דוד",
    titleRole: "מנהל מוצר",
    subtitle: "אני הופך צרכים עסקים לפתרונות בעלי השפעה מדידה, מדויקת וסקיילבילית",
    primaryCta: "לתיק עבודות",
    cvCta: "הורדת קו\"ח",
    panelImageAlt: "תמונת פרופיל"
  }
};

type HeroProps = {
  locale?: Locale;
};

export function Hero({ locale = "en" }: HeroProps) {
  const copy = heroCopy[locale];
  const site = getSiteContent(locale);
  const ctaCvLink = getResumeLink(locale);
  const socialLinks = [
    {
      href: LINKS.linkedin,
      icon: LinkedInIcon,
      label: site.hero_social_linkedin_label,
      location: "hero_linkedin"
    },
    {
      href: LINKS.whatsapp,
      icon: WhatsAppIcon,
      label: site.hero_social_whatsapp_label,
      location: "hero_whatsapp"
    }
  ] as const;
  const trustItems = [
    {
      value: site.hero_trust_experience_value,
      label: site.hero_trust_experience_label
    },
    {
      value: site.hero_trust_domains_value,
      label: site.hero_trust_domains_label
    },
    {
      value: site.hero_trust_projects_value,
      label: site.hero_trust_projects_label
    }
  ] as const;

  return (
    <section className={`${styles.hero} ${styles.heroAnimatedBg} hero-root`} aria-labelledby="hero-title">
      <div className={styles.background}>
        <BubbleBackground className={styles.bubbleBackground} interactive />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-title" className={styles.title}>
            <span>{copy.titleIntro} </span>
            <span className={styles.titleAccent}>{copy.titleName}</span>
            <br />
            <span>{copy.titleRole}</span>
          </h1>
          <p className={styles.subtitle}>{copy.subtitle}</p>

          <ul className={styles.socialList} aria-label={site.footer_social_group_label}>
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <TrackedLink
                    href={item.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    external
                    tracking={{
                      eventName: "social_click",
                      kind: "external",
                      label: item.label,
                      locale,
                      location: item.location,
                      section: "hero"
                    }}
                  >
                    <span className={styles.socialIcon} aria-hidden="true">
                      <Icon />
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>

          <div className={styles.ctaRow}>
            <TrackedLink
              href={withLocalePath(locale, "/case-studies")}
              className={`${styles.button} ${styles.primaryButton}`}
              tracking={{
                eventName: "cta_click",
                kind: "internal",
                label: copy.primaryCta,
                locale,
                location: "hero_primary",
                section: "hero"
              }}
            >
              {copy.primaryCta}
            </TrackedLink>
            <TrackedLink
              href={ctaCvLink}
              className={`${styles.button} ${styles.secondaryButton}`}
              target="_blank"
              rel="noreferrer"
              download
              external
              tracking={{
                eventName: "resume_download_click",
                kind: "download",
                label: copy.cvCta,
                locale,
                location: "hero_resume",
                section: "hero"
              }}
            >
              {copy.cvCta}
            </TrackedLink>
          </div>

          <ul className={styles.trustList} aria-label={site.hero_trust_group_label}>
            {trustItems.map((item) => (
              <li key={`${item.value}-${item.label}`} className={styles.trustItem}>
                <span className={styles.trustValue}>{item.value}</span>
                <span className={styles.trustLabel}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visualStage} aria-hidden="true">
          <div className={styles.visualBase} />
          <div className={styles.profileOrb}>
            <img src={HERO_PROFILE_IMAGE} alt={copy.panelImageAlt} className={styles.profileImage} />
          </div>
        </div>
      </div>
    </section>
  );
}
