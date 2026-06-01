"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCartCount, useCartTotal } from "@/features/cart/store";
import { useHasMounted, formatRupiah } from "@/lib/utils";

const HIDDEN_ON = ["/cart", "/checkout", "/payment"];

/** Floating bar that appears once the cart has items — quick access to review the order. */
export function CartBar() {
  const mounted = useHasMounted();
  const count = useCartCount();
  const total = useCartTotal();
  const pathname = usePathname();

  const hidden = HIDDEN_ON.some((p) => pathname.startsWith(p));
  if (hidden || !mounted || count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <Link
        href="/cart"
        className="pointer-events-auto flex w-full max-w-[520px] items-center justify-between gap-4 rounded-full bg-primary px-6 py-4 text-white shadow-[0px_12px_30px_rgba(40,65,57,0.35)] transition-transform hover:scale-[1.01]"
      >
        <span className="flex items-center gap-3">
          <span className="relative grid size-8 place-items-center rounded-full bg-white/15">
            <ShoppingBag size={18} />
            <span className="absolute -right-1 -top-1 grid min-w-[18px] place-items-center rounded-full bg-copper px-1 text-[11px] font-bold">
              {count}
            </span>
          </span>
          <span className="text-sm font-semibold">{formatRupiah(total)}</span>
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold tracking-[0.28px]">
          Lihat Keranjang
          <ArrowRight size={18} />
        </span>
      </Link>
    </div>
  );
}
