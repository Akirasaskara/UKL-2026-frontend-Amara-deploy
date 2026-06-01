"use client";

import { useRouter } from "next/navigation";
import { Clock, Copy, Upload } from "lucide-react";
import { useOrderHistory } from "@/features/order/history";
import { useCountdown } from "./useCountdown";
import { useHasMounted, formatRupiah } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { PaymentNotFound } from "./PaymentNotFound";

const BANK = {
  name: "Bank BCA",
  account: "1234567890",
  holder: "PT Amara Fine Dining",
};

export function TransferBankView({ orderId }: { orderId: string }) {
  const mounted = useHasMounted();
  const router = useRouter();
  const order = useOrderHistory((s) => s.orders.find((o) => o.id === orderId));
  const markPaid = useOrderHistory((s) => s.markPaid);
  const timer = useCountdown(900);

  if (!mounted) return <div className="min-h-[60vh]" />;
  if (!order) return <PaymentNotFound />;

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast(`${label} disalin`);
  };

  const confirmPaid = () => {
    markPaid(order.id);
    toast("Pembayaran dikonfirmasi! Pesanan Anda sedang diproses.");
    router.push("/orders");
  };

  return (
    <div className="flex justify-center px-5 py-16">
      <div className="w-full max-w-[480px] rounded-xl border border-line/30 bg-white p-8 shadow-[0px_10px_40px_-10px_rgba(40,65,57,0.18)] sm:p-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 pb-4">
          <h1 className="font-serif text-[32px] font-bold tracking-[-0.64px] text-ink">
            Transfer Bank
          </h1>
          <span className="label-eyebrow text-[10px] uppercase tracking-[1px] text-body">
            Instruksi Pembayaran
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 rounded-lg border border-ink/5 bg-[#f4f3f1] p-4">
          <Clock size={20} className="text-secondary" />
          <span className="text-[16px] text-body">Selesaikan dalam</span>
          <span className="text-[16px] font-bold text-ink">{timer}</span>
        </div>

        {/* Bank identity */}
        <div className="flex items-center gap-4 border-b border-line/20 py-6">
          <div className="grid size-12 place-items-center overflow-hidden rounded-full bg-[#e9e8e6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/bank-bca.png" alt="BCA" className="size-8 object-contain" />
          </div>
          <div>
            <p className="text-[16px] text-body">Nama Bank</p>
            <p className="text-[18px] text-ink">{BANK.name}</p>
          </div>
        </div>

        {/* Account number */}
        <div className="mt-6 rounded-lg border border-line/20 bg-[#f4f3f1]/50 p-6">
          <p className="text-[16px] text-body">Nomor Rekening</p>
          <div className="flex items-center justify-between">
            <span className="font-serif text-[32px] font-bold tracking-[1.6px] text-ink">
              {BANK.account}
            </span>
            <CopyBtn onClick={() => copy(BANK.account, "Nomor rekening")} />
          </div>
          <div className="pt-4">
            <p className="text-[16px] text-body">Nama Pemilik Rekening</p>
            <p className="text-[16px] text-ink">{BANK.holder}</p>
          </div>
        </div>

        {/* Amount */}
        <div className="mt-6 rounded-lg border border-ink/10 bg-ink/5 p-6">
          <p className="text-[16px] text-body">Total Pembayaran</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-ink">
              {formatRupiah(order.total)}
            </span>
            <CopyBtn onClick={() => copy(String(order.total), "Nominal")} />
          </div>
          <p className="pt-2 text-[11px] italic text-body/80">
            Pastikan nominal sesuai hingga 3 digit terakhir.
          </p>
        </div>

        {/* Upload (UI only) */}
        <label className="mt-6 flex h-[131px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line/50 bg-paper text-center">
          <Upload size={26} className="text-secondary" />
          <span className="text-sm text-body">Unggah bukti transfer (opsional)</span>
          <span className="text-[10px] text-muted">
            Format: JPG, PNG, PDF (Maks. 5MB)
          </span>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && toast("Bukti transfer terlampir")
            }
          />
        </label>

        {/* Actions */}
        <button
          type="button"
          onClick={confirmPaid}
          className="mt-6 w-full rounded-lg bg-copper py-4 text-sm font-semibold tracking-[0.28px] text-white shadow-[0px_10px_15px_-3px_rgba(184,104,48,0.2)] transition-colors hover:bg-copper/90"
        >
          Saya Sudah Bayar
        </button>
        <button
          type="button"
          onClick={() => router.push("/checkout")}
          className="mt-4 w-full text-center text-xs text-body underline"
        >
          Ganti metode pembayaran
        </button>
      </div>
    </div>
  );
}

function CopyBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-[16px] text-copper hover:text-copper/80"
    >
      <Copy size={14} />
      Salin
    </button>
  );
}
