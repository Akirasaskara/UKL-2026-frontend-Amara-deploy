import type { Metadata } from "next";
import { MenuCatalog } from "@/features/menu/components/MenuCatalog";

export const metadata: Metadata = {
  title: "Menu — Amara",
  description: "Jelajahi katalog menu Amara dan tambahkan ke keranjang Anda.",
};

export default function MenuPage() {
  return <MenuCatalog />;
}
