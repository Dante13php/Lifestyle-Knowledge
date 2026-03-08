export { KeyIdea } from "./KeyIdea";
export { KeyInsight } from "./KeyInsight";
export { Principle } from "./Principle";
export { Tip } from "./Tip";
export { Example } from "./Example";
export { PullQuote } from "./PullQuote";
export { Checklist } from "./Checklist";
export { SectionLead } from "./SectionLead";
export { SectionIntro } from "./SectionIntro";
export { Highlight } from "./Highlight";

import { SectionDiagram } from "../SectionDiagram";
import { InsightBlock } from "../InsightBlock";
import { KeyIdea } from "./KeyIdea";
import { KeyInsight } from "./KeyInsight";
import { Principle } from "./Principle";
import { Tip } from "./Tip";
import { Example } from "./Example";
import { PullQuote } from "./PullQuote";
import { Checklist } from "./Checklist";
import { SectionLead } from "./SectionLead";
import { SectionIntro } from "./SectionIntro";
import { Highlight } from "./Highlight";

/** MDX component map for article UX blocks. Reuse in MDXComponents. */
export const mdxBlocks = {
  KeyIdea,
  KeyInsight,
  InsightBlock,
  Principle,
  Tip,
  Example,
  PullQuote,
  Checklist,
  SectionLead,
  SectionIntro,
  Highlight,
  SectionDiagram,
} as const;
