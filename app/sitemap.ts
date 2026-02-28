import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/content";
import { locales, withLocalePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootRoute: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date()
    }
  ];

  const staticPerLocale = ["", "/about", "/contact", "/resume", "/case-studies"];

  const staticRoutes = locales.flatMap((locale) =>
    staticPerLocale.map((route) => ({
      url: `${siteUrl}${withLocalePath(locale, route)}`,
      lastModified: new Date()
    }))
  );

  const caseStudies = locales.flatMap((locale) =>
    getAllCaseStudies(locale).map((item) => ({
      url: `${siteUrl}${withLocalePath(locale, `/case-studies/${item.slug}`)}`,
      lastModified: new Date(item.frontmatter.date)
    }))
  );

  return [...rootRoute, ...staticRoutes, ...caseStudies];
}
