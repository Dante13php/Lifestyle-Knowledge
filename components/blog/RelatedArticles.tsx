import Link from "next/link";
import { getRelatedPosts, type Post } from "@/lib/posts";

type RelatedArticlesProps = {
  /** Current post slug (excluded from results). */
  currentSlug: string;
  /** Max number of cards (default 3). */
  limit?: number;
};

function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group related-articles-card block rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5 transition-colors duration-200 hover:border-[var(--border-visible)] hover:bg-[var(--tinted-callout)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <h3 className="font-heading text-lg font-medium tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        {post.description}
      </p>
      <span className="mt-3 inline-block text-sm font-medium text-[var(--accent-primary)] group-hover:underline" aria-hidden>
        Read article →
      </span>
    </Link>
  );
}

/**
 * Related articles block: 3 cards (title, description, link) to increase session depth.
 * Prefers manual related from frontmatter, then by tags. Use in layout with currentSlug.
 */
export function RelatedArticles({
  currentSlug,
  limit = 3,
}: RelatedArticlesProps) {
  const byManual = getRelatedPosts(currentSlug, { by: "manual", limit: limit + 1 });
  const manualFiltered = byManual.filter((p) => p.slug !== currentSlug).slice(0, limit);
  const related =
    manualFiltered.length >= limit
      ? manualFiltered
      : getRelatedPosts(currentSlug, { by: "tags", limit });

  if (related.length === 0) return null;

  return (
    <section
      className="related-articles mt-10 pt-8 border-t border-[var(--border-subtle)]"
      aria-label="Related articles"
    >
      <h2 className="font-heading text-lg font-medium text-[var(--text-primary)] mb-6">
        Related articles
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none pl-0">
        {related.map((post) => (
          <li key={post.slug}>
            <ArticleCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
