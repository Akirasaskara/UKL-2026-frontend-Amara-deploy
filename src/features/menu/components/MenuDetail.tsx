"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { MenuImage } from "@/components/shared/MenuImage";
import { useCart } from "@/features/cart/store";
import { toast } from "@/lib/toast";
import { formatRupiah } from "@/lib/utils";
import type { Menu } from "@/types/api.types";

export function MenuDetail({ menu }: { menu: Menu }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    add(menu, qty);
    toast(`${qty} × ${menu.name} ditambahkan ke keranjang`);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10 md:py-14">
      <Link
        href="/menu"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} />
        Kembali ke Menu
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl shadow-[0px_10px_30px_-5px_rgba(40,65,57,0.12)]">
          <MenuImage src={menu.imageUrl} menuId={menu.id} alt={menu.name} />
        </div>

        <div className="flex flex-col">
          {menu.category && (
            <span className="label-eyebrow text-xs font-medium uppercase text-secondary">
              {menu.category.name}
            </span>
          )}
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-[-0.5px] text-ink md:text-5xl">
            {menu.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-copper">
            {formatRupiah(menu.price)}
          </p>
          {menu.description && (
            <p className="mt-5 leading-relaxed text-body">{menu.description}</p>
          )}
          {!menu.isAvailable && (
            <p className="mt-4 text-sm font-semibold text-red-600">
              Menu ini sedang tidak tersedia.
            </p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-line">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-11 place-items-center text-body hover:text-primary"
                aria-label="Kurangi"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-semibold text-ink">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="grid size-11 place-items-center text-body hover:text-primary"
                aria-label="Tambah"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!menu.isAvailable}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold tracking-[0.28px] text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Tambah ke Keranjang
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
