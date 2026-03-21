import type { Locale } from "@/lib/i18n";

export const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "";
const LOCAL_RELAY_ENDPOINT = "http://127.0.0.1:8787/contact";
const SAME_ORIGIN_CONTACT_PATH = "/api/contact";

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

export function resolveContactFormEndpoint(): string {
  if (contactFormEndpoint) {
    return contactFormEndpoint;
  }

  if (typeof window === "undefined") {
    return "";
  }

  const { hostname, origin } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  if (isLocalHost) {
    return LOCAL_RELAY_ENDPOINT;
  }

  // Non-static Next deployments can serve a same-origin route handler here.
  if (!hostname.endsWith("github.io")) {
    return `${origin}${SAME_ORIGIN_CONTACT_PATH}`;
  }

  return "";
}

export function isContactFormEnabled(): boolean {
  return Boolean(resolveContactFormEndpoint());
}

export async function submitContactForm(
  payload: ContactFormPayload,
  fetchImpl: typeof fetch = fetch
): Promise<void> {
  const endpoint = resolveContactFormEndpoint();

  if (!endpoint) {
    throw new Error(
      "Contact form endpoint is not configured. This site is deployed on GitHub Pages as a static export, so the form needs an external relay URL."
    );
  }

  const response = await fetchImpl(endpoint, {
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
