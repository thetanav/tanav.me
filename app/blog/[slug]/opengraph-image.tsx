import { ImageResponse } from "next/og";
import fs from "fs";
import matter from "gray-matter";

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "nodejs";

export const contentType = "image/png";

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
        justifyContent: "space-between",
        background: "#000",
        color: "#f8fafc",
        padding: "64px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, opacity: 0.8 }}>
        tanav.me/blog
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            maxWidth: "100%",
          }}
        >
          {title}
        </div>
        {formattedDate ? (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#cbd5e1",
              fontWeight: 500,
            }}
          >
            {formattedDate}
          </div>
        ) : null}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
