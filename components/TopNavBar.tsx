"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
];

export default function TopNavBar() {
  const pathname = usePathname();

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
          {navigationLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 transition",
                    isActive
                      ? "bg-brand text-brand-foreground shadow-inner shadow-black/30"
                      : "hover:bg-neutral-800/80 hover:text-neutral-100"
                  )}
                >
                  {link.label}
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
