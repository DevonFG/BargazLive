
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(
  os.homedir(),
  ".local",
  "share",
  "bargazlive"
);

const DATA_FILE = path.join(DATA_DIR, "appearance.json");

const DEFAULTS = {
  theme: "light",
  accent: "default",
  highContrast: false,
  colorblind: false,
};

function validId(id) {
  return typeof id === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

function validatePreferences(value) {
  if (!value || typeof value !== "object") return null;

  const accents = [
    "default", "blue", "red",
    "green", "purple", "orange"
  ];

  if (
    !["light", "dark"].includes(value.theme) ||
    !accents.includes(value.accent) ||
    typeof value.highContrast !== "boolean" ||
    typeof value.colorblind !== "boolean"
  ) {
    return null;
  }

  return {
    theme: value.theme,
    accent: value.accent,
    highContrast: value.highContrast,
    colorblind: value.colorblind,
  };
}

async function readData() {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function writeData(data) {
  await fs.mkdir(DATA_DIR, {
    recursive: true,
    mode: 0o700
  });

  const temporary = DATA_FILE + ".tmp";

  await fs.writeFile(
    temporary,
    JSON.stringify(data, null, 2),
    { mode: 0o600 }
  );

  await fs.rename(temporary, DATA_FILE);
}

const noCache = {
  "Cache-Control": "no-store",
};

export async function GET(request) {
  const id = new URL(request.url).searchParams.get("id");

  if (!validId(id)) {
    return NextResponse.json(
      { error: "Invalid identifier" },
      { status: 400, headers: noCache }
    );
  }

  try {
    const data = await readData();

    return NextResponse.json(
      {
        preferences: data[id] || null,
        defaults: DEFAULTS
      },
      { headers: noCache }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to read preferences" },
      { status: 500, headers: noCache }
    );
  }
}

export async function PUT(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: noCache }
    );
  }

  const id = body?.id;
  const preferences = validatePreferences(body?.preferences);

  if (!validId(id) || !preferences) {
    return NextResponse.json(
      { error: "Invalid preferences" },
      { status: 400, headers: noCache }
    );
  }

  try {
    const data = await readData();

    data[id] = preferences;

    await writeData(data);

    return NextResponse.json(
      { success: true },
      { headers: noCache }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to save preferences" },
      { status: 500, headers: noCache }
    );
  }
}
