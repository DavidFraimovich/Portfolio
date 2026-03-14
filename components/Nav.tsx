import Link from "next/link";
import type { ReactElement } from "react";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { withBasePath } from "@/lib/site";
import type { SiteContent } from "@/lib/siteContent";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNavDrawer, type NavItem } from "@/components/MobileNavDrawer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

type Props = {
  locale: Locale;
  site: SiteContent;
};

const HEADER_PROFILE_IMAGE = withBasePath("/images/header/David-Fraimovich-header.png");

export function Nav({ locale, site }: Props): ReactElement {
  const navItems: NavItem[] = [
    { href: withLocalePath(locale), label: site.nav_home },
    { href: withLocalePath(locale, "/case-studies"), label: site.nav_case_studies },
    { href: withLocalePath(locale, "/resume"), label: site.nav_resume },
    { href: withLocalePath(locale, "/about"), label: site.nav_about },
    { href: withLocalePath(locale, "/contact"), label: site.nav_contact }
  ];

  return (
    <header className="site-shell">
      <nav className="nav" aria-label="Main navigation">
        <Link href={withLocalePath(locale)} className="brand">
          <span className="brand-avatar" aria-hidden="true">
            <img
              src={HEADER_PROFILE_IMAGE}
              alt=""
              width="44"
              height="44"
              className="brand-avatar-image"
            />
          </span>
          <span className="brand-copy">
            <span className="brand-name">{site.brand_name}</span>
          </span>
        </Link>
        <div className="nav-actions">
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="toolbar-controls">
            <LanguageSwitcher locale={locale} />
            <ThemeSwitcher />
          </div>
        </div>
        <MobileNavDrawer locale={locale} navItems={navItems} />
      </nav>
    </header>
  );
}
