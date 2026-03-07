/**
 * Editorial framework diagram: ordered sequence of conceptual nodes connected by arrows.
 * Use in MDX as <SectionDiagram labels={["Clarity", "Focus", "Energy", "Systems", "Reflection"]} />.
 * Light, editorial feel — not a UI chip/tag component.
 */
type SectionDiagramProps = {
  labels: string[];
};

export function SectionDiagram({ labels }: SectionDiagramProps) {
  if (!labels?.length) return null;

  return (
    <figure
      className="section-diagram flex w-full justify-center py-1"
      aria-label={`Framework sequence: ${labels.join(", ")}`}
    >
      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-5 sm:gap-y-3">
        {labels.map((label, i) => (
          <span key={i} className="contents">
            <span
              className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-normal tracking-tight text-[var(--text-body)] sm:text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <span
                className="inline-flex shrink-0 px-0.5 text-[var(--muted)] text-sm sm:px-1"
                aria-hidden
              >
                →
              </span>
            )}
          </span>
        ))}
      </div>
    </figure>
  );
}
