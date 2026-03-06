import Link from "next/link";
import type { Post, SeriesNav } from "@/lib/posts";
import { SeriesNav as SeriesNavBlock } from "@/components/blog/SeriesNav";
import { ContinueLearning } from "@/components/blog/ContinueLearning";
import { ReadingProgressBar } from "@/components/blog/ProgressBar";

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

export type ArticleLayoutPost = Post & {
  readingTime?: string;
  takeaways?: string[];
};

type ArticleLayoutProps = {
  post: ArticleLayoutPost;
  children: React.ReactNode;
  toc: TocEntry[];
  /** When post is part of a series. */
  seriesNav?: SeriesNav;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleLayout({ post, children, toc, seriesNav }: ArticleLayoutProps) {
  const hasToc = toc.length > 0;
  const hasSeries = !!seriesNav;

  return (
    <>
      <ReadingProgressBar />
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
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
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

        {hasSeries && (
          <SeriesNavBlock
            seriesSlug={seriesNav.seriesSlug}
            currentSlug={post.slug}
            seriesTitle={seriesNav.seriesTitle}
          />
        )}
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

          {/* Content: reading width, vertical rhythm, clear H2/H3 hierarchy */}
          <div
            className={[
              "article-content max-w-[70ch] font-body text-[var(--text-body)]",
              "prose prose-neutral max-w-none",
              "prose-p:mb-6 prose-p:leading-[1.625]",
              "prose-h2:mb-4 prose-h2:mt-12 prose-h2:font-heading prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-[var(--foreground)]",
              "prose-h3:mb-3 prose-h3:mt-6 prose-h3:font-heading prose-h3:text-lg prose-h3:font-medium prose-h3:tracking-tight prose-h3:text-[var(--foreground)]",
              "prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-base prose-h4:font-medium",
              "prose-ul:my-4 prose-ol:my-4 prose-li:my-1",
              "prose-blockquote:my-6 prose-pre:my-6 prose-table:my-6",
            ].join(" ")}
          >
            {children}
          </div>

          {/* End block */}
          <footer className="mt-14 border-t border-[var(--border)] pt-10">
            {post.takeaways && post.takeaways.length > 0 && (
              <section className="mb-10" aria-label="Key takeaways">
                <h2 className="font-heading text-lg text-[var(--foreground)]">
                  Key Takeaways
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-[var(--text-body)]">
                  {post.takeaways.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <ContinueLearning
              currentSlug={post.slug}
              seriesSlug={post.series?.slug}
              tags={post.tags}
              category={post.category}
            />
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
    </>
  );
}
