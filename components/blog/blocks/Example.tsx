/**
 * Editorial block for concrete examples. Content can contain lists.
 * Use inside MDX: <Example>...</Example>
 */
export function Example({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="my-6 rounded-md border-l-[3px] border-l-[rgba(60,80,40,0.35)] bg-[rgba(60,80,40,0.05)] py-4 px-[18px]"
      aria-label="Example"
      role="region"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">
        Example
      </p>
      <div className="prose prose-neutral max-w-none text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-3 [&_ol]:my-3">
        {children}
      </div>
    </aside>
  );
}
