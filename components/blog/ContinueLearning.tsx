import Link from "next/link";
import {
  getSeriesNav,
  getSeriesPosts,
  getRelatedForContinueLearning,
  getPostBySlug,
  type Post,
} from "@/lib/posts";

type ContinueLearningProps = {
  currentSlug: string;
  seriesSlug?: string;
  tags: string[];
  category: string;
};

function Card({
  href,
  title,
  excerpt,
  label,
  variant = "default",
}: {
  href: string;
  title: string;
  excerpt: string;
  label?: string;
  variant?: "default" | "compact" | "nav" | "navNext";
}) {
  const isCompact = variant === "compact";
  const isNav = variant === "nav" || variant === "navNext";
  const isNavNext = variant === "navNext";
  return (
    <Link
      href={href}
      className={`group block transition-colors ${
        isNav
          ? isNavNext
            ? "rounded-lg border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)]/70 py-5 px-5 hover:bg-[var(--surface)]/90 sm:py-6 sm:px-6"
            : "rounded-r-lg border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)]/60 py-4 px-4 hover:bg-[var(--surface)]/80"
          : `rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/50 hover:border-[var(--border)] hover:bg-[var(--surface-2)]/70 ${
              isCompact ? "p-3" : "p-5"
            }`
      }`}
    >
      {label && (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {label}
        </span>
      )}
      <span
        className={`font-medium text-[var(--foreground)] underline-offset-2 group-hover:underline inline-flex flex-wrap items-baseline gap-2 ${
          isCompact
            ? "text-sm"
            : isNavNext
              ? "text-xl sm:text-2xl"
              : "text-base"
        } ${isNavNext ? "w-fit" : ""}`}
      >
        {title}
        <span className="shrink-0 text-[var(--muted)]" aria-hidden>
          →
        </span>
      </span>
      {excerpt && !isCompact && (
        <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)] sm:mt-2">
          {excerpt}
        </p>
      )}
    </Link>
  );
}

export function ContinueLearning({
  currentSlug,
  seriesSlug,
  tags,
  category,
}: ContinueLearningProps) {
  const seriesNav = seriesSlug ? getSeriesNav(currentSlug) : null;
  const seriesPosts = seriesSlug ? getSeriesPosts(seriesSlug) : [];
  const excludeSlugs = seriesPosts.map((p) => p.slug);
  const relatedLimit = seriesNav ? 4 : 6;
  const related = getRelatedForContinueLearning(currentSlug, {
    limit: relatedLimit,
    excludeSlugs,
    category,
    tags,
  });

  const nextPost =
    seriesNav?.nextPost != null ? getPostBySlug(seriesNav.nextPost.slug) : null;
  const hasRelated = related.length > 0;

  if (!nextPost && !hasRelated) return null;

  const sectionHeading = nextPost ? "Next step" : "More to explore";
  const nextStepNumber = seriesNav ? seriesNav.index + 1 : null;
  const showStepBreadcrumb =
    nextPost && seriesNav != null && nextStepNumber != null && nextStepNumber <= seriesNav.total;

  return (
    <nav
      className="mx-auto max-w-xl font-body"
      aria-label="Next step navigation"
    >
      <div className="text-center">
        <h2 className="font-heading text-lg font-medium text-[var(--foreground)]">
          {sectionHeading}
        </h2>
      </div>

      <div className="mt-12">
        {nextPost && (
          <div className="flex flex-col items-center">
            {showStepBreadcrumb && seriesNav && nextStepNumber != null && (
              <p className="mb-3 text-sm text-[var(--muted)]">
                Step {nextStepNumber} of {seriesNav.total}
              </p>
            )}
            <Card
              href={`/blog/${nextPost.slug}`}
              title={nextPost.title}
              excerpt={nextPost.description}
              variant="navNext"
            />
          </div>
        )}

        {!nextPost && hasRelated && (
          <div className="grid gap-4 sm:grid-cols-2">
            {related.slice(0, 4).map((p: Post) => (
              <Card
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                excerpt={p.description}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
