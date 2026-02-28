import type { Metadata } from "next";
import "./globals.css";
import { siteDefaults, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteDefaults.title,
    template: `%s | ${siteDefaults.title}`
  },
  description: siteDefaults.description,
  alternates: {
    canonical: siteUrl
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: siteDefaults.title,
    description: siteDefaults.description,
    type: "website",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: siteDefaults.title,
    description: siteDefaults.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
