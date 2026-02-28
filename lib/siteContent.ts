import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

export type SiteContent = {
  site_title: string;
  brand_name: string;
  headline: string;
  subheadline: string;
  primary_cta_text: string;
  linkedin_url: string;
  email: string;
  nav_home: string;
  nav_case_studies: string;
  nav_resume: string;
  nav_about: string;
  nav_contact: string;
  home_selected_case_studies: string;
  home_latest_posts: string;
  case_studies_title: string;
  case_studies_intro: string;
  about_title: string;
  about_intro: string;
  about_how_i_work_title: string;
  about_how_i_work_text: string;
  about_core_strengths_title: string;
  about_core_strengths_text: string;
  resume_title: string;
  resume_intro: string;
  resume_experience_title: string;
  resume_experience_text: string;
  resume_technology_title: string;
  resume_technology_text: string;
  contact_title: string;
  contact_intro: string;
  contact_email_label: string;
  contact_linkedin_label: string;
  detail_role_label: string;
  detail_context_label: string;
  detail_goal_metrics_label: string;
  detail_discovery_label: string;
  detail_options_tradeoffs_label: string;
  detail_execution_label: string;
  detail_results_label: string;
  detail_learnings_label: string;
  footer_note: string;
};

const defaults: Record<Locale, SiteContent> = {
  en: {
    site_title: "Portfolio",
    brand_name: "Your Name",
    headline: "Product designer and engineer turning complex systems into clear experiences.",
    subheadline:
      "I build business-grade digital products with measurable outcomes, from discovery to launch.",
    primary_cta_text: "View Case Studies",
    linkedin_url: "https://linkedin.com/in/yourname",
    email: "hello@example.com",
    nav_home: "Home",
    nav_case_studies: "Case Studies",
    nav_resume: "Resume",
    nav_about: "About",
    nav_contact: "Contact",
    home_selected_case_studies: "Selected Case Studies",
    home_latest_posts: "Latest Posts",
    case_studies_title: "Case Studies",
    case_studies_intro:
      "Each project shows the decisions, constraints, delivery strategy, and measured results.",
    about_title: "About",
    about_intro:
      "I work at the intersection of product strategy, UX, and engineering to ship clear and measurable outcomes.",
    about_how_i_work_title: "How I Work",
    about_how_i_work_text:
      "Discovery-led planning, pragmatic scope control, and tight design-engineering collaboration.",
    about_core_strengths_title: "Core Strengths",
    about_core_strengths_text:
      "Product thinking, architecture decisions, interface craft, and communication under ambiguity.",
    resume_title: "Resume",
    resume_intro:
      "Replace this starter content with your full timeline, responsibilities, and quantified outcomes.",
    resume_experience_title: "Experience Highlights",
    resume_experience_text:
      "Senior product and engineering roles across SaaS, fintech, and marketplace platforms.",
    resume_technology_title: "Technology",
    resume_technology_text:
      "Next.js, TypeScript, React, Node.js, PostgreSQL, analytics, experimentation, and CI/CD.",
    contact_title: "Contact",
    contact_intro:
      "If you are building a product and need strategy, design, or implementation support, reach out.",
    contact_email_label: "Email",
    contact_linkedin_label: "LinkedIn",
    detail_role_label: "Role",
    detail_context_label: "Context",
    detail_goal_metrics_label: "Goal Metrics",
    detail_discovery_label: "Discovery",
    detail_options_tradeoffs_label: "Options and Tradeoffs",
    detail_execution_label: "Execution",
    detail_results_label: "Results",
    detail_learnings_label: "Learnings",
    footer_note: "Built with Next.js static export, MDX content, and Decap CMS."
  },
  he: {
    site_title: "תיק עבודות",
    brand_name: "השם שלך",
    headline: "מעצב מוצר ומפתח שהופך מערכות מורכבות לחוויות ברורות.",
    subheadline: "אני בונה מוצרים עסקיים עם תוצאות מדידות, משלב המחקר ועד ההשקה.",
    primary_cta_text: "לצפייה במחקרי מקרה",
    linkedin_url: "https://linkedin.com/in/yourname",
    email: "hello@example.com",
    nav_home: "בית",
    nav_case_studies: "מחקרי מקרה",
    nav_resume: "קורות חיים",
    nav_about: "אודות",
    nav_contact: "יצירת קשר",
    home_selected_case_studies: "מחקרי מקרה נבחרים",
    home_latest_posts: "פוסטים אחרונים",
    case_studies_title: "מחקרי מקרה",
    case_studies_intro: "כל פרויקט מציג החלטות, אילוצים, אסטרטגיית ביצוע ותוצאות מדידות.",
    about_title: "אודות",
    about_intro: "אני עובד בחיבור בין אסטרטגיית מוצר, UX והנדסה כדי לספק תוצאות ברורות.",
    about_how_i_work_title: "איך אני עובד",
    about_how_i_work_text: "מחקר ממוקד, ניהול היקף פרגמטי, ושיתוף פעולה צמוד בין עיצוב לפיתוח.",
    about_core_strengths_title: "חוזקות מרכזיות",
    about_core_strengths_text: "חשיבה מוצרית, קבלת החלטות ארכיטקטורה, ועיצוב ממשקים מדויק.",
    resume_title: "קורות חיים",
    resume_intro: "החלף את תוכן הדוגמה בציר זמן מלא, תחומי אחריות ותוצאות כמותיות.",
    resume_experience_title: "ניסיון בולט",
    resume_experience_text: "תפקידים בכירים במוצר ובהנדסה בעולמות SaaS, פינטק ומרקטפלייס.",
    resume_technology_title: "טכנולוגיות",
    resume_technology_text:
      "Next.js, TypeScript, React, Node.js, PostgreSQL, אנליטיקה, ניסויים ותהליכי CI/CD.",
    contact_title: "יצירת קשר",
    contact_intro: "אם אתם בונים מוצר וצריכים תמיכה באסטרטגיה, עיצוב או פיתוח, דברו איתי.",
    contact_email_label: "אימייל",
    contact_linkedin_label: "לינקדאין",
    detail_role_label: "תפקיד",
    detail_context_label: "הקשר",
    detail_goal_metrics_label: "יעדי הצלחה",
    detail_discovery_label: "תובנות מחקר",
    detail_options_tradeoffs_label: "אפשרויות ופשרות",
    detail_execution_label: "ביצוע",
    detail_results_label: "תוצאות",
    detail_learnings_label: "תובנות",
    footer_note: "נבנה עם Next.js, תוכן MDX ו-Decap CMS."
  }
};

export function getSiteContent(locale: Locale): SiteContent {
  const filePath = path.join(process.cwd(), "content", "site", `${locale}.json`);
  if (!fs.existsSync(filePath)) return defaults[locale];

  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as Partial<SiteContent>;
    return { ...defaults[locale], ...parsed };
  } catch {
    return defaults[locale];
  }
}
