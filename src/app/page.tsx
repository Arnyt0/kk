import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { HeroArt } from "@/components/HeroArt";
import { Reveal } from "@/components/Reveal";
import { IconFormula, IconSun, BrandMark } from "@/components/Icons";
import { TOOLS } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 accent-shimmer" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="hero-rise section-mark text-accent">
              <BrandMark size={22} />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
                Neutral energy math
              </span>
            </div>
            <p className="hero-rise relative mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl">
              WattPayback
              <span className="brand-underline absolute -bottom-1 left-0 h-1 w-28 bg-accent sm:w-36" />
            </p>
            <h1 className="hero-rise-delay mt-6 max-w-xl text-xl font-medium leading-snug text-ink sm:text-2xl">
              See the real solar &amp; home-energy numbers — every assumption
              editable.
            </h1>
            <p className="hero-rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
              Payback, batteries, heat pumps, EV charging and tariffs with
              formulas printed in plain numbers. Not an installer lead form.
            </p>
            <div className="hero-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/solar-payback"
                className="btn-primary inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-deep"
              >
                <IconSun size={18} className="bob" />
                Open solar payback
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-accent-soft"
              >
                <IconFormula size={18} />
                All 9 tools
              </Link>
            </div>
          </div>

          <div className="hero-art-wrap relative min-h-[280px] sm:min-h-[360px]">
            <HeroArt />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-mark font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                <IconFormula size={14} />
                Toolkit
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink">
                Nine calculators
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Live results. Region defaults you can override.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>

        <AdSlot placement="home-mid" className="mt-12" />
      </section>

      <section className="border-t border-line bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="section-mark font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Guides
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink">
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
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 80}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="tool-card block h-full border border-line bg-surface p-5 hover:border-accent hover:bg-accent-soft/40"
                  >
                    <p className="font-mono text-xs text-ink-muted">{post.date}</p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {post.description}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={120} className="mt-10">
            <div className="flex flex-col items-start justify-between gap-4 border border-line bg-surface p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                  Need a correction or want to advertise?
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  The contact form works — messages go to the site operator.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-primary inline-flex bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-deep"
              >
                Open contact
              </Link>
            </div>
          </Reveal>

          <AdSlot placement="home-bottom" className="mt-12" />
        </div>
      </section>
    </div>
  );
}
