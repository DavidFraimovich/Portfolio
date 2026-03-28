import type { MetadataRoute } from "next";
import { getSitemapRouteEntries } from "@/lib/exportRoutes";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapRouteEntries().map((entry) => ({
    url: `${siteUrl}${entry.path === "/" ? "" : entry.path}`,
    lastModified: entry.lastModified
  }));
}
