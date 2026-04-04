import { contactLinks, getLinkedInUrl, getMailtoHref, getResumeLink, resumeLinks } from "@/lib/contactLinks";
import { CaseStudyZoomableImage } from "@/components/CaseStudyImageGallery";
import { TrackedLink } from "@/components/TrackedLink";
import { getAllPosts } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
import { type Locale, withLocalePath } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  locale: Locale;
};

type FeaturedCard = {
  slug: string;
  title: string;
  meta: string;
  image: string;
};

const featuredSectionId = "featured-case-studies";
const shareSummarySectionId = "shareable-summary";

function getFeaturedCards(locale: Locale): FeaturedCard[] {
  const isHebrew = locale === "he";

  return [
    {
      slug: "erp-government-api-integrations",
      title: isHebrew ? "אינטגרציות ERP + APIs ממשלתיים" : "ERP + Government API integrations",
      meta: "Fintech/SaaS",
      image: "/images/featured/erp-gov.svg"
    },
    {
      slug: "mvp-6-months",
      title: isHebrew ? "0→1 MVP בתוך 6 חודשים" : "0→1 MVP in 6 months",
      meta: isHebrew ? "פלטפורמת חתימה דיגיטלית" : "Digital signature platform",
      image: "/images/featured/mvp-6-months.svg"
    }
  ];
}

export function WebsiteAsProductCaseStudy({ locale }: Props) {
  const isHebrew = locale === "he";
  const site = getSiteContent(locale);
  const posts = getAllPosts(locale).slice(0, 2);
  const featuredCards = getFeaturedCards(locale);
  const footerContactHref = `#footer-contact-${locale}`;
  const howIWorkHref = `${withLocalePath(locale)}#product-playbook`;
  const linkedinUrl = getLinkedInUrl(site.linkedin_url);
  const mailtoHref = getMailtoHref(site.email);
  const localeResumeLink = getResumeLink(locale);
  const assetPath = (path: string): string => withVersionedAssetPath(path);

  return (
    <>
      <section className="brief-hero card">
        <h2 className="topless-title">{isHebrew ? "האתר הזה הוא מוצר." : "This website is a product."}</h2>
        <p>
          {isHebrew
            ? "נבנה כדי לעזור ל-3 קבוצות משתמשים להחליט מהר אם אני ה-PM שיכול לייצר ערך: מגייסים, מנהלים מגייסים ומפנים."
            : "Built to help 3 user groups decide fast if I am the PM who can deliver value: Recruiters, Hiring Managers, Referrals."}
        </p>
        <section className="grid" aria-label={isHebrew ? "תקציר מוצר" : "Product brief"}>
          <article className="card">
            <h2>{isHebrew ? "משתמשים" : "Users"}</h2>
            <p>{isHebrew ? "מגייסים / מנהלים מגייסים / מפנים" : "Recruiters / Hiring Managers / Referrals"}</p>
          </article>
          <article className="card">
            <h2>{isHebrew ? "כאבים" : "Their pains"}</h2>
            <ul className="plain-list">
              <li>{isHebrew ? "אין זמן לקרוא קורות חיים ארוכים" : "No time to read long CV"}</li>
              <li>{isHebrew ? "קשה לאמת אימפקט אמיתי" : "Hard to validate real impact"}</li>
              <li>
                {isHebrew
                  ? "צריך הוכחה ליכולת החלטה וביצוע"
                  : "Need proof of decision-making and execution"}
              </li>
            </ul>
          </article>
          <article className="card">
            <h2>{isHebrew ? "הפתרון" : "Solution"}</h2>
            <ul className="plain-list">
              <li>{isHebrew ? "מחקרי מקרה סטנדרטיים" : "Standardized case studies"}</li>
              <li>{isHebrew ? "יומן החלטות" : "Decision log"}</li>
              <li>{isHebrew ? "דשבורד אימפקט" : "Impact dashboard"}</li>
            </ul>
          </article>
        </section>
        <div className="cta-row">
          <TrackedLink
            className="cta"
            href={withLocalePath(locale, "/case-studies")}
            tracking={{
              eventName: "cta_click",
              kind: "internal",
              label: isHebrew ? "למחקרי מקרה" : "View Case Studies",
              locale,
              location: "website_product_brief",
              section: "website_product"
            }}
          >
            {isHebrew ? "למחקרי מקרה" : "View Case Studies"}
          </TrackedLink>
          <TrackedLink
            className="cta cta-secondary"
            href={localeResumeLink}
            target="_blank"
            rel="noreferrer"
            external
            tracking={{
              eventName: "resume_download_click",
              kind: "download",
              label: isHebrew ? "הורדת קורות חיים" : "Download CV",
              locale,
              location: "website_product_brief",
              section: "website_product"
            }}
          >
            {isHebrew ? "הורדת קורות חיים" : "Download CV"}
          </TrackedLink>
          <TrackedLink
            className="cta cta-secondary"
            href={footerContactHref}
            tracking={{
              eventName: "cta_click",
              kind: "hash",
              label: isHebrew ? "צור איתי קשר" : "Contact",
              locale,
              location: "website_product_brief",
              section: "website_product"
            }}
          >
            {isHebrew ? "צור איתי קשר" : "Contact"}
          </TrackedLink>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title topless-title">
          {isHebrew
            ? "מה בדרך כלל חסר בבחינת מועמד PM?"
            : "What is usually missing when reviewing a PM candidate?"}
        </h2>
        <ul className="plain-list">
          <li>{isHebrew ? "אין זמן לקרוא קורות חיים ארוכים." : "No time to read a long CV."}</li>
          <li>{isHebrew ? "איפה האימפקט האמיתי והמדדים?" : "Where is the real impact / metrics?"}</li>
          <li>
            {isHebrew
              ? "האם ה-PM מספיק טכני לעבודה עם R&D ואינטגרציות מורכבות?"
              : "Is this PM technical enough for R&D and complex integrations?"}
          </li>
          <li>
            {isHebrew
              ? "איך מתקבלות החלטות תחת לחץ ואי-ודאות?"
              : "How do they make decisions under pressure/uncertainty?"}
          </li>
        </ul>
      </section>

      <section className="card">
        <h2 className="section-title topless-title">
          {isHebrew
            ? "בחרו מסלול (30 שניות / 3 דקות / שיתוף)"
            : "Choose your track (30 seconds / 3 minutes / share)"}
        </h2>
        <section className="grid" aria-label={isHebrew ? "מסלולי שימוש באתר" : "How to use this site"}>
          <article className="card">
            <h3>{isHebrew ? "A: מגייסים (30 שניות)" : "A: Recruiter (30s)"}</h3>
            <p>{isHebrew ? "לצפייה מהירה בתקציר וצור איתי קשר." : "Quick path for screening and contact."}</p>
            <div className="cta-row compact">
              <TrackedLink
                className="cta cta-secondary"
                href={withLocalePath(locale, "/resume")}
                tracking={{
                  eventName: "cta_click",
                  kind: "internal",
                  label: isHebrew ? "קורות חיים" : "Resume",
                  locale,
                  location: "website_product_recruiter_track",
                  section: "website_product"
                }}
              >
                {isHebrew ? "קורות חיים" : "Resume"}
              </TrackedLink>
              <TrackedLink
                className="cta cta-secondary"
                href={footerContactHref}
                tracking={{
                  eventName: "cta_click",
                  kind: "hash",
                  label: isHebrew ? "צור קשר" : "Contact",
                  locale,
                  location: "website_product_recruiter_track",
                  section: "website_product"
                }}
              >
                {isHebrew ? "צור קשר" : "Contact"}
              </TrackedLink>
            </div>
          </article>
          <article className="card">
            <h3>{isHebrew ? "B: מנהל מגייס (3–6 דק')" : "B: Hiring Manager (3–6m)"}</h3>
            <p>
              {isHebrew
                ? "מסלול לקבלת עומק על קבלת החלטות, ביצוע והשפעה."
                : "Deep dive into decision-making, execution, and outcomes."}
            </p>
            <div className="cta-row compact">
              <TrackedLink
                className="cta cta-secondary"
                href={`#${featuredSectionId}`}
                tracking={{
                  eventName: "cta_click",
                  kind: "hash",
                  label: isHebrew ? "פיצ'רד קייסים" : "Featured Cases",
                  locale,
                  location: "website_product_hiring_manager_track",
                  section: "website_product"
                }}
              >
                {isHebrew ? "פיצ'רד קייסים" : "Featured Cases"}
              </TrackedLink>
              <TrackedLink
                className="cta cta-secondary"
                href={howIWorkHref}
                tracking={{
                  eventName: "cta_click",
                  kind: "internal",
                  label: isHebrew ? "איך אני עובד" : "How I work",
                  locale,
                  location: "website_product_hiring_manager_track",
                  section: "website_product"
                }}
              >
                {isHebrew ? "איך אני עובד" : "How I work"}
              </TrackedLink>
            </div>
          </article>
          <article className="card">
            <h3>{isHebrew ? "C: מפנה (דקה)" : "C: Referral (1m)"}</h3>
            <p>{isHebrew ? "תקציר שיתופי מהיר + לינקדאין." : "Share-ready summary plus LinkedIn."}</p>
            <div className="cta-row compact">
              <TrackedLink
                className="cta cta-secondary"
                href={`#${shareSummarySectionId}`}
                tracking={{
                  eventName: "cta_click",
                  kind: "hash",
                  label: isHebrew ? "תקציר לשיתוף" : "Shareable Summary",
                  locale,
                  location: "website_product_referral_track",
                  section: "website_product"
                }}
              >
                {isHebrew ? "תקציר לשיתוף" : "Shareable Summary"}
              </TrackedLink>
              <TrackedLink
                className="cta cta-secondary"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                external
                tracking={{
                  eventName: "social_click",
                  kind: "external",
                  label: "LinkedIn",
                  locale,
                  location: "website_product_referral_track",
                  section: "website_product"
                }}
              >
                LinkedIn
              </TrackedLink>
            </div>
          </article>
        </section>
      </section>

      <section className="card">
        <h2 className="section-title topless-title">{isHebrew ? "סיגנלי אימפקט" : "Impact Signals"}</h2>
        <section className="grid" aria-label={isHebrew ? "סיגנלי אימפקט" : "Impact tiles"}>
          <article className="card impact-tile">
            <h3>01</h3>
            <p>{isHebrew ? "0→1: קונספט ל-MVP בתוך 6 חודשים" : "0→1: Concept to MVP in 6 months"}</p>
          </article>
          <article className="card impact-tile">
            <h3>02</h3>
            <p>
              {isHebrew
                ? "אינטגרציות API מורכבות: ERP / גופים ממשלתיים / APIs חיצוניים"
                : "Complex API integrations: ERP / government bodies / external APIs"}
            </p>
          </article>
          <article className="card impact-tile">
            <h3>03</h3>
            <p>
              {isHebrew
                ? "הובלת צוותים 6–10 + ספקים; ניסיון Scrum of Scrums"
                : "Led teams 6–10 + vendors; Scrum of Scrums experience"}
            </p>
          </article>
          <article className="card impact-tile">
            <h3>04</h3>
            <p>
              {isHebrew
                ? "אופטימיזציית BI/Data לשיפור נראות תפעולית"
                : "BI/Data optimization for stronger operational visibility"}
            </p>
          </article>
          <article className="card impact-tile">
            <h3>05</h3>
            <p>
              {isHebrew
                ? "עבודה תחת יעדים אגרסיביים ובתנאי אי-ודאות"
                : "Operating under aggressive targets under uncertainty"}
            </p>
          </article>
        </section>
      </section>

      <section className="card" id={featuredSectionId}>
        <h2 className="section-title topless-title">
          {isHebrew ? "עבודות נבחרות (אנונימי, אמיתי)" : "Featured Work (anonymized, real)"}
        </h2>
        <section className="grid" aria-label={isHebrew ? "עבודות נבחרות" : "Featured case studies"}>
          {featuredCards.map((item) => (
            <article key={item.slug} className="card featured-card">
              <CaseStudyZoomableImage
                ariaLabel={item.title}
                classNames={{
                  button: "featured-thumb-button",
                  image: "featured-thumb"
                }}
                dialogLabel={item.title}
                image={{
                  alt: item.title,
                  loading: "lazy",
                  orientation: "landscape",
                  src: assetPath(item.image)
                }}
                locale={locale}
              />
              <h3>
                <TrackedLink
                  href={withLocalePath(locale, `/case-studies/${item.slug}`)}
                  tracking={{
                    eventName: "case_study_click",
                    kind: "internal",
                    label: item.title,
                    locale,
                    location: "website_product_featured_cases",
                    section: "website_product"
                  }}
                >
                  {item.title}
                </TrackedLink>
              </h3>
              <p className="meta">{item.meta}</p>
            </article>
          ))}
        </section>
      </section>

      <section className="card">
        <h2 className="section-title topless-title">
          {isHebrew ? "יומן החלטות (איך אני חושב כ-PM)" : "Decision Log (how I think as a PM)"}
        </h2>
        <ol className="timeline">
          <li>
            {isHebrew
              ? "החלטת scope ל-MVP לטובת מהירות לשוק."
              : "MVP scope decision for speed to market."}
          </li>
          <li>
            {isHebrew
              ? "חוזי API + fallback strategy לתלויות מסוכנות."
              : "API contracts + fallback strategy for risky dependencies."}
          </li>
          <li>
            {isHebrew
              ? "Scrum of Scrums לניהול תלויות בין צוותים."
              : "Scrum of Scrums to manage cross-team dependencies."}
          </li>
          <li>
            {isHebrew
              ? "BI/Data לשיפור החלטות תפעוליות ונראות צוותית."
              : "BI/Data improvements to strengthen operational decisions and team visibility."}
          </li>
        </ol>
      </section>

      {posts.length > 0 && (
        <>
          <h2 className="section-title">{site.home_latest_posts}</h2>
          <section className="grid" aria-label={site.home_latest_posts}>
            {posts.map((post) => (
              <article key={post.slug} className="card">
                <p className="meta">{formatStableDate(post.frontmatter.date)}</p>
                <h3>{post.frontmatter.title}</h3>
                <p>{post.frontmatter.description}</p>
              </article>
            ))}
          </section>
        </>
      )}

      <section className="card" id={shareSummarySectionId}>
        <h2 className="section-title topless-title">
          {isHebrew ? "תקציר לשיתוף" : "Shareable Summary"}
        </h2>
        <p>
          {isHebrew
            ? "PM מוצרי וטכני עם ניסיון 0→1, אינטגרציות API מורכבות, ניהול תלויות בין-צוותיות והובלת החלטות מבוססות Data."
            : "Product + technical PM with delivery, complex API integrations, cross-team dependency management, and data-informed product decisions."}
        </p>
        <div className="cta-row">
          <TrackedLink
            className="cta cta-secondary"
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            external
            tracking={{
              eventName: "social_click",
              kind: "external",
              label: isHebrew ? "צור קשר (WhatsApp)" : "Contact (WhatsApp)",
              locale,
              location: "website_product_share_summary",
              section: "website_product"
            }}
          >
            {isHebrew ? "צור קשר (WhatsApp)" : "Contact (WhatsApp)"}
          </TrackedLink>
          <TrackedLink
            className="cta cta-secondary"
            href={mailtoHref}
            tracking={{
              eventName: "contact_click",
              kind: "mailto",
              label: isHebrew ? "שלח לי מייל" : "Mail me",
              locale,
              location: "website_product_share_summary",
              section: "website_product"
            }}
          >
            {isHebrew ? "שלח לי מייל" : "Mail me"}
          </TrackedLink>
          <TrackedLink
            className="cta cta-secondary"
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            external
            tracking={{
              eventName: "social_click",
              kind: "external",
              label: "LinkedIn",
              locale,
              location: "website_product_share_summary",
              section: "website_product"
            }}
          >
            LinkedIn
          </TrackedLink>
          <TrackedLink
            className="cta cta-secondary"
            href={resumeLinks.he}
            target="_blank"
            rel="noreferrer"
            external
            tracking={{
              eventName: "resume_download_click",
              kind: "download",
              label: isHebrew ? "הורדת קו\"ח (HE)" : "Download CV (HE)",
              locale,
              location: "website_product_share_summary",
              section: "website_product"
            }}
          >
            {isHebrew ? "הורדת קו\"ח (HE)" : "Download CV (HE)"}
          </TrackedLink>
          <TrackedLink
            className="cta cta-secondary"
            href={resumeLinks.en}
            target="_blank"
            rel="noreferrer"
            external
            tracking={{
              eventName: "resume_download_click",
              kind: "download",
              label: isHebrew ? "הורדת קו\"ח (EN)" : "Download CV (EN)",
              locale,
              location: "website_product_share_summary",
              section: "website_product"
            }}
          >
            {isHebrew ? "הורדת קו\"ח (EN)" : "Download CV (EN)"}
          </TrackedLink>
        </div>
      </section>
    </>
  );
}
