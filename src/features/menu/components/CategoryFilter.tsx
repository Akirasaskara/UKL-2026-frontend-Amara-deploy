"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/api.types";

export function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string | null;
  onChange: (categoryId: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Pill active={value === null} onClick={() => onChange(null)}>
        Semua
      </Pill>
      {categories.map((c) => (
        <Pill
          key={c.id}
          active={value === c.id}
          onClick={() => onChange(c.id)}
        >
          {c.name}
        </Pill>
      ))}
    </div>
  );
}

function Pill({
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
        "label-eyebrow rounded-full px-5 py-2.5 text-xs font-semibold uppercase transition-colors",
        active
          ? "bg-primary text-white"
          : "bg-black/5 text-body hover:bg-black/10",
      )}
    >
      {children}
    </button>
  );
}
