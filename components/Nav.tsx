import type { ReactElement } from "react";
import { TrackedLink } from "@/components/TrackedLink";
import type { Locale } from "@/lib/i18n";
import { withLocalePath } from "@/lib/i18n";
import { withVersionedAssetPath } from "@/lib/site";
import type { SiteContent } from "@/lib/siteContent";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNavDrawer, type NavItem } from "@/components/MobileNavDrawer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

type Props = {
  locale: Locale;
  site: SiteContent;
};

const HEADER_PROFILE_IMAGE = withVersionedAssetPath("/images/header/David-Fraimovich-header.png");

export function Nav({ locale, site }: Props): ReactElement {
  const navItems: NavItem[] = [
    { href: withLocalePath(locale), label: site.nav_home },
    { href: withLocalePath(locale, "/case-studies"), label: site.nav_case_studies },
    { href: withLocalePath(locale, "/resume"), label: site.nav_resume }
  ];

  return (
    <header className="site-shell">
      <nav className="nav" aria-label="Main navigation">
        <TrackedLink
          href={withLocalePath(locale)}
          className="brand"
          tracking={{
            eventName: "navigation_click",
            kind: "internal",
            label: site.brand_name,
            locale,
            location: "header_brand",
            section: "header"
          }}
        >
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
        </TrackedLink>
        <div className="nav-actions">
          <div className="nav-links">
            {navItems.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                tracking={{
                  eventName: "navigation_click",
                  kind: "internal",
                  label: item.label,
                  locale,
                  location: "header_nav",
                  section: "header"
                }}
              >
                {item.label}
              </TrackedLink>
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
