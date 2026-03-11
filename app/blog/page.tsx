import getPostMetadata from "lib/posts";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs by Tanav Poswal",
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default async function Page() {
  const posts = getPostMetadata("posts");

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-medium tracking-tight text-[var(--text)]">
        Writing
      </h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2"
          >
            <div className="flex items-baseline justify-between">
              <div className="flex gap-6 items-center">
                <h3 className="font-medium text-[var(--text)] group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <ArrowRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 -translate-x-3 group-hover:translate-x-0 group-hover:opacity-70  transition-all ease-in" />
              </div>
              <span className="text-xs text-[var(--text-muted)] tabular-nums">
                {formatDate(post.date)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
