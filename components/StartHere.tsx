import Link from "next/link";

export type StartHereSection = {
  label: string;
  heading: string;
  secondaryLink: { label: string; href: string };
};

export type StartHereCard = {
  category: string;
  title: string;
  description: string;
  href: string;
};

type StartHereProps = {
  section: StartHereSection;
  cards: readonly StartHereCard[];
};

export function StartHere({ section, cards }: StartHereProps) {
  return (
    <div className="home-section section-padding">
      <div className="home-section-inner">
        <header className="section-header section-header--center">
          <span className="section-kicker" aria-hidden="true">{section.label}</span>
          <h2 id="start-heading" className="!mt-0 mb-0">{section.heading}</h2>
        </header>

        <ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          role="list"
        >
          {cards.map((card) => {
            const railClass =
              card.category === "Tools"
                ? "card-rail-accent-2"
                : card.category === "Systems"
                  ? "card-rail-accent"
                  : "card-rail-workflows";
            const labelClass =
              card.category === "Tools"
                ? "card-label--tools"
                : card.category === "Systems"
                  ? "card-label--systems"
                  : "card-label--workflows";

            return (
              <li key={card.title} className="flex min-h-0">
                <Link
                  href={card.href}
                  className={`card card--home group ${railClass} w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] text-left flex flex-col`}
                >
                      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                        <span className={`${labelClass} inline-flex w-fit px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.08em]`}>
                          {card.category}
                        </span>
                        <h3 className="mt-4 font-body text-lg font-semibold text-[var(--text-primary)] min-w-0 break-words">
                          {card.title}
                        </h3>
                        <p className="mt-3 flex-1 text-[17px] leading-[1.7] text-[var(--text-body)]">
                          {card.description}
                        </p>
                        <span className="mt-5 link-pill w-fit shrink-0" aria-hidden>
                          <span>Read</span>
                          <span className="link-pill-arrow">→</span>
                        </span>
                      </div>
                    </Link>
                </li>
              );
            })}
          </ul>

        {/* Browse all guides directly under the card grid */}
        <div className="flex justify-center mt-8">
          <Link
            href={section.secondaryLink.href}
            className="inline-flex items-center justify-center rounded-2xl border border-[var(--accent-primary)] bg-transparent px-6 py-3.5 text-base font-medium text-[var(--accent-primary)] transition-colors hover:bg-[var(--tinted-callout)] hover:text-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-h-[48px]"
          >
            {section.secondaryLink.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
