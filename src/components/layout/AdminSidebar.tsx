"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Kelola Menu", href: "/admin/menus", icon: UtensilsCrossed },
  { label: "Kelola Pesanan", href: "/admin/orders", icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#122b24] px-4 py-8 text-white md:flex">
      <div className="px-3">
        <span className="font-serif text-3xl font-bold tracking-[-0.5px]">
          AMARA
        </span>
        <p className="label-eyebrow mt-1 text-[10px] uppercase text-white/50">
          Fine Dining Admin
        </p>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          <Settings size={18} />
          Settings
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-copper hover:bg-white/5"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
