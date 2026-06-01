"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { MenuImage } from "@/components/shared/MenuImage";
import { useCart } from "@/features/cart/store";
import { toast } from "@/lib/toast";
import type { Menu } from "@/types/api.types";

export function CatalogCard({ menu }: { menu: Menu }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const priceNum = new Intl.NumberFormat("id-ID").format(menu.price);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    add(menu);
    toast(`${menu.name} ditambahkan ke keranjang`);
  };

  return (
    <article
      onClick={() => router.push(`/menu/${menu.id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-line/30 bg-white shadow-[0px_10px_30px_-5px_rgba(40,65,57,0.08)] transition-shadow hover:shadow-[0px_16px_40px_-8px_rgba(40,65,57,0.18)]"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <MenuImage
          src={menu.imageUrl}
          menuId={menu.id}
          alt={menu.name}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {!menu.isAvailable && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
            Habis
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-2xl leading-tight text-ink">
            {menu.name}
          </h3>
        </div>
        {menu.category && (
          <span className="label-eyebrow mt-1 text-[11px] font-medium uppercase text-secondary">
            {menu.category.name}
          </span>
        )}
        {menu.description && (
          <p className="mt-2 line-clamp-2 flex-1 text-[15px] leading-[1.55] text-body">
            {menu.description}
          </p>
        )}

        <hr className="my-4 border-line/60" />

        <div className="flex items-end justify-between gap-3">
          <div className="leading-none">
            <span className="block text-xs font-medium text-muted">Rp</span>
            <span className="text-xl font-bold text-ink">{priceNum}</span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!menu.isAvailable}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold tracking-[0.28px] text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Tambah ke Keranjang
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
