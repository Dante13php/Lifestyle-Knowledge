type PullQuoteProps = {
  children: React.ReactNode;
  author?: string;
  source?: string;
};

export function PullQuote({ children, author, source }: PullQuoteProps) {
  const hasAttribution = author ?? source;

  return (
    <figure className="pull-quote not-prose my-8 sm:my-10">
      <blockquote className="border-l-[3px] pl-6 sm:pl-8 max-w-[36rem] mx-auto sm:ml-[10%] sm:mr-auto text-left font-[var(--font-heading)] italic text-[var(--text-primary)] text-xl leading-snug sm:text-2xl sm:leading-snug" style={{ borderLeftColor: "var(--tinted-callout-border)" }}>
        {children}
      </blockquote>
      {hasAttribution && (
        <figcaption className="mt-4 pl-6 sm:pl-8 max-w-[36rem] mx-auto sm:ml-[10%] sm:mr-auto text-left text-sm text-[var(--text-secondary)]">
          {author && <cite className="not-italic">{author}</cite>}
          {author && source && " — "}
          {source && <span>{source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
