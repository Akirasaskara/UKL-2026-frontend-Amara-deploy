"use client";

import { useState } from "react";

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

interface State {
  uploading: boolean;
  preview: string | null;   // local blob URL for instant preview
  result: UploadResult | null;
  file: File | null;         // original File object (to send to backend)
  error: string | null;
}

/**
 * useImageUpload
 *
 * Uploads a file to Cloudinary via /api/upload (server-side, API Secret safe).
 * Retains the original File so callers can also send it to other backends.
 *
 * Usage:
 *   const { state, upload, reset } = useImageUpload("amara/menus");
 *   // state.result.url  = Cloudinary URL (for display / CDN)
 *   // state.file        = original File  (to send to Amara backend as `image`)
 *   // state.preview     = instant blob preview URL
 */
export function useImageUpload(folder = "amara") {
  const [state, setState] = useState<State>({
    uploading: false,
    preview: null,
    result: null,
    file: null,
    error: null,
  });

  const upload = async (file?: File | null) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setState({ uploading: true, preview, result: null, file, error: null });

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = (await res.json()) as UploadResult & { error?: string };

      if (!res.ok || data.error) {
        setState((s) => ({
          ...s,
          uploading: false,
          error: data.error ?? "Upload gagal",
        }));
        return;
      }

      // Keep the original file for backends that need the actual File object
      setState({ uploading: false, preview, result: data, file, error: null });
    } catch {
      setState((s) => ({ ...s, uploading: false, error: "Upload gagal. Coba lagi." }));
    }
  };

  const reset = () => {
    if (state.preview) URL.revokeObjectURL(state.preview);
    setState({ uploading: false, preview: null, result: null, file: null, error: null });
  };

  return { state, upload, reset };
}
