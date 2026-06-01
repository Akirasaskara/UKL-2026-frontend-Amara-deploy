import { TransferBankView } from "@/features/payment/TransferBankView";

export default async function TransferPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TransferBankView orderId={id} />;
}
