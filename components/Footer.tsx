import Link from "next/link";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/privacy", label: "Privacy" },
  { href: "/about", label: "About" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-visible)] bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <nav
          className="flex flex-wrap items-center justify-between gap-6 py-5 sm:py-6"
          aria-label="Footer navigation"
        >
          <Link
            href="/"
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:rounded"
          >
            <span className="font-heading text-xl font-normal tracking-tight text-[var(--foreground)] sm:text-2xl">
              Lifestyle Knowledge
            </span>
            <span className="mt-1 block text-base font-normal text-[var(--text-body)] sm:mt-1.5">
              Time management & systems that work
            </span>
            <p className="mt-1 text-xs text-[var(--muted)] sm:mt-1.5">
              © {currentYear} Lifestyle Knowledge
            </p>
          </Link>
          <div className="flex items-center gap-1">
            {footerLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="nav-link rounded-lg">
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
