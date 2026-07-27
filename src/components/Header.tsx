"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RegionSelector } from "@/components/RegionSelector";
import { BrandMark } from "@/components/Icons";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg-elevated/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <BrandMark
            size={28}
            className="transition-transform duration-300 group-hover:rotate-[-6deg]"
          />
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink sm:text-xl">
              WattPayback
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:inline">
              energy math
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/blog"
                ? pathname.startsWith("/blog")
                : item.href === "/tools"
                  ? pathname.startsWith("/tools")
                  : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={`nav-ink text-sm font-medium transition-colors ${
                  active ? "text-accent-deep" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <RegionSelector compact />
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center border border-line bg-surface text-ink transition-colors hover:border-accent md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d={open ? "M4 4l10 10M14 4L4 14" : "M3 5h12M3 9h12M3 13h12"}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-surface px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <RegionSelector />
          </div>
        </div>
      )}
    </header>
  );
}
