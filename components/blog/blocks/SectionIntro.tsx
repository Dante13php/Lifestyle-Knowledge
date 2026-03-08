/**
 * Section intro pattern: short supporting line under a section heading.
 * Use after ## Heading in MDX: <SectionIntro subtitle="Know What Actually Matters" />
 * Optional title shows as small label above subtitle when provided.
 */
type SectionIntroProps = {
  title?: string;
  subtitle: string;
};

export function SectionIntro({ title, subtitle }: SectionIntroProps) {
  return (
    <div className="section-intro mt-0 mb-4 sm:mb-5">
      {title != null && title !== "" && (
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          {title}
        </p>
      )}
      <p className="section-lead text-[var(--text-secondary)] text-base leading-relaxed sm:text-lg max-w-[48ch]">
        {subtitle}
      </p>
    </div>
  );
}
