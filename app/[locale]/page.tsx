import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { SkillsRibbon } from "@/components/SkillsRibbon";
import { WindmillsCtaSection } from "@/components/WindmillsCtaSection";
import { getAllCaseStudies, getAllPosts } from "@/lib/content";
import { formatStableDate } from "@/lib/date";
import { isLocale, withLocalePath } from "@/lib/i18n";
import { siteUrl, withBasePath } from "@/lib/site";
import { getSiteContent } from "@/lib/siteContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const site = getSiteContent(safeLocale);
  const canonical = `${siteUrl}${withLocalePath(safeLocale)}`;

  return {
    title: site.nav_home,
    description: site.subheadline,
    alternates: {
      canonical
    },
    openGraph: {
      title: site.nav_home,
      description: site.subheadline,
      type: "website",
      url: canonical
    },
    twitter: {
      card: "summary_large_image",
      title: site.nav_home,
      description: site.subheadline
    }
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSiteContent(locale);
  const caseStudies = getAllCaseStudies(locale).slice(0, 3);
  const posts = getAllPosts(locale).slice(0, 2);
  const isHebrew = locale === "he";
  const trackShareSummaryId = "shareable-summary";
  const featuredSectionId = "featured-case-studies";
  const featuredCards = [
    {
      slug: "ai-agent-competitive-edge",
      title: isHebrew ? "AI Agent כיתרון תחרותי" : "AI Agent as a competitive edge",
      meta: isHebrew ? "פינטק, שלב מוקדם" : "Fintech, early-stage",
      image: "/images/featured/ai-agent.svg"
    },
    {
      slug: "erp-government-api-integrations",
      title: isHebrew ? "אינטגרציות ERP + APIs ממשלתיים" : "ERP + Government API integrations",
      meta: isHebrew ? "Fintech/SaaS" : "Fintech/SaaS",
      image: "/images/featured/erp-gov.svg"
    },
    {
      slug: "mvp-6-months",
      title: isHebrew ? "0→1 MVP בתוך 6 חודשים" : "0→1 MVP in 6 months",
      meta: isHebrew ? "פלטפורמת חתימה דיגיטלית" : "Digital signature platform",
      image: "/images/featured/mvp-6-months.svg"
    }
  ];
  const assetPath = (path: string): string => withBasePath(path);

  return (
    <>
      <Hero locale={locale} />
      <SkillsRibbon locale={locale} />

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
          <Link className="cta" href={withLocalePath(locale, "/case-studies")}>
            {isHebrew ? "למחקרי מקרה" : "View Case Studies"}
          </Link>
          <a className="cta cta-secondary" href={withBasePath("/cv/David-Fraimovich-CV-EN.pdf")} target="_blank" rel="noreferrer">
            {isHebrew ? "הורדת קורות חיים" : "Download CV"}
          </a>
          <Link className="cta cta-secondary" href={withLocalePath(locale, "/contact")}>
            {isHebrew ? "יצירת קשר" : "Contact"}
          </Link>
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
            <p>{isHebrew ? "לצפייה מהירה בתקציר ויצירת קשר." : "Quick path for screening and contact."}</p>
            <div className="cta-row compact">
              <Link className="cta cta-secondary" href={withLocalePath(locale, "/resume")}>
                {isHebrew ? "קורות חיים" : "Resume"}
              </Link>
              <Link className="cta cta-secondary" href={withLocalePath(locale, "/contact")}>
                {isHebrew ? "צור קשר" : "Contact"}
              </Link>
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
              <a className="cta cta-secondary" href={`#${featuredSectionId}`}>
                {isHebrew ? "פיצ'רד קייסים" : "Featured Cases"}
              </a>
              <Link className="cta cta-secondary" href={withLocalePath(locale, "/about")}>
                {isHebrew ? "איך אני עובד" : "How I work"}
              </Link>
            </div>
          </article>
          <article className="card">
            <h3>{isHebrew ? "C: מפנה (דקה)" : "C: Referral (1m)"}</h3>
            <p>{isHebrew ? "תקציר שיתופי מהיר + לינקדאין." : "Share-ready summary plus LinkedIn."}</p>
            <div className="cta-row compact">
              <a className="cta cta-secondary" href={`#${trackShareSummaryId}`}>
                {isHebrew ? "תקציר לשיתוף" : "Shareable Summary"}
              </a>
              <a
                className="cta cta-secondary"
                href="https://www.linkedin.com/in/david-fraimovich-843207172"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
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
            <p>{isHebrew ? "AI Agent + אופטימיזציית BI/Data" : "AI Agent + BI/Data optimization"}</p>
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
              <img src={assetPath(item.image)} alt={item.title} className="featured-thumb" />
              <h3>
                <Link href={withLocalePath(locale, `/case-studies/${item.slug}`)}>{item.title}</Link>
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
              ? "AI Agent לדיפרנציאציה + BI/Data לשיפור החלטות תפעוליות."
              : "AI Agent for differentiation + BI/Data to improve operations and decisions."}
          </li>
        </ol>
      </section>

      <section className="card">
        <h2 className="section-title topless-title">{isHebrew ? "איך אני עובד" : "How I work"}</h2>
        <p className="workflow-line">
          {isHebrew
            ? "Problem framing → Discovery → KPI/Guardrails → Options & tradeoffs → MVP → Launch → Measure → Iterate"
            : "Problem framing → Discovery → KPI/Guardrails → Options & tradeoffs → MVP → Launch → Measure → Iterate"}
        </p>
        <div className="cta-row compact">
          <Link className="cta cta-secondary" href={withLocalePath(locale, "/about")}>
            {isHebrew ? "פירוט מלא על דרך העבודה" : "Read full How I work"}
          </Link>
        </div>
      </section>

      <h2 className="section-title">{site.home_selected_case_studies}</h2>
      <section className="grid" aria-label={site.home_selected_case_studies}>
        {caseStudies.map((item) => (
          <article key={item.slug} className="card">
            <p className="meta">{formatStableDate(item.frontmatter.date)}</p>
            <h3>
              <Link href={withLocalePath(locale, `/case-studies/${item.slug}`)}>
                {item.frontmatter.title}
              </Link>
            </h3>
            <p>{item.frontmatter.description}</p>
            <div className="pill-row">
              {item.frontmatter.tags.map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
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

      <section className="card" id={trackShareSummaryId}>
        <h2 className="section-title topless-title">
          {isHebrew ? "תקציר לשיתוף" : "Shareable Summary"}
        </h2>
        <p>
          {isHebrew
            ? "PM מוצרי וטכני עם ניסיון 0→1, אינטגרציות API מורכבות, ניהול תלויות בין-צוותיות ויצירת יתרון עסקי דרך AI + Data."
            : "Product + technical PM with 0→1 delivery, complex API integrations, cross-team dependency management, and business differentiation through AI + Data."}
        </p>
        <div className="cta-row">
          <a className="cta cta-secondary" href="https://wa.me/972542114929" target="_blank" rel="noreferrer">
            Contact (WhatsApp)
          </a>
          <a className="cta cta-secondary" href="mailto:davidfr97@gmail.com">
            Mail me
          </a>
          <a className="cta cta-secondary" href="https://www.linkedin.com/in/david-fraimovich-843207172" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="cta cta-secondary" href={withBasePath("/cv/David-Fraimovich-CV-HE.pdf")} target="_blank" rel="noreferrer">
            Download CV (HE)
          </a>
          <a className="cta cta-secondary" href={withBasePath("/cv/David-Fraimovich-CV-EN.pdf")} target="_blank" rel="noreferrer">
            Download CV (EN)
          </a>
        </div>
      </section>

      <WindmillsCtaSection locale={locale} />
    </>
  );
}
