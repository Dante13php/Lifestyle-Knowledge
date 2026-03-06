type PullQuoteProps = {
  children: React.ReactNode;
  author?: string;
  source?: string;
};

export function PullQuote({ children, author, source }: PullQuoteProps) {
  const hasAttribution = author ?? source;

  return (
    <figure className="my-8 not-prose">
      <blockquote className="border-l-[3px] border-[var(--accent)] pl-4 font-[var(--font-heading)] italic text-[var(--muted)]">
        {children}
      </blockquote>
      {hasAttribution && (
        <figcaption className="mt-2 pl-4 text-sm text-[var(--muted)]">
          {author && <cite className="not-italic">{author}</cite>}
          {author && source && " — "}
          {source && <span>{source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
