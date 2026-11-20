import { spawn } from "node:child_process";
import { openSync } from "node:fs";
import { readdir, readFile, writeFile, unlink, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ROOT = process.cwd();
const PORT = 3100;
const NETWORK = process.argv.includes("--network");
const HOST = NETWORK ? "0.0.0.0" : "127.0.0.1";
const CODESPACE = process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
const URL = `http://127.0.0.1:${PORT}/preview`;
const LOG_FILE = path.join(ROOT, ".bargaz-host.log");
const SCREEN_DIRS = [
  path.join(ROOT, "screens", "bargaz"),
  path.join(ROOT, "screens", "randomwolf08"),
  path.join(ROOT, "screens", "both"),
];
const PREVIEW_PAGE = path.join(ROOT, "app", "preview", "page.js");
const STATE_FILE = path.join(ROOT, ".bargaz-host.json");

const [command, rawName] = process.argv.slice(2).filter((a) => !a.startsWith("--"));

function fail(message) {
  console.error(`bargaz: ${message}`);
  process.exit(1);
}

async function findScreens(name) {
  if (!name) fail("give a screen name. Example: bargaz host HomeScreen");
  const wanted = name.replace(/\.js$/i, "").toLowerCase();
  const matches = [];
  for (const dir of SCREEN_DIRS) {
    let entries;
    try { entries = await readdir(dir); } catch { continue; }
    for (const entry of entries) {
      if (!entry.endsWith(".js")) continue;
      if (entry.replace(/\.js$/i, "").toLowerCase() === wanted) {
        matches.push(path.relative(ROOT, path.join(dir, entry)).split(path.sep).join("/"));
      }
    }
  }
  if (matches.length === 0) {
    const names = [];
    for (const dir of SCREEN_DIRS) {
      try {
        for (const e of await readdir(dir)) if (e.endsWith(".js")) names.push(e.replace(/\.js$/i, ""));
      } catch {}
    }
    fail(`no screen named "${name}". Available: ${[...new Set(names)].sort().join(", ")}`);
  }
  return matches;
}

async function pickScreen(matches, name) {
  if (matches.length === 1) return matches[0];
  console.log(`bargaz: more than one screen named "${name}":`);
  matches.forEach((m, i) => console.log(`  ${i + 1}. ${m}`));
  const rl = readline.createInterface({ input, output });
  try {
    while (true) {
      const answer = (await rl.question(`Choose 1-${matches.length}: `)).trim();
      const index = Number(answer);
      if (Number.isInteger(index) && index >= 1 && index <= matches.length) return matches[index - 1];
      console.log("bargaz: invalid choice.");
    }
  } finally {
    rl.close();
  }
}

async function serverUp() {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/`, { signal: AbortSignal.timeout(1200) });
    await res.arrayBuffer();
    return true;
  } catch { return false; }
}

async function readState() {
  try { return JSON.parse(await readFile(STATE_FILE, "utf8")); } catch { return null; }
}

function alive(pid) {
  if (!pid) return false;
  try { process.kill(pid, 0); return true; } catch { return false; }
}

async function writePreview(relativeScreenPath) {
  const importPath = "../../" + relativeScreenPath.replace(/\.js$/i, "");
  const content = `import Screen from "${importPath}";\n\nexport default function PreviewPage() {\n  return <Screen />;\n}\n`;
  await mkdir(path.dirname(PREVIEW_PAGE), { recursive: true });
  await writeFile(PREVIEW_PAGE, content, "utf8");
}

function launch(command, args) {
  try {
    const child = spawn(command, args, { detached: true, stdio: "ignore" });
    child.on("error", () => {});
    child.unref();
  } catch {}
}

function openBrowser() {
  if (CODESPACE) return;
  if (process.platform === "win32") launch("cmd", ["/c", "start", "", URL]);
  else if (process.platform === "darwin") launch("open", [URL]);
  else launch("xdg-open", [URL]);
}

async function startServer() {
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  try { await stat(nextBin); } catch { fail("dependencies are missing. Run npm install first."); }
  const logFd = openSync(LOG_FILE, "a");
  const child = spawn(process.execPath, [nextBin, "dev", "-H", HOST, "-p", String(PORT)], {
    cwd: ROOT,
    detached: true,
    stdio: ["ignore", logFd, logFd],
    env: { ...process.env, NODE_ENV: "development" },
  });
  child.unref();
  await writeFile(STATE_FILE, JSON.stringify({ pid: child.pid, host: HOST }), "utf8");
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (await serverUp()) return child.pid;
  }
  fail(`dev server did not become ready. Check ${LOG_FILE}`);
}

async function host(name) {
  const screen = await pickScreen(await findScreens(name), name);
  await writePreview(screen);
  console.log(`bargaz: previewing ${screen}`);

  const state = await readState();
  if (state && alive(state.pid)) {
    console.log(`bargaz: using running server (pid ${state.pid})`);
  } else if (await serverUp()) {
    console.log(`bargaz: a server is already on port ${PORT}; opening the URL. bargaz stop cannot manage it.`);
    openBrowser();
    return;
  } else {
    const pid = await startServer();
    console.log(`bargaz: started dev server (pid ${pid})${NETWORK ? " on 0.0.0.0" : ""}`);
  }
  openBrowser();
  console.log(`bargaz: ${URL}`);
}

async function stop() {
  const state = await readState();
  if (state && alive(state.pid)) {
    if (process.platform === "win32") {
      await new Promise((resolve) => {
        spawn("taskkill", ["/PID", String(state.pid), "/T", "/F"], { stdio: "ignore" }).on("exit", resolve);
      });
    } else {
      try { process.kill(-state.pid, "SIGTERM"); } catch { try { process.kill(state.pid, "SIGTERM"); } catch {} }
    }
    console.log(`bargaz: stopped dev server (pid ${state.pid})`);
  } else {
    console.log("bargaz: no server started by bargaz is running.");
  }
  await unlink(STATE_FILE).catch(() => {});
  await unlink(PREVIEW_PAGE).catch(() => {});
}

const action = (command || "").toLowerCase();
if (action === "host") await host(rawName);
else if (action === "stop") await stop();
else {
  console.log("bargaz host <screen name>   preview a screen at " + URL);
  console.log("bargaz stop                 stop the preview server");
  console.log("bargaz host <name> --network bind to 0.0.0.0 for other devices");
}