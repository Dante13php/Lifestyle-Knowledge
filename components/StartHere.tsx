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
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:py-14">
      <div className="rounded-2xl border border-[var(--border)] bg-transparent p-7 sm:p-9 lg:p-12">
        <div className="flex flex-col gap-4">
            {/* Center: kicker + section title */}
            <div className="flex flex-col items-center text-center mb-6">
              <span className="section-kicker mb-1.5 block" aria-hidden="true">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]/70" aria-hidden="true" />
                {section.label}
              </span>
              <h2 id="start-heading" className="text-center !mt-0 mb-0">{section.heading}</h2>
            </div>

            {/* Three cards in a row */}
            <ul
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 lg:gap-5 items-stretch"
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
                      className={`card group ${railClass} w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] p-4 sm:p-5 lg:p-5 xl:p-6 text-left flex flex-col`}
                    >
                      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--card-rail)]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--card-rail)] opacity-70" aria-hidden="true" />
                          {card.category}
                        </p>
                        <h3 className="mt-3 font-body text-[var(--foreground)] min-w-0 break-words">
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

            {/* Browse all guides below the cards */}
            <div className="flex justify-center">
              <Link
                href={section.secondaryLink.href}
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--accent)] bg-transparent px-6 py-3.5 text-base font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/[0.09] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] min-h-[48px]"
              >
                {section.secondaryLink.label}
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
