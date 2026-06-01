"use client";

import { toast as sonnerToast } from "sonner";

/**
 * Thin wrapper around Sonner's `toast()` so existing call-sites
 * (`toast("message")` / `toast("msg", "error")`) keep working
 * without changing any import path.
 */
export type ToastVariant = "success" | "error";

export function toast(message: string, variant: ToastVariant = "success") {
  if (variant === "error") {
    sonnerToast.error(message);
  } else {
    sonnerToast.success(message);
  }
}
