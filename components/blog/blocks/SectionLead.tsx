export function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-lead text-lg leading-relaxed text-[var(--muted)]">
      {children}
    </div>
  );
}
