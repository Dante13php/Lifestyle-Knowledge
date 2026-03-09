import Link from "next/link";

export type StartHereBannerGuidePreview = {
  title: string;
  description: string;
  category: string;
  href: string;
};

export type StartHereBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  meta?: string;
  guidePreview: StartHereBannerGuidePreview;
};

export function StartHereBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  meta,
  guidePreview,
}: StartHereBannerProps) {
  return (
    <section
      className="start-here-banner border-t border-[var(--border-subtle)]"
      aria-labelledby="start-here-title"
    >
      <div className="home-section section-padding">
        <div className="start-here-banner__grid">
          {/* Left: editorial content */}
          <div className="start-here-banner__content">
            <span className="start-here-banner__eyebrow" aria-hidden="true">
              {eyebrow}
            </span>
            <h2
              id="start-here-title"
              className="start-here-banner__title font-heading font-semibold text-[var(--text-primary)]"
            >
              {title}
            </h2>
            <p className="start-here-banner__desc text-[var(--text-body)]">
              {description}
            </p>
            <div className="start-here-banner__actions">
              <Link
                href={ctaHref}
                className="start-here-banner__cta inline-flex items-center min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-hover)] bg-[var(--accent-hover)] px-6 py-3 text-base font-medium text-[var(--on-accent)] shadow-[0_2px_8px_rgba(30,26,24,0.12)] hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:shadow-[0_4px_12px_rgba(30,26,24,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] transition-[box-shadow,border-color,background-color] duration-200"
              >
                {ctaLabel}
              </Link>
            </div>
            {meta && (
              <p className="start-here-banner__meta text-[var(--text-secondary)] text-sm">
                {meta}
              </p>
            )}
          </div>

          {/* Right: guide preview (featured article block) */}
          <div className="start-here-banner__preview-wrap">
            <Link
              href={guidePreview.href}
              className="start-here-banner__preview focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <span className="start-here-banner__preview-chip">
                {guidePreview.category}
              </span>
              <h3 className="start-here-banner__preview-title font-heading font-semibold text-[var(--text-primary)]">
                {guidePreview.title}
              </h3>
              <p className="start-here-banner__preview-desc text-[var(--text-body)]">
                {guidePreview.description}
              </p>
              <span className="start-here-banner__preview-arrow" aria-hidden>
                Read guide →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
