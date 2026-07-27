import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on solar payback, self-consumption, batteries, heat pumps and energy tariffs.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Blog
      </h1>
      <p className="mt-3 text-ink-muted">
        How the energy numbers work — with links back to the calculators.
      </p>
      <AdSlot placement="blog-inline" className="mt-8" />
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="font-mono text-xs text-ink-muted">
                {post.date} · {post.readingTime}
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink group-hover:text-accent-deep">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <AdSlot placement="blog-bottom" className="mt-10" />
    </div>
  );
}
