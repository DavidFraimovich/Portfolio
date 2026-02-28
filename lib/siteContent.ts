import fs from "node:fs";
import path from "node:path";

export type SiteContent = {
  headline: string;
  subheadline: string;
  primary_cta_text: string;
  linkedin_url: string;
  email: string;
};

const defaults: SiteContent = {
  headline: "Product designer and engineer turning complex systems into clear experiences.",
  subheadline:
    "I build business-grade digital products with measurable outcomes, from discovery to launch.",
  primary_cta_text: "View Case Studies",
  linkedin_url: "https://linkedin.com/in/yourname",
  email: "hello@example.com"
};

export function getSiteContent(): SiteContent {
  const filePath = path.join(process.cwd(), "content", "site.json");
  if (!fs.existsSync(filePath)) return defaults;

  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as SiteContent;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}
