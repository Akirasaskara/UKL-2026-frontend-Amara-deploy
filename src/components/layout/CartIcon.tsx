"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartCount } from "@/features/cart/store";
import { useHasMounted } from "@/lib/utils";

export function CartIcon() {
  const mounted = useHasMounted();
  const count = useCartCount();
  const show = mounted && count > 0;

  return (
    <Link
      href="/cart"
      aria-label={`Keranjang${show ? ` (${count} item)` : ""}`}
      className="relative grid size-10 place-items-center rounded-lg text-primary transition-colors hover:bg-primary/5"
    >
      <ShoppingBag size={20} />
      {show && (
        <span className="absolute -right-0.5 -top-0.5 grid min-w-[18px] place-items-center rounded-full bg-copper px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
