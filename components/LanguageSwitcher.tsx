"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { saveLocalePreference } from "@/lib/localePreference";

type Props = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="lang-switch" aria-label="Language selector">
      <Link
        href={switchLocalePath(pathname, "en")}
        className={locale === "en" ? "active" : ""}
        onClick={() => saveLocalePreference("en")}
      >
        EN
      </Link>
      <Link
        href={switchLocalePath(pathname, "he")}
        className={locale === "he" ? "active" : ""}
        onClick={() => saveLocalePreference("he")}
      >
        HE
      </Link>
    </div>
  );
}
