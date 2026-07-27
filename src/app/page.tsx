import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { TOOLS } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 80% 10%, #d7efe9 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, #cfe0f0 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="hero-rise font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl">
            WattPayback
          </p>
          <h1 className="hero-rise-delay mt-5 max-w-2xl text-xl font-medium leading-snug text-ink sm:text-2xl">
            Neutral home-energy math. Every assumption editable.
          </h1>
          <p className="hero-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            Solar payback, batteries, heat pumps, EV charging and more — with
            formulas shown in plain numbers, not an installer&apos;s lead form.
          </p>
          <div className="hero-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools/solar-payback"
              className="inline-flex items-center bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Open solar payback
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent"
            >
              Read the guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink">
              Nine calculators
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Live results. No submit buttons. Region defaults you can override.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>

        <AdSlot placement="home-mid" className="mt-12" />
      </section>

      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink">
                Latest from the blog
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                How the numbers work — and where installer quotes diverge.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent-deep hover:underline"
            >
              All posts →
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  <p className="font-mono text-xs text-ink-muted">{post.date}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <AdSlot placement="home-bottom" className="mt-12" />
        </div>
      </section>
    </div>
  );
}
