/**
 * Key Idea block: highlights one important idea inside an article.
 * Calm, editorial, soft tinted background with subtle left border accent.
 * Use in MDX: <InsightBlock>...</InsightBlock>
 */
export function InsightBlock({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="insight-block key-idea rounded-xl border-l-[3px] py-4 pl-5 pr-5 sm:py-5 sm:pl-6 sm:pr-6 not-prose"
      style={{
        borderLeftColor: "var(--tinted-callout-border)",
        backgroundColor: "var(--tinted-callout)",
      }}
      aria-label="Key idea"
    >
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--accent-primary)] sm:text-xs">
        Key Idea
      </p>
      <div className="text-[var(--text-primary)] text-[1.0625rem] leading-[1.65] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
