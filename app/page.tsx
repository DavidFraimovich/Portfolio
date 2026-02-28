import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Choose Language",
  description: "Select your language to view the portfolio in English or Hebrew.",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: "Choose Language",
    description: "Select your language to view the portfolio in English or Hebrew.",
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose Language",
    description: "Select your language to view the portfolio in English or Hebrew."
  }
};

export default function LocaleEntryPage() {
  return (
    <main className="locale-chooser-wrap">
      <section className="locale-chooser card">
        <h1>Select Language | בחר שפה</h1>
        <p>Choose your preferred language to enter the portfolio.</p>
        <div className="locale-buttons">
          <Link className="cta" href="/en">
            English
          </Link>
          <Link className="cta cta-secondary" href="/he">
            עברית
          </Link>
        </div>
      </section>
    </main>
  );
}
