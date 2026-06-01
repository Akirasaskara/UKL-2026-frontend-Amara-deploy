import type { OrderStatus } from "@/types/api.types";

/** Admin-facing label + badge styling for each order status. */
export const ORDER_STATUS: Record<
  OrderStatus,
  { label: string; badge: string }
> = {
  PENDING: { label: "Pending", badge: "bg-gold/30 text-copper" },
  PAID: { label: "Menunggu Verif.", badge: "bg-[#ffdad6] text-[#ba1a1a]" },
  PROCESSING: { label: "Diproses", badge: "bg-[#d7e8ca] text-[#5a6951]" },
  COMPLETED: { label: "Selesai", badge: "bg-[#cce9dd] text-primary" },
  CANCELLED: { label: "Dibatalkan", badge: "bg-red-100 text-red-600" },
};

export const ALL_STATUSES: OrderStatus[] = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
];
