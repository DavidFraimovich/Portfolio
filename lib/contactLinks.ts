import type { Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";

const FALLBACK_EMAIL = "davidfr97@gmail.com";
const FALLBACK_LINKEDIN_URL = "https://www.linkedin.com/in/david-fraimovich-843207172";
const PHONE_E164 = "+972542114929";
const PHONE_DISPLAY = "+972 54-211-4929";
const WHATSAPP_NUMBER = "972542114929";

export const contactLinks = {
  github: "https://github.com/DavidFraimovich",
  phone: `tel:${PHONE_E164}`,
  phoneDisplay: PHONE_DISPLAY,
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`
} as const;

export const portraitImages = {
  footer: withBasePath("/images/header/David-Fraimovich-header.png")
} as const;

export const resumeLinks = {
  en: withBasePath("/cv/David-Fraimovich-CV-EN.pdf"),
  he: withBasePath("/cv/David-Fraimovich-CV-HE.pdf")
} as const;

export function getResumeLink(locale: Locale): string {
  return locale === "he" ? resumeLinks.he : resumeLinks.en;
}

export function getContactEmail(candidate?: string): string {
  const value = (candidate || "").trim();

  if (!value || /example\.com/i.test(value)) return FALLBACK_EMAIL;
  return value.replace(/@gamil\.com$/i, "@gmail.com");
}

export function getLinkedInUrl(candidate?: string): string {
  const value = (candidate || "").trim();

  if (!value || /yourname/i.test(value)) return FALLBACK_LINKEDIN_URL;
  if (/^https?:\/\//i.test(value)) return value;

  return `https://${value.replace(/^\/+/, "")}`;
}

export function getMailtoHref(candidate?: string): string {
  return `mailto:${getContactEmail(candidate)}`;
}
