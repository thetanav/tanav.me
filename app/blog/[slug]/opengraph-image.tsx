import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const runtime = "nodejs";

type ImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getPost(slug: string) {
  try {
    const content = fs.readFileSync(`posts/${slug}.md`, "utf8");
    const parsed = matter(content);

    return {
      title: parsed.data.title as string | undefined,
      date: parsed.data.date
        ? new Date(parsed.data.date).toISOString()
        : undefined,
    };
  } catch {
    return undefined;
  }
}

function formatPostDate(date?: string) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const fontData = fs.readFileSync(
    path.join(process.cwd(), "assets/Geist-Bold.ttf"),
  );
  const post = getPost(slug);

  const title = post?.title ?? "Untitled Post";
  const formattedDate = formatPostDate(post?.date);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#0a0a0a",
        color: "#fff",
        padding: "100px",
        gap: "4rem",
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "19px",
          fontSize: 32,
          color: "#888",
          marginBottom: "40px",
        }}
      >
        <img
          src="https://tanav.me/pfp.png"
          width={56}
          height={56}
          style={{
            borderRadius: "50%",
            filter: "grayscale",
            border: "solid 1px gray",
          }}
        />
        <span>tanav.me</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h1
          style={{
            display: "flex",
            fontSize: 71,
            lineHeight: 1,
            fontWeight: 700,
            width: "100%",
            lineClamp: 2,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
          DP is easy
        </h1>
        {formattedDate ? (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#666",
              fontWeight: 400,
            }}
          >
            {formattedDate}
            September 25, 2025
          </div>
        ) : null}
      </div>
    </div>,
    {
      fonts: [
        {
          name: "Geist",
          data: fontData,
        },
      ],
    },
  );
}
