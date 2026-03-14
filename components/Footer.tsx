import Link from "next/link";
import type { ReactElement } from "react";
import { FooterContactPanel } from "@/components/FooterContactPanel";
import styles from "@/components/Footer.module.css";
import {
  contactLinks,
  getContactEmail,
  getLinkedInUrl,
  getMailtoHref,
  portraitImages,
  resumeLinks
} from "@/lib/contactLinks";
import { type Locale, withLocalePath } from "@/lib/i18n";
import type { SiteContent } from "@/lib/siteContent";

type Props = {
  locale: Locale;
  site: SiteContent;
};

type FooterCopy = {
  actionLinkedin: string;
  contactShortcut: string;
  contactTitle: string;
  contactIntro: string;
  headline: string;
  infoLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  navTitle: string;
  actionsTitle: string;
  profileSummary: string;
  profileMetaLines: [string, string];
  resumeEn: string;
  resumeHe: string;
  send: string;
  socialLabels: {
    email: string;
    github: string;
    linkedin: string;
    phone: string;
    whatsapp: string;
  };
  successSubtitle: string;
  successTitle: string;
  tooltipLines: [string, string];
};

type SocialLink = {
  external?: boolean;
  href: string;
  icon: () => ReactElement;
  label: string;
};

type ActionLink = {
  download?: boolean;
  external?: boolean;
  href: string;
  icon: () => ReactElement;
  label: string;
};

const footerCopy: Record<Locale, FooterCopy> = {
  en: {
    actionLinkedin: "Connect on LinkedIn",
    actionsTitle: "Actions",
    contactShortcut: "Contact me",
    contactTitle: "Let's connect",
    contactIntro: "Have a role, product challenge, or collaboration in mind? Send me a message",
    headline: "Have a product challenge in mind?",
    infoLabel: "More information",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about the role, product challenge, or collaboration",
    navTitle: "Navigation",
    profileSummary: "Building products that connect business goals, user needs, and execution",
    profileMetaLines: ["Fintech | SaaS | AI | Web & Mobile", "4+ years leading cross-functional product delivery"],
    resumeEn: "Download Resume (En)",
    resumeHe: "Download Resume (He)",
    send: "Send",
    socialLabels: {
      email: "Email David",
      github: "View GitHub profile",
      linkedin: "View LinkedIn profile",
      phone: "Call David",
      whatsapp: "Message on WhatsApp"
    },
    successSubtitle: "Usually replies within 1–2 business days",
    successTitle: "תודה שפניתם, ההודעה נשלחה.",
    tooltipLines: [
      "Open to product roles and collaborations",
      "Usually replies within 1–2 business days"
    ]
  },
  he: {
    actionLinkedin: "חיבור בלינקדאין",
    actionsTitle: "פעולות",
    contactShortcut: "צור איתי קשר",
    contactTitle: "בואו נדבר",
    contactIntro: "אם יש לכם תפקיד, אתגר מוצרי או שיתוף פעולה בראש, שלחו לי הודעה",
    headline: "יש לכם אתגר מוצרי ?",
    infoLabel: "מידע נוסף",
    messageLabel: "הודעה",
    messagePlaceholder: "ספרו לי על התפקיד, האתגר המוצרי או שיתוף הפעולה",
    navTitle: "ניווט",
    profileSummary: "בונה מוצרים שמחברים בין יעדים עסקיים, צרכי משתמשים וביצוע",
    profileMetaLines: ["Fintech | SaaS | AI | Web & Mobile", "4+ שנות הובלת מוצר רב-תחומית מקצה לקצה"],
    resumeEn: "קורות חיים (אנגלית)",
    resumeHe: "קורות חיים (עברית)",
    send: "שלחו",
    socialLabels: {
      email: "שליחת אימייל לדוד",
      github: "מעבר לפרופיל GitHub",
      linkedin: "מעבר לפרופיל LinkedIn",
      phone: "התקשרות לדוד",
      whatsapp: "שליחת הודעה ב-WhatsApp"
    },
    successSubtitle: "Usually replies within 1–2 business days",
    successTitle: "תודה שפניתם, ההודעה נשלחה.",
    tooltipLines: [
      "Open to product roles and collaborations",
      "Usually replies within 1–2 business days"
    ]
  }
};

export function Footer({ locale, site }: Props) {
  const copy = footerCopy[locale];
  const currentYear = new Date().getFullYear();
  const email = getContactEmail(site.email);
  const linkedinUrl = getLinkedInUrl(site.linkedin_url);
  const contactPanelId = `footer-contact-${locale}`;
  const messageFieldId = `footer-message-${locale}`;
  const navigationLinks = [
    { href: withLocalePath(locale), label: site.nav_home },
    { href: withLocalePath(locale, "/about"), label: site.nav_about },
    { href: withLocalePath(locale, "/resume"), label: site.nav_resume },
    { href: withLocalePath(locale, "/case-studies"), label: site.nav_case_studies }
  ];
  const actionLinks: ActionLink[] = [
    { external: true, href: linkedinUrl, icon: ArrowUpRightIcon, label: copy.actionLinkedin },
    { download: true, external: true, href: resumeLinks.he, icon: DownloadIcon, label: copy.resumeHe },
    { download: true, external: true, href: resumeLinks.en, icon: DownloadIcon, label: copy.resumeEn }
  ];
  const socialLinks: SocialLink[] = [
    { external: true, href: linkedinUrl, icon: LinkedInIcon, label: copy.socialLabels.linkedin },
    { external: true, href: contactLinks.whatsapp, icon: WhatsAppIcon, label: copy.socialLabels.whatsapp },
    { href: contactLinks.phone, icon: PhoneIcon, label: copy.socialLabels.phone },
    { href: getMailtoHref(email), icon: MailIcon, label: copy.socialLabels.email },
    { external: true, href: contactLinks.github, icon: GitHubIcon, label: copy.socialLabels.github }
  ];
  const copyrightText =
    locale === "he"
      ? `Copyright © ${currentYear} ${site.brand_name}. כל הזכויות שמורות.`
      : `Copyright © ${currentYear} ${site.brand_name}. All Rights Reserved.`;

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.topRow}>
          <h2 className={styles.headline}>{copy.headline}</h2>
          <a className={styles.contactShortcut} href={`#${contactPanelId}`}>
            <span>{copy.contactShortcut}</span>
            <span className={styles.shortcutIcon} aria-hidden="true">
              <ButtonArrowIcon />
            </span>
          </a>
        </div>

        <div className={styles.divider} />

        <div className={styles.contentGrid}>
          <section className={styles.profileColumn} aria-labelledby={`footer-profile-name-${locale}`}>
            <div className={styles.profileHeader}>
              <img src={portraitImages.footer} alt={site.brand_name} className={styles.profileImage} />
              <h3 id={`footer-profile-name-${locale}`} className={styles.profileName}>
                {site.brand_name}
              </h3>
            </div>

            <p className={styles.profileSummary}>{copy.profileSummary}</p>
            <p className={styles.profileMeta}>
              {copy.profileMetaLines[0]}
              <br />
              {copy.profileMetaLines[1]}
            </p>

            <ul className={styles.socialList} aria-label={locale === "he" ? "קישורי קשר" : "Contact links"}>
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      className={styles.socialLink}
                      href={item.href}
                      aria-label={item.label}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                    >
                      <span className={styles.socialIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <nav className={styles.sectionColumn} aria-label={copy.navTitle}>
            <h3 className={styles.sectionHeading}>{copy.navTitle}</h3>
            <ul className={styles.navList}>
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link className={styles.navLink} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className={styles.sectionColumn} aria-labelledby={`footer-actions-${locale}`}>
            <h3 id={`footer-actions-${locale}`} className={styles.sectionHeading}>
              {copy.actionsTitle}
            </h3>
            <ul className={styles.actionList}>
              {actionLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      className={styles.actionLink}
                      href={item.href}
                      download={item.download}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                    >
                      <span>{item.label}</span>
                      <span className={styles.actionIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <FooterContactPanel
            copy={{
              close: "סגור",
              heading: copy.contactTitle,
              infoLabel: copy.infoLabel,
              intro: copy.contactIntro,
              messageLabel: copy.messageLabel,
              placeholder: copy.messagePlaceholder,
              send: copy.send,
              successSubtitle: copy.successSubtitle,
              successTitle: copy.successTitle,
              tooltipLines: copy.tooltipLines
            }}
            locale={locale}
            messageFieldId={messageFieldId}
            panelId={contactPanelId}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomBar}>
          <p className={styles.bottomCopy}>{copyrightText}</p>
          <p className={styles.bottomNote}>{site.footer_note}</p>
        </div>
      </div>
    </footer>
  );
}

function ButtonArrowIcon(): ReactElement {
  return (
    <svg viewBox="0 0 42 42" focusable="false">
      <path
        d="M12.25 29.75 29.75 12.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12.25 12.25H29.75V29.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowUpRightIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        d="M8 16 16 8m-5 0h5v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function DownloadIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path
        d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function LinkedInIcon(): ReactElement {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 4C2.32843 4 3 4.56982 3 5.27273V16.7273C3 17.4302 2.32843 18 1.5 18C0.671573 18 0 17.4302 0 16.7273V5.27273C0 4.56982 0.671573 4 1.5 4Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.6 5.27226C7.59974 4.56957 7.01781 4 6.3 4C5.58203 4 5 4.56982 5 5.27273V10.3636V16.7273C5 17.4302 5.58203 18 6.3 18C7.01797 18 7.6 17.4302 7.6 16.7273V10.3636C7.6 8.25491 9.34609 6.54545 11.5 6.54545C13.6539 6.54545 15.4 8.25491 15.4 10.3636V16.7273C15.4 17.4302 15.982 18 16.7 18C17.418 18 18 17.4302 18 16.7273V10.3636C18 6.8491 15.0899 4 11.5 4C10.0367 4 8.68636 4.47338 7.6 5.27226Z"
        fill="currentColor"
      />
      <path
        d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} focusable="false" aria-hidden="true">
      <path
        d="M21.98 11.41C21.64 5.60995 16.37 1.13996 10.3 2.13996C6.12004 2.82996 2.77005 6.21994 2.12005 10.3999C1.74005 12.8199 2.24007 15.1099 3.33007 16.9999L2.44006 20.3099C2.24006 21.0599 2.93004 21.7399 3.67004 21.5299L6.93005 20.63C8.41005 21.5 10.14 21.9999 11.99 21.9999C17.63 21.9999 22.31 17.03 21.98 11.41ZM16.8801 15.7199C16.7901 15.8999 16.68 16.07 16.54 16.23C16.29 16.5 16.02 16.7 15.72 16.82C15.42 16.95 15.09 17.01 14.74 17.01C14.23 17.01 13.68 16.89 13.11 16.64C12.53 16.39 11.9601 16.0599 11.3901 15.6499C10.8101 15.2299 10.2701 14.7599 9.75005 14.2499C9.23005 13.7299 8.77003 13.1799 8.35003 12.6099C7.94003 12.0399 7.61005 11.4699 7.37005 10.8999C7.13005 10.3299 7.01006 9.77996 7.01006 9.25996C7.01006 8.91996 7.07006 8.58996 7.19006 8.28996C7.31006 7.97996 7.50007 7.69996 7.77007 7.44996C8.09007 7.12996 8.44005 6.97996 8.81005 6.97996C8.95005 6.97996 9.09002 7.00995 9.22002 7.06995C9.35002 7.12995 9.47005 7.21995 9.56005 7.34995L10.72 8.98994C10.81 9.11994 10.88 9.22994 10.92 9.33994C10.97 9.44994 10.99 9.54994 10.99 9.64994C10.99 9.76994 10.9501 9.88996 10.8801 10.01C10.8101 10.13 10.72 10.2499 10.6 10.3699L10.22 10.7699C10.16 10.8299 10.1401 10.8899 10.1401 10.9699C10.1401 11.0099 10.15 11.0499 10.16 11.0899C10.18 11.1299 10.1901 11.16 10.2001 11.1899C10.2901 11.36 10.45 11.5699 10.67 11.8299C10.9 12.0899 11.1401 12.3599 11.4001 12.6199C11.6701 12.8899 11.9301 13.1299 12.2001 13.3599C12.4601 13.5799 12.68 13.73 12.85 13.82C12.88 13.83 12.9101 13.8499 12.9401 13.8599C12.9801 13.8799 13.0201 13.88 13.0701 13.88C13.1601 13.88 13.2201 13.85 13.2801 13.79L13.66 13.41C13.79 13.28 13.9101 13.19 14.0201 13.13C14.1401 13.06 14.2501 13.0199 14.3801 13.0199C14.4801 13.0199 14.5801 13.0399 14.6901 13.0899C14.8001 13.1399 14.92 13.2 15.04 13.29L16.7001 14.4699C16.8301 14.5599 16.92 14.67 16.98 14.79C17.03 14.92 17.0601 15.0399 17.0601 15.1799C17.0001 15.3499 16.9601 15.5399 16.8801 15.7199Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon(): ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.0001 16.9201V19.9201C22.0012 20.1986 21.9441 20.4743 21.8326 20.7294C21.721 20.9846 21.5574 21.2137 21.3521 21.402C21.1469 21.5902 20.9046 21.7336 20.6408 21.8228C20.377 21.912 20.0974 21.9452 19.8201 21.9201C16.7429 21.5857 13.7871 20.5342 11.1901 18.8501C8.77388 17.3148 6.72539 15.2663 5.19006 12.8501C3.50003 10.2413 2.4483 7.27109 2.12006 4.1801C2.09507 3.90356 2.12793 3.62486 2.21656 3.36172C2.30518 3.09859 2.44763 2.85679 2.63482 2.65172C2.82202 2.44665 3.04986 2.28281 3.30385 2.17062C3.55783 2.05843 3.8324 2.00036 4.11006 2.0001H7.11006C7.59536 1.99532 8.06585 2.16718 8.43382 2.48363C8.80179 2.80008 9.04213 3.23954 9.11005 3.7201C9.23668 4.68016 9.47151 5.62282 9.81006 6.5301C9.9446 6.88802 9.97372 7.27701 9.89396 7.65098C9.81421 8.02494 9.62892 8.36821 9.36005 8.6401L8.09006 9.9101C9.51361 12.4136 11.5865 14.4865 14.0901 15.9101L15.3601 14.6401C15.6319 14.3712 15.9752 14.1859 16.3492 14.1062C16.7231 14.0264 17.1121 14.0556 17.4701 14.1901C18.3773 14.5286 19.32 14.7635 20.2801 14.8901C20.7658 14.9586 21.2095 15.2033 21.5266 15.5776C21.8437 15.9519 22.0122 16.4297 22.0001 16.9201Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon(): ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6L12 13L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon(): ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#footer-github-icon)">
        <path
          d="M16 21.9999V18.1299C16.0375 17.6531 15.9731 17.1737 15.811 16.7237C15.6489 16.2737 15.3929 15.8634 15.06 15.5199C18.2 15.1699 21.5 13.9799 21.5 8.51994C21.4997 7.12376 20.9627 5.78114 20 4.76994C20.4559 3.54844 20.4236 2.19829 19.91 0.999938C19.91 0.999938 18.73 0.649938 16 2.47994C13.708 1.85876 11.292 1.85876 9 2.47994C6.27 0.649938 5.09 0.999938 5.09 0.999938C4.57638 2.19829 4.54414 3.54844 5 4.76994C4.03013 5.78864 3.49252 7.1434 3.5 8.54994C3.5 13.9699 6.8 15.1599 9.94 15.5499C9.611 15.8899 9.35726 16.2953 9.19531 16.7399C9.03335 17.1844 8.96681 17.658 9 18.1299V21.9999M9 18.9999C4 20.4999 4 16.4999 2 15.9999L9 18.9999Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="footer-github-icon">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
