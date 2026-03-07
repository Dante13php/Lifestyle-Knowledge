/**
 * Lightweight editorial emphasis block — a single standout sentence or short note.
 * Softer and smaller than KeyInsight; no label, refined left accent.
 */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="highlight rounded-lg border-l-[3px] border-l-[rgba(60,80,40,0.28)] bg-[rgba(60,80,40,0.05)] px-4 py-3 font-medium leading-[1.5] text-[var(--text-body)] not-italic sm:px-[18px] sm:py-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
      aria-label="Highlight"
    >
      {children}
    </aside>
  );
}
