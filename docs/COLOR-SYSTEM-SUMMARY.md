# Color system summary

This document summarizes the semantic color system and where color was introduced across the site.

## Palette (warmer, richer, calm editorial)

| Role | Variable | Value | Purpose |
|------|----------|-------|---------|
| **Background** | `--background` | #F7F5F1 | Page base |
| **Surface** | `--surface` | #EFECE6 | Cards, blocks, raised surfaces |
| **Border subtle** | `--border-subtle` | #E2DED7 | Very low-contrast borders |
| **Text primary** | `--text-primary` | #2E2E2E | Headings, primary copy |
| **Text muted** | `--text-muted` / `--text-secondary` | #6B6B6B | Muted copy, meta, captions |
| **Accent primary** | `--accent-primary` | #5E6B3C | Links, active states, rails |
| **Accent secondary** | `--accent-secondary` | #C97A40 | Secondary highlights |
| **Accent soft** | `--accent-soft` | #E6E9DE | Soft highlights (e.g. nav active bg) |

All color is driven by CSS variables in `app/globals.css`. No hardcoded hex in components.

## Design roles (semantic tokens)

| Role | Variable | Purpose |
|------|----------|---------|
| **Backgrounds** | `--background` | Page base (warm off-white) |
| | `--surface` / `--background-elevated` | Cards, panels, raised surfaces |
| | `--background-tinted` | Alternate surface, subtle warmth |
| **Tinted surfaces** | `--tinted-callout` | Very soft olive: tips, insights, principles, checklists, key ideas |
| | `--tinted-callout-border` | Left border / outline for callouts |
| | `--tinted-takeaway` | Key takeaways block (subtle secondary accent tint) |
| | `--tinted-related` | Next step card soft tint |
| | `--tinted-diagram` | Framework diagram nodes |
| | `--tinted-series` | Series navigation block |
| **Text** | `--text-primary` | Headings, primary copy |
| | `--text-secondary` / `--text-muted` | Muted copy, meta, captions |
| **Borders** | `--border-subtle` | Very low contrast |
| | `--border-default` | Default borders |
| | `--border-visible` | Stronger dividers, hover states |
| **Accents** | `--accent-primary` | Muted olive — links, active states, rails |
| | `--accent-secondary` | Terracotta — secondary rails/labels |
| | `--accent-soft` | Pale olive — soft highlights (e.g. nav active bg) |
| | `--accent-hover` | Darker olive — hover/focus |

Legacy names (`--bg`, `--surface`, `--muted`, `--accent`, etc.) are kept as aliases so existing class names keep working.

## Where color was introduced

### Links
- **Prose links**: `--accent-primary` with `--accent-hover` on hover (Tailwind typography).
- **Link pills** (“Read →”): `--accent-primary` → `--accent-hover` on hover.
- **Nav links**: Default `--text-primary`; hover/active use `--accent-primary` and `--accent-soft` background for active.
- **Breadcrumbs**: Secondary text with hover `--accent-primary`.

### TOC (table of contents)
- **Active item**: `--accent-primary` left border and dot; background `--tinted-callout`.
- **Inactive**: `--text-secondary`; hover uses `--tinted-callout` and `--accent-primary` border.

### Callouts and insight blocks
- **Tip, KeyInsight, Example, Highlight, KeyIdea, Principle, Checklist**: Background `--tinted-callout` (very soft olive), border `--tinted-callout-border`. Labels use `--accent-primary` or `--text-secondary` as appropriate.

### Key takeaway block
- **“What to remember”**: Background `--tinted-takeaway` (subtle secondary accent tint), border `--tinted-callout-border`, checkmarks `--accent-primary`.

### Next step / related cards
- **ContinueLearning “Next step” card**: `--tinted-related` background, `--accent-primary` left border; hover → `--tinted-callout`.
- **Related article cards**: `--surface` background; hover → `--tinted-callout`, border `--border-visible`.
- **Article cards (blog index, homepage)**: `--surface` (elevated); hover adds `--tinted-related` and accent on title/CTA.

### Framework diagrams
- **SectionDiagram**: Node background `--tinted-diagram`, border `--border-default`, arrow `--text-secondary`.

### Article meta
- **Reading time pill**: Background `--tinted-callout`, text `--text-primary`.
- **Dates, category**: `--text-secondary`.

### Buttons
- **Primary**: `--accent-hover` fill, `--on-accent` text; hover → `--text-primary` fill.
- **Secondary**: `--accent-primary` border and text; hover → `--tinted-callout` background, `--accent-hover` text.

### Cards (editorial)
- **Card rail**: `--card-rail` (olive / terracotta / highlight by modifier).
- **Card surface**: `--surface`; hover border `--border-visible`.
- **Series nav container**: `--tinted-series`.

### Focus states
- **Focus ring**: `--accent-primary` ring with offset from `--background` or `--background-tinted` where appropriate.

## Readability and restraint

- **Contrast**: Body text uses `--text-secondary` on `--background` (or elevated/tinted) with high contrast.
- **Neutral base**: Most of the page is neutral; color is used for links, active TOC, labels, callouts, key blocks, and hover/focus.
- **No strong gradients, heavy shadows, or bright saturated colors.**
- **Dark theme**: Overrides all tokens for `[data-theme="dark"]` / `.theme-dark`.

## Files touched

- **`app/globals.css`**: Semantic tokens, tinted surfaces, dark overrides, utilities, card/link/nav styles.
- **`tailwind.config.js`**: Prose and theme use semantic tokens (no hex in config).
- **Components**: Tip, KeyInsight, Example, Highlight, KeyIdea, Principle, Checklist, PullQuote; TocSidebar; ArticleCard; ContinueLearning; SeriesNav; SectionDiagram; ArticleLayout; StartHere; Header; Footer; ProgressBar.
- **Pages**: `app/page.tsx`, `app/blog/page.tsx`, article pages.

Layout and structure were not changed; only the color system and its application were refined.
