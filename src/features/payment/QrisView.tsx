"use client";

import { useRouter } from "next/navigation";
import { Clock, Download } from "lucide-react";
import { useOrderHistory } from "@/features/order/history";
import { useCountdown } from "./useCountdown";
import { useHasMounted, formatRupiah } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { PaymentNotFound } from "./PaymentNotFound";

const STEPS = [
  "Buka aplikasi e-wallet (OVO, GoPay, Dana) atau m-banking Anda.",
  'Pilih menu "Scan" atau "Bayar" dan arahkan kamera ke QR di atas.',
  "Konfirmasi pembayaran sesuai nominal dan masukkan PIN Anda.",
];

export function QrisView({ orderId }: { orderId: string }) {
  const mounted = useHasMounted();
  const router = useRouter();
  const order = useOrderHistory((s) => s.orders.find((o) => o.id === orderId));
  const markPaid = useOrderHistory((s) => s.markPaid);
  const timer = useCountdown(900);

  if (!mounted) return <div className="min-h-[60vh]" />;
  if (!order) return <PaymentNotFound />;

  const confirmPaid = () => {
    markPaid(order.id);
    toast("Pembayaran dikonfirmasi! Pesanan Anda sedang diproses.");
    router.push("/orders");
  };

  return (
    <div className="flex justify-center px-5 py-16">
      <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-line/30 bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 border-b border-line/10 p-10">
          <h1 className="font-serif text-[32px] font-bold tracking-[-0.64px] text-ink">
            Pembayaran QRIS
          </h1>
          <span className="label-eyebrow text-xs uppercase tracking-[2.4px] text-body">
            Merchant: Amara Fine Dining
          </span>
        </div>

        <div className="flex flex-col items-center p-10">
          {/* Countdown */}
          <div className="flex items-center gap-2 rounded-full bg-[#ffdad6]/30 px-6 py-2">
            <Clock size={15} className="text-[#ba1a1a]" />
            <span className="text-sm font-semibold tracking-[0.28px] text-[#ba1a1a]">
              Bayar dalam {timer}
            </span>
          </div>

          {/* QR */}
          <div className="mt-10 flex flex-col items-center gap-6 rounded-xl border-2 border-line/20 p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/qris-code.png"
              alt="QRIS"
              className="size-64 object-contain"
            />
            <div className="flex items-center justify-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/qris-logo.png"
                alt="QRIS"
                className="h-6 object-contain opacity-80"
              />
              <span className="h-4 w-px bg-line" />
              <span className="label-eyebrow text-xs text-muted">
                GPN &amp; Semua E-Wallet
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="label-eyebrow text-xs font-medium tracking-[1.8px] text-body">
              Total Tagihan
            </span>
            <span className="font-serif text-5xl font-bold tracking-[-0.96px] text-ink">
              {formatRupiah(order.total)}
            </span>
          </div>

          {/* Instructions */}
          <div className="mt-10 w-full rounded-lg bg-[#f4f3f1] p-6">
            <h3 className="text-sm font-semibold tracking-[0.28px] text-ink">
              Instruksi Pembayaran
            </h3>
            <ol className="mt-4 flex flex-col gap-4">
              {STEPS.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[16px] leading-tight text-body">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={confirmPaid}
            className="mt-8 w-full rounded-lg bg-ink py-4 text-sm font-semibold tracking-[0.28px] text-white transition-colors hover:bg-ink/90"
          >
            Saya Sudah Bayar
          </button>
          <button
            type="button"
            onClick={() => toast("QR disimpan")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-muted py-3.5 text-sm font-semibold tracking-[0.28px] text-ink transition-colors hover:bg-black/5"
          >
            <Download size={14} />
            Simpan QR
          </button>
          <button
            type="button"
            onClick={() => router.push("/checkout")}
            className="mt-4 text-sm font-semibold text-body underline decoration-line"
          >
            Ganti metode pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
