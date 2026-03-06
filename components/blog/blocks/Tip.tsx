export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="my-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/60 p-4 sm:px-5 sm:py-4"
      aria-label="Practical tip"
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
        <span aria-hidden>✓</span>
        <span>Practical Tip</span>
      </div>
      <div className="prose prose-neutral max-w-none text-[0.9375em] leading-snug text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
