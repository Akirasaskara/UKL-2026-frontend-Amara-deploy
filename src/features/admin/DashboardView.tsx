"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  UtensilsCrossed,
  ClipboardList,
  AlertCircle,
  Users,
} from "lucide-react";
import { menuService } from "@/lib/api/menu.service";
import { orderService } from "@/lib/api/order.service";
import { AdminTopBar } from "@/components/layout/AdminTopBar";
import { ORDER_STATUS } from "./orderStatus";
import { formatRupiah } from "@/lib/utils";
import { orderCode } from "@/features/order/history";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function DashboardView() {
  const menus = useQuery({
    queryKey: ["admin", "menus", "count"],
    queryFn: () => menuService.list({ limit: 1 }),
  });
  const orders = useQuery({
    queryKey: ["admin", "orders", "recent"],
    queryFn: () => orderService.list({ limit: 5 }),
  });
  const pending = useQuery({
    queryKey: ["admin", "orders", "pending-count"],
    queryFn: () => orderService.list({ status: "PENDING", limit: 1 }),
  });

  const recent = orders.data?.data ?? [];

  return (
    <>
      <AdminTopBar title="Dashboard" />
      <div className="space-y-8 p-5 md:p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={UtensilsCrossed}
            label="Total Menu"
            value={menus.data?.meta.totalItems ?? "—"}
            tint="bg-secondary/15 text-secondary"
          />
          <StatCard
            icon={ClipboardList}
            label="Total Pesanan"
            value={orders.data?.meta.totalItems ?? "—"}
            tint="bg-primary/10 text-primary"
          />
          <StatCard
            icon={AlertCircle}
            label="Pesanan Pending"
            value={pending.data?.meta.totalItems ?? "—"}
            tint="bg-[#ffdad6] text-[#ba1a1a]"
          />
          <StatCard
            icon={Users}
            label="Total User"
            value="—"
            tint="bg-gold/20 text-copper"
          />
        </div>

        {/* Recent orders */}
        <section className="rounded-xl border border-line/40 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-ink">
              Pesanan Terbaru
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm font-semibold text-copper hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          {orders.isLoading ? (
            <p className="py-10 text-center text-sm text-muted">Memuat…</p>
          ) : recent.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              Belum ada pesanan.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line/60 text-xs uppercase tracking-wide text-muted">
                    <th className="pb-3 pr-4 font-medium">ID</th>
                    <th className="pb-3 pr-4 font-medium">Pelanggan</th>
                    <th className="pb-3 pr-4 font-medium">Total</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((o) => {
                    const st = ORDER_STATUS[o.status];
                    return (
                      <tr
                        key={o.id}
                        className="border-b border-line/30 last:border-0"
                      >
                        <td className="py-3 pr-4 font-mono text-xs text-body">
                          {orderCode(o.id)}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                              {initials(o.customerName)}
                            </span>
                            <span className="text-ink">{o.customerName}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-ink">
                          {formatRupiah(Number(o.totalPrice ?? 0))}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${st.badge}`}
                          >
                            {st.label}
                          </span>
                        </td>
                        <td className="py-3">
                          <Link
                            href="/admin/orders"
                            className="text-sm font-semibold text-copper hover:underline"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  tint: string;
}) {
  return (
    <div className="rounded-xl border border-line/40 bg-white p-5">
      <div className={`grid size-10 place-items-center rounded-lg ${tint}`}>
        <Icon size={20} />
      </div>
      <p className="label-eyebrow mt-4 text-[11px] uppercase text-muted">
        {label}
      </p>
      <p className="mt-1 font-serif text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}
