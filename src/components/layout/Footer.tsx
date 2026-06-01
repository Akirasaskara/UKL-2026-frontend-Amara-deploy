import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="w-full bg-footer px-5 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 py-10 md:flex-row md:justify-between md:px-10">
        <Link
          href="/"
          className="font-serif text-[40px] font-bold tracking-[-0.96px] text-primary"
        >
          Amara
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="label-eyebrow text-xs font-medium text-body transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="label-eyebrow text-center text-xs font-medium text-body">
          © 2024 Amara Fine Dining. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
