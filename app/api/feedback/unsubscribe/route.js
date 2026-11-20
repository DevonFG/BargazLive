import { NextResponse } from "next/server";

const BOT_URL = process.env.BARGAZBOT_INTERNAL_URL || "http://127.0.0.1:3500";

function page(title, message) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} - Bargaz</title>
<style>
body { font-family: Arial, Helvetica, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem; line-height: 1.6; }
a { color: #285c89; }
</style>
</head>
<body>
<h1>${title}</h1>
<p>${message}</p>
<p><a href="https://bargaz.app/">Return to Bargaz</a></p>
</body>
</html>`;
}

export async function GET(request) {
  const token = new URL(request.url).searchParams.get("token") || "";

  if (!/^[0-9a-f-]{36}$/i.test(token)) {
    return new NextResponse(
      page("Invalid link", "This unsubscribe link is not valid."),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  try {
    const response = await fetch(
      `${BOT_URL}/feedback/unsubscribe?token=${encodeURIComponent(token)}`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!response.ok) throw new Error(`Bot returned ${response.status}`);

    const data = await response.json().catch(() => ({}));

    return new NextResponse(
      data.success
        ? page(
            "Unsubscribed",
            "You will no longer receive emails about replies to this feedback post."
          )
        : page(
            "Already unsubscribed",
            "This subscription was already stopped or no longer exists."
          ),
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (error) {
    console.error("Unsubscribe relay failed:", error);
    return new NextResponse(
      page(
        "Unable to unsubscribe",
        "Please try again later or contact support@bargaz.app."
      ),
      { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}