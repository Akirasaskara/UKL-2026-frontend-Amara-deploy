import { notFound } from "next/navigation";
import { menuService } from "@/lib/api/menu.service";
import { MenuDetail } from "@/features/menu/components/MenuDetail";

export default async function MenuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const menu = await menuService.getById(id).catch(() => null);
  if (!menu) notFound();
  return <MenuDetail menu={menu} />;
}
