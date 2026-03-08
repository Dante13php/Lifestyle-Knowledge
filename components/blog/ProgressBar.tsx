"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    let rafId: number;

    const update = () => {
      const { top, height } = article.getBoundingClientRect();
      const winH = window.innerHeight;
      const scrollable = height - winH;
      if (scrollable <= 0) {
        setProgress(1);
        return;
      }
      // Progress: 0 when article top at viewport top, 1 when article bottom at viewport bottom
      const p = (-top / scrollable);
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-[var(--border-default)]"
      aria-hidden
    >
      <div
        className="h-full bg-[var(--accent-primary)] transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
      />
    </div>
  );
}
