/**
 * Editorial Notion-style UI mockups for MDX articles.
 * CSS-only frames (no stock imagery); aligned with a simple Life System layout.
 */
import type { ReactNode } from "react";

const notionSidebar = "bg-[#F7F6F3] border-[#E8E7E4]";
const notionPage = "bg-white";

function SidebarNav({ items }: { items: string[] }) {
  return (
    <nav
      className={`flex w-[30%] max-w-[92px] shrink-0 flex-col gap-1 border-r px-1.5 py-2 ${notionSidebar}`}
      aria-hidden
    >
      <div className="mb-1 truncate px-0.5 text-[8px] font-semibold uppercase tracking-wide text-[#9B9A97]">
        Workspace
      </div>
      {items.map((label) => (
        <div
          key={label}
          className="truncate rounded px-1 py-0.5 text-[9px] text-[#37352F] first:bg-[#E8E7E4]/80"
        >
          {label}
        </div>
      ))}
    </nav>
  );
}

type VisualPurpose = "system" | "component" | "use_case";

const purposeLabel: Record<VisualPurpose, string> = {
  system: "System view",
  component: "Component view",
  use_case: "Use case",
};

function Frame({
  purpose,
  caption,
  children,
}: {
  purpose: VisualPurpose;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="notion-visual-proof__item m-0 flex flex-col gap-1.5">
      <div
        className="overflow-hidden rounded-lg border border-[var(--border-default)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        style={{ backgroundColor: "#F7F6F3" }}
      >
        <div className="flex min-h-[132px] sm:min-h-[148px]">{children}</div>
      </div>
      <p className="m-0 text-center text-[9px] font-medium uppercase tracking-wide text-[var(--text-tertiary,#9B9A97)]">
        {purposeLabel[purpose]}
      </p>
      <figcaption className="text-center text-[11px] leading-snug text-[var(--text-secondary)] sm:text-xs">
        {caption}
      </figcaption>
    </figure>
  );
}

export function NotionVisualProof() {
  return (
    <div
      className="notion-visual-proof not-prose grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4"
      aria-label="Illustrative Notion workspace layouts"
    >
      <Frame
        purpose="system"
        caption="One hub — you see how tasks, notes, and goals connect without hunting through apps."
      >
        <SidebarNav items={["Life System", "Today", "Notes", "Goals"]} />
        <div className={`flex flex-1 flex-col gap-1.5 p-2 ${notionPage}`}>
          <div className="text-[10px] font-semibold text-[#37352F] sm:text-[11px]">
            Command center
          </div>
          <div className="h-px w-full bg-[#E8E7E4]" />
          <div className="rounded border border-[#E8E7E4] bg-[#FAFAF8] px-2 py-1.5 text-[9px] text-[#6B6B6B]">
            Linked: Today · Upcoming · Inbox notes
          </div>
          <div className="mt-auto flex gap-1">
            <span className="rounded bg-[#E8E7E4]/70 px-1.5 py-0.5 text-[8px] text-[#5C5C5C]">
              Tasks
            </span>
            <span className="rounded bg-[#E8E7E4]/70 px-1.5 py-0.5 text-[8px] text-[#5C5C5C]">
              Notes
            </span>
            <span className="rounded bg-[#E8E7E4]/70 px-1.5 py-0.5 text-[8px] text-[#5C5C5C]">
              Goals
            </span>
          </div>
        </div>
      </Frame>

      <Frame
        purpose="component"
        caption="Today / upcoming / done only — execution stays obvious, so you spend energy on work, not upkeep."
      >
        <SidebarNav items={["Life System", "Tasks", "Notes"]} />
        <div className={`flex flex-1 flex-col gap-1 p-2 ${notionPage}`}>
          <div className="text-[10px] font-semibold text-[#37352F] sm:text-[11px]">
            Daily tasks
          </div>
          <div className="space-y-1 text-[9px] text-[#37352F]">
            <div className="flex items-center gap-1.5 border-b border-[#F0EFED] pb-1">
              <span className="h-2.5 w-2.5 shrink-0 rounded border border-[#C4C4C0]" />
              <span>Deep work block</span>
            </div>
            <div className="flex items-center gap-1.5 border-b border-[#F0EFED] pb-1">
              <span className="h-2.5 w-2.5 shrink-0 rounded border border-[#C4C4C0]" />
              <span>Email triage</span>
            </div>
            <div className="flex items-center gap-1.5 pb-0.5 opacity-55">
              <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded border border-[#37352F] bg-[#37352F] text-[6px] text-white">
                ✓
              </span>
              <span className="line-through">Plan tomorrow</span>
            </div>
          </div>
          <div className="mt-auto text-[8px] text-[#9B9A97]">Today · Upcoming · Done</div>
        </div>
      </Frame>

      <Frame
        purpose="component"
        caption="Capture first, file lightly — retrieval beats perfect folders when your head is full."
      >
        <SidebarNav items={["Life System", "Tasks", "Notes"]} />
        <div className={`flex flex-1 flex-col gap-1 p-2 ${notionPage}`}>
          <div className="text-[10px] font-semibold text-[#37352F] sm:text-[11px]">
            Notes · Inbox
          </div>
          <div className="rounded border-l-2 border-[#D4A574] bg-[#FBF8F4] px-2 py-1.5 text-[9px] leading-snug text-[#4A4A48]">
            Idea: weekly review = 15 min, same time
          </div>
          <ul className="mt-1 space-y-0.5 pl-3 text-[9px] text-[#5C5C5C] marker:text-[#C4C4C0]">
            <li className="list-disc">Article outline</li>
            <li className="list-disc">Gift for…</li>
          </ul>
        </div>
      </Frame>

      <Frame
        purpose="use_case"
        caption="A real morning: one glance at tasks and notes — then you work, instead of re-deciding where everything lives."
      >
        <SidebarNav items={["Life System", "Today"]} />
        <div className={`flex flex-1 flex-col gap-1.5 p-2 ${notionPage}`}>
          <div className="text-[10px] font-semibold text-[#37352F] sm:text-[11px]">
            Today
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded border border-[#E8E7E4] p-1.5">
              <div className="mb-1 text-[8px] font-medium uppercase tracking-wide text-[#9B9A97]">
                Tasks
              </div>
              <div className="flex items-center gap-1 text-[8px] text-[#37352F]">
                <span className="h-2 w-2 rounded border border-[#C4C4C0]" /> 3 open
              </div>
            </div>
            <div className="rounded border border-[#E8E7E4] p-1.5">
              <div className="mb-1 text-[8px] font-medium uppercase tracking-wide text-[#9B9A97]">
                Notes
              </div>
              <div className="text-[8px] leading-tight text-[#6B6B6B]">
                Last: Inbox idea
              </div>
            </div>
          </div>
          <div className="rounded bg-[#F7F6F3] px-2 py-1 text-[8px] text-[#6B6B6B]">
            → Open full task list · Open notes
          </div>
        </div>
      </Frame>
    </div>
  );
}
