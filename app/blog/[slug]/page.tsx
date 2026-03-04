import type { Metadata } from "next";
import {
  generateStaticParams as getStaticParams,
  getPostBySlug,
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
  const post = getPostBySlug(slug);
  if (!post) return {};
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const MdxContent = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <ArticleLayout post={post} toc={[]}>
      <MdxContent />
    </ArticleLayout>
  );
}
