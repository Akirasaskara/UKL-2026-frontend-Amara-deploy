/**
 * menuImageCache
 *
 * Menyimpan mapping { menuId → Cloudinary URL } secara persisten.
 *
 * Mengapa diperlukan:
 *   Amara backend menerima file upload via multipart (`image` field) tapi
 *   belum mengembalikan imageUrl yang terisi — selalu null.
 *   Cache ini menjembatani: kita simpan Cloudinary URL setelah upload,
 *   lalu pakai saat menampilkan gambar menu.
 */

const CACHE_KEY = "amara_menu_images";

function load(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save(data: Record<string, string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export const menuImageCache = {
  get(menuId: string): string | undefined {
    return load()[menuId];
  },
  set(menuId: string, url: string) {
    const data = load();
    data[menuId] = url;
    save(data);
  },
  getAll(): Record<string, string> {
    return load();
  },
};
