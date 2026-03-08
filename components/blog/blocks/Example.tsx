/**
 * Editorial block for concrete examples. Use structured pairs like **Routine:** ... **Stack:** ...
 * Key terms (bold in MDX) render at font-weight 600.
 */
export function Example({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="example rounded-lg border-l-[3px] px-4 py-4 sm:px-5 sm:py-[18px]"
      style={{ borderLeftColor: 'var(--tinted-callout-border)', backgroundColor: 'var(--tinted-callout)' }}
      aria-label="Example"
      role="region"
    >
      <p className="mb-[10px] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)] sm:text-[12px]">
        Example
      </p>
      <div className="prose prose-neutral max-w-none text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:my-3 [&_ol]:my-3">
        {children}
      </div>
    </aside>
  );
}
