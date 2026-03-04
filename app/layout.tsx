import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { ScrollToEndOrTop } from "@/components/ScrollToEndOrTop";
import "./globals.css";

/* Headings: Lora, exposed as --font-heading */
const fontHeading = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Body & UI: Inter, exposed as --font-body */
const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://productivityblog.com";

export const viewport: Viewport = {
  themeColor: { color: "#F4F1EA" },
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lifestyle Knowledge | Time Management, Tools & Systems That Work",
    template: "%s | Lifestyle Knowledge",
  },
  description:
    "Practical productivity tips, time management strategies, and honest tool reviews. Get focused, stay organized, and build systems that actually work.",
  keywords: [
    "productivity",
    "time management",
    "focus",
    "task management",
    "productivity tools",
    "getting things done",
    "GTD",
    "personal productivity",
    "workflow",
  ],
  authors: [{ name: "Lifestyle Knowledge", url: siteUrl }],
  creator: "Lifestyle Knowledge",
  publisher: "Lifestyle Knowledge",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Lifestyle Knowledge",
    title: "Lifestyle Knowledge | Time Management, Tools & Systems That Work",
    description:
      "Practical productivity tips, time management strategies, and honest tool reviews. Get focused, stay organized, and build systems that actually work.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lifestyle Knowledge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifestyle Knowledge | Time Management, Tools & Systems That Work",
    description:
      "Practical productivity tips, time management strategies, and honest tool reviews.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "productivity",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Lifestyle Knowledge",
      description:
        "Practical productivity tips, time management strategies, and honest tool reviews.",
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Blog",
      "@id": `${siteUrl}/#blog`,
      name: "Lifestyle Knowledge",
      description: "Articles on productivity, time management, and tools.",
      url: `${siteUrl}/blog`,
      publisher: { "@id": `${siteUrl}/#website` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <div className="app-backdrop" aria-hidden="true" />
        <div className="app-shell">
          <a
            href="#main-content"
            className="absolute left-4 top-4 z-[100] -translate-y-full rounded bg-[var(--foreground)] px-3 py-2 text-sm font-medium text-[var(--background)] transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <ScrollToEndOrTop />
        </div>
      </body>
    </html>
  );
}
