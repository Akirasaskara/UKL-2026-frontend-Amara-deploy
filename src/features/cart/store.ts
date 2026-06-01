"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Menu } from "@/types/api.types";

export interface CartItem {
  menuId: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (menu: Pick<Menu, "id" | "name" | "price" | "imageUrl">, qty?: number) => void;
  remove: (menuId: string) => void;
  setQty: (menuId: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (menu, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.menuId === menu.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuId === menu.id
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                menuId: menu.id,
                name: menu.name,
                price: menu.price,
                imageUrl: menu.imageUrl,
                quantity: qty,
              },
            ],
          };
        }),
      remove: (menuId) =>
        set((state) => ({
          items: state.items.filter((i) => i.menuId !== menuId),
        })),
      setQty: (menuId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.menuId !== menuId)
              : state.items.map((i) =>
                  i.menuId === menuId ? { ...i, quantity: qty } : i,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "amara_cart" },
  ),
);

export const useCartCount = () =>
  useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

export const useCartTotal = () =>
  useCart((s) => s.items.reduce((t, i) => t + i.price * i.quantity, 0));
