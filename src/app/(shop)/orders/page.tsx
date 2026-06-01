import type { Metadata } from "next";
import { OrderHistoryView } from "@/features/order/OrderHistoryView";

export const metadata: Metadata = {
  title: "Riwayat Pesanan — Amara",
};

export default function OrdersPage() {
  return <OrderHistoryView />;
}
