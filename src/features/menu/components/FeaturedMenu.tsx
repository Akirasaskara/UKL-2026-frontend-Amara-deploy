"use client";

import { useQuery } from "@tanstack/react-query";
import { menuService } from "@/lib/api/menu.service";
import { MenuCard, type MenuCardData } from "@/components/shared/MenuCard";

/** Design fallback used when the API has no menus yet (keeps the page rich). */
const FALLBACK: MenuCardData[] = [
  {
    name: "Saffron Risotto",
    price: 350000,
    imageUrl: "/images/dish-saffron.png",
    description:
      "Arborio rice slowly simmered in a rich saffron-infused broth, finished with aged Parmigiano-Reggiano.",
  },
  {
    name: "Forest Tartlet",
    price: 220000,
    imageUrl: "/images/dish-tartlet.png",
    description:
      "Wild foraged mushrooms in a delicate pastry shell, accented with truffle essence and micro-herbs.",
  },
  {
    name: "Glazed Duck",
    price: 480000,
    imageUrl: "/images/dish-duck.png",
    description:
      "Pan-seared duck breast with a spiced copper-honey glaze, served with root vegetable purée.",
  },
];

export function FeaturedMenu() {
  const { data, isError } = useQuery({
    queryKey: ["menus", "featured"],
    queryFn: () => menuService.list({ limit: 3, isAvailable: true }),
  });

  const apiItems = data?.data ?? [];
  const cards: MenuCardData[] =
    !isError && apiItems.length
      ? apiItems.map((m) => ({
          id: m.id,
          name: m.name,
          price: m.price,
          description: m.description,
          imageUrl: m.imageUrl,
        }))
      : FALLBACK;

  return (
    <section className="w-full bg-[#fbfaf7] px-5 py-16 md:px-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col items-center">
          <h2 className="font-serif text-[32px] font-bold tracking-[-0.64px] text-ink">
            Signature Selections
          </h2>
          <span className="mt-3 h-0.5 w-16 bg-copper" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((item, i) => (
            <MenuCard key={item.id ?? i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
