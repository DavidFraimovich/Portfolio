import enResumeContent from "@/content/resume/en.json";
import heResumeContent from "@/content/resume/he.json";
import type { Locale } from "@/lib/i18n";

export type ResumeStrengthIcon = "compass" | "layers" | "workflow";

export type ResumeHero = {
  eyebrow: string;
  summary: string;
  title: string;
};

export type ResumeQuickFact = {
  label: string;
  value: string;
};

export type ResumeStrength = {
  body: string;
  icon: ResumeStrengthIcon;
  title: string;
};

export type ResumeTimelineEntry = {
  chips?: string[];
  city?: string;
  company: string;
  duration: string;
  highlights: string[];
  period: string;
  roles: string[];
  summary: string;
};

export type ResumeDownloadCard = {
  body: string;
  locale: Locale;
  title: string;
};

export type ResumeContent = {
  downloadsCta: {
    body: string;
    cards: ResumeDownloadCard[];
    title: string;
  };
  hero: ResumeHero;
  quickFacts: ResumeQuickFact[];
  strengths: {
    items: ResumeStrength[];
    title: string;
  };
  timeline: {
    intro: string;
    items: ResumeTimelineEntry[];
    title: string;
  };
};

const resumeContentByLocale: Record<Locale, ResumeContent> = {
  en: enResumeContent as ResumeContent,
  he: heResumeContent as ResumeContent
};

export function getResumeContent(locale: Locale): ResumeContent {
  return resumeContentByLocale[locale];
}
