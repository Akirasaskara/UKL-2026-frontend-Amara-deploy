import Link from "next/link";
import { Receipt } from "lucide-react";

export function PaymentNotFound() {
  return (
    <div className="mx-auto flex max-w-[480px] flex-col items-center gap-4 px-5 py-20 text-center">
      <Receipt size={40} className="text-secondary" />
      <h1 className="font-serif text-2xl text-ink">Pesanan tidak ditemukan</h1>
      <p className="text-sm text-body">
        Detail pembayaran tidak tersedia. Silakan lihat riwayat pesanan Anda.
      </p>
      <Link
        href="/orders"
        className="mt-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
      >
        Lihat Riwayat Pesanan
      </Link>
    </div>
  );
}
