import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const MdxContent = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--muted)]">
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-[var(--foreground)]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-[var(--foreground)]">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[var(--foreground)]" aria-current="page">
            {post.category}
          </li>
        </ol>
      </nav>
      <header className="mb-10">
        <h1 className="text-[var(--foreground)]">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.readingTime && <span>{post.readingTime} read</span>}
          <span className="rounded bg-[var(--border)] px-2 py-0.5 font-medium text-[var(--foreground)]">
            {post.category}
          </span>
        </div>
      </header>
      <div className="prose prose-neutral max-w-none font-body text-[var(--text-body)] [&_aside]:my-6 [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-[var(--border)] [&_h2]:pt-8 [&_h2]:font-heading [&_h2]:text-xl [&_h3]:mt-8 [&_h3]:font-heading [&_table]:my-6">
        <MdxContent />
      </div>
    </article>
  );
}
