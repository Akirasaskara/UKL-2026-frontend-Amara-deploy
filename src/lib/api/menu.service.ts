import { api } from "./client";
import type {
  ApiResponse,
  Menu,
  Paginated,
  MenuQuery,
} from "@/types/api.types";

/** API returns price as a string and imageUrl as null — normalize here. */
const normalize = (m: Menu): Menu => ({
  ...m,
  price: Number(m.price),
  imageUrl: m.imageUrl || undefined,
});

export const menuService = {
  list: async (query: MenuQuery = {}) => {
    const { data } = await api.get<ApiResponse<Paginated<Menu>>>("/menus", {
      params: query,
    });
    return { ...data.data, data: data.data.data.map(normalize) };
  },

  getById: async (id: string) =>
    normalize((await api.get<ApiResponse<Menu>>(`/menus/${id}`)).data.data),

  // ---- Admin only — multipart/form-data (name, description, price,
  // isAvailable, categoryId, image) ----
  create: async (form: FormData) =>
    normalize(
      (
        await api.post<ApiResponse<Menu>>("/menus", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data.data,
    ),

  update: async (id: string, form: FormData) =>
    normalize(
      (
        await api.patch<ApiResponse<Menu>>(`/menus/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data.data,
    ),

  remove: async (id: string) => {
    await api.delete(`/menus/${id}`);
  },
};
