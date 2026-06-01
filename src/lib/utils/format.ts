/** Format a number as Indonesian Rupiah, e.g. 125000 -> "Rp125.000". */
export const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
