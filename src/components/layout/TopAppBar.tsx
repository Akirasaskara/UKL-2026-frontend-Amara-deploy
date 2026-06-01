import Link from "next/link";
import { cn } from "@/lib/utils";
import { HeaderActions } from "./HeaderActions";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Experience", href: "/experience" },
  { label: "Private Dining", href: "/private-dining" },
];

export function TopAppBar({
  variant = "solid",
}: {
  variant?: "solid" | "transparent";
}) {
  const transparent = variant === "transparent";
  return (
    <header
      className={cn(
        "w-full px-5 md:px-10",
        transparent
          ? "absolute inset-x-0 top-0 z-20 bg-paper/90 backdrop-blur-md shadow-[0px_1px_2px_rgba(40,65,57,0.1)]"
          : "bg-paper shadow-[0px_1px_1px_rgba(0,0,0,0.05)]",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between md:px-10">
        <Link
          href="/"
          className="font-serif text-3xl font-bold tracking-[-0.96px] text-primary md:text-[40px]"
        >
          Amara
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold tracking-[0.28px] text-body transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <HeaderActions />
      </div>
    </header>
  );
}
