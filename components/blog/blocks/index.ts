export { KeyIdea } from "./KeyIdea";
export { Tip } from "./Tip";
export { Example } from "./Example";
export { PullQuote } from "./PullQuote";
export { Checklist } from "./Checklist";
export { SectionLead } from "./SectionLead";
export { SectionDivider } from "./SectionDivider";
export { Highlight } from "./Highlight";

import { KeyIdea } from "./KeyIdea";
import { Tip } from "./Tip";
import { Example } from "./Example";
import { PullQuote } from "./PullQuote";
import { Checklist } from "./Checklist";
import { SectionLead } from "./SectionLead";
import { SectionDivider } from "./SectionDivider";
import { Highlight } from "./Highlight";

/** MDX component map for article UX blocks. Reuse in MDXComponents. */
export const mdxBlocks = {
  KeyIdea,
  Tip,
  Example,
  PullQuote,
  Checklist,
  SectionLead,
  SectionDivider,
  Highlight,
} as const;
