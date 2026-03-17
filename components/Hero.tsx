import { contactLinks, getLinkedInUrl, getResumeLink } from "@/lib/contactLinks";
import { TrackedLink } from "@/components/TrackedLink";
import { type Locale, withLocalePath } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import { BubbleBackground } from "./BubbleBackground";
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
  secondaryCta: string;
  linkedinCta: string;
  cvCta: string;
  panelImageAlt: string;
};

const heroCopy: Record<Locale, HeroCopy> = {
  en: {
    titleIntro: "I'm",
    titleName: "David,",
    titleRole: "Product Manager",
    subtitle: "I turn buisiness requirments into shipped impact — fast, measurable, and built to scale.",
    primaryCta: "Portfolio",
    secondaryCta: "Contact",
    linkedinCta: "LinkedIn",
    cvCta: "Download CV",
    panelImageAlt: "Portrait image"
  },
  he: {
    titleIntro: "נעים מאוד, אני ",
    titleName: "דוד",
    titleRole: "מנהל מוצר",
    subtitle: "אני הופך צרכים עסקים לפתרונות בעלי השפעה מדידה, מדויקת וסקיילבילית",
    primaryCta: "לתיק עבודות",
    secondaryCta: "צור איתי קשר",
    linkedinCta: "LinkedIn",
    cvCta: "הורדת קו\"ח",
    panelImageAlt: "תמונת פרופיל"
  }
};

type HeroProps = {
  locale?: Locale;
};

export function Hero({ locale = "en" }: HeroProps) {
  const copy = heroCopy[locale];
  const ctaCvLink = getResumeLink(locale);

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
              href={LINKS.whatsapp}
              className={`${styles.button} ${styles.secondaryButton}`}
              target="_blank"
              rel="noreferrer"
              external
              tracking={{
                eventName: "social_click",
                kind: "external",
                label: copy.secondaryCta,
                locale,
                location: "hero_whatsapp",
                section: "hero"
              }}
            >
              {copy.secondaryCta}
            </TrackedLink>
          </div>

          <div className={styles.quickRow}>
            <TrackedLink
              href={LINKS.linkedin}
              className={`${styles.quickButton} ${styles.quickLinkedin}`}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.linkedinCta}
              external
              tracking={{
                eventName: "social_click",
                kind: "external",
                label: copy.linkedinCta,
                locale,
                location: "hero_linkedin",
                section: "hero"
              }}
            >
              <span className={styles.quickIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M7.2 8.4a1.92 1.92 0 1 1 0-3.84 1.92 1.92 0 0 1 0 3.84ZM8.86 19.3H5.56V9.64h3.3v9.66ZM20 19.3h-3.3v-4.7c0-1.23-.47-2.08-1.63-2.08-.88 0-1.4.59-1.64 1.16-.08.2-.1.46-.1.73v4.89h-3.3V9.64h3.3v1.37c.44-.67 1.23-1.62 3-1.62 2.18 0 3.67 1.42 3.67 4.46v5.45Z" />
                </svg>
              </span>
              <span>{copy.linkedinCta}</span>
            </TrackedLink>
            <TrackedLink
              href={ctaCvLink}
              className={`${styles.quickButton} ${styles.quickCv}`}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.cvCta}
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
              <span className={styles.quickIcon} aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path d="M5 3.8h7.1l2.9 2.9v9.5H5V3.8Zm6.8 0V7h2.2M7.6 10.1h4.9M7.6 12.7h4.9" />
                </svg>
              </span>
              <span>{copy.cvCta}</span>
            </TrackedLink>
          </div>
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
