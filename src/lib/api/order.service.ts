import { api } from "./client";
import type {
  ApiResponse,
  Order,
  Paginated,
  CreateOrderDto,
  OrderStatus,
  OrderQuery,
} from "@/types/api.types";

export const orderService = {
  // ---- Public ----
  create: async (dto: CreateOrderDto) =>
    (await api.post<ApiResponse<Order>>("/orders", dto)).data.data,

  track: async (id: string) =>
    (await api.get<ApiResponse<Order>>(`/orders/${id}/track`)).data.data,

  // ---- Admin only ----
  list: async (query: OrderQuery = {}) =>
    (await api.get<ApiResponse<Paginated<Order>>>("/orders", { params: query }))
      .data.data,

  getById: async (id: string) =>
    (await api.get<ApiResponse<Order>>(`/orders/${id}`)).data.data,

  updateStatus: async (id: string, status: OrderStatus) =>
    (
      await api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status })
    ).data.data,
};
