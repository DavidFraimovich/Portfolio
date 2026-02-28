import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/contact", "/resume", "/case-studies"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));

  const caseStudies = getAllCaseStudies().map((item) => ({
    url: `${siteUrl}/case-studies/${item.slug}`,
    lastModified: new Date(item.frontmatter.date)
  }));

  return [...staticRoutes, ...caseStudies];
}
