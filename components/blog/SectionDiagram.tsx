/**
 * Editorial framework diagram: ordered sequence of pill labels connected by arrows.
 * Use in MDX as <SectionDiagram labels={["Clarity", "Focus", "Energy", "Systems", "Reflection"]} />.
 * Minimal, premium, typography-first; aligns with article content width and rhythm.
 */
type SectionDiagramProps = {
  labels: string[];
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function SectionDiagram({ labels }: SectionDiagramProps) {
  if (!labels?.length) return null;

  return (
    <figure
      className="section-diagram flex w-full justify-center"
      aria-label={`Framework sequence: ${labels.join(", ")}`}
    >
      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-3 rounded-xl bg-black/[0.03] px-4 py-4 dark:bg-white/[0.03] sm:gap-4 sm:px-5 sm:py-5">
        {labels.map((label, i) => (
          <span key={i} className="contents">
            <span
              className="inline-flex items-center rounded-full border border-[var(--border-visible)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium tracking-tight text-[var(--text-strong)] sm:px-5 sm:py-2 sm:text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <span
                className="mx-1.5 flex shrink-0 text-[var(--muted)] opacity-70 sm:mx-3"
                aria-hidden
              >
                <ArrowIcon className="scale-110" />
              </span>
            )}
          </span>
        ))}
      </div>
    </figure>
  );
}
