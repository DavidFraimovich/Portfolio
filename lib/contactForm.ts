import type { Locale } from "@/lib/i18n";

export const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "";
export const publicTelegramDeployGroupToken = process.env.NEXT_PUBLIC_TELEGRAM_DEPLOY_GROUP_TOKEN?.trim() || "";
export const publicTelegramDeployGroupId = process.env.NEXT_PUBLIC_TELEGRAM_DEPLOY_GROUP_ID?.trim() || "";
const LOCAL_RELAY_ENDPOINT = "http://127.0.0.1:8787/contact";
const SAME_ORIGIN_CONTACT_PATH = "/api/contact";
const TELEGRAM_API_BASE_URL = "https://api.telegram.org";
const TELEGRAM_MAX_MESSAGE_LENGTH = 4096;

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

type TelegramApiResponse = {
  description?: string;
  ok?: boolean;
  parameters?: {
    migrate_to_chat_id?: number;
  };
};

type ContactFormTransport =
  | {
      chatId: string;
      token: string;
      type: "telegram_direct";
    }
  | {
      endpoint: string;
      type: "relay";
    }
  | {
      type: "none";
    };

function normalizeMessage(message: string): string {
  const normalized = message.trim();

  if (!normalized) {
    throw new Error("Contact message is required.");
  }

  return normalized;
}

function normalizeTelegramMessage(text: string): string {
  return text.length > TELEGRAM_MAX_MESSAGE_LENGTH ? text.slice(0, TELEGRAM_MAX_MESSAGE_LENGTH) : text;
}

function normalizeTextField(value: string | undefined, fallback = "n/a"): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || fallback;
}

function formatTelegramMessage(payload: ContactFormPayload): string {
  return [
    "New portfolio message",
    `Source: ${payload.source}`,
    `Locale: ${payload.locale}`,
    `Page: ${normalizeTextField(payload.pagePath)}`,
    `Title: ${normalizeTextField(payload.pageTitle)}`,
    `Referrer: ${normalizeTextField(payload.referrer)}`,
    `Submitted at: ${normalizeTextField(payload.submittedAt, new Date().toISOString())}`,
    `User agent: ${normalizeTextField(payload.userAgent)}`,
    "",
    "Message:",
    payload.message
  ].join("\n");
}

function resolveContactFormTransport(): ContactFormTransport {
  if (publicTelegramDeployGroupToken && publicTelegramDeployGroupId) {
    return {
      chatId: publicTelegramDeployGroupId,
      token: publicTelegramDeployGroupToken,
      type: "telegram_direct"
    };
  }

  if (contactFormEndpoint) {
    return {
      endpoint: contactFormEndpoint,
      type: "relay"
    };
  }

  if (typeof window === "undefined") {
    return { type: "none" };
  }

  const { hostname, origin } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  if (isLocalHost) {
    return {
      endpoint: LOCAL_RELAY_ENDPOINT,
      type: "relay"
    };
  }

  if (!hostname.endsWith("github.io")) {
    return {
      endpoint: `${origin}${SAME_ORIGIN_CONTACT_PATH}`,
      type: "relay"
    };
  }

  return { type: "none" };
}

async function submitViaRelay(endpoint: string, payload: ContactFormPayload, fetchImpl: typeof fetch): Promise<void> {
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

async function submitDirectToTelegram(
  token: string,
  chatId: string,
  payload: ContactFormPayload,
  fetchImpl: typeof fetch
): Promise<void> {
  let activeChatId = chatId;
  const text = normalizeTelegramMessage(
    formatTelegramMessage({
      ...payload,
      message: normalizeMessage(payload.message)
    })
  );

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetchImpl(`${TELEGRAM_API_BASE_URL}/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: activeChatId,
        disable_notification: false,
        text
      }),
      mode: "cors"
    });

    const data = (await response.json().catch(() => null)) as TelegramApiResponse | null;

    if (response.ok && data?.ok) {
      return;
    }

    const migratedChatId = data?.parameters?.migrate_to_chat_id;
    if (migratedChatId && String(migratedChatId) !== activeChatId) {
      activeChatId = String(migratedChatId);
      continue;
    }

    throw new Error(data?.description || `Telegram sendMessage failed with status ${response.status}.`);
  }

  throw new Error("Telegram sendMessage failed after chat migration retry.");
}

export function isContactFormEnabled(): boolean {
  return resolveContactFormTransport().type !== "none";
}

export async function submitContactForm(
  payload: ContactFormPayload,
  fetchImpl: typeof fetch = fetch
): Promise<void> {
  const transport = resolveContactFormTransport();

  if (transport.type === "telegram_direct") {
    await submitDirectToTelegram(transport.token, transport.chatId, payload, fetchImpl);
    return;
  }

  if (transport.type === "relay") {
    await submitViaRelay(transport.endpoint, payload, fetchImpl);
    return;
  }

  throw new Error(
    "Contact form is not configured. Set NEXT_PUBLIC_TELEGRAM_DEPLOY_GROUP_TOKEN and NEXT_PUBLIC_TELEGRAM_DEPLOY_GROUP_ID for direct Telegram sending, or NEXT_PUBLIC_CONTACT_FORM_ENDPOINT for relay mode."
  );
}
