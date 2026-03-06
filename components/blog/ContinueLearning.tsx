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
}: {
  href: string;
  title: string;
  excerpt: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-4 transition-colors hover:border-[var(--border)] hover:bg-[var(--surface-2)]/70"
    >
      {label && (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {label}
        </span>
      )}
      <span className="font-medium text-[var(--foreground)] underline-offset-2 group-hover:underline">
        {title}
      </span>
      {excerpt && (
        <p className="mt-1.5 line-clamp-2 text-sm text-[var(--muted)]">
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

  const prevPost =
    seriesNav?.prevPost != null ? getPostBySlug(seriesNav.prevPost.slug) : null;
  const nextPost =
    seriesNav?.nextPost != null ? getPostBySlug(seriesNav.nextPost.slug) : null;
  const hasSeriesCards = !!(prevPost || nextPost);
  const hasRelated = related.length > 0;

  if (!hasSeriesCards && !hasRelated) return null;

  return (
    <section className="mt-10" aria-label="Continue learning">
      <h2 className="font-heading text-lg text-[var(--foreground)]">
        Continue learning
      </h2>

      <div
        className={
          hasSeriesCards
            ? "mt-6 grid gap-6 md:grid-cols-2"
            : "mt-6 grid gap-6"
        }
      >
        {hasSeriesCards && (
          <div className="flex flex-col gap-4">
            {prevPost && (
              <Card
                href={`/blog/${prevPost.slug}`}
                title={prevPost.title}
                excerpt={prevPost.description}
                label="Previous in series"
              />
            )}
            {nextPost && (
              <Card
                href={`/blog/${nextPost.slug}`}
                title={nextPost.title}
                excerpt={nextPost.description}
                label="Next in series"
              />
            )}
          </div>
        )}

        <div
          className={
            hasSeriesCards
              ? "grid gap-4 sm:grid-cols-2"
              : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {related.map((p: Post) => (
            <Card
              key={p.slug}
              href={`/blog/${p.slug}`}
              title={p.title}
              excerpt={p.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
