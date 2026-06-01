import { api } from "./client";
import type { ApiResponse, Category } from "@/types/api.types";

export const categoryService = {
  list: async () =>
    (await api.get<ApiResponse<Category[]>>("/categories")).data.data,

  getById: async (id: string) =>
    (await api.get<ApiResponse<Category>>(`/categories/${id}`)).data.data,

  // ---- Admin only ----
  create: async (name: string) =>
    (await api.post<ApiResponse<Category>>("/categories", { name })).data.data,

  update: async (id: string, name: string) =>
    (await api.patch<ApiResponse<Category>>(`/categories/${id}`, { name })).data
      .data,

  remove: async (id: string) => {
    await api.delete(`/categories/${id}`);
  },
};
