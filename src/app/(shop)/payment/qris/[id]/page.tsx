import { QrisView } from "@/features/payment/QrisView";

export default async function QrisPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QrisView orderId={id} />;
}
