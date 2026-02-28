import type { SiteContent } from "@/lib/siteContent";

type Props = {
  site: SiteContent;
};

export function Footer({ site }: Props) {
  return (
    <footer className="footer">
      <p>{site.footer_note}</p>
    </footer>
  );
}
