import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "lib/posts";
import CodeBlock from "app/components/codeblock";
import { Instrument_Serif, Inter } from "next/font/google";
import ImgBlock from "app/components/imgblock";

function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });
const bodySerif = Inter({ weight: "400", subsets: ["latin"] });

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function getPostContent(slug) {
  const folder = "posts/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("posts");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata(props) {
  const params = await props.params;
  const id = params?.slug ? params?.slug : "";
  const post = getPostContent(id);
  const title = post.data.title || id.replaceAll("_", " ");
  const description =
    post.data.description ||
    post.content.slice(0, 160).replace(/[#*`]/g, "") + "...";

  return {
    title: `${title} • Tanav Poswal`,
    description,
    openGraph: {
      title: `${title} • Tanav Poswal`,
      description,
      url: `https://tanav.me/blog/${id}`,
      siteName: "Tanav Poswal",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.data.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} • Tanav Poswal`,
      description,
      images: "https://tanav.me/og.png",
      creator: "@tanavtwt",
    },
  };
}

export default async function Page(props) {
  const slug = (await props.params).slug;
  const post = getPostContent(slug);
  const readingTime = getReadingTime(post.content);

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1
          className={`text-4xl font-bold text-[var(--text)] ${serif.className}`}>
          {post.data.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          <span>{formatDate(post.data.date)}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
      </header>

      <article className="prose">
        <Markdown
          options={{
            overrides: {
              code: {
                component: CodeBlock,
              },
              img: {
                component: ImgBlock,
              },
            },
          }}>
          {post.content}
        </Markdown>
      </article>
    </section>
  );
}
