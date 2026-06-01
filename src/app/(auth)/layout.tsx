import { TopAppBar } from "@/components/layout/TopAppBar";
import { Footer } from "@/components/layout/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopAppBar />
      <main className="relative flex min-h-[916px] flex-1 items-center justify-center px-5 py-16">
        {/* Background image + dark overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/auth-bg.png')" }}
          />
          <div className="absolute inset-0 bg-[rgba(18,43,36,0.9)]" />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}
