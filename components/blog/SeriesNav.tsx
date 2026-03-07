import Link from "next/link";
import { getSeriesPosts } from "@/lib/posts";

type SeriesNavProps = {
  seriesSlug: string;
  currentSlug: string;
  /** Display title for the series; fallback "Series" if omitted. */
  seriesTitle?: string;
};

export function SeriesNav({ seriesSlug, currentSlug, seriesTitle }: SeriesNavProps) {
  const posts = getSeriesPosts(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  const title = seriesTitle ?? "Series";
  const progress =
    currentIndex >= 0 ? `Part ${currentIndex + 1} of ${posts.length}` : "";
  const progressPercent =
    posts.length > 0 && currentIndex >= 0
      ? ((currentIndex + 1) / posts.length) * 100
      : 0;
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;

  if (posts.length === 0) return null;

  return (
    <nav
      className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/60 px-4 py-4"
      aria-label="Series navigation"
    >
      <p className="font-medium text-[var(--foreground)]">{title}</p>
      {progress && (
        <div className="mt-1.5 flex flex-col gap-1.5">
          <p className="text-sm text-[var(--muted)]">{progress}</p>
          <div
            className="h-1 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={posts.length}
            aria-label={progress}
          >
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
      <ol
        className="relative mt-5 list-none pl-0 text-sm"
        role="list"
        style={{ paddingLeft: "18px" }}
      >
        {/* Vertical timeline */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[var(--border-muted)]"
          aria-hidden
        />
        {posts.map((p, index) => {
          const isCurrent = p.slug === currentSlug;
          const isNext =
            currentIndex >= 0 && index === currentIndex + 1;
          return (
            <li
              key={p.slug}
              aria-current={isCurrent ? "step" : undefined}
              className="relative flex items-center gap-3 py-2.5"
              style={{ paddingTop: 10, paddingBottom: 10 }}
            >
              {/* Circle indicator: filled for current, outline for others — flex child so it aligns with text */}
              <span
                className="z-[1] flex w-[18px] shrink-0 -ml-[18px] items-center justify-center"
                aria-hidden
              >
                <span
                  className={`h-[10px] w-[10px] rounded-full border-2 transition-colors ${
                    isCurrent
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--border-muted)] bg-[var(--surface-2)]"
                  }`}
                />
              </span>
              <div
                className={`min-w-0 flex-1 rounded-lg transition-colors ${
                  isCurrent
                    ? "bg-[rgba(60,80,40,0.06)] p-3.5"
                    : "rounded-lg py-0.5 pr-2 hover:bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)]"
                }`}
              >
                {isCurrent ? (
                  <div className="pl-2">
                    <span className="font-semibold text-[var(--foreground)]">
                      {p.title}
                    </span>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      Current article
                    </p>
                  </div>
                ) : (
                  <Link
                    href={`/blog/${p.slug}`}
                    className="block rounded-lg py-1 -my-1 pl-2 no-underline transition-colors hover:text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--surface-2)]"
                  >
                    {isNext && (
                      <span className="mb-0.5 block text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
                        Next in series
                      </span>
                    )}
                    <span className="font-medium text-[var(--foreground)]">
                      {p.title}
                    </span>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      Continue →
                    </p>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {(prevPost || nextPost) && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-4 text-sm">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="rounded-lg py-1 px-2 text-[var(--accent)] no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] hover:text-[var(--accent-hover)]"
            >
              ← Previous in series
            </Link>
          ) : (
            <span />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="block rounded-lg py-1 px-2 text-right text-[var(--accent)] no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--surface-2)_50%,transparent)] hover:text-[var(--accent-hover)]"
            >
              <span className="text-xs text-[var(--muted)]">
                Continue the series →
              </span>
              <span className="mt-0.5 block font-medium text-[var(--foreground)]">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </nav>
  );
}
