import { TopAppBar } from "@/components/layout/TopAppBar";
import { Footer } from "@/components/layout/Footer";
import { CartBar } from "@/components/layout/CartBar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopAppBar />
      <main className="flex-1 bg-paper pb-16 md:pb-0">{children}</main>
      <Footer />
      <CartBar />
      <BottomNav />
    </>
  );
}
