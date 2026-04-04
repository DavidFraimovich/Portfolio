import type { Locale } from "@/lib/i18n";

export type CaseStudyGalleryImage = {
  src: string;
  alt: string;
  orientation?: "landscape" | "portrait";
  loading?: "eager" | "lazy";
};

export type CaseStudyImageGalleryCopy = {
  close: string;
  dialogLabel?: string;
  next: string;
  open: string;
  previous: string;
  zoomIn: string;
  zoomOut: string;
};

const CASE_STUDY_IMAGE_GALLERY_COPY: Record<Locale, CaseStudyImageGalleryCopy> = {
  en: {
    close: "Close gallery",
    next: "Next image",
    open: "Open image",
    previous: "Previous image",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out"
  },
  he: {
    close: "סגור גלריה",
    next: "לתמונה הבאה",
    open: "פתח תמונה",
    previous: "לתמונה הקודמת",
    zoomIn: "הגדל",
    zoomOut: "הקטן"
  }
};

export function getCaseStudyImageGalleryCopy(locale: Locale): CaseStudyImageGalleryCopy {
  return CASE_STUDY_IMAGE_GALLERY_COPY[locale];
}
