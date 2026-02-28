import Link from "next/link";
import type { SiteContent } from "@/lib/siteContent";

type Props = {
  site: SiteContent;
};

export function Footer({ site }: Props) {
  return (
    <footer className="footer">
      <p>{site.footer_note}</p>
      <div className="cta-row">
        <a className="cta cta-secondary" href="https://wa.me/972542114929" target="_blank" rel="noreferrer">
          Contact (WhatsApp)
        </a>
        <a className="cta cta-secondary" href="mailto:davidfr97@gmail.com">
          Mail me
        </a>
        <Link className="cta cta-secondary" href="/cv/David-Fraimovich-CV-HE.pdf" target="_blank">
          Download CV (HE)
        </Link>
        <Link className="cta cta-secondary" href="/cv/David-Fraimovich-CV-EN.pdf" target="_blank">
          Download CV (EN)
        </Link>
        <a
          className="cta cta-secondary"
          href="https://www.linkedin.com/in/david-fraimovich-843207172"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
