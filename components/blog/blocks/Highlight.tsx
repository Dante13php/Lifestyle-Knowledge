export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-[var(--accent)] bg-[var(--surface-2)]/50 py-2.5 pl-4 pr-4 text-[var(--text-body)] not-italic sm:pl-5">
      {children}
    </p>
  );
}
