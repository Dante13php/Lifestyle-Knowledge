import Link from "next/link";
import type { Post } from "@/lib/posts";

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

export type ArticleLayoutPost = Post & {
  readingTime?: string;
};

type ArticleLayoutProps = {
  post: ArticleLayoutPost;
  children: React.ReactNode;
  toc: TocEntry[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleLayout({ post, children, toc }: ArticleLayoutProps) {
  const hasToc = toc.length > 0;

  return (
    <article className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-sm text-[var(--muted)]"
      >
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-[var(--foreground)]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-[var(--foreground)]">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--foreground)]" aria-current="page">
            {post.category}
          </li>
        </ol>
      </nav>

      {/* ArticleHeader: H1, intro, meta */}
      <header className="mb-10">
        <h1 className="text-[var(--foreground)] font-heading">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-body)]">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && (
            <span>Updated {formatDate(post.updated)}</span>
          )}
          {post.readingTime && (
            <span>{post.readingTime} read</span>
          )}
          <span className="rounded bg-[var(--border)] px-2 py-0.5 font-medium text-[var(--foreground)]">
            {post.category}
          </span>
          {post.tags.length > 0 && (
            <span className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-[var(--surface-2)] px-2 py-0.5 text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>

      {/* Main grid: content (left) | sticky TOC (right). Mobile: TOC above content, collapsed */}
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(200px,240px)] lg:gap-12">
        <div className="min-w-0">
          {/* Mobile TOC: collapsed above content */}
          {hasToc && (
            <details className="mb-8 lg:hidden group/toc">
              <summary className="cursor-pointer list-none text-sm font-medium text-[var(--foreground)]">
                <span className="inline-flex items-center gap-2">
                  On this page
                  <span className="text-[var(--muted)] transition-transform group-open/toc:rotate-180" aria-hidden>
                    ▼
                  </span>
                </span>
              </summary>
              <nav
                aria-label="Table of contents"
                className="mt-3 border-l-2 border-[var(--border)] pl-4"
              >
                <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                  {toc.map((entry) => (
                    <li
                      key={entry.id}
                      style={{ paddingLeft: `${(entry.level - 1) * 0.75}rem` }}
                    >
                      <a
                        href={`#${entry.id}`}
                        className="hover:text-[var(--foreground)]"
                      >
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          )}

          {/* Content */}
          <div className="prose prose-neutral max-w-none font-body text-[var(--text-body)]">
            {children}
          </div>

          {/* End block */}
          <footer className="mt-14 border-t border-[var(--border)] pt-10">
            {/* Key Takeaways placeholder */}
            <section className="mb-10" aria-label="Key takeaways">
              <h2 className="font-heading text-lg text-[var(--foreground)]">
                Key Takeaways
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Placeholder — to be filled from MDX later.
              </p>
            </section>

            {/* Next / Previous placeholder */}
            <section aria-label="Article navigation">
              <h2 className="font-heading text-lg text-[var(--foreground)]">
                More articles
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Next / Previous links — to be wired when more posts exist.
              </p>
            </section>
          </footer>
        </div>

        {/* Desktop: sticky TOC */}
        {hasToc && (
          <aside
            className="hidden lg:block"
            aria-label="Table of contents"
          >
            <nav className="sticky top-24 border-l-2 border-[var(--border)] pl-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                On this page
              </p>
              <ul className="space-y-1.5 text-sm text-[var(--muted)]">
                {toc.map((entry) => (
                  <li
                    key={entry.id}
                    style={{ paddingLeft: `${(entry.level - 1) * 0.75}rem` }}
                  >
                    <a
                      href={`#${entry.id}`}
                      className="hover:text-[var(--foreground)]"
                    >
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </article>
  );
}
