import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** Series info when post is part of a series. */
export type PostSeries = {
  slug: string;
  title: string;
  order: number;
};

/** Strict frontmatter contract for all posts. */
export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  updated?: string; // ISO, optional
  tags: string[];
  category: string;
  draft?: boolean;
  /** Manual related post slugs (used when by: "manual"). */
  related?: string[];
  /** Key takeaways list (shown in ArticleLayout when present). */
  takeaways?: string[];
  /** When present, post is part of a series. */
  series?: PostSeries;
};

export type Post = PostFrontmatter & {
  slug: string;
};

/** TOC entry from ## or ### in markdown; id matches MDXComponents headingId. */
export type TocEntry = {
  level: 2 | 3;
  text: string;
  id: string;
};

const REQUIRED_KEYS: (keyof PostFrontmatter)[] = [
  "title",
  "description",
  "date",
  "tags",
  "category",
];

const ISO_DATE_REGEX =
  /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?$/;

function validateFrontmatter(data: Record<string, unknown>): data is PostFrontmatter {
  for (const key of REQUIRED_KEYS) {
    if (data[key] === undefined || data[key] === null) return false;
  }
  if (typeof data.title !== "string" || data.title.trim() === "") return false;
  if (typeof data.description !== "string" || data.description.trim() === "")
    return false;
  if (typeof data.date !== "string" || !ISO_DATE_REGEX.test(data.date))
    return false;
  if (!Array.isArray(data.tags) || data.tags.some((t) => typeof t !== "string"))
    return false;
  if (typeof data.category !== "string" || data.category.trim() === "")
    return false;
  if (data.updated !== undefined && data.updated !== null) {
    if (typeof data.updated !== "string" || !ISO_DATE_REGEX.test(data.updated))
      return false;
  }
  if (data.draft !== undefined && data.draft !== null) {
    if (typeof data.draft !== "boolean") return false;
  }
  if (data.related !== undefined && data.related !== null) {
    if (
      !Array.isArray(data.related) ||
      data.related.some((s) => typeof s !== "string")
    )
      return false;
  }
  if (data.takeaways !== undefined && data.takeaways !== null) {
    if (
      !Array.isArray(data.takeaways) ||
      data.takeaways.some((t) => typeof t !== "string")
    )
      return false;
  }
  if (data.series !== undefined && data.series !== null) {
    const s = data.series as Record<string, unknown>;
    if (typeof s !== "object" || s === null) return false;
    if (typeof s.slug !== "string" || s.slug.trim() === "") return false;
    if (typeof s.title !== "string" || s.title.trim() === "") return false;
    if (typeof s.order !== "number" || !Number.isFinite(s.order)) return false;
  }
  return true;
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

/** All .mdx slugs in content/posts (optionally include drafts for static params). */
export function getAllSlugs(options?: { includeDrafts?: boolean }): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const includeDrafts = options?.includeDrafts ?? false;
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => getSlugFromFilename(f))
    .filter((slug) => {
      if (includeDrafts) return true;
      const post = getPostBySlug(slug);
      return post !== null && !post.draft;
    });
}

/** Single post by slug; null if missing or invalid frontmatter. */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  if (!validateFrontmatter(data as Record<string, unknown>)) return null;
  const fm = data as PostFrontmatter;
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    ...(fm.updated && { updated: fm.updated }),
    tags: fm.tags,
    category: fm.category,
    ...(fm.draft !== undefined && { draft: fm.draft }),
    ...(fm.takeaways && { takeaways: fm.takeaways }),
    ...(fm.series && { series: fm.series }),
  };
}

/** Same slug logic as MDXComponents.tsx (lowercase, non-alnum → dash, trim). */
function headingIdFromText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const H2_H3_REGEX = /^(#{2,3})\s+(.+)$/gm;
const WPM = 215;

/** Build-time: post + TOC (h2/h3 only) + reading time. No heavy deps. */
export function getPostDetailsBySlug(slug: string): {
  post: Post;
  toc: TocEntry[];
  readingTime: string;
} | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(raw);
  if (!validateFrontmatter(data as Record<string, unknown>)) return null;
  const fm = data as PostFrontmatter;
  const post: Post = {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    ...(fm.updated && { updated: fm.updated }),
    tags: fm.tags,
    category: fm.category,
    ...(fm.draft !== undefined && { draft: fm.draft }),
    ...(fm.takeaways && { takeaways: fm.takeaways }),
    ...(fm.series && { series: fm.series }),
  };

  const toc: TocEntry[] = [];
  let match: RegExpExecArray | null;
  H2_H3_REGEX.lastIndex = 0;
  while ((match = H2_H3_REGEX.exec(body)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    toc.push({ level, text, id: headingIdFromText(text) });
  }

  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WPM));
  const readingTime = `${minutes} min`;

  return { post, toc, readingTime };
}

/** All posts for /blog listing; excludes drafts, sorted by date descending. */
export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (b.date < a.date ? -1 : 1));
}

const TOP_RELATED = 3;

/**
 * Related posts: by "manual" uses frontmatter related: [slug1, slug2]; by "tags"
 * finds posts with overlapping tags, sorted by shared tag count, top 3.
 */
export function getRelatedPosts(
  slug: string,
  options: { by: "tags" | "manual" }
): Post[] {
  if (options.by === "manual") {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const related = (data as Record<string, unknown>).related;
    if (!Array.isArray(related) || related.some((s) => typeof s !== "string"))
      return [];
    const posts: Post[] = [];
    for (const s of related) {
      const p = getPostBySlug(s);
      if (p && !p.draft) posts.push(p);
    }
    return posts.slice(0, TOP_RELATED);
  }

  const current = getPostBySlug(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const tagSet = new Set(current.tags);
  const withScore = others.map((p) => ({
    post: p,
    score: p.tags.filter((t) => tagSet.has(t)).length,
  }));
  withScore.sort((a, b) => b.score - a.score);
  return withScore.slice(0, TOP_RELATED).map((x) => x.post);
}

/** Minimal post info for series prev/next links. */
export type SeriesPostRef = { slug: string; title: string };

export type SeriesNav = {
  prevPost: SeriesPostRef | null;
  nextPost: SeriesPostRef | null;
  seriesTitle: string;
  seriesSlug: string;
  index: number; // 1-based
  total: number;
};

/**
 * All posts in a series (same series.slug), sorted by series.order ASC.
 * Excludes drafts.
 */
export function getSeriesPosts(seriesSlug: string): Post[] {
  return getAllPosts()
    .filter((p) => p.series?.slug === seriesSlug)
    .sort((a, b) => (a.series!.order - b.series!.order));
}

/**
 * Navigation within the current post's series.
 * Returns prev/next refs, series title/slug, and 1-based index/total.
 */
export function getSeriesNav(slug: string): SeriesNav | null {
  const post = getPostBySlug(slug);
  if (!post?.series) return null;
  const posts = getSeriesPosts(post.series.slug);
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx < 0) return null;
  return {
    prevPost:
      idx > 0
        ? { slug: posts[idx - 1].slug, title: posts[idx - 1].title }
        : null,
    nextPost:
      idx < posts.length - 1
        ? { slug: posts[idx + 1].slug, title: posts[idx + 1].title }
        : null,
    seriesTitle: post.series.title,
    seriesSlug: post.series.slug,
    index: idx + 1,
    total: posts.length,
  };
}

/** For Next.js generateStaticParams(): only published posts. */
export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}
