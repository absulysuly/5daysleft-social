"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavigationLink = {
  href: string;
  label: string;
  /**
   * Some routes like the home page should only match exactly.
   * This flag prevents prefix matching from highlighting the wrong tab.
   */
  exact?: boolean;
};

const navigationLinks = [
  { label: "Home", href: "/", exact: true },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
] satisfies ReadonlyArray<NavigationLink>;

function normalizePathname(path: string): string {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/+$/, "");
}

export default function TopNavBar(): JSX.Element {
  const pathname = normalizePathname(usePathname() ?? "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center bg-neutral-950/60 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-brand-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
            5D
          </span>
          5DaysLeft
        </Link>
        <ul className="hidden items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 p-1 text-sm text-neutral-300 shadow-lg shadow-black/10 md:flex">
          {navigationLinks.map(({ href, label, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "rounded-full px-4 py-2 transition",
                    isActive
                      ? "bg-brand text-brand-foreground shadow-inner shadow-black/30"
                      : "hover:bg-neutral-800/80 hover:text-neutral-100"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/login"
          className="rounded-full border border-brand/60 px-4 py-2 text-sm font-medium text-brand-foreground transition hover:bg-brand hover:text-neutral-950"
        >
          Sign in
        </Link>
      </nav>
    </header>
  );
}
