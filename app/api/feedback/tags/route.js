import { NextResponse } from "next/server";

const BOT_URL = process.env.BARGAZBOT_INTERNAL_URL || "http://127.0.0.1:3500";

export async function GET() {
  try {
    const response = await fetch(`${BOT_URL}/feedback/tags`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error(`Bot returned ${response.status}`);

    const data = await response.json();

    return NextResponse.json(
      { tags: Array.isArray(data.tags) ? data.tags : [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Feedback tag relay failed:", error);
    return NextResponse.json(
      { error: "Unable to load forum tags" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}