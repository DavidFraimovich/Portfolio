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
  openGraph: {
    title: siteDefaults.title,
    description: siteDefaults.description,
    type: "website",
    url: siteUrl
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
