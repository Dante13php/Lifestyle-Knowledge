import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Lifestyle Knowledge",
  description:
    "Practical guides on productivity systems, time management, and tools that work.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
      <header className="mb-12">
        <h1 className="text-[var(--foreground)]">
          Blog
        </h1>
        <p className="mt-4 text-lg text-[var(--text-body)]">
          Practical guides and honest recommendations for focus, organization,
          and tools that actually work.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="text-[var(--text-body)]">No posts yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {posts.map((post) => (
            <li key={post.slug} className="flex min-h-0">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex w-full min-h-[200px] flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 transition-[border-color] hover:border-[var(--muted)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 sm:min-h-[240px] sm:p-6"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  {post.category}
                </span>
                <h3 className="mt-3 text-[var(--foreground)] line-clamp-2 group-hover:text-[var(--accent)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[var(--text-body)] line-clamp-2">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                  Read <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
