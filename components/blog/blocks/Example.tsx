export function Example({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/60 p-4 sm:px-5 sm:py-4"
      role="region"
      aria-label="Example"
    >
      <div className="prose prose-neutral max-w-none text-[var(--text-body)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 md:columns-2 md:gap-6">
        {children}
      </div>
    </div>
  );
}
