"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/api.types";

/**
 * Horizontal pill-style category filter bar for admin views.
 * Renders an "All" button + one button per category.
 * The active pill uses the primary (forest-green) fill.
 */
export function CategoryFilterBar({
  categories,
  value,
  onChange,
  loading = false,
  className,
}: {
  categories: Category[];
  value: string;            // "" = all
  onChange: (id: string) => void;
  loading?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none",
        className,
      )}
    >
      {/* "Semua" pill */}
      <FilterPill active={value === ""} onClick={() => onChange("")}>
        Semua
      </FilterPill>

      {loading
        ? /* skeleton placeholders while categories load */
          Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="inline-block h-9 w-20 animate-pulse rounded-full bg-line/40"
            />
          ))
        : categories.map((c) => (
            <FilterPill
              key={c.id}
              active={value === c.id}
              onClick={() => onChange(c.id)}
            >
              {c.name}
            </FilterPill>
          ))}
    </div>
  );
}

/* ── Internal pill button ─────────────────────────────────────────── */

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200",
        active
          ? "bg-primary text-white shadow-[0_2px_8px_rgba(40,65,57,0.25)] scale-[1.02]"
          : "bg-white text-body border border-line/60 hover:border-primary/30 hover:text-primary hover:shadow-sm",
      )}
    >
      {children}
    </button>
  );
}
