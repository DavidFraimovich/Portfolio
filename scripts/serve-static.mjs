import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, normalize, sep, extname, join } from "node:path";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const rootDir = resolve(process.cwd(), "out");

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

function safePathname(urlString = "/") {
  const url = new URL(urlString, "http://localhost");
  const decodedPath = decodeURIComponent(url.pathname);
  return normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, "");
}

function resolveCandidates(pathname) {
  if (pathname === "/") {
    return [join(rootDir, "index.html")];
  }

  const trimmed = pathname.replace(/^\/+/, "");
  const absolute = resolve(rootDir, trimmed);
  const candidates = [absolute];

  if (extname(trimmed) === "") {
    candidates.push(resolve(rootDir, trimmed, "index.html"));
    candidates.push(resolve(rootDir, `${trimmed}.html`));
  }

  return candidates;
}

function isInsideRoot(targetPath) {
  return targetPath === rootDir || targetPath.startsWith(`${rootDir}${sep}`);
}

function isFile(targetPath) {
  if (!existsSync(targetPath)) return false;

  try {
    return statSync(targetPath).isFile();
  } catch {
    return false;
  }
}

function getContentType(filePath) {
  return CONTENT_TYPES[extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

function sendFile(response, filePath, statusCode = 200) {
  response.writeHead(statusCode, {
    "Content-Type": getContentType(filePath),
    "Cache-Control": statusCode === 200 ? "no-cache" : "no-store"
  });

  createReadStream(filePath).pipe(response);
}

function sendNotFound(response) {
  const notFoundPath = resolve(rootDir, "404.html");

  if (existsSync(notFoundPath)) {
    sendFile(response, notFoundPath, 404);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}

if (!existsSync(rootDir) || !statSync(rootDir).isDirectory()) {
  console.error("Static export not found. Run `npm run build` first.");
  process.exit(1);
}

const server = createServer((request, response) => {
  if (!request.url) {
    sendNotFound(response);
    return;
  }

  const pathname = safePathname(request.url);
  const candidates = resolveCandidates(pathname);

  const filePath = candidates.find((candidate) => isInsideRoot(candidate) && isFile(candidate));

  if (!filePath) {
    sendNotFound(response);
    return;
  }

  if (request.method === "HEAD") {
    response.writeHead(200, {
      "Content-Type": getContentType(filePath),
      "Cache-Control": "no-cache"
    });
    response.end();
    return;
  }

  sendFile(response, filePath);
});

server.listen(port, () => {
  console.log(`Serving static export from ${rootDir} at http://localhost:${port}`);
});
