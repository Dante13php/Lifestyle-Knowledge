import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { StartHere } from "@/components/StartHere";

const startHereSection = {
  label: "For new readers",
  heading: "Start here",
  lead:
    "Pick one path below — each is designed to get you thinking clearly and moving with less friction.",
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
          className="relative overflow-hidden px-6 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24"
          aria-labelledby="hero-heading"
        >
          <div className="relative mx-auto flex max-w-5xl flex-col text-center">
            <h1
              id="hero-heading"
              className="display-hero text-balance mx-auto text-[var(--foreground)]"
            >
              Systems over
              <br />
              willpower<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="lead-hero text-center">
              Practical guides and honest recommendations for focus, organization,
              and tools that actually work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10 sm:gap-5" role="group" aria-label="Primary actions">
              <Link
                href="/blog"
                className="inline-flex items-center min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-hover)] bg-[var(--accent-hover)] px-6 py-3 text-base font-medium text-[var(--background)] shadow-[0_2px_8px_rgba(30,26,24,0.12)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] hover:shadow-[0_4px_12px_rgba(30,26,24,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] transition-[box-shadow,border-color,background-color] duration-200"
              >
                Read the blog
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center min-h-[48px] shrink-0 rounded-lg border border-[var(--accent)] bg-transparent px-6 py-3 text-base font-medium text-[var(--text-body)] hover:bg-[rgba(94,107,82,0.08)] hover:text-[var(--accent)] hover:border-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] transition-colors duration-200"
              >
                Resources
              </Link>
            </div>
            <p
              className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] opacity-80"
              role="status"
            >
              No hype. Practical. Updated regularly.
            </p>
          </div>
        </section>

        {/* 2. Start Here */}
        <section className="border-t border-subtle" aria-labelledby="start-heading">
          <StartHere section={startHereSection} cards={startHereCards} />
        </section>

        {/* 3. Topics — What We Cover */}
        <section className="border-t border-subtle" aria-labelledby="cover-heading">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
            <header className="section-header">
              <div className="flex flex-col items-center">
                <h2 id="cover-heading" className="text-center">
                  What we cover
                </h2>
                <p className="section-lead text-muted text-center">
                  A clear map of systems, tools, and workflows — so you can start fast.
                </p>
              </div>
            </header>
            <ul
              className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch"
              role="list"
            >
              {whatWeCover.map((item, i) => {
                const railClass =
                  i % 3 === 0
                    ? "card-rail-accent"
                    : i % 3 === 1
                      ? "card-rail-accent-2"
                      : "card-rail-highlight";
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
                  i % 2 === 1 ? "var(--accent-2)" : "var(--accent)";
                return (
                  <li key={item.title} className="flex">
                    <Link
                      href="/blog"
                      className={`card group ${railClass} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-2)] text-left p-6`}
                    >
                      <div className="relative z-10 flex flex-1 flex-col">
                        <span
                          className="mb-2 inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium text-[var(--muted)] border border-[var(--border)]"
                        >
                          {item.category}
                        </span>
                        <h3 className="min-w-0 break-words">
                          {isSingleWord && firstPart ? (
                            <>
                                <span className="text-[var(--muted)]">
                                {firstPart}{" "}
                              </span>
                              <span style={{ color: accentColor }}>
                                {secondPart.toLowerCase()}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-[var(--ink)]">
                                {firstPart}{" "}
                              </span>
                              <span style={{ color: accentColor }}>
                                {secondPart}
                              </span>
                            </>
                          )}
                        </h3>
                        <p className="mt-2.5 text-[16px] sm:text-[17px] leading-[1.8] text-[var(--text-body)] max-w-[44ch]">
                          {item.description}
                        </p>
                        <span className="mt-3 link-pill w-fit" aria-hidden>
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
        </section>

        {/* 4. Latest Articles */}
        <section className="border-t border-subtle" aria-labelledby="latest-heading">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
            <header className="section-header">
              <div className="flex flex-col items-center">
                <h2 id="latest-heading" className="text-center">
                  Latest articles
                </h2>
                <p className="section-lead text-muted text-center">
                  Fresh guides and how-tos so you can act on what matters.
                </p>
              </div>
            </header>
            <ul
              className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch"
              role="list"
            >
              {latestPosts.map((post) => (
                <li key={post.slug} className="flex min-h-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex w-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--background-card)] transition-all duration-200 hover:border-[var(--border-visible)] hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] p-7 sm:p-9 text-left"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-200 group-hover:bg-[var(--foreground)]/[0.03]" aria-hidden />
                    <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                      {post.category && (
                        <span className="mt-6 mb-2 inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium text-[var(--muted)] border border-[var(--border)]">
                          {post.category}
                        </span>
                      )}
                      <h3
                        className={`text-[var(--foreground)] min-w-0 break-words line-clamp-2 ${!post.category ? "mt-6" : ""}`}
                      >
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[16px] sm:text-[17px] leading-[1.8] text-[var(--text-body)] line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="mt-6 link-pill w-fit" aria-hidden>
                        <span>Read</span>
                        <span className="link-pill-arrow">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link
                href="/blog"
                className="nav-link nav-link--muted gap-1.5"
              >
                View all articles
                <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
        </section>

        {/* 5. Philosophy */}
        <section
          className="border-t border-subtle"
          aria-labelledby="philosophy-heading"
        >
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
            <header className="section-header">
              <div className="flex flex-col items-center">
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
            <div className="mx-auto max-w-[72ch] space-y-8 text-lg text-[var(--text-body)] leading-relaxed text-center">
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
        </section>

        {/* 6. Newsletter */}
        <section
          className="border-t border-subtle"
          aria-labelledby="newsletter-heading"
        >
          <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
            <header className="section-header">
              <div className="flex flex-col items-center">
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
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
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
                className="min-h-[48px] w-full rounded-lg border border-[var(--border-visible)] bg-[var(--background-card)] px-5 py-3.5 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-80"
              />
              <button
                type="submit"
                className="min-h-[48px] shrink-0 rounded-lg border border-[var(--accent-hover)] bg-[var(--accent-hover)] px-6 py-3.5 text-base font-medium text-[var(--background)] transition-colors hover:bg-[var(--foreground)] hover:border-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
