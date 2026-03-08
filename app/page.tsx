import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { StartHere } from "@/components/StartHere";

const startHereSection = {
  label: "For new readers",
  heading: "Productivity insights",
  secondaryLink: { label: "Browse all guides", href: "/blog" },
} as const;

const startHereCards = [
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
  },
  {
    category: "Tools",
    title: "Tools & apps",
    description: "Task managers, note-taking, calendar design, and workflows.",
  },
  {
    category: "Workflows",
    title: "Workflows",
    description: "From inbox zero to weekly reviews—practices that compound.",
  },
  {
    category: "Comparisons",
    title: "Comparisons",
    description: "Side-by-side looks at popular tools so you can choose clearly.",
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
  },
  {
    slug: "best-task-apps",
    title: "Best Task Management Apps in 2025",
    excerpt:
      "A roundup of task and project management tools—from simple to-do lists to full project systems.",
    date: "2025-01-08",
    dateDisplay: "January 2025",
    category: "Tools",
  },
  {
    slug: "morning-routine",
    title: "How to Build a Morning Routine That Sticks",
    excerpt:
      "Small, actionable steps for a calmer, more intentional start to your day.",
    date: "2024-12-20",
    dateDisplay: "December 2024",
    category: "Getting started",
  },
] as const;

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
        {/* 1. Hero */}
        <section
          className="hero-gradient relative flex min-h-[52vh] flex-col justify-center overflow-hidden px-6 py-12 sm:px-8 sm:py-14"
          aria-labelledby="hero-heading"
        >
          <div className="hero-shapes" aria-hidden="true">
            <span className="hero-shape hero-shape--olive" />
            <span className="hero-shape hero-shape--beige" />
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col items-center text-center">
            <h1
              id="hero-heading"
              className="display-hero text-balance text-[var(--text-primary)]"
            >
              Systems over
              <br />
              <span className="font-semibold text-[#556B4F]">willpower</span><span className="text-[var(--accent-primary)]">.</span>
            </h1>
            <p className="lead-hero mt-5 text-[var(--text-body)]">
              Practical guides and honest recommendations for focus, organization,
              and tools that actually work.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-11 sm:gap-5" role="group" aria-label="Primary actions">
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
        </section>

        {/* 2. Start Here */}
        <section className="section-bg-base border-t border-subtle" aria-labelledby="start-heading">
          <StartHere section={startHereSection} cards={startHereCards} />
        </section>

        {/* 3. Core topics — What We Cover */}
        <section className="section-bg-olive border-t border-subtle section-padding" aria-labelledby="cover-heading">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
            <div className="section-box">
              <header className="section-header">
                <div className="flex flex-col items-center">
                  <span className="section-kicker" aria-hidden="true">Topics</span>
                  <h2 id="cover-heading" className="text-center">
                    What we cover
                  </h2>
                  <p className="section-lead text-muted text-center">
                    A clear map of systems, tools, and workflows — so you can start fast.
                  </p>
                </div>
              </header>
              <ul
                className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-4 items-stretch"
                role="list"
              >
                {whatWeCover.map((item, i) => {
                  const railClass =
                    item.category === "Systems"
                      ? "card-rail-accent"
                      : item.category === "Tools" || item.category === "Comparisons"
                        ? "card-rail-accent-2"
                        : "card-rail-workflows";
                  const labelClass =
                    item.category === "Systems"
                      ? "card-label--systems"
                      : item.category === "Tools" || item.category === "Comparisons"
                        ? "card-label--tools"
                        : "card-label--workflows";
                  const words = item.title.split(/\s+/);
                  const isSingleWord = words.length === 1;
                  const singleWordPrefixes: Record<number, string> = {
                    2: "Better",
                    3: "Smart",
                  };
                  const firstPart = isSingleWord
                    ? singleWordPrefixes[i] ?? ""
                    : words[0];
                  const secondPart = isSingleWord
                    ? item.title
                    : words.slice(1).join(" ");
                  const accentColor =
                    railClass === "card-rail-accent-2"
                      ? "var(--accent-2)"
                      : "var(--accent)";
                  return (
                    <li key={item.title} className="flex min-h-0">
                      <Link
                        href="/blog"
                        className={`card-category group ${railClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background-tinted)] text-left`}
                      >
                        <div className="relative z-10 flex flex-1 flex-col">
                          <span
                            className={`${labelClass} mb-3 inline-flex w-fit px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.08em]`}
                          >
                            {item.category}
                          </span>
                          <h3 className="min-w-0 break-words font-body text-xl sm:text-2xl font-semibold leading-tight text-[var(--text-primary)]">
                            {isSingleWord && firstPart ? (
                              <>
                                <span className="text-[var(--text-secondary)]">
                                  {firstPart}{" "}
                                </span>
                                <span style={{ color: accentColor }}>
                                  {secondPart.toLowerCase()}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-[var(--text-secondary)]">
                                  {firstPart}{" "}
                                </span>
                                <span style={{ color: accentColor }}>
                                  {secondPart}
                                </span>
                              </>
                            )}
                          </h3>
                          <p className="mt-4 text-[17px] leading-[1.7] text-[var(--text-body)] max-w-[44ch]">
                            {item.description}
                          </p>
                          <span className="mt-6 link-pill w-fit" aria-hidden>
                            <span>Read</span>
                            <span className="link-pill-arrow">→</span>
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Latest Articles */}
        <section className="section-bg-base border-t border-subtle section-padding" aria-labelledby="latest-heading">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            <div className="section-box">
              <header className="section-header">
                <div className="flex flex-col items-center">
                  <span className="section-kicker" aria-hidden="true">Reading</span>
                  <h2 id="latest-heading" className="text-center">
                    Latest articles
                  </h2>
                  <p className="section-lead text-muted text-center">
                    Fresh guides and how-tos so you can act on what matters.
                  </p>
                </div>
              </header>
              <ul
                className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3 items-stretch"
                role="list"
              >
                {latestPosts.map((post) => {
                  const articleRailClass =
                    post.category === "Tools"
                      ? "card-rail-accent-2"
                      : post.category === "Systems"
                        ? "card-rail-accent"
                        : "card-rail-workflows";
                  const articleLabelClass =
                    post.category === "Tools"
                      ? "card-label--tools"
                      : post.category === "Systems"
                        ? "card-label--systems"
                        : "card-label--workflows";
                  return (
                  <li key={post.slug} className="flex min-h-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className={`card-article ${articleRailClass} group relative flex w-full min-h-0 flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] p-6 sm:p-8 text-left`}
                    >
                      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                        {post.category && (
                          <span className={`${articleLabelClass} mt-0 mb-3 inline-flex w-fit px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.08em]`}>
                            {post.category}
                          </span>
                        )}
                        <h3
                          className={`font-body font-semibold text-[var(--text-primary)] min-w-0 break-words line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors text-lg sm:text-xl ${!post.category ? "mt-0" : ""}`}
                        >
                          {post.title}
                        </h3>
                        <p className="mt-4 flex-1 text-[17px] leading-[1.7] text-[var(--text-body)] line-clamp-2">
                          {post.excerpt}
                        </p>
                        <span className="mt-6 link-pill w-fit" aria-hidden>
                          <span>Read</span>
                          <span className="link-pill-arrow">→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
                })}
              </ul>
              <p className="mt-6 text-center">
                <Link
                  href="/blog"
                  className="nav-link nav-link--muted gap-1.5"
                >
                  View all articles
                  <span aria-hidden>→</span>
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* 6. Philosophy */}
        <section
          className="section-bg-olive border-t border-subtle section-padding"
          aria-labelledby="philosophy-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            <div className="section-box">
              <header className="section-header">
              <div className="flex flex-col items-center">
                <span className="section-kicker" aria-hidden="true">About</span>
                <h2 id="philosophy-heading" className="text-center">
                  Our philosophy
                </h2>
                <div className="lead-bubble mt-4 mx-auto max-w-[52ch] text-center px-6 py-5 sm:px-7 sm:py-6">
                  <p className="lead !max-w-none mb-0">
                    Principles over hacks. Honest guidance for people who want to think clearly and work well.
                  </p>
                </div>
              </div>
            </header>
            <div className="mx-auto max-w-[72ch] space-y-6 text-lg text-[var(--text-body)] leading-relaxed text-center">
              <p>
                Productivity isn’t about doing more in less time. It’s about
                doing what matters with clarity and calm. We focus on systems
                that last: fewer hacks, more intention.
              </p>
              <p>
                Our writing is grounded in research and real use. We recommend
                tools we actually use, and we’re clear about trade-offs. No paid
                placements—just honest guidance for people who want to think
                clearly and work well.
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* 7. Newsletter */}
        <section
          className="section-bg-base border-t border-subtle section-padding"
          aria-labelledby="newsletter-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
            <div className="section-box max-w-2xl mx-auto text-center">
            <header className="section-header">
                <div className="flex flex-col items-center">
                  <span className="section-kicker" aria-hidden="true">Newsletter</span>
                  <h2 id="newsletter-heading" className="text-center">
                    Stay in touch
                  </h2>
                  <p className="section-lead text-muted text-center">
                    One thoughtful email per week. No spam.
                  </p>
                </div>
              </header>
              <form
                action="#"
                method="post"
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
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
                className="min-h-[48px] w-full rounded-lg border border-[var(--border-visible)] bg-[var(--background-elevated)] px-5 py-3.5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-80"
              />
              <button
                  type="submit"
                  className="min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-hover)] bg-[var(--accent-hover)] px-6 py-3.5 text-base font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
