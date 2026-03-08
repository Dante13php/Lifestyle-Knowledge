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
      className="mt-8 border-t border-[var(--border-default)] pt-6 sm:mt-10 sm:pt-8"
      aria-label="Series progress"
    >
      <h2 className="font-heading text-base font-medium text-[var(--text-primary)] sm:text-lg">
        {seriesTitle}
      </h2>
      <ol
        className="mt-4 space-y-3 list-none pl-0 font-body text-[var(--text-body)]"
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
                <span className="shrink-0 w-6 text-right tabular-nums text-[var(--text-secondary)]">
                  {step}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-primary)]" aria-hidden>✓</span>
                    <span>{p.title}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] sm:text-[11px]">
                    Completed
                  </p>
                </div>
              </li>
            );
          }

          return (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex items-baseline gap-3 rounded-lg border-l-2 border-l-transparent py-2 pl-2 pr-3 -ml-2 font-medium text-[var(--text-primary)] no-underline transition-[background-color,border-color,color] duration-150 hover:bg-[var(--tinted-callout)] hover:border-l-[var(--accent-primary)] hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                <span className="shrink-0 w-6 text-right tabular-nums text-[var(--text-secondary)] transition-colors group-hover:text-[var(--accent-primary)]">
                  {step}
                </span>
                <span className="min-w-0 flex-1">{p.title}</span>
                {isUpcoming && (
                  <span className="text-[var(--accent-primary)] text-sm shrink-0 group-hover:text-[var(--accent-hover)] transition-colors">
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
