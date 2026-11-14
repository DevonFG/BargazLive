import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const HEALTH_URL = process.env.BARGAZ_HEALTH_URL || "http://127.0.0.1:3001";
const ENDPOINTS  = new Set(["health", "diagnostics", "versions", "backups", "network"]);
const noCache    = { "Cache-Control": "no-store" };
export async function GET(request, { params }) {
  const { endpoint } = await params;
  if (!endpoint || !ENDPOINTS.has(endpoint)) {return NextResponse.json({ error: "Unknown endpoint" }, { status: 404, headers: noCache });}
  try {
    const response = await fetch(`${HEALTH_URL}/endpoints/${endpoint}`, {headers: { Accept: "application/json" }, signal: AbortSignal.timeout(5000), cache: "no-store",});
    return new NextResponse(await response.text(), {status: response.status, headers: { "Content-Type": "application/json", ...noCache },});
  } catch {return NextResponse.json({ status: "unavailable", error: "Health service is not responding" }, { status: 503, headers: noCache });}
}