"use client";

import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Frown, Loader2 } from "lucide-react";
import { menuService } from "@/lib/api/menu.service";
import { categoryService } from "@/lib/api/category.service";
import { CatalogCard } from "./CatalogCard";
import { CategoryFilter } from "./CategoryFilter";
import { MenuSearch } from "./MenuSearch";

const PAGE_SIZE = 6;

export function MenuCatalog() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  // Debounce the search input before hitting the API.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.list,
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["menus", "catalog", categoryId, debounced],
    queryFn: ({ pageParam }) =>
      menuService.list({
        page: pageParam,
        limit: PAGE_SIZE,
        categoryId: categoryId ?? undefined,
        search: debounced || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.meta.hasNextPage ? last.meta.currentPage + 1 : undefined,
  });

  const items = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-10 md:py-16">
      {/* Title */}
      <div className="mb-10 flex flex-col items-center text-center">
        <h1 className="font-serif text-4xl font-bold tracking-[-0.96px] text-ink md:text-[52px]">
          Menu Kami
        </h1>
        <p className="mt-2 font-serif text-lg italic text-body">
          Karya kuliner terbaik dengan bahan organik pilihan.
        </p>
      </div>

      {/* Filter + search */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <CategoryFilter
          categories={categories ?? []}
          value={categoryId}
          onChange={setCategoryId}
        />
        <MenuSearch value={search} onChange={setSearch} />
      </div>

      {/* States */}
      {isLoading ? (
        <CardSkeletonGrid />
      ) : isError ? (
        <EmptyState
          title="Gagal memuat menu"
          subtitle="Periksa koneksi Anda dan coba lagi."
        />
      ) : items.length === 0 ? (
        <EmptyState
          title="Menu tidak ditemukan"
          subtitle="Coba kategori lain atau ubah kata kunci pencarian."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((menu) => (
              <CatalogCard key={menu.id} menu={menu} />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="label-eyebrow inline-flex items-center gap-2 rounded-lg bg-black/5 px-8 py-3.5 text-xs font-semibold uppercase text-body transition-colors hover:bg-black/10 disabled:opacity-60"
              >
                {isFetchingNextPage && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Lihat Menu Lainnya
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function CardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-line/30 bg-white"
        >
          <div className="h-52 w-full animate-pulse bg-black/5" />
          <div className="space-y-3 p-6">
            <div className="h-6 w-2/3 animate-pulse rounded bg-black/5" />
            <div className="h-4 w-full animate-pulse rounded bg-black/5" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-black/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <Frown size={40} className="text-secondary" />
      <p className="font-serif text-2xl text-ink">{title}</p>
      <p className="text-sm text-body">{subtitle}</p>
    </div>
  );
}
