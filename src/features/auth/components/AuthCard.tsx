import Link from "next/link";
import { cn } from "@/lib/utils";
import { GoogleAuthButton } from "./GoogleAuthButton";

export function AuthCard({
  mode,
  children,
}: {
  mode: "login" | "register";
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex w-full max-w-[480px] flex-col gap-6 rounded-xl bg-white px-6 pb-12 pt-10 shadow-[0px_8px_16px_rgba(40,65,57,0.15)] sm:px-10">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-serif text-[40px] font-bold tracking-[-0.96px] text-maroon sm:text-[48px]">
          AMARA
        </span>
        <span className="h-px w-16 bg-[#e8bdb4]" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-line">
        <Tab href="/login" active={mode === "login"}>
          Masuk
        </Tab>
        <Tab href="/register" active={mode === "register"}>
          Daftar
        </Tab>
      </div>

      {children}

      {/* Divider */}
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs text-muted">atau</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <GoogleAuthButton />
    </div>
  );
}

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex-1 pb-2.5 text-center text-sm font-semibold tracking-[0.28px] transition-colors",
        active
          ? "-mb-px border-b-2 border-maroon text-maroon"
          : "text-muted hover:text-body",
      )}
    >
      {children}
    </Link>
  );
}
