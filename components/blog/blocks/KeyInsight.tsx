/**
 * Editorial block to highlight the most important idea in a section.
 * Use inside MDX: <KeyInsight>...</KeyInsight>
 */
export function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="my-6 rounded-md border-l-[3px] border-l-[rgba(60,80,40,0.35)] bg-[rgba(60,80,40,0.05)] py-4 px-[18px]"
      aria-label="Key insight"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">
        Key insight
      </p>
      <div className="prose prose-neutral max-w-none text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
