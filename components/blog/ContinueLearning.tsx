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

  if (isNavNext) {
    return (
      <Link
        href={href}
        className="group block rounded-xl border border-[var(--border-subtle)] bg-[var(--tinted-related)] py-5 pl-5 pr-5 hover:bg-[var(--tinted-callout)] hover:border-[var(--border-default)] sm:py-6 sm:pl-6 sm:pr-6 transition-colors duration-200 text-left w-full max-w-[36rem] mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        style={{ borderLeftWidth: "3px", borderLeftColor: "var(--tinted-callout-border)" }}
      >
        <span className="block font-heading text-xl font-medium tracking-tight text-[var(--text-primary)] sm:text-2xl group-hover:text-[var(--accent-primary)] underline-offset-2 transition-colors">
          {title}
        </span>
        <span className="mt-2 block text-sm text-[var(--text-secondary)]" aria-hidden>
          Read next →
        </span>
        {excerpt && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {excerpt}
          </p>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group block transition-colors ${
        isNav
          ? "rounded-r-lg border border-[var(--border-default)] border-l-[3px] border-l-[var(--accent-primary)] bg-[var(--tinted-related)] py-4 px-4 hover:bg-[var(--tinted-callout)]"
          : `rounded-2xl border border-[var(--border-default)] bg-[var(--surface)] hover:border-[var(--border-visible)] hover:bg-[var(--tinted-callout)] ${isCompact ? "p-3" : "p-5"}`
      }`}
    >
      {label && (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </span>
      )}
      <span
        className={`font-medium text-[var(--text-primary)] underline-offset-2 group-hover:text-[var(--accent-primary)] group-hover:underline inline-flex flex-wrap items-baseline gap-2 transition-colors ${
          isCompact ? "text-sm" : "text-base"
        }`}
      >
        {title}
        <span className="shrink-0 text-[var(--text-secondary)]" aria-hidden>
          →
        </span>
      </span>
      {excerpt && !isCompact && (
        <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-secondary)] sm:mt-2">
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

  return (
    <nav
      className="mx-auto max-w-2xl font-body"
      aria-label="Next step navigation"
    >
      <div className="text-center">
        <h2 className="font-heading text-lg font-medium text-[var(--text-primary)]">
          {sectionHeading}
        </h2>
      </div>

      <div className="mt-12">
        {nextPost && (
          <div className="flex flex-col items-center w-full">
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
