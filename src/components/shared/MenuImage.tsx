import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuImageCache } from "@/features/admin/menuImageCache";

/**
 * Renders the menu photo.
 * Priority: Cloudinary cache → API imageUrl → branded placeholder.
 */
export function MenuImage({
  src,
  menuId,
  alt,
  className,
}: {
  src?: string | null;
  menuId?: string;
  alt: string;
  className?: string;
}) {
  // Check Cloudinary cache first (backend imageUrl is often null)
  const cachedUrl = menuId ? menuImageCache.get(menuId) : undefined;
  const resolved = cachedUrl ?? src ?? null;

  if (resolved) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "grid h-full w-full place-items-center bg-gradient-to-br from-primary/15 to-secondary/25 text-secondary",
        className,
      )}
      aria-label={alt}
    >
      <UtensilsCrossed size={40} strokeWidth={1.5} />
    </div>
  );
}
