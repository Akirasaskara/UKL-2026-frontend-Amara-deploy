"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, ClipboardList } from "lucide-react";
import { useCartCount } from "@/features/cart/store";
import { useHasMounted, cn } from "@/lib/utils";

const ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Keranjang", href: "/cart", icon: ShoppingBag, cart: true },
  { label: "Pesanan", href: "/orders", icon: ClipboardList },
];

export function BottomNav() {
  const pathname = usePathname();
  const mounted = useHasMounted();
  const count = useCartCount();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-paper/95 backdrop-blur-md md:hidden">
      {ITEMS.map(({ label, href, icon: Icon, cart }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              active ? "text-primary" : "text-muted",
            )}
          >
            <span className="relative">
              <Icon size={20} />
              {cart && mounted && count > 0 && (
                <span className="absolute -right-2 -top-1.5 grid min-w-[16px] place-items-center rounded-full bg-copper px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
