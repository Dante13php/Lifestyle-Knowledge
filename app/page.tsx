import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { StartHere } from "@/components/StartHere";
import { StartHereBanner } from "@/components/StartHereBanner";

const startHereBanner = {
  eyebrow: "Start here",
  title: "Your first steps",
  description:
    "Build habits that stick and clear mental clutter. A short, practical guide to get started—no hype, just what works.",
  ctaLabel: "Read the guide",
  ctaHref: "/blog",
  meta: "For new readers · 10 min read",
  guidePreview: {
    title: "First steps",
    description:
      "Build habits that stick and clear mental clutter with a short, practical guide to your first steps.",
    category: "Getting started",
    href: "/blog",
  },
} as const;

const productivityInsightsSection = {
  label: "Curated for you",
  heading: "Productivity insights",
  secondaryLink: { label: "Browse all guides", href: "/blog" },
} as const;

const productivityInsightsCards = [
  {
    category: "Getting started",
    title: "First steps",
    description:
      "Build habits that stick and clear mental clutter with a short, practical guide to your first steps.",
    href: "/blog",
  },
  {
    category: "Systems",
    title: "How we think about productivity",
    description:
      "Principles over hacks: frameworks that scale with your life and work so you can sustain momentum.",
    href: "/blog",
  },
  {
    category: "Tools",
    title: "Curated recommendations",
    description:
      "Honest reviews and comparisons — only what we use and why, so you can choose without the noise.",
    href: "/blog",
  },
] as const;

const whatWeCover = [
  {
    category: "Systems",
    title: "Productivity systems",
    description: "GTD, time blocking, second brains, and sustainable routines.",
    href: "/blog",
  },
  {
    category: "Tools",
    title: "Tools & apps",
    description: "Task managers, note-taking, calendar design, and workflows.",
    href: "/blog",
  },
  {
    category: "Workflows",
    title: "Workflows",
    description: "From inbox zero to weekly reviews—practices that compound.",
    href: "/blog",
  },
  {
    category: "Comparisons",
    title: "Comparisons",
    description: "Side-by-side looks at popular tools so you can choose clearly.",
    href: "/blog",
  },
] as const;

const latestPosts = [
  {
    slug: "time-blocking-basics",
    title: "Time Blocking 101: Structure Your Day for Deep Focus",
    excerpt:
      "How to structure your day with time blocks for better focus and less context-switching.",
    date: "2025-01-15",
    dateDisplay: "January 2025",
    category: "Systems",
    readTime: "8 min read",
  },
  {
    slug: "best-task-apps",
    title: "Best Task Management Apps in 2025",
    excerpt:
      "A roundup of task and project management tools—from simple to-do lists to full project systems.",
    date: "2025-01-08",
    dateDisplay: "January 2025",
    category: "Tools",
    readTime: "12 min read",
  },
  {
    slug: "morning-routine",
    title: "How to Build a Morning Routine That Sticks",
    excerpt:
      "Small, actionable steps for a calmer, more intentional start to your day.",
    date: "2024-12-20",
    dateDisplay: "December 2024",
    category: "Getting started",
    readTime: "6 min read",
  },
] as const;

/* Minimal icons for topic blocks (no card) */
const TopicIcon = ({
  type,
  className,
}: {
  type: "systems" | "tools" | "workflows" | "comparisons";
  className?: string;
}) => {
  const size = 24;
  const icons = {
    systems: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    tools: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    workflows: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    comparisons: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  };
  return icons[type];
};

export const metadata: Metadata = {
  title: "Lifestyle Knowledge | Time Management, Tools & Systems That Work",
  description:
    "Practical productivity tips, time management strategies, and honest tool reviews. Get focused, stay organized, and build systems that actually work.",
  openGraph: {
    title: "Lifestyle Knowledge | Time Management, Tools & Systems That Work",
    description:
      "Practical productivity tips, time management strategies, and honest tool reviews.",
    url: "/",
  },
};

export default function Home() {
  const siteUrl =
    (typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : null) ?? "https://productivityblog.com";

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Lifestyle Knowledge | Time Management, Tools & Systems That Work",
    description:
      "Practical productivity tips, time management strategies, and honest tool reviews.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: latestPosts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: `${siteUrl}/blog/${post.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <div className="min-h-screen">
        {/* 1. Hero — centered, same width container */}
        <section
          className="hero-gradient relative flex min-h-[52vh] flex-col justify-center overflow-hidden py-12 sm:py-14"
          aria-labelledby="hero-heading"
        >
          <div className="hero-shapes" aria-hidden="true">
            <span className="hero-shape hero-shape--olive" />
            <span className="hero-shape hero-shape--beige" />
          </div>
          <div className="home-section relative z-10">
            <div className="home-section-inner flex flex-col items-center text-center">
              <h1
                id="hero-heading"
                className="display-hero text-balance text-[var(--text-primary)]"
              >
                Systems over
                <br />
                <span className="font-semibold text-[#556B4F]">willpower</span>
                <span className="text-[var(--accent-primary)]">.</span>
              </h1>
              <p className="lead-hero mt-5 text-[var(--text-body)]">
                Practical guides and honest recommendations for focus,
                organization, and tools that actually work.
              </p>
              <div
                className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-11 sm:gap-5"
                role="group"
                aria-label="Primary actions"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-hover)] bg-[var(--accent-hover)] px-6 py-3 text-base font-medium text-[var(--on-accent)] shadow-[0_2px_8px_rgba(30,26,24,0.12)] hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] hover:shadow-[0_4px_12px_rgba(30,26,24,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] transition-[box-shadow,border-color,background-color] duration-200"
                >
                  Read the blog
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-primary)] bg-transparent px-6 py-3 text-base font-medium text-[var(--text-body)] hover:bg-[var(--tinted-callout)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] transition-colors duration-200"
                >
                  Resources
                </Link>
              </div>
              <p
                className="mt-8 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)] opacity-80"
                role="status"
              >
                No hype. Practical. Updated regularly.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Start here — featured banner (split layout, not a card) */}
        <StartHereBanner {...startHereBanner} />

        {/* 3. Productivity insights — ONLY major card grid (3 cards) */}
        <section
          className="section-bg-base border-t border-subtle"
          aria-labelledby="insights-heading"
        >
          <StartHere
            section={productivityInsightsSection}
            cards={productivityInsightsCards}
          />
        </section>

        {/* 4. What we cover — icon/text topic blocks, centered */}
        <section
          className="section-bg-base border-t border-subtle section-padding"
          aria-labelledby="cover-heading"
        >
          <div className="home-section">
            <div className="home-section-inner">
              <header className="section-header section-header--center">
                <h2 id="cover-heading" className="!mt-0">
                  What we cover
                </h2>
                <p className="section-lead text-muted mt-1">
                  A clear map of systems, tools, and workflows — so you can start
                  fast.
                </p>
              </header>
              <ul
                className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 justify-items-center topic-blocks--center"
                role="list"
              >
                {whatWeCover.map((item) => {
                  const blockType =
                    item.category === "Systems"
                      ? "systems"
                      : item.category === "Tools" || item.category === "Comparisons"
                        ? "tools"
                        : "workflows";
                  const iconType =
                    item.category === "Comparisons"
                      ? "comparisons"
                      : blockType;
                  return (
                    <li key={item.title} className="topic-block topic-block--{blockType}">
                      <div className={`topic-block topic-block--${blockType}`}>
                        <div className="topic-block__icon">
                          <TopicIcon type={iconType} />
                        </div>
                        <h3 className="topic-block__title">{item.title}</h3>
                        <p className="topic-block__desc">{item.description}</p>
                        <Link href={item.href} className="topic-block__link">
                          Explore →
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Latest articles — editorial list, centered */}
        <section
          className="section-bg-base border-t border-subtle section-padding"
          aria-labelledby="latest-heading"
        >
          <div className="home-section">
            <div className="home-section-inner home-section-inner--center">
              <header className="section-header section-header--center">
                <h2 id="latest-heading" className="!mt-0">
                  Latest articles
                </h2>
              </header>
              <ul className="article-list" role="list">
                {latestPosts.map((post) => (
                  <li key={post.slug} className="article-list__item">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="article-list__link"
                    >
                      <h3 className="article-list__title">{post.title}</h3>
                      <p className="article-list__excerpt">{post.excerpt}</p>
                      <p className="article-list__meta">
                        <span className="article-list__category">
                          {post.category}
                        </span>
                        {" · "}
                        {post.readTime}
                      </p>
                      <span className="article-list__arrow" aria-hidden>
                        Read article →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Link
                  href="/blog"
                  className="nav-link nav-link--muted gap-1.5 inline-flex"
                >
                  View all articles
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Philosophy — manifesto (centered narrow, no card) */}
        <section
          className="section-bg-base border-t border-subtle section-padding"
          aria-labelledby="philosophy-heading"
        >
          <div className="home-section">
            <div className="section-philosophy-inner">
              <div className="manifesto-divider manifesto-divider--top" aria-hidden />
              <header className="section-header section-header--center">
                <span className="section-kicker" aria-hidden="true">
                  About
                </span>
                <h2 id="philosophy-heading" className="!mt-0">
                  Our philosophy
                </h2>
              </header>
              <p className="manifesto-statement text-center">
                Principles over hacks. Honest guidance for people who want to
                think clearly and work well.
              </p>
              <div className="space-y-5 text-lg text-[var(--text-body)] leading-relaxed text-center">
                <p className="mb-0">
                  Productivity isn’t about doing more in less time. It’s about
                  doing what matters with clarity and calm. We focus on systems
                  that last: fewer hacks, more intention.
                </p>
                <p className="mb-0">
                  Our writing is grounded in research and real use. We recommend
                  tools we actually use, and we’re clear about trade-offs. No
                  paid placements—just honest guidance for people who want to
                  think clearly and work well.
                </p>
              </div>
              <div className="manifesto-divider" aria-hidden />
            </div>
          </div>
        </section>

        {/* 7. Newsletter — compact centered CTA */}
        <section
          className="section-bg-base border-t border-subtle section-padding"
          aria-labelledby="newsletter-heading"
        >
          <div className="home-section">
            <div className="section-newsletter-inner">
              <header className="section-header section-header--center">
                <h2 id="newsletter-heading" className="!mt-0">
                  Stay in touch
                </h2>
                <p className="section-lead text-muted mt-1">
                  One thoughtful email per week. No spam.
                </p>
              </header>
              <form
                action="#"
                method="post"
                className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                aria-label="Newsletter signup"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-h-[48px] flex-1 min-w-0 rounded-lg border border-[var(--border-visible)] bg-[var(--background-elevated)] px-5 py-3.5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                />
                <button
                  type="submit"
                  className="min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-hover)] bg-[var(--accent-hover)] px-6 py-3.5 text-base font-medium text-[var(--on-accent)] shadow-[0_2px_8px_rgba(30,26,24,0.12)] transition-colors hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
                Join readers who get one practical tip per week.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
