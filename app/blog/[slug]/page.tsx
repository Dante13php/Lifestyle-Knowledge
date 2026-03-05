import type { Metadata } from "next";
import {
  generateStaticParams as getStaticParams,
  getPostDetailsBySlug,
  getRelatedPosts,
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
  const manualRelated = getRelatedPosts(slug, { by: "manual" });
  const relatedPosts =
    manualRelated.length > 0 ? manualRelated : getRelatedPosts(slug, { by: "tags" });
  const MdxContent = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <ArticleLayout
      post={{ ...post, readingTime }}
      toc={toc}
      relatedPosts={relatedPosts.length > 0 ? relatedPosts : undefined}
    >
      <MdxContent />
    </ArticleLayout>
  );
}
