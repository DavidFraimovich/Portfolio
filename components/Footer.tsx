import type { ReactElement } from "react";
import { FooterContactPanel } from "@/components/FooterContactPanel";
import { LinkedInIcon, WhatsAppIcon } from "@/components/SocialIcons";
import { TrackedLink } from "@/components/TrackedLink";
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
  close: string;
  actionLinkedin: string;
  contactShortcut: string;
  contactTitle: string;
  contactIntro: string;
  copyrightTemplate: string;
  errorMessage: string;
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
  sending: string;
  socialGroupLabel: string;
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

function getFooterCopy(site: SiteContent): FooterCopy {
  return {
    close: site.footer_dialog_close,
    actionLinkedin: site.footer_action_linkedin,
    actionsTitle: site.footer_actions_title,
    contactShortcut: site.footer_contact_shortcut,
    contactTitle: site.footer_contact_title,
    contactIntro: site.footer_contact_intro,
    copyrightTemplate: site.footer_copyright_template,
    errorMessage: site.footer_error_message,
    headline: site.footer_headline,
    infoLabel: site.footer_info_label,
    messageLabel: site.footer_message_label,
    messagePlaceholder: site.footer_message_placeholder,
    navTitle: site.footer_nav_title,
    profileSummary: site.footer_profile_summary,
    profileMetaLines: [site.footer_profile_meta_line_one, site.footer_profile_meta_line_two],
    resumeEn: site.footer_resume_en,
    resumeHe: site.footer_resume_he,
    send: site.footer_send,
    sending: site.footer_sending,
    socialGroupLabel: site.footer_social_group_label,
    socialLabels: {
      email: site.footer_social_email_label,
      github: site.footer_social_github_label,
      linkedin: site.footer_social_linkedin_label,
      phone: site.footer_social_phone_label,
      whatsapp: site.footer_social_whatsapp_label
    },
    successSubtitle: site.footer_success_subtitle,
    successTitle: site.footer_success_title,
    tooltipLines: [site.footer_tooltip_line_one, site.footer_tooltip_line_two]
  };
}

export function Footer({ locale, site }: Props) {
  const copy = getFooterCopy(site);
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
  const copyrightText = renderFooterTemplate(copy.copyrightTemplate, {
    year: String(currentYear),
    brand: site.brand_name
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.topRow}>
          <h2 className={styles.headline}>{copy.headline}</h2>
          <TrackedLink
            className={styles.contactShortcut}
            href={`#${contactPanelId}`}
            tracking={{
              eventName: "cta_click",
              kind: "hash",
              label: copy.contactShortcut,
              locale,
              location: "footer_contact_shortcut",
              section: "footer"
            }}
          >
            <span>{copy.contactShortcut}</span>
            <span className={styles.shortcutIcon} aria-hidden="true">
              <ButtonArrowIcon />
            </span>
          </TrackedLink>
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

            <ul className={styles.socialList} aria-label={copy.socialGroupLabel}>
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <TrackedLink
                      className={styles.socialLink}
                      href={item.href}
                      aria-label={item.label}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      external={item.external}
                      tracking={{
                        eventName: "social_click",
                        kind: item.href.startsWith("mailto:")
                          ? "mailto"
                          : item.href.startsWith("tel:")
                            ? "tel"
                            : "external",
                        label: item.label,
                        locale,
                        location: "footer_social",
                        section: "footer"
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
          </section>

          <nav className={styles.sectionColumn} aria-label={copy.navTitle}>
            <h3 className={styles.sectionHeading}>{copy.navTitle}</h3>
            <ul className={styles.navList}>
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <TrackedLink
                    className={styles.navLink}
                    href={item.href}
                    tracking={{
                      eventName: "navigation_click",
                      kind: "internal",
                      label: item.label,
                      locale,
                      location: "footer_nav",
                      section: "footer"
                    }}
                  >
                    {item.label}
                  </TrackedLink>
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
                    <TrackedLink
                      className={styles.actionLink}
                      href={item.href}
                      download={item.download}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      external={item.external}
                      tracking={{
                        eventName: item.download ? "resume_download_click" : "social_click",
                        kind: item.download ? "download" : "external",
                        label: item.label,
                        locale,
                        location: "footer_actions",
                        section: "footer"
                      }}
                    >
                      <span>{item.label}</span>
                      <span className={styles.actionIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    </TrackedLink>
                  </li>
                );
              })}
            </ul>
          </section>

          <FooterContactPanel
            copy={{
              close: copy.close,
              heading: copy.contactTitle,
              infoLabel: copy.infoLabel,
              intro: copy.contactIntro,
              messageLabel: copy.messageLabel,
              placeholder: copy.messagePlaceholder,
              errorMessage: copy.errorMessage,
              send: copy.send,
              sending: copy.sending,
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

function renderFooterTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
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
