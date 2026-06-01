export const TAX_RATE = 0.11; // 11%
export const SERVICE_RATE = 0.05; // 5%

export interface OrderTotals {
  subtotal: number;
  tax: number;
  service: number;
  total: number;
}

/** Compute Amara order totals (subtotal + 11% tax + 5% service charge). */
export function calcTotals(subtotal: number): OrderTotals {
  const tax = Math.round(subtotal * TAX_RATE);
  const service = Math.round(subtotal * SERVICE_RATE);
  return { subtotal, tax, service, total: subtotal + tax + service };
}
