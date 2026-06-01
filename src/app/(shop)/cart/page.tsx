"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, useCartTotal } from "@/features/cart/store";
import { useHasMounted, formatRupiah } from "@/lib/utils";
import { MenuImage } from "@/components/shared/MenuImage";

export default function CartPage() {
  const mounted = useHasMounted();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = useCartTotal();

  if (!mounted) return <div className="min-h-[50vh]" />;

  return (
    <div className="mx-auto max-w-[900px] px-5 py-10 md:px-10 md:py-14">
      <h1 className="mb-8 font-serif text-4xl font-bold tracking-[-0.5px] text-ink">
        Keranjang
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line/40 bg-white py-20 text-center">
          <ShoppingBag size={40} className="text-secondary" />
          <p className="font-serif text-2xl text-ink">Keranjang masih kosong</p>
          <p className="text-sm text-body">
            Tambahkan hidangan favorit Anda dari menu.
          </p>
          <Link
            href="/menu"
            className="mt-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Jelajahi Menu
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Items */}
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li
                key={item.menuId}
                className="flex gap-4 rounded-xl border border-line/40 bg-white p-4"
              >
                <div className="size-20 shrink-0 overflow-hidden rounded-lg">
                  <MenuImage src={item.imageUrl} alt={item.name} />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg text-ink">{item.name}</h3>
                    <button
                      type="button"
                      onClick={() => remove(item.menuId)}
                      className="text-muted transition-colors hover:text-red-600"
                      aria-label={`Hapus ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-copper">
                    {formatRupiah(item.price)}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-line">
                      <button
                        type="button"
                        onClick={() => setQty(item.menuId, item.quantity - 1)}
                        className="grid size-9 place-items-center text-body hover:text-primary"
                        aria-label="Kurangi"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-sm font-semibold text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.menuId, item.quantity + 1)}
                        className="grid size-9 place-items-center text-body hover:text-primary"
                        aria-label="Tambah"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-semibold text-ink">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-line/40 bg-white p-6">
            <h2 className="font-serif text-xl text-ink">Ringkasan</h2>
            <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-4">
              <span className="text-body">Total</span>
              <span className="text-xl font-bold text-ink">
                {formatRupiah(total)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold tracking-[0.28px] text-white transition-colors hover:bg-primary/90"
            >
              Lanjut ke Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
