import http from "node:http";

const CONTACT_PATH = "/contact";
const DEFAULT_PORT = 8787;
const MAX_BODY_SIZE_BYTES = 32_768;
const TELEGRAM_API_BASE_URL = "https://api.telegram.org";

function readRequiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getAllowedOrigins() {
  const configured = (process.env.CONTACT_RELAY_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (configured.length > 0) {
    return new Set(configured);
  }

  const defaults = ["http://localhost:3000", "http://127.0.0.1:3000"];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (siteUrl) {
    try {
      defaults.push(new URL(siteUrl).origin);
    } catch {}
  }

  defaults.push("https://davidfraimovich.github.io");

  return new Set(defaults);
}

function isAllowedOrigin(origin, allowedOrigins) {
  if (!origin) return false;
  if (allowedOrigins.has(origin)) return true;

  try {
    const url = new URL(origin);
    const isLocalHost = url.hostname === "localhost" || url.hostname === "127.0.0.1";

    return isLocalHost;
  } catch {
    return false;
  }
}

function setCorsHeaders(response, origin, allowedOrigins) {
  if (isAllowedOrigin(origin, allowedOrigins)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }

  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
}

function sendJson(response, statusCode, body, origin, allowedOrigins) {
  setCorsHeaders(response, origin, allowedOrigins);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  let body = "";

  for await (const chunk of request) {
    body += chunk;

    if (body.length > MAX_BODY_SIZE_BYTES) {
      throw new Error("Payload too large.");
    }
  }

  if (!body) {
    throw new Error("Request body is required.");
  }

  return JSON.parse(body);
}

function normalizeMessage(value) {
  const message = typeof value === "string" ? value.trim() : "";

  if (!message) {
    throw new Error("Message is required.");
  }

  return message;
}

function normalizeLocale(value) {
  if (value === "en" || value === "he") return value;
  return "en";
}

function normalizeSource(value) {
  return value === "footer_contact" ? value : "footer_contact";
}

function normalizeTextField(value, fallback = "n/a") {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || fallback;
}

function formatTelegramMessage(payload) {
  return [
    "New portfolio message",
    `Source: ${payload.source}`,
    `Locale: ${payload.locale}`,
    `Page: ${payload.pagePath}`,
    `Title: ${payload.pageTitle}`,
    `Referrer: ${payload.referrer}`,
    `Submitted at: ${payload.submittedAt}`,
    `User agent: ${payload.userAgent}`,
    "",
    "Message:",
    payload.message
  ].join("\n");
}

async function sendTelegramMessage(text) {
  const token = readRequiredEnv("TELEGRAM_DEPLOY_GROUP_TOKEN");
  let chatId = readRequiredEnv("TELEGRAM_DEPLOY_GROUP_ID");

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(`${TELEGRAM_API_BASE_URL}/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 4096),
        disable_notification: false
      })
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data?.ok) {
      return;
    }

    const migratedChatId = data?.parameters?.migrate_to_chat_id;
    if (migratedChatId && String(migratedChatId) !== chatId) {
      chatId = String(migratedChatId);
      continue;
    }

    throw new Error(data?.description || `Telegram sendMessage failed with status ${response.status}.`);
  }

  throw new Error("Telegram sendMessage failed after chat migration retry.");
}

const port = Number.parseInt(process.env.CONTACT_RELAY_PORT || "", 10) || DEFAULT_PORT;
const allowedOrigins = getAllowedOrigins();

const server = http.createServer(async (request, response) => {
  const origin = typeof request.headers.origin === "string" ? request.headers.origin : "";
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (request.method === "OPTIONS") {
    setCorsHeaders(response, origin, allowedOrigins);
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && requestUrl.pathname === "/health") {
    sendJson(response, 200, { ok: true }, origin, allowedOrigins);
    return;
  }

  if (request.method !== "POST" || requestUrl.pathname !== CONTACT_PATH) {
    sendJson(response, 404, { error: "Not found.", ok: false }, origin, allowedOrigins);
    return;
  }

  if (origin && !isAllowedOrigin(origin, allowedOrigins)) {
    sendJson(response, 403, { error: "Origin not allowed.", ok: false }, origin, allowedOrigins);
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const contactPayload = {
      locale: normalizeLocale(payload.locale),
      message: normalizeMessage(payload.message),
      pagePath: normalizeTextField(payload.pagePath),
      pageTitle: normalizeTextField(payload.pageTitle),
      referrer: normalizeTextField(payload.referrer),
      source: normalizeSource(payload.source),
      submittedAt: normalizeTextField(payload.submittedAt, new Date().toISOString()),
      userAgent: normalizeTextField(payload.userAgent)
    };

    await sendTelegramMessage(formatTelegramMessage(contactPayload));
    sendJson(response, 200, { ok: true }, origin, allowedOrigins);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected relay error.";
    sendJson(response, 400, { error: message, ok: false }, origin, allowedOrigins);
  }
});

server.listen(port, () => {
  console.log(`Contact relay listening on http://127.0.0.1:${port}${CONTACT_PATH}`);
});
