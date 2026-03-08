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
    <div className="mx-auto max-w-[1100px] px-6 py-14 sm:px-8">
      <div className="section-box">
        <div className="flex flex-col gap-4">
          {/* Center: kicker + section title */}
          <header className="section-header flex flex-col items-center text-center">
            <span className="section-kicker mb-1.5 block" aria-hidden="true">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]/70" aria-hidden="true" />
              {section.label}
            </span>
            <h2 id="start-heading" className="text-center !mt-0 mb-0">{section.heading}</h2>
          </header>

          {/* Three cards in a row */}
          <ul
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
            role="list"
          >
            {cards.map((card) => {
              const railClass =
                card.category === "Getting started"
                  ? "card-rail-accent"
                  : card.category === "Systems"
                    ? "card-rail-accent-2"
                    : "card-rail-highlight";

              return (
                <li key={card.title} className="flex min-h-0">
                  <Link
                    href={card.href}
                    className={`card group ${railClass} w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] p-3 sm:p-4 lg:p-4 text-left flex flex-col`}
                  >
                      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--card-rail)]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--card-rail)] opacity-70" aria-hidden="true" />
                          {card.category}
                        </p>
                        <h3 className="mt-3 font-body text-[var(--text-primary)] min-w-0 break-words">
                          {card.title}
                        </h3>
                        <p className="mt-2 flex-1 text-[16px] sm:text-[17px] leading-[1.8] text-[var(--text-body)]">
                          {card.description}
                        </p>
                        <span className="mt-4 link-pill w-fit shrink-0" aria-hidden>
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
          <div className="flex justify-center mt-6">
            <Link
              href={section.secondaryLink.href}
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--accent-primary)] bg-transparent px-6 py-3.5 text-base font-medium text-[var(--accent-primary)] transition-colors hover:bg-[var(--tinted-callout)] hover:text-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-h-[48px]"
            >
              {section.secondaryLink.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
