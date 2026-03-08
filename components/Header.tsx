import Link from "next/link";
import { headers } from "next/headers";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
] as const;

export async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";

  return (
    <header
      className="sticky top-0 z-40 border-b border-subtle bg-transparent backdrop-blur-[8px]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <nav
          className="flex items-center justify-between py-4 sm:py-5"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="logo-link group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:rounded"
          >
            <span className="font-heading text-2xl font-normal tracking-tighter text-[var(--text-primary)] sm:text-3xl">
              Lifestyle Knowledge
            </span>
            <span className="mt-1 block text-sm font-normal tracking-wide text-[var(--text-secondary)] sm:mt-1.5">
              Time management & systems that work
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link rounded-lg ${isActive ? "nav-link--active" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
