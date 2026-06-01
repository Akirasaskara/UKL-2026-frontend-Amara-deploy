"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Banknote, Landmark, QrCode, Store } from "lucide-react";
import { useCart, useCartTotal } from "@/features/cart/store";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useOrderHistory, type PaymentMethod } from "@/features/order/history";
import { orderService } from "@/lib/api/order.service";
import { calcTotals } from "@/lib/pricing";
import { useHasMounted, formatRupiah, cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

const schema = z.object({
  customerName: z.string().min(2, "Nama wajib diisi"),
  phone: z.string().optional(),
  tableNumber: z.string().min(1, "Nomor meja / alamat wajib diisi"),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const METHODS: {
  id: PaymentMethod;
  label: string;
  icon: typeof Banknote;
}[] = [
  { id: "cash", label: "Tunai (Cash)", icon: Banknote },
  { id: "transfer", label: "Transfer Bank", icon: Landmark },
  { id: "qris", label: "QRIS", icon: QrCode },
  { id: "venue", label: "Bayar di Tempat (Venue)", icon: Store },
];

export function CheckoutView() {
  const mounted = useHasMounted();
  const router = useRouter();
  const { user } = useAuth();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = useCartTotal();
  const addOrder = useOrderHistory((s) => s.addOrder);

  const [method, setMethod] = useState<PaymentMethod>("transfer");
  const [submitting, setSubmitting] = useState(false);
  const totals = calcTotals(subtotal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      customerName: user?.name ?? "",
      phone: "",
      tableNumber: "",
      notes: "",
    },
  });

  if (!mounted) return <div className="min-h-[60vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[600px] px-5 py-20 text-center">
        <h1 className="font-serif text-3xl text-ink">Keranjang kosong</h1>
        <p className="mt-2 text-body">
          Tambahkan menu terlebih dahulu sebelum checkout.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Jelajahi Menu
        </Link>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const notes = [
        values.phone ? `Telp: ${values.phone}` : null,
        values.notes || null,
      ]
        .filter(Boolean)
        .join(" — ");

      const order = await orderService.create({
        tableNumber: values.tableNumber,
        customerName: values.customerName,
        notes: notes || undefined,
        items: items.map((i) => ({ menuId: i.menuId, quantity: i.quantity })),
      });

      addOrder({
        id: order.id,
        createdAt: new Date().toISOString(),
        customerName: values.customerName,
        tableNumber: values.tableNumber,
        notes,
        items: items.map((i) => ({
          menuId: i.menuId,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          imageUrl: i.imageUrl,
        })),
        total: totals.total,
        paymentMethod: method,
        status: order.status ?? "PENDING",
      });

      clear();

      if (method === "transfer") router.push(`/payment/transfer/${order.id}`);
      else if (method === "qris") router.push(`/payment/qris/${order.id}`);
      else {
        toast("Pesanan berhasil dibuat!");
        router.push("/orders");
      }
    } catch {
      toast("Gagal membuat pesanan. Coba lagi.", "error");
      setSubmitting(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-[1200px] px-5 py-12 md:px-10"
    >
      <h1 className="mb-8 font-serif text-3xl font-bold tracking-[-0.64px] text-primary md:text-[32px]">
        Checkout
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left: forms */}
        <div className="flex flex-col gap-6">
          {/* Info section */}
          <section className="rounded-xl bg-white p-6 shadow-[0px_10px_30px_-5px_rgba(40,65,57,0.08)] md:p-10">
            <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
              Informasi Pengiriman/Meja
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nama Lengkap" error={errors.customerName?.message}>
                  <input
                    {...register("customerName")}
                    placeholder="Masukkan nama Anda"
                    className={inputCls}
                  />
                </Field>
                <Field label="Nomor Telepon">
                  <input
                    {...register("phone")}
                    placeholder="08123456789"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field
                label="Nomor Meja / Alamat Pengiriman"
                error={errors.tableNumber?.message}
              >
                <input
                  {...register("tableNumber")}
                  placeholder="Contoh: Meja 12 atau Jl. Sudirman No. 1"
                  className={inputCls}
                />
              </Field>
              <Field label="Catatan Khusus (Opsional)">
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Alergi, permintaan tingkat kematangan, dll."
                  className={cn(inputCls, "resize-none")}
                />
              </Field>
            </div>
          </section>

          {/* Payment method */}
          <section className="rounded-xl bg-white p-6 shadow-[0px_10px_30px_-5px_rgba(40,65,57,0.08)] md:p-10">
            <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
              Metode Pembayaran
            </h2>
            <div className="flex flex-col gap-4">
              {METHODS.map(({ id, label, icon: Icon }) => {
                const active = method === id;
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setMethod(id)}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 text-left transition-colors",
                      active
                        ? "border-primary bg-primary/5"
                        : "border-line hover:border-secondary",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full border",
                        active ? "border-primary" : "border-line",
                      )}
                    >
                      {active && (
                        <span className="size-2.5 rounded-full bg-primary" />
                      )}
                    </span>
                    <span className="flex-1 text-[16px] text-ink">{label}</span>
                    <Icon size={20} className="text-secondary" />
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right: summary */}
        <aside className="h-fit rounded-xl bg-white p-6 shadow-[0px_10px_30px_-5px_rgba(40,65,57,0.08)] lg:sticky lg:top-6">
          <h2 className="border-b border-footer pb-4 font-serif text-2xl font-bold text-primary">
            Ringkasan Pesanan
          </h2>

          <ul className="flex flex-col gap-4 py-5">
            {items.map((i) => (
              <li key={i.menuId} className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-[18px] text-ink">{i.name}</p>
                  <p className="text-sm text-body">x{i.quantity}</p>
                </div>
                <span className="whitespace-nowrap text-[16px] text-ink">
                  {formatRupiah(i.price * i.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 border-t border-footer pt-4 text-[16px] text-body">
            <Row label="Subtotal" value={formatRupiah(totals.subtotal)} />
            <Row label="Tax (11%)" value={formatRupiah(totals.tax)} />
            <Row label="Service Charge (5%)" value={formatRupiah(totals.service)} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-footer pt-4">
            <span className="font-serif text-xl font-bold text-primary">Total</span>
            <span className="font-serif text-[28px] font-bold text-gold">
              {formatRupiah(totals.total)}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-copper px-6 py-3.5 text-sm font-semibold tracking-[0.28px] text-white transition-colors hover:bg-copper/90 disabled:opacity-60"
            >
              {submitting ? "Memproses…" : "Konfirmasi Pesanan"}
            </button>
            <Link
              href="/cart"
              className="rounded-lg border border-primary px-6 py-3.5 text-center text-sm font-semibold tracking-[0.28px] text-primary transition-colors hover:bg-primary/5"
            >
              Kembali ke Keranjang
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-secondary/70 bg-white px-4 py-3 text-[16px] text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-eyebrow text-xs font-medium uppercase text-body">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
