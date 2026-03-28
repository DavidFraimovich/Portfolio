import { spawn } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function runScript(name) {
  return spawn(npmCommand, ["run", name], {
    stdio: "inherit",
    env: process.env
  });
}

const processes = [runScript("relay:contact"), runScript("dev:guard")];
let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of processes) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(exitCode), 150);
}

for (const child of processes) {
  child.on("exit", (code, signal) => {
    if (shuttingDown) return;

    const nextExitCode = code ?? (signal ? 1 : 0);
    shutdown(nextExitCode);
  });
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
