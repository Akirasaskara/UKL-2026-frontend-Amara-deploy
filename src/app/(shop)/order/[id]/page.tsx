import { OrderTrackView } from "@/features/order/OrderTrackView";

export default async function OrderTrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderTrackView orderId={id} />;
}
