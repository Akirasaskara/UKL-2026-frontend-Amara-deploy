# Amara Frontend — Panduan untuk Claude Code

Frontend untuk **Amara Food Ordering Platform** (restoran fine-dining). Pelanggan
memesan dari meja; admin mengelola kategori, menu, dan pesanan.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4 ·
Axios · TanStack Query · Zustand · React Hook Form + Zod · @react-oauth/google ·
lucide-react.

> Catatan: `lucide-react` versi ini **tidak punya ikon brand** (Instagram/Facebook/
> Twitter dihapus). Pakai ikon generik (Camera, Globe, Send, dst).

## Aturan struktur (jaga tetap rapi)

- `src/app/` = routing tipis saja. **Jangan panggil axios di sini** — lewat service
  di `lib/api` atau hook fitur.
- `src/lib/api/*.service.ts` = satu file per domain (auth, category, menu, order).
  HTTP client + interceptor JWT di `lib/api/client.ts`.
- Semua tipe & DTO di `src/types/api.types.ts`. Amplop respons: `{ success, message, data }`.
- `src/components/ui/` = presentational murni (tanpa API). `src/components/layout/` =
  TopAppBar/Footer/LandingFooter (+ BottomNav, AdminSidebar nanti).
  `src/components/shared/` = komponen reusable lintas fitur (mis. MenuCard).
- `src/features/<fitur>/` = logika + UI per fitur (auth: context, guards, components).
- `src/config/env.ts` = satu pintu untuk env var.

## Konvensi

- Harga selalu lewat `formatRupiah()`. Gabung className pakai `cn()` (di `lib/utils`).
- Warna **hanya** dari token Tailwind: `primary #284139`, `secondary #809076`,
  `gold #f8d794`, `copper #b86830`, `ink #111a19`, `maroon #39201b` (CTA auth),
  `paper #faf9f7`, `line #c2c8c4`, `muted #6b7280`, `body #424845`, `footer #e3e2e0`.
- Font: serif = Playfair Display (`font-serif`), sans = Inter (`font-sans`).
- Token JWT di localStorage key `amara_token`, disisipkan via interceptor.
- Role `ADMIN` dijaga `ProtectedRoute role="ADMIN"` (dipakai di `app/admin/layout.tsx`).
- Setiap fetch tampilkan state loading / empty / error.

## API

Base: `https://amara-development.up.railway.app/api` (dok: `/api-docs`). Token login ada
di `data.data.accessToken` (terverifikasi terhadap API live).
Google Auth: butuh `POST /auth/google` (belum ada di backend) — sudah disiapkan di
`authService.google` + `GoogleAuthButton`, dikunci `NEXT_PUBLIC_ENABLE_GOOGLE_AUTH`.

## Workflow slicing (Figma → kode)

fileKey `EP0D0b8nbMF9p2dI9LQMGI`. Per layar: `get_design_context(fileKey, nodeId)` →
bangun dgn token Tailwind → connect service via React Query → verifikasi visual
(preview screenshot vs frame Figma). Aset gambar disimpan di `public/images/`.

## Status

Selesai & terverifikasi: fondasi (api/services/auth/providers), UI primitives, layout
shells, **Landing** (`/`) + **Login/Register** (`/login`, `/register`). Brief lengkap di
`_docs/Amara-Frontend-Brief.pdf`. Berikutnya: Menu list/detail, Cart/Checkout, Tracking, Admin.

## Verifikasi

`npm run dev` (port 3000) · `npx tsc --noEmit` · `npm run lint` harus bersih.
