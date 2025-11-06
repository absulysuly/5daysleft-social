import Link from "next/link";
import type { FC } from "react";

const links = [
  { href: "#feed", label: "Feed" },
  { href: "#projects", label: "Projects" },
  { href: "#accountability", label: "Accountability" }
];

const TopNavBar: FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          5DaysLeft
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#join"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
        >
          Join the beta
        </Link>
      </div>
    </header>
  );
};

export default TopNavBar;
