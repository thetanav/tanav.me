import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

const redis = Redis.fromEnv();
const KEY = "views";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  let id: string | undefined = cookieStore.get("visitorId")?.value;

  if (id === undefined) {
    id = nanoid();
    cookieStore.set("visitorId", id, {
      maxAge: 60 * 60 * 24 * 100,
      httpOnly: true,
      path: "/",
    });
  }

  // Check if IP already exists in list
  const exists = await redis.lpos(KEY, id);

  if (exists === null) {
    // Add new IP
    await redis.lpush(KEY, id);
  }

  const count = await redis.llen(KEY);

  return NextResponse.json({
    count,
  });
}
