export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="tip rounded-[10px] border px-4 py-4 sm:px-5 sm:py-[18px]"
      style={{ borderColor: 'var(--tinted-callout-border)', backgroundColor: 'var(--tinted-callout)' }}
      aria-label="Practical tip"
    >
      <div className="mb-[10px] flex items-center gap-2 text-xs font-semibold tracking-[0.04em] text-[var(--accent-primary)] sm:text-[13px]">
        <span aria-hidden>✓</span>
        <span>Practical Tip</span>
      </div>
      <div className="prose prose-neutral max-w-none leading-[1.6] text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
