/**
 * Editorial framework diagram: ordered sequence of conceptual nodes.
 * Use in MDX: <SectionDiagram items={["Clarity", "Focus", "Energy", "Systems", "Reflection"]} />
 * or <SectionDiagram labels={["..."]} />. Light, knowledge-framework feel — not filter tags.
 */
type SectionDiagramProps = {
  /** Framework steps (preferred). */
  items?: string[];
  /** Alias for items (backward compatible). */
  labels?: string[];
};

export function SectionDiagram({ items, labels }: SectionDiagramProps) {
  const list = items?.length ? items : labels ?? [];
  if (!list.length) return null;

  return (
    <figure
      className="section-diagram not-prose w-full py-2 sm:py-3"
      aria-label={`Framework: ${list.join(" → ")}`}
    >
      <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-6 sm:gap-y-4">
        {list.map((label, i) => (
          <span key={i} className="contents">
            <span
              className="inline-flex items-center rounded-lg border px-5 py-2 text-sm font-normal tracking-tight text-[var(--text-primary)] sm:px-6 sm:py-2.5 sm:text-[0.9375rem]"
              style={{
                fontFamily: "var(--font-body)",
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--tinted-diagram)",
              }}
            >
              {label}
            </span>
            {i < list.length - 1 && (
              <span
                className="inline-flex shrink-0 px-1 text-[var(--text-secondary)] text-base sm:px-1.5"
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
