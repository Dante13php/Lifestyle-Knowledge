/**
 * Editorial block to present rules or frameworks.
 * Use inside MDX: <Principle>...</Principle>
 */
export function Principle({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="principle rounded-md border-l-[3px] py-3 px-4 sm:py-4 sm:px-[18px]"
      style={{ borderLeftColor: 'var(--tinted-callout-border)', backgroundColor: 'var(--tinted-callout)' }}
      aria-label="Principle"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)] sm:text-xs">
        Principle
      </p>
      <div className="prose prose-neutral max-w-none text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
