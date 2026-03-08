/**
 * Key Takeaways: end-of-article summary block.
 * Structured card list with subtle tint, clear heading, and optional marker per item.
 * Reusable across all articles; use in ArticleLayout when post.takeaways is present.
 */
type KeyTakeawaysProps = {
  items: string[];
  /** Optional heading (default: "What to remember") */
  title?: string;
  /** Optional class for spacing (e.g. mb-8) */
  className?: string;
};

function TakeawayMarker() {
  return (
    <span
      className="key-takeaways-marker flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold leading-none"
      style={{ backgroundColor: "var(--tinted-callout)", color: "var(--accent-primary)" }}
      aria-hidden
    >
      ✓
    </span>
  );
}

export function KeyTakeaways({
  items,
  title = "What to remember",
  className,
}: KeyTakeawaysProps) {
  if (!items?.length) return null;

  return (
    <section
      className={`key-takeaways rounded-xl border py-6 px-5 sm:py-8 sm:px-8 ${className ?? ""}`.trim()}
      style={{
        borderColor: "var(--tinted-callout-border)",
        backgroundColor: "var(--tinted-takeaway)",
      }}
      aria-label="Key takeaways"
    >
      <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)] sm:mb-6">
        {title}
      </h2>
      <ul className="grid list-none grid-cols-1 gap-4 pl-0 sm:gap-5 md:grid-cols-2 md:gap-x-8 md:gap-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 sm:gap-4">
            <TakeawayMarker />
            <span className="min-w-0 pt-0.5 text-[var(--text-primary)] text-[15px] leading-[1.6] sm:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
