import { NotFoundPage, type NotFoundCopy } from "@/components/NotFoundPage";
import { getSiteContent } from "@/lib/siteContent";

const notFoundCopy: Record<"en" | "he", NotFoundCopy> = {
  en: {
    title: getSiteContent("en").not_found_title,
    description: getSiteContent("en").not_found_description,
    homeCta: getSiteContent("en").not_found_home_cta,
    caseStudiesCta: getSiteContent("en").not_found_case_studies_cta
  },
  he: {
    title: getSiteContent("he").not_found_title,
    description: getSiteContent("he").not_found_description,
    homeCta: getSiteContent("he").not_found_home_cta,
    caseStudiesCta: getSiteContent("he").not_found_case_studies_cta
  }
};

export default function NotFound() {
  return <NotFoundPage copyByLocale={notFoundCopy} />;
}
