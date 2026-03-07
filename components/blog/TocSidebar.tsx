"use client";

import { useEffect, useState } from "react";

export type TocEntry = {
  id: string;
  text: string;
  level: number;
};

type TocSidebarProps = {
  toc: TocEntry[];
};

/** Active zone: 120px below viewport top to 50% of viewport. */
const ROOT_MARGIN = "-120px 0px -50% 0px";

/** Offset so target heading sits below sticky header (match MDX scroll-mt). */
const SCROLL_OFFSET_PX = 144; // 9rem
/** Min distance from viewport top so article title (h1) never goes under header. */
const HEADER_SAFE_PX = 100;

/** Trigger line: section "passed" when its top is above this (px from viewport top). */
const TRIGGER_PX = 120;

const idsFromToc = (toc: TocEntry[]) => toc.map((e) => e.id);

function getHashId(tocIds: string[]): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return hash && tocIds.includes(hash) ? hash : null;
}

/** Compute active section from current scroll/positions. Use when observer says nothing visible. */
function getActiveIdFromScroll(ids: string[]): string {
  const elements = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  if (elements.length === 0) return ids[0];

  // Last section that has already passed the trigger line (above viewport)
  let fallbackId: string | null = null;
  let bestTop = -Infinity;
  for (const el of elements) {
    const top = el.getBoundingClientRect().top;
    if (top <= TRIGGER_PX && top > bestTop) {
      bestTop = top;
      fallbackId = el.id;
    }
  }
  if (fallbackId) return fallbackId;

  const firstTop = elements[0].getBoundingClientRect().top;
  // Only treat as "past all" if first heading is clearly above viewport (we've scrolled down)
  if (firstTop < -50) return ids[ids.length - 1];
  return ids[0];
}

export function TocSidebar({ toc }: TocSidebarProps) {
  const tocIds = idsFromToc(toc);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleTocClick(e: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
    const target = document.getElementById(targetId);
    const article = document.querySelector("article");
    if (!target || !article) return;
    e.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const articleTop = article.getBoundingClientRect().top + window.scrollY;
    // Heading at SCROLL_OFFSET_PX from top; never scroll past article top - HEADER_SAFE_PX (keeps h1 visible)
    const scrollY = Math.max(articleTop - HEADER_SAFE_PX, targetTop - SCROLL_OFFSET_PX);
    window.scrollTo({ top: scrollY, behavior: "smooth" });
    window.history.replaceState(undefined, "", `#${targetId}`);
    setActiveId(targetId);
  }

  // Sync highlight with URL hash when user clicks a TOC link (and on mount)
  useEffect(() => {
    const ids = toc.map((e) => e.id);
    const fromHash = getHashId(ids);
    if (fromHash) setActiveId(fromHash);

    const onHashChange = () => {
      const id = getHashId(ids);
      if (id) setActiveId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [toc]);

  // Initial sync: set active section from scroll once layout is ready (fixes wrong highlight on load)
  useEffect(() => {
    if (toc.length === 0) return;
    const ids = tocIds;
    if (getHashId(ids)) return; // hash wins

    const run = () => {
      const id = getActiveIdFromScroll(ids);
      setActiveId(id);
    };
    const t = window.setTimeout(run, 80);
    return () => window.clearTimeout(t);
  }, [toc]);

  useEffect(() => {
    if (toc.length === 0) return;

    const ids = tocIds;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleTops = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleTops.set(id, entry.boundingClientRect.top);
          } else {
            visibleTops.delete(id);
          }
        }
        if (visibleTops.size > 0) {
          let bestId: string | null = null;
          let bestTop = Infinity;
          for (const [id, top] of visibleTops) {
            if (top < bestTop) {
              bestTop = top;
              bestId = id;
            }
          }
          if (bestId) setActiveId(bestId);
          return;
        }
        // If current hash points to a section in or near view, keep it active (fixes short sections)
        const hashId = getHashId(ids);
        if (hashId) {
          const el = document.getElementById(hashId);
          if (el) {
            const top = el.getBoundingClientRect().top;
            if (top >= -400 && top <= 300) {
              setActiveId(hashId);
              return;
            }
          }
        }
        // No section in observer zone: use scroll-based logic (intro / between / past end)
        setActiveId(getActiveIdFromScroll(ids));
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <nav className="sticky top-[120px] border-l-2 border-[var(--border)] pl-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        On this page
      </p>
      <ul className="space-y-1.5 text-sm text-[var(--muted)]">
        {toc.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li
              key={entry.id}
              style={{ paddingLeft: `${(entry.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${entry.id}`}
                onClick={(e) => handleTocClick(e, entry.id)}
                className={`flex items-center gap-2 -ml-4 rounded-r border-l-2 py-1 pl-4 pr-2 transition-colors hover:text-[var(--foreground)] ${
                  isActive
                    ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--surface-2)_88%,black)] font-medium text-[var(--foreground)]"
                    : "border-transparent"
                }`}
              >
                <span
                  aria-hidden
                  className={`shrink-0 rounded-full transition-colors ${
                    isActive
                      ? "h-2 w-2 bg-[var(--accent)]"
                      : "h-1.5 w-1.5 bg-[var(--muted)]/50"
                  }`}
                />
                <span>{entry.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
