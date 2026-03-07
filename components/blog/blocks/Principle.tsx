/**
 * Editorial block to present rules or frameworks.
 * Use inside MDX: <Principle>...</Principle>
 */
export function Principle({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="my-6 rounded-md border-l-[3px] border-l-[rgba(60,80,40,0.35)] bg-[rgba(60,80,40,0.05)] py-4 px-[18px]"
      aria-label="Principle"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">
        Principle
      </p>
      <div className="prose prose-neutral max-w-none text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
