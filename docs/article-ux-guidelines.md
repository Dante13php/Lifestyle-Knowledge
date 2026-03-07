# Article UX Guidelines

This document defines the preferred structure for all productivity (and editorial) articles so every post delivers a consistent, readable rhythm. The goal is a **structured editorial experience**, not plain blog text.

---

## 1. Opening

- **Intro paragraph under the title**  
  After the H1 (or where the layout shows the title), start with one short paragraph that sets context and tells the reader what they’ll get. Avoid long walls of text before the first heading.

- **Early KeyIdea block**  
  Use a `<KeyIdea>` near the top—right after the intro or after the first H2—to state the main idea in one clear, scannable block.

---

## 2. Section rhythm

- **Every H2 followed by a SectionLead**  
  Immediately after each `##` heading, add a `<SectionLead>`: one or two sentences that summarize what the section is about. This creates a predictable rhythm and helps skimmers.

---

## 3. Editorial blocks (use selectively)

Use these components to add variety and emphasis. **Do not stack them all at once** in a single section.

| Block | Use for |
|-------|--------|
| **KeyIdea** | The one main idea (early in the article, or once per major section if needed). |
| **SectionLead** | Short lead-in after every H2. |
| **Highlight** | A single standout sentence (accent border, no icon). |
| **Tip** | One practical, actionable tip. |
| **Example** | Concrete scenario, before/after, or short illustration. |
| **Checklist** | Short list of steps or criteria (with optional title). |
| **PullQuote** | A memorable quote or closing emphasis (optional `author` / `source`). |

- Prefer **one or two block types per section**, not all of them.
- End the article with a short **conclusion** and, if it fits, a **PullQuote** or one strong closing line before the ContinueLearning block (which is rendered by the layout).

---

## 4. Content-first

- No client logic or automation in the content layer.
- No parsing magic or heavy tooling—this is a **content authoring system**.
- Authors copy the template, fill in frontmatter and body, and place components by hand for full control.

---

## 5. Design alignment

- **Minimal, calm, typography-first.**  
  Let headings, SectionLeads, and body text carry the hierarchy; blocks add structure without visual noise.

- **SEO-friendly.**  
  Keep a single H1, clear H2/H3 hierarchy, and frontmatter `title` and `description` accurate and concise.

---

## Quick checklist for new articles

- [ ] Intro paragraph under the title
- [ ] Early KeyIdea
- [ ] Every H2 has a SectionLead right after it
- [ ] At least one of: Highlight, Tip, Example, Checklist—used where they add value, not all in one place
- [ ] Short conclusion before the end
- [ ] Optional PullQuote or closing emphasis before ContinueLearning
