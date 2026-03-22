import Link from "next/link";

export type StartHereBannerProps = {
  ctaHref?: string;
};

type StepId = "clarity" | "focus" | "energy" | "systems" | "consistency";

type AtomTier = "lg" | "md" | "sm";

type MapStep = {
  id: StepId;
  title: string;
  subtitle: string;
  tier: AtomTier;
};

const MAP_STEPS: readonly MapStep[] = [
  {
    id: "clarity",
    title: "Clarity",
    subtitle: "Clear the noise",
    tier: "lg",
  },
  {
    id: "focus",
    title: "Focus",
    subtitle: "Protect attention",
    tier: "lg",
  },
  {
    id: "energy",
    title: "Energy",
    subtitle: "Build momentum",
    tier: "sm",
  },
  {
    id: "systems",
    title: "Systems",
    subtitle: "Create structure",
    tier: "sm",
  },
  {
    id: "consistency",
    title: "Consistency",
    subtitle: "Stay in motion",
    tier: "md",
  },
] as const;

/**
 * Node anchors in viewBox units (50, 44 ≈ nucleus).
 * Each spoke length differs: clarity nearest, energy farthest, others in between.
 */
const NODE_ANCHOR: Record<StepId, { x: number; y: number }> = {
  clarity: { x: 50, y: 21 },
  focus: { x: 88, y: 24 },
  energy: { x: 86, y: 80 },
  systems: { x: 34, y: 71 },
  consistency: { x: 8, y: 29 },
};

/** Curved spokes from nucleus (50, 44) to each anchor. */
const SPOKE_PATHS: Record<StepId, string> = {
  clarity: "M 50 44 C 50 36 50 29 50 21",
  focus: "M 50 44 C 62 38 76 29 88 24",
  energy: "M 50 44 C 60 54 74 70 86 80",
  systems: "M 50 44 C 45 56 40 64 34 71",
  consistency: "M 50 44 C 34 39 20 32 8 29",
};

/** Strong at nucleus, fading toward periphery (thin stroke stays readable). */
const SPOKE_STOPS: readonly { offset: string; opacity: number }[] = [
  { offset: "0%", opacity: 0.42 },
  { offset: "24%", opacity: 0.26 },
  { offset: "52%", opacity: 0.12 },
  { offset: "82%", opacity: 0.05 },
  { offset: "100%", opacity: 0.035 },
];

const SVG_PREFIX = "sh-mindmap";

const HUB_MAIN_LABEL = "This is where reading leads you";

export function StartHereBanner({ ctaHref = "/blog" }: StartHereBannerProps) {
  return (
    <section
      className="start-here-mindmap border-t border-[var(--border-subtle)]"
      aria-labelledby="start-here-mindmap-title"
    >
      <div className="home-section start-here-mindmap__wrap">
        <div className="start-here-mindmap__grid">
          <div className="start-here-mindmap__editorial">
            <span className="start-here-mindmap__eyebrow">Start here</span>
            <h2
              id="start-here-mindmap-title"
              className="start-here-mindmap__headline font-heading font-semibold text-[var(--text-primary)]"
            >
              Your first steps
            </h2>
            <p className="start-here-mindmap__lead text-[var(--text-body)]">
              Once you start the guide, it leads you step by step through
              clarity, focus, energy, systems, and consistency — so you always
              know what comes next, without guesswork.
            </p>

            <Link href={ctaHref} className="start-here-mindmap__cta">
              Read the guide
            </Link>
            <p className="start-here-mindmap__meta text-[var(--text-secondary)]">
              Start here · 10 min read · practical guide
            </p>
          </div>

          <div className="start-here-mindmap__visual" aria-hidden="true">
            <figure className="start-here-mindmap__diagram">
              <svg
                className="start-here-mindmap__svg"
                viewBox="0 0 100 88"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <defs>
                  {MAP_STEPS.map((step) => {
                    const end = NODE_ANCHOR[step.id];
                    return (
                      <linearGradient
                        key={step.id}
                        id={`${SVG_PREFIX}-spoke-${step.id}`}
                        gradientUnits="userSpaceOnUse"
                        x1="50"
                        y1="44"
                        x2={end.x}
                        y2={end.y}
                      >
                        {SPOKE_STOPS.map((s) => (
                          <stop
                            key={s.offset}
                            offset={s.offset}
                            stopColor="var(--accent-primary)"
                            stopOpacity={s.opacity}
                          />
                        ))}
                      </linearGradient>
                    );
                  })}
                </defs>
                <g
                  className="start-here-mindmap__conn-main"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                >
                  {MAP_STEPS.map((step) => (
                    <path
                      key={step.id}
                      d={SPOKE_PATHS[step.id]}
                      stroke={`url(#${SVG_PREFIX}-spoke-${step.id})`}
                      strokeWidth={0.38}
                      className="start-here-mindmap__conn-spoke"
                    />
                  ))}
                </g>
              </svg>

              <div className="start-here-mindmap__hub">
                <span className="start-here-mindmap__hub-label">
                  Getting started
                </span>
                <span className="start-here-mindmap__hub-title font-heading font-semibold">
                  {HUB_MAIN_LABEL}
                </span>
              </div>

              {MAP_STEPS.map((step) => (
                <div
                  key={step.id}
                  className="start-here-mindmap__atom"
                  data-pos={step.id}
                  data-tier={step.tier}
                >
                  <span className="start-here-mindmap__atom-label">
                    {step.title}
                  </span>
                  <span className="start-here-mindmap__atom-sub">
                    {step.subtitle}
                  </span>
                </div>
              ))}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
