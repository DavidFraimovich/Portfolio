import type { Metadata } from "next";
import { LocaleEntryRedirect } from "@/components/LocaleEntryRedirect";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Redirecting to your localized portfolio experience.",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Portfolio",
    description: "Redirecting to your localized portfolio experience.",
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description: "Redirecting to your localized portfolio experience."
  }
};

export default function LocaleEntryPage() {
  return <LocaleEntryRedirect />;
}
