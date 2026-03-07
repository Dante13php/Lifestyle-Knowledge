import Link from "next/link";
import { getSeriesPosts, type Post } from "@/lib/posts";

type SeriesProgressProps = {
  currentSlug: string;
  seriesSlug: string;
  seriesTitle: string;
};

export function SeriesProgress({
  currentSlug,
  seriesSlug,
  seriesTitle,
}: SeriesProgressProps) {
  const posts = getSeriesPosts(seriesSlug);
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);

  if (posts.length === 0) return null;

  return (
    <section
      className="mt-10 border-t border-[var(--border)] pt-8 sm:mt-14 sm:pt-10"
      aria-label="Series progress"
    >
      <h2 className="font-heading text-base font-medium text-[var(--foreground)] sm:text-lg">
        {seriesTitle}
      </h2>
      <ol
        className="mt-6 space-y-4 list-none pl-0 font-body text-[var(--text-body)]"
        role="list"
      >
        {posts.map((p: Post, index: number) => {
          const step = index + 1;
          const isCurrent = p.slug === currentSlug;
          const isUpcoming = currentIndex >= 0 && index > currentIndex;

          if (isCurrent) {
            return (
              <li
                key={p.slug}
                aria-current="step"
                className="flex items-start gap-3 opacity-90"
              >
                <span className="shrink-0 w-6 text-right tabular-nums text-[var(--muted)]">
                  {step}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 text-[var(--muted)]">
                    <span className="text-[var(--accent)]" aria-hidden>✓</span>
                    <span>{p.title}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] sm:text-[11px]">
                    Completed
                  </p>
                </div>
              </li>
            );
          }

          return (
            <li key={p.slug} className="flex items-baseline gap-3">
              <span className="shrink-0 w-6 text-right tabular-nums text-[var(--muted)]">
                {step}
              </span>
              <Link
                href={`/blog/${p.slug}`}
                className="group inline-flex items-center gap-2 font-medium text-[var(--foreground)] underline-offset-2 hover:underline"
              >
                {p.title}
                {isUpcoming && (
                  <span className="text-[var(--accent)] text-sm">
                    Read next →
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
