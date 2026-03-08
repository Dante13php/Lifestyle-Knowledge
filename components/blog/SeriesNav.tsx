import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

type SeriesNavProps = {
  seriesSlug: string;
  currentSlug: string;
  /** Display title for the series; fallback "Series" if omitted. */
  seriesTitle?: string;
  /** Optional short description under the series title, e.g. "A 3-part series about…" */
  seriesDescription?: string;
  /** Optional meta line for the current article, e.g. "11 min read". */
  currentPostMeta?: string;
};

/** TOC-like link: no underline, subtle background on hover/focus, rounded, transition background-color and color. */
const linkBase =
  "block no-underline rounded-lg transition-[background-color,color] duration-200 outline-none hover:no-underline focus:no-underline active:no-underline focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background-tinted)]";

export function SeriesNav({
  seriesSlug,
  currentSlug,
  seriesTitle,
  seriesDescription,
  currentPostMeta,
}: SeriesNavProps) {
  const posts = getSeriesPosts(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  const title = seriesTitle ?? "Series";
  const currentPost = currentIndex >= 0 ? posts[currentIndex] : null;
  const prevPost =
    currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;
  const laterPosts =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts.slice(currentIndex + 2)
      : [];

  if (posts.length === 0) return null;

  const partLabel = `Part ${currentIndex + 1} of ${posts.length}`;
  const percentComplete = Math.round(
    ((currentIndex + 1) / posts.length) * 100
  );
  const progressText = `${partLabel} • ${percentComplete}% complete`;
  const description =
    seriesDescription ?? `A ${posts.length}-part series`;

  return (
    <nav
      className="mt-4 rounded-xl border border-[var(--border-default)] px-4 py-4 sm:px-5 sm:py-5"
      style={{ backgroundColor: 'var(--tinted-series)' }}
      aria-label="Series navigation"
    >
      {/* 1. Series header */}
      <header className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
        <p className="mt-2 text-xs font-medium text-[var(--text-secondary)]">
          {progressText}
        </p>
          <div
          className="mt-2 mb-4 h-[6px] w-full overflow-hidden rounded-[999px] bg-[var(--border-subtle)]"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={posts.length}
          aria-label={progressText}
        >
          <div
            className="h-full rounded-[999px] bg-[var(--olive-600)] transition-[width] duration-300"
            style={{
              width: `${((currentIndex + 1) / posts.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* 2. Desktop: 2- or 3-column grid (Prev | Current | Next) */}
      <div
        className={`flex flex-col gap-5 lg:grid lg:items-stretch lg:gap-6 ${
          prevPost && nextPost
            ? "lg:grid-cols-[1fr_1fr_1fr]"
            : prevPost || nextPost
              ? "lg:grid-cols-[1fr_1fr]"
              : ""
        }`}
      >
        {/* Previous article — when not on part 1 */}
        {prevPost && (
          <div className="flex min-h-0 flex-col lg:min-w-0">
            <Link
              href={`/blog/${prevPost.slug}`}
              className={`group ${linkBase} flex min-h-0 flex-1 flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-4 sm:p-5 transition-[background-color] duration-[120ms] ease-[ease] hover:bg-[var(--tinted-callout)] focus-visible:ring-offset-[var(--tinted-series)]`}
            >
              <span className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                Previous in series
              </span>
              <span className="mt-2 block font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-[1.25rem] group-hover:text-[var(--accent-primary)] transition-colors">
                {prevPost.title}
              </span>
              {(prevPost.description || prevPost.title) && (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {prevPost.description ||
                    "Go back to the previous part of this series."}
                </p>
              )}
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] no-underline transition-colors duration-200 group-hover:text-[var(--accent-primary)]">
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
                >
                  ←
                </span>
                Back
              </span>
            </Link>
          </div>
        )}

        {/* Current article */}
        {currentPost && (
          <div className="flex min-h-0 flex-col lg:min-w-0" aria-current="step">
            <div className="min-h-0 flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] px-3 py-3 sm:px-4 sm:py-4">
              <span className="inline-block rounded-md bg-[var(--tinted-callout)] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                Current article
              </span>
              <p className="mt-2 font-semibold text-[var(--text-primary)] text-sm">
                {currentPost.title}
              </p>
              {(currentPost.description || currentPost.title) && (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {currentPost.description ||
                    "You are reading this article in the series."}
                </p>
              )}
              {currentPostMeta && (
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  {currentPostMeta}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Next article */}
        {nextPost && (
          <div className="flex min-h-0 flex-col lg:min-w-0">
            <Link
              href={`/blog/${nextPost.slug}`}
              className={`group ${linkBase} flex min-h-0 flex-1 flex-col rounded-xl border border-[var(--tinted-callout-border)] bg-[var(--tinted-related)] p-4 sm:p-5 transition-[background-color] duration-[120ms] ease-[ease] hover:bg-[var(--tinted-callout)] focus-visible:ring-offset-[var(--tinted-series)]`}
            >
              <span className="block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                Next in series
              </span>
              <span className="mt-2 block font-heading text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-[1.25rem] group-hover:text-[var(--accent-primary)] transition-colors">
                {nextPost.title}
              </span>
              {(nextPost.description || nextPost.title) && (
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {nextPost.description ||
                    `Continue to the next part of this series.`}
                </p>
              )}
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] no-underline transition-colors duration-200 group-hover:text-[var(--accent-hover)]">
                Continue reading
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* 3. Later articles — index, title, short description */}
      {laterPosts.length > 0 && (
        <div className="mt-6 border-t border-[var(--border-default)] pt-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
            Later in series
          </p>
          <ol className="list-none space-y-1.5 pl-0 text-sm text-[var(--text-secondary)]" role="list">
            {laterPosts.map((p, i) => {
              const partNum = currentIndex + 3 + i;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className={`group ${linkBase} flex cursor-pointer items-center gap-3 rounded-lg border-l-2 border-l-transparent py-[10px] pl-3 pr-3 -ml-3 no-underline transition-[background-color,border-color,color] duration-[120ms] ease-[ease] hover:bg-[var(--tinted-callout)] hover:border-l-[var(--accent-primary)] hover:no-underline`}
                  >
                    <span
                      className="w-5 shrink-0 text-right text-xs tabular-nums text-[var(--text-secondary)] transition-colors duration-[120ms] group-hover:text-[var(--accent-primary)]"
                      aria-hidden
                    >
                      {partNum}
                    </span>
                    <div className="min-w-0 flex-1 max-w-full">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-medium transition-colors duration-[120ms] ease-[ease] group-hover:text-[var(--accent-primary)]">
                          {p.title}
                        </span>
                        <span
                          aria-hidden
                          className="inline-block shrink-0 text-[var(--text-secondary)] opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </div>
                      {p.description && (
                        <p className="mt-0.5 line-clamp-1 text-sm opacity-90">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </nav>
  );
}
