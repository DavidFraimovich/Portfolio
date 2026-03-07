import { withBasePath } from "@/lib/site";
import type { SiteContent } from "@/lib/siteContent";

type Props = {
  site: SiteContent;
};

export function Footer({ site }: Props) {
  const cvHeLink = withBasePath("/cv/David-Fraimovich-CV-HE.pdf");
  const cvEnLink = withBasePath("/cv/David-Fraimovich-CV-EN.pdf");

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
        <a className="cta cta-secondary" href={cvHeLink} target="_blank" rel="noreferrer">
          Download CV (HE)
        </a>
        <a className="cta cta-secondary" href={cvEnLink} target="_blank" rel="noreferrer">
          Download CV (EN)
        </a>
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
