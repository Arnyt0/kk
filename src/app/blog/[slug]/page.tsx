import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost } from "@/lib/blog";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: "WattPayback",
          },
        }}
      />
      <p className="font-mono text-xs text-ink-muted">
        <Link href="/blog" className="hover:text-accent-deep">
          Blog
        </Link>{" "}
        · {post.date} · {post.readingTime}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-ink-muted">{post.description}</p>
      <AdSlot placement="blog-inline" className="mt-8" />
      <div className="prose-blog mt-8">
        <MDXRemote source={post.content} />
      </div>
      <AdSlot placement="blog-bottom" className="mt-10" />
    </article>
  );
}
