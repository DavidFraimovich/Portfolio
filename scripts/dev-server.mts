import http from "node:http";
import net from "node:net";
import next from "next";
import {
  getValidHtmlRoutePaths,
  isPageRequestPath,
  normalizeExportRoutePath,
  stripConfiguredBasePath
} from "../lib/exportRoutes.ts";

const DEFAULT_PORT = Number.parseInt(process.env.PORT || "", 10) || 3000;
const LISTEN_HOST = process.env.HOSTNAME?.trim() || "0.0.0.0";
const NEXT_HOSTNAME = LISTEN_HOST === "0.0.0.0" ? "localhost" : LISTEN_HOST;
const DEV_NOT_FOUND_SLUG = "__dev-route-not-found__";

function resolveFallbackLocale(pathname: string): "en" | "he" {
  const segments = stripConfiguredBasePath(pathname).split("/").filter(Boolean);
  const candidate = segments[0];

  if (candidate === "he" || candidate === "en") {
    return candidate;
  }

  return "en";
}

function buildNotFoundRewritePath(pathname: string): string {
  return `/${resolveFallbackLocale(pathname)}/${DEV_NOT_FOUND_SLUG}/`;
}

function isPortAvailable(port: number, host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        tester.close(() => resolve(true));
      });

    tester.listen(port, host);
  });
}

async function findAvailablePort(startPort: number, host: string): Promise<number> {
  let currentPort = startPort;

  while (!(await isPortAvailable(currentPort, host))) {
    currentPort += 1;
  }

  return currentPort;
}

function shouldRewriteToNotFound(request: http.IncomingMessage, pathname: string): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (!isPageRequestPath(pathname)) return false;

  const normalizedPathname = stripConfiguredBasePath(pathname);
  const validRoutePaths = getValidHtmlRoutePaths();

  return !validRoutePaths.has(normalizeExportRoutePath(normalizedPathname));
}

async function main() {
  const port = await findAvailablePort(DEFAULT_PORT, LISTEN_HOST);

  if (port !== DEFAULT_PORT) {
    console.warn(` ⚠ Port ${DEFAULT_PORT} is in use, using available port ${port} instead.`);
  }

  const app = next({
    dev: true,
    hostname: NEXT_HOSTNAME,
    port
  });
  const handle = app.getRequestHandler();

  await app.prepare();
  type HandlerUrl = Parameters<typeof handle>[2];

  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || `${NEXT_HOSTNAME}:${port}`}`);
    const pathname = requestUrl.pathname;

    if (shouldRewriteToNotFound(request, pathname)) {
      requestUrl.pathname = buildNotFoundRewritePath(pathname);
    }

    const parsedUrl = {
      pathname: requestUrl.pathname,
      query: Object.fromEntries(requestUrl.searchParams.entries())
    } as unknown as HandlerUrl;

    void handle(request, response, parsedUrl).catch((error: unknown) => {
      console.error("Failed to handle dev request.", error);

      if (response.headersSent) {
        response.end();
        return;
      }

      response.statusCode = 500;
      response.end("Internal Server Error");
    });
  });

  server.listen(port, LISTEN_HOST, () => {
    console.log(`   ▲ Guarded Next.js dev server`);
    console.log(`   - Local:        http://localhost:${port}`);
    console.log(`   - Network:      http://${LISTEN_HOST}:${port}`);
    console.log(`   - Environments: .env.local`);
    console.log("");
    console.log(" ✓ Starting...");
    console.log(" ✓ Ready");
  });

  process.on("SIGINT", () => {
    server.close(() => process.exit(0));
  });

  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
}

void main().catch((error: unknown) => {
  console.error("Failed to start guarded Next.js dev server.", error);
  process.exit(1);
});
