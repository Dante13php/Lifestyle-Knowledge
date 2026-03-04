import type { MDXComponents } from "mdx/types";
import { mdxArticleComponents } from "@/components/blog/MDXComponents";

export function useMDXComponents(): MDXComponents {
  return mdxArticleComponents;
}
