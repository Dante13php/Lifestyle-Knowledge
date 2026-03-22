# Post media (`public/images/posts`)

Static images and other media for blog posts, **one folder per post**.

## Convention

- **Path:** `/images/posts/{slug}/…`
- **`{slug}`** matches the MDX filename in `content/posts/` without the `.mdx` extension (same slug as `/blog/{slug}`).

## Examples

| Post file | Media folder |
|-----------|----------------|
| `content/posts/simple-system-organize-life-notion.mdx` | `public/images/posts/simple-system-organize-life-notion/` |
| `content/posts/15-minute-weekly-reset.mdx` | `public/images/posts/15-minute-weekly-reset/` |

## Usage in MDX or components

Reference from the site root, e.g.:

```mdx
![Alt text](/images/posts/simple-system-organize-life-notion/hero.png)
```

With `next/image`, `src` is the same path string.
