import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { MenuImage } from "./MenuImage";

export interface MenuCardData {
  id?: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export function MenuCard({ item }: { item: MenuCardData }) {
  const href = item.id ? `/menu/${item.id}` : "/menu";
  return (
    <article className="flex flex-col rounded-xl border border-line/30 bg-white p-6 shadow-[0px_10px_30px_-5px_rgba(40,65,57,0.08)]">
      <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
        <MenuImage src={item.imageUrl} alt={item.name} />
      </div>

      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-serif text-2xl text-ink">{item.name}</h3>
        <span className="shrink-0 font-semibold text-gold">
          {formatRupiah(item.price)}
        </span>
      </div>

      {item.description && (
        <p className="mb-4 line-clamp-3 flex-1 text-[16px] leading-[1.6] text-body">
          {item.description}
        </p>
      )}

      <Link
        href={href}
        className="mt-auto rounded-lg border border-copper/20 bg-copper/10 py-2.5 text-center text-sm font-semibold tracking-[0.28px] text-copper transition-colors hover:bg-copper/20"
      >
        View Details
      </Link>
    </article>
  );
}
