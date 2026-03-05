import type { Metadata } from "next";
import {
  generateStaticParams as getStaticParams,
  getPostDetailsBySlug,
  getRelatedPosts,
  getSeriesNav,
  getSeriesPosts,
} from "@/lib/posts";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const details = getPostDetailsBySlug(slug);
  if (!details) return {};
  const { post } = details;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const canonical = baseUrl ? `${baseUrl}/blog/${slug}` : `/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const details = getPostDetailsBySlug(slug);
  if (!details) notFound();

  const { post, toc, readingTime } = details;
  const seriesNav = post.series ? getSeriesNav(slug) : null;
  const manualRelated = getRelatedPosts(slug, { by: "manual" });
  const relatedByTags =
    manualRelated.length > 0 ? manualRelated : getRelatedPosts(slug, { by: "tags" });
  const moreArticles =
    post.series
      ? getSeriesPosts(post.series.slug)
          .filter((p) => p.slug !== slug)
          .slice(0, 3)
      : relatedByTags;
  const MdxContent = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <ArticleLayout
      post={{ ...post, readingTime }}
      toc={toc}
      seriesNav={seriesNav ?? undefined}
      relatedPosts={moreArticles.length > 0 ? moreArticles : undefined}
    >
      <MdxContent />
    </ArticleLayout>
  );
}
