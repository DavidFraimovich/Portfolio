import "server-only";

const TELEGRAM_API_BASE_URL = "https://api.telegram.org";
const TELEGRAM_MAX_MESSAGE_LENGTH = 4096;

type TelegramEnvName = "TELEGRAM_DEPLOY_GROUP_ID" | "TELEGRAM_DEPLOY_GROUP_TOKEN";

type TelegramDeployGroupConfig = {
  chatId: string;
  token: string;
};

type TelegramParseMode = "HTML" | "Markdown" | "MarkdownV2";

type SendTelegramDeployGroupMessageOptions = {
  disableNotification?: boolean;
  fetchImpl?: typeof fetch;
  parseMode?: TelegramParseMode;
  text: string;
};

type TelegramSendMessagePayload = {
  chat_id: string;
  disable_notification?: boolean;
  parse_mode?: TelegramParseMode;
  text: string;
};

type TelegramApiResponse = {
  description?: string;
  error_code?: number;
  ok: boolean;
  parameters?: {
    migrate_to_chat_id?: number;
  };
};

async function postTelegramMessage(
  fetchImpl: typeof fetch,
  token: string,
  payload: TelegramSendMessagePayload
): Promise<{ data: TelegramApiResponse | null; response: Response }> {
  const response = await fetchImpl(`${TELEGRAM_API_BASE_URL}/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  const data = (await response.json().catch(() => null)) as TelegramApiResponse | null;

  return { data, response };
}

function readRequiredTelegramEnv(name: TelegramEnvName): string | null {
  const value = process.env[name]?.trim();

  return value ? value : null;
}

function normalizeTelegramMessage(text: string): string {
  const normalized = text.trim();

  if (!normalized) {
    throw new Error("Telegram message text is required.");
  }

  return normalized.length > TELEGRAM_MAX_MESSAGE_LENGTH
    ? normalized.slice(0, TELEGRAM_MAX_MESSAGE_LENGTH)
    : normalized;
}

export function getTelegramDeployGroupConfig(): TelegramDeployGroupConfig | null {
  const token = readRequiredTelegramEnv("TELEGRAM_DEPLOY_GROUP_TOKEN");
  const chatId = readRequiredTelegramEnv("TELEGRAM_DEPLOY_GROUP_ID");

  if (!token || !chatId) {
    return null;
  }

  return { chatId, token };
}

export async function sendTelegramDeployGroupMessage({
  disableNotification,
  fetchImpl = fetch,
  parseMode,
  text
}: SendTelegramDeployGroupMessageOptions): Promise<void> {
  const config = getTelegramDeployGroupConfig();

  if (!config) {
    throw new Error(
      "Missing Telegram deploy group configuration. Expected TELEGRAM_DEPLOY_GROUP_TOKEN and TELEGRAM_DEPLOY_GROUP_ID."
    );
  }

  const payload: TelegramSendMessagePayload = {
    chat_id: config.chatId,
    text: normalizeTelegramMessage(text)
  };

  if (typeof disableNotification === "boolean") {
    payload.disable_notification = disableNotification;
  }

  if (parseMode) {
    payload.parse_mode = parseMode;
  }

  let activeChatId = payload.chat_id;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    payload.chat_id = activeChatId;

    const { data, response } = await postTelegramMessage(fetchImpl, config.token, payload);

    if (response.ok && data?.ok) {
      return;
    }

    const migratedChatId = data?.parameters?.migrate_to_chat_id;
    if (migratedChatId && String(migratedChatId) !== activeChatId) {
      activeChatId = String(migratedChatId);
      continue;
    }

    const details = data?.description || `HTTP ${response.status}`;
    throw new Error(`Telegram sendMessage failed: ${details}`);
  }

  throw new Error("Telegram sendMessage failed after chat migration retry.");
}
