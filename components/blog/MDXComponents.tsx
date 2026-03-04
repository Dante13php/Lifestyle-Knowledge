import type { MDXComponents } from "mdx/types";

/** Slug for heading IDs (TOC + anchor offset). */
function getHeadingText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getHeadingText).join("");
  if (node != null && typeof node === "object" && "props" in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getHeadingText(el.props.children ?? "");
  }
  return "";
}

function headingId(children: React.ReactNode): string {
  return getHeadingText(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const anchorOffset = "scroll-mt-[5.5rem]"; // TOC + sticky header

export const mdxArticleComponents: MDXComponents = {
  h2: ({ children, ...props }) => {
    const id = headingId(children);
    return (
      <h2 id={id} className={anchorOffset} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = headingId(children);
    return (
      <h3 id={id} className={anchorOffset} {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = headingId(children);
    return (
      <h4 id={id} className={anchorOffset} {...props}>
        {children}
      </h4>
    );
  },
  p: ({ children, ...props }) => (
    <p className="leading-[1.625]" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)]"
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-[3px] border-[var(--border)] pl-4 font-[var(--font-heading)] italic text-[var(--muted)]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-10 border-[var(--border)] border-t" aria-hidden />
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-[var(--surface-2)] px-1.5 py-0.5 font-normal text-[var(--muted)] [font-size:0.9em]"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-4"
      {...props}
    >
      {children}
    </pre>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-5 list-disc pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-5 list-decimal pl-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="[&+&]:mt-2" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b border-[var(--border)]" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => (
    <tr className="border-b border-[var(--border)]" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th
      className="pb-2 pr-4 text-left font-medium text-[var(--muted)]"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="py-2 pr-4 text-[var(--text-body)]" {...props}>
      {children}
    </td>
  ),
  // Callout: placeholder for later; can be filled from MDX
  aside: ({ children, className, ...props }) => (
    <aside
      className={`my-6 border-l-2 border-[var(--border)] pl-4 text-sm text-[var(--muted)] ${className ?? ""}`}
      {...props}
    >
      {children}
    </aside>
  ),
};
