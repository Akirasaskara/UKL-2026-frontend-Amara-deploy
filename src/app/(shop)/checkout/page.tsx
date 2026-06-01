import type { Metadata } from "next";
import { CheckoutView } from "@/features/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout Amara",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
