"use client";

import { useEffect, useState } from "react";

const threshold = 80;

function IconDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

function IconUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function ScrollToEndOrTop() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    function checkPosition() {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      const distanceFromBottom = scrollHeight - scrollY - innerHeight;
      setAtBottom(distanceFromBottom <= threshold);
    }

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  function handleClick() {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-visible)] bg-[var(--background-card)] text-[var(--text-body)] shadow-sm hover:border-[var(--accent)]/30 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      aria-label={atBottom ? "Скрол до начало на страницата" : "Скрол до края на страницата"}
    >
      {atBottom ? <IconUp /> : <IconDown />}
    </button>
  );
}
