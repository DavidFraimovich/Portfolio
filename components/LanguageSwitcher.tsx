"use client";

import { usePathname } from "next/navigation";
import { TrackedLink } from "@/components/TrackedLink";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { saveLocalePreference } from "@/lib/localePreference";

type Props = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="lang-switch" aria-label="Language selector">
      <TrackedLink
        href={switchLocalePath(pathname, "en")}
        className={locale === "en" ? "active" : ""}
        onClick={() => saveLocalePreference("en")}
        tracking={{
          eventName: "navigation_click",
          kind: "internal",
          label: "EN",
          locale,
          location: "language_switcher",
          section: "header"
        }}
      >
        EN
      </TrackedLink>
      <TrackedLink
        href={switchLocalePath(pathname, "he")}
        className={locale === "he" ? "active" : ""}
        onClick={() => saveLocalePreference("he")}
        tracking={{
          eventName: "navigation_click",
          kind: "internal",
          label: "HE",
          locale,
          location: "language_switcher",
          section: "header"
        }}
      >
        HE
      </TrackedLink>
    </div>
  );
}
