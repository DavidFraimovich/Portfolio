import type { Locale } from "@/lib/i18n";

export const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "";

export type ContactFormSource = "footer_contact";

export type ContactFormPayload = {
  locale: Locale;
  message: string;
  pagePath: string;
  pageTitle?: string;
  referrer?: string;
  source: ContactFormSource;
  submittedAt: string;
  userAgent?: string;
};

type ContactFormResponse = {
  error?: string;
  ok?: boolean;
};

function normalizeMessage(message: string): string {
  const normalized = message.trim();

  if (!normalized) {
    throw new Error("Contact message is required.");
  }

  return normalized;
}

export function isContactFormEnabled(): boolean {
  return Boolean(contactFormEndpoint);
}

export async function submitContactForm(
  payload: ContactFormPayload,
  fetchImpl: typeof fetch = fetch
): Promise<void> {
  if (!contactFormEndpoint) {
    throw new Error("Contact form endpoint is not configured.");
  }

  const response = await fetchImpl(contactFormEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...payload,
      message: normalizeMessage(payload.message)
    }),
    mode: "cors"
  });

  const data = (await response.json().catch(() => null)) as ContactFormResponse | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || `Contact form submission failed with status ${response.status}.`);
  }
}
