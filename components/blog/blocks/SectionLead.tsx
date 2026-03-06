export function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 mt-1.5 text-lg leading-relaxed text-[var(--muted)]">
      {children}
    </p>
  );
}
