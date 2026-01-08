import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

const redis = Redis.fromEnv();
const TTL = 60 * 60 * 24; // 24 hours
const KEY = "views";

export async function GET(req: NextRequest) {
  if (req.nextUrl.hostname === "localhost") {
    return NextResponse.json({ count: "dev" });
  }

  const cookieStore = await cookies();
  let id: string | undefined = cookieStore.get("visitorId")?.value;

  if (id === undefined) {
    id = nanoid();
    cookieStore.set("visitorId", id, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      path: "/",
    });
  }

  // Check if IP already exists in list
  const exists = await redis.lpos(KEY, id);

  if (exists === null) {
    // Add new IP
    await redis.lpush(KEY, id);

    // Ensure TTL exists
    const ttl = await redis.ttl(KEY);
    if (ttl === -1) {
      await redis.expire(KEY, TTL);
    }
  }

  const count = await redis.llen(KEY);

  return NextResponse.json({
    count,
  });
}
