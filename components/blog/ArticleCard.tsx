import Link from "next/link";

export type ArticleCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateDisplay: string;
};

export function ArticleCard({
  slug,
  title,
  excerpt,
  date,
  dateDisplay,
}: ArticleCardProps) {
  return (
    <li>
      <article>
        <Link
          href={`/blog/${slug}`}
          className="group block min-h-[44px] rounded-xl border border-[var(--border-default)] bg-[var(--background-elevated)] p-5 transition-colors hover:border-[var(--border-visible)] hover:bg-[var(--tinted-related)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-w-0"
        >
          <time
            dateTime={date}
            className="text-xs text-[var(--text-secondary)]"
          >
            {dateDisplay}
          </time>
          <h3 className="mt-2 text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)] line-clamp-3">
            {excerpt}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
            Read article
            <span className="ml-1 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden>→</span>
          </span>
        </Link>
      </article>
    </li>
  );
}
