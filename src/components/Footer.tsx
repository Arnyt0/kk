import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { BrandMark } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark size={24} />
            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
              WattPayback
            </p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            Transparent home-energy calculators. Every assumption is editable.
            No installer lead forms.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Tools
          </p>
          <ul className="mt-3 space-y-1.5">
            {TOOLS.slice(0, 5).map((t) => (
              <li key={t.slug}>
                <Link
                  href={t.href}
                  className="text-sm text-ink transition-colors hover:text-accent-deep"
                >
                  {t.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Site
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-accent-deep">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent-deep">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent-deep">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent-deep">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent-deep">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-accent-deep">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-muted sm:px-6">
          Estimates only. Based on the assumptions you enter. Get a site-specific
          survey before spending money.
        </p>
      </div>
    </footer>
  );
}
