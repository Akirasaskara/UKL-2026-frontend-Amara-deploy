"use client";

import { CircleUser } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

export function AdminTopBar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-white px-5 py-4 md:px-8">
      <h1 className="font-serif text-2xl font-bold tracking-[-0.4px] text-ink">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CircleUser size={28} className="text-primary" />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-ink">
              {user?.name ?? "Admin"}
            </p>
            <p className="text-xs text-muted">Super Administrator</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm font-medium text-body transition-colors hover:text-copper"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
