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
  const title = seriesTitle ? `${seriesTitle} Series` : "Series";
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const progress = currentIndex >= 0 ? `${currentIndex + 1} of ${posts.length}` : "";

  if (posts.length === 0) return null;

  return (
    <nav
      className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/60 px-4 py-4"
      aria-label="Series navigation"
    >
      <p className="font-medium text-[var(--foreground)]">{title}</p>
      {progress && (
        <p className="mt-1 text-sm text-[var(--muted)]">{progress}</p>
      )}
      <ol className="mt-4 space-y-4 list-none pl-0 text-sm" role="list">
        {posts.map((p, index) => {
          const isCurrent = p.slug === currentSlug;
          const num = index + 1;
          return (
            <li
              key={p.slug}
              aria-current={isCurrent ? "step" : undefined}
              className="flex gap-3"
            >
              <span className="mt-0.5 shrink-0 w-5 text-right tabular-nums text-[var(--muted)]">
                {num}
              </span>
              <div className="min-w-0 flex-1">
                {isCurrent ? (
                  <>
                    <span className="font-semibold text-[var(--foreground)]">
                      {p.title}
                    </span>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      Current article
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]"
                    >
                      {p.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      Read article →
                    </p>
                  </>
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
              className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]"
            >
              ← Previous in series
            </Link>
          ) : (
            <span />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="block text-right text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]"
            >
              <span className="text-xs text-[var(--muted)]">Continue the series →</span>
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
