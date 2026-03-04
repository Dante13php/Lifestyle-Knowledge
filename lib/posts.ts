import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/** Strict frontmatter contract for all posts. */
export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO
  updated?: string; // ISO, optional
  tags: string[];
  category: string;
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
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
  };
}

/** All posts for /blog listing; excludes drafts, sorted by date descending. */
export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (b.date < a.date ? -1 : 1));
}

/** For Next.js generateStaticParams(): only published posts. */
export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}
