import { NextResponse } from "next/server";

const BOT_URL = process.env.BARGAZBOT_INTERNAL_URL || "http://127.0.0.1:3500";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = String(body.title || "").trim();
  const message = String(body.message || "").trim();
  const tag = String(body.tag || "").trim();
  const emoji = String(body.emoji || "").trim();
  const email = String(body.email || "").trim();

  if (!title || title.length > 100 || !message || message.length > 2000) {
    return NextResponse.json(
      { error: "A title (100 characters) and message (2000) are required" },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${BOT_URL}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message, tag, emoji, email }),
      signal: AbortSignal.timeout(15000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Feedback could not be posted" },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: data.url || "" });
  } catch (error) {
    console.error("Feedback relay failed:", error);
    return NextResponse.json(
      { error: "Feedback service is unavailable" },
      { status: 502 }
    );
  }
}