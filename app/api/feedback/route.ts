import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

const redis = Redis.fromEnv();
const KEY = "feedback"; // list key where feedback entries are stored
const MAX_ENTRIES = 2000; // keep the list trimmed to the most recent N entries

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rating = Number(body.rating ?? 0);
    const text = String(body.text ?? "").slice(0, 255);

    // Basic validation
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "rating must be an integer between 1 and 5" }, { status: 400 });
    }

    const entry = {
      id: nanoid(),
      rating,
      text,
      createdAt: new Date().toISOString(),
      // we intentionally don't try to infer user-identifying info here
    };

    // Push the JSON string onto a list and trim it to a bounded size.
    // This keeps Redis usage predictable while preserving recent feedback.
    await redis.lpush(KEY, JSON.stringify(entry));
    await redis.ltrim(KEY, 0, MAX_ENTRIES - 1);

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error("/api/feedback error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
