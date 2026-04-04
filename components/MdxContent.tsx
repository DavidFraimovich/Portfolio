import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CaseStudyZoomableImage } from "@/components/CaseStudyImageGallery";
import styles from "@/components/MdxContent.module.css";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  source: string;
};

export function MdxContent({ locale, source }: Props) {
  const fallbackLabel = locale === "he" ? "תמונת תוכן" : "Content image";

  return (
    <article className="content">
      <MDXRemote
        source={source}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        components={{
          img: ({ alt, height, loading, src, width }) => {
            if (typeof src !== "string") return null;

            const normalizedAlt = typeof alt === "string" ? alt : "";
            const normalizedWidth = Number(width);
            const normalizedHeight = Number(height);
            const orientation =
              Number.isFinite(normalizedWidth) && Number.isFinite(normalizedHeight) && normalizedHeight > normalizedWidth
                ? "portrait"
                : "landscape";
            const ariaLabel = normalizedAlt || fallbackLabel;

            return (
              <CaseStudyZoomableImage
                ariaLabel={ariaLabel}
                classNames={{
                  button: styles.imageButton,
                  image: styles.image,
                  root: styles.imageBlock
                }}
                dialogLabel={ariaLabel}
                image={{
                  alt: normalizedAlt,
                  loading: loading === "eager" ? "eager" : "lazy",
                  orientation,
                  src
                }}
                locale={locale}
              />
            );
          }
        }}
      />
    </article>
  );
}
