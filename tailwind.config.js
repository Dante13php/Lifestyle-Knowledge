/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "var(--muted)",
            maxWidth: "65ch",
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "1.0625rem",
            lineHeight: "1.625",
            "--tw-prose-body": "var(--muted)",
            "--tw-prose-headings": "var(--muted)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-quotes": "var(--muted)",
            "--tw-prose-quote-borders": "var(--border)",
            "--tw-prose-code": "var(--muted)",
            "--tw-prose-pre-bg": "var(--surface-2)",
            "--tw-prose-pre-code": "var(--muted)",
            "--tw-prose-hr": "var(--border)",
            "--tw-prose-bullets": "var(--muted)",
            "--tw-prose-counters": "var(--muted)",
            /* Vertical rhythm controlled by .article-content in globals.css — no prose margins */
            p: {
              marginTop: "0",
              marginBottom: "0",
              lineHeight: "1.625",
            },
            "p + p": {
              marginTop: "0",
            },
            h2: {
              fontFamily: "var(--font-heading), serif",
              fontSize: "2rem",
              lineHeight: "1.25",
              fontWeight: "500",
              marginTop: "0",
              marginBottom: "0",
              paddingTop: "0",
              borderTop: "none",
              color: "var(--muted)",
            },
            "h2:first-child": {
              marginTop: "0",
            },
            h3: {
              fontFamily: "var(--font-heading), serif",
              fontSize: "1.5rem",
              lineHeight: "1.25",
              fontWeight: "400",
              marginTop: "0",
              marginBottom: "0",
              color: "var(--muted)",
            },
            h4: {
              fontFamily: "var(--font-heading), serif",
              fontSize: "1.25rem",
              lineHeight: "1.25",
              fontWeight: "400",
              marginTop: "0",
              marginBottom: "0",
              color: "var(--muted)",
            },
            a: {
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            },
            "a:hover": {
              color: "var(--accent-hover)",
            },
            blockquote: {
              marginTop: "0",
              marginBottom: "0",
              paddingLeft: "1rem",
              borderLeftWidth: "3px",
              borderLeftColor: "var(--border)",
              color: "var(--muted)",
              fontStyle: "italic",
              fontFamily: "var(--font-heading), serif",
              fontSize: "1.0625rem",
              lineHeight: "1.625",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:first-of-type::after": {
              content: "none",
            },
            "ul, ol": {
              marginTop: "0",
              marginBottom: "0",
              paddingLeft: "1.5rem",
            },
            "li + li": {
              marginTop: "0.5rem",
            },
            "ul ul, ol ol, ul ol, ol ul": {
              marginTop: "0.5rem",
              marginBottom: "0",
            },
            "code": {
              color: "var(--muted)",
              backgroundColor: "var(--surface-2)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.9em",
              fontWeight: "400",
            },
            "pre": {
              marginTop: "0",
              marginBottom: "0",
              backgroundColor: "var(--surface-2)",
              padding: "1rem 1.25rem",
              borderRadius: "0.5rem",
              overflowX: "auto",
              border: "1px solid var(--border)",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              fontSize: "0.875rem",
            },
            hr: {
              marginTop: "0",
              marginBottom: "0",
              borderColor: "var(--border)",
              borderTopWidth: "1px",
            },
            "thead th": {
              borderBottomColor: "var(--border)",
              color: "var(--muted)",
            },
            "tbody td, tbody th": {
              borderColor: "var(--border)",
            },
          },
        },
      },
    },
  },
};
