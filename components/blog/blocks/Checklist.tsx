type ChecklistProps = {
  title?: string;
  children: React.ReactNode;
};

export function Checklist({ title, children }: ChecklistProps) {
  return (
    <div
      className="checklist rounded-2xl border p-4 sm:px-5 sm:py-4 [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul_li]:relative [&_ul_li]:pl-6 [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:content-['✓'] [&_ul_li]:before:font-medium [&_ul_li]:before:text-[var(--accent-primary)]"
      style={{ borderColor: 'var(--tinted-callout-border)', backgroundColor: 'var(--tinted-callout)' }}
      role="region"
      aria-label={title ?? "Checklist"}
    >
      {title && (
        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)]">{title}</p>
      )}
      {children}
    </div>
  );
}
