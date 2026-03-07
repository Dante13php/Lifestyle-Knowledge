import Link from "next/link";
import type { Post, SeriesNav } from "@/lib/posts";
import { SeriesNav as SeriesNavBlock } from "@/components/blog/SeriesNav";
import { SeriesProgress } from "@/components/blog/SeriesProgress";
import { ContinueLearning } from "@/components/blog/ContinueLearning";
import { ReadingProgressBar } from "@/components/blog/ProgressBar";
import { TocSidebar } from "@/components/blog/TocSidebar";

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

      {/* Article hero: category, H1, subtitle, meta, series */}
      <header className="mb-12 sm:mb-14">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {post.category}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-[2.5rem] md:leading-[1.2]">
          {post.title}
        </h1>
        <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-[var(--text-body)]">
          {post.description}
        </p>
        <div className="mt-5 flex flex-col items-start gap-y-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && (
              <span>Updated {formatDate(post.updated)}</span>
            )}
            {post.readingTime && (
              <span className="inline-flex items-center rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-sm font-medium text-[var(--foreground)]">
                {post.readingTime} read
              </span>
            )}
          </div>
        </div>

        {hasSeries && (
          <SeriesNavBlock
            seriesSlug={seriesNav.seriesSlug}
            currentSlug={post.slug}
            seriesTitle={seriesNav.seriesTitle}
            currentPostMeta={
              post.readingTime ? `${post.readingTime} read` : undefined
            }
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

          {/* Content: 65–70ch reading width, vertical rhythm, editorial hierarchy */}
          <div
            className={[
              "article-content max-w-[68ch] font-body text-[var(--text-body)]",
              "prose prose-neutral max-w-none",
              "prose-p:leading-[1.625] prose-p:first-of-type:text-lg prose-p:first-of-type:leading-[1.6] prose-p:first-of-type:text-[var(--foreground)]",
              "prose-h2:font-heading prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-[var(--foreground)] prose-h2:border-t prose-h2:border-[var(--border)] prose-h2:first-of-type:border-0 prose-h2:first-of-type:pt-0",
              "prose-h3:font-heading prose-h3:text-lg prose-h3:font-medium prose-h3:tracking-tight prose-h3:text-[var(--foreground)]",
              "prose-h4:text-base prose-h4:font-medium prose-li:leading-[1.6]",
              "prose-blockquote:mt-0 prose-blockquote:mb-0 prose-pre:mt-0 prose-pre:mb-0",
            ].join(" ")}
          >
            {children}
          </div>

          {/* End block */}
          <footer className="mt-14 border-t border-[var(--border)] pt-10">
            {post.takeaways && post.takeaways.length > 0 && (
              <section
                className="mb-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-7 py-8 sm:px-10 sm:py-10"
                aria-label="Key takeaways"
              >
                <h2 className="mb-7 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]/80">
                  What to remember
                </h2>
                <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-4 pl-0 text-[var(--text-body)] md:grid-cols-2 [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&>li]:leading-[1.6] [&>li]:before:mt-1 [&>li]:before:shrink-0 [&>li]:before:font-body [&>li]:before:text-[var(--accent)] [&>li]:before:content-['✓']">
                  {post.takeaways.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {hasSeries && seriesNav && (
              <SeriesProgress
                currentSlug={post.slug}
                seriesSlug={seriesNav.seriesSlug}
                seriesTitle={seriesNav.seriesTitle}
              />
            )}

            <div className="mt-20 border-t border-[var(--border)] pt-16 sm:mt-24 sm:pt-20">
              <ContinueLearning
                currentSlug={post.slug}
                seriesSlug={post.series?.slug}
                tags={post.tags}
                category={post.category}
              />
            </div>
          </footer>
        </div>

        {/* Desktop: sticky TOC with active section highlighting */}
        {hasToc && (
          <aside
            className="hidden min-w-0 lg:block"
            aria-label="Table of contents"
          >
            <TocSidebar toc={toc} />
          </aside>
        )}
      </div>
    </article>
    </>
  );
}
