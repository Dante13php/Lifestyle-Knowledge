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
  const nextIndex = currentIndex >= 0 && currentIndex < posts.length - 1 ? currentIndex + 1 : null;

  if (posts.length === 0) return null;

  return (
    <section
      className="border-t border-[var(--border)] pt-10 mt-14"
      aria-label="Series progress"
    >
      <h2 className="font-heading text-lg font-medium text-[var(--foreground)]">
        {seriesTitle}
      </h2>
      <ol
        className="mt-6 space-y-4 list-none pl-0 font-body text-[var(--text-body)]"
        role="list"
      >
        {posts.map((p: Post, index: number) => {
          const step = index + 1;
          const isCurrent = p.slug === currentSlug;
          const isNext = nextIndex !== null && index === nextIndex;

          if (isCurrent) {
            return (
              <li
                key={p.slug}
                aria-current="step"
                className="flex items-baseline gap-3"
              >
                <span className="shrink-0 w-6 text-right tabular-nums text-[var(--muted)]">
                  {step}
                </span>
                <span className="inline-flex items-center gap-2 text-[var(--foreground)]">
                  <span className="text-[var(--accent)]" aria-hidden>✓</span>
                  <span>{p.title}</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                    Completed
                  </span>
                </span>
              </li>
            );
          }

          if (isNext) {
            return (
              <li key={p.slug} className="flex items-baseline gap-3">
                <span className="shrink-0 w-6 text-right tabular-nums text-[var(--muted)]">
                  {step}
                </span>
                <Link
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center gap-2 font-medium text-[var(--foreground)] underline-offset-2 hover:underline group"
                >
                  {p.title}
                  <span className="text-[var(--accent)] text-sm group-hover:translate-x-0.5 transition-transform">
                    Read next →
                  </span>
                </Link>
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
                className="hover:text-[var(--foreground)]"
              >
                {p.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
