"use client";

import { useCallback, useRef } from "react";
import { ImagePlus, Loader2, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { useImageUpload } from "@/lib/useImageUpload";

type UploadHookReturn = ReturnType<typeof useImageUpload>;

/**
 * Reusable image upload field.
 * - Drag & drop atau klik untuk pilih gambar
 * - Tampilkan preview langsung (blob URL)
 * - Indikator loading & error
 * - Tampilkan foto lama bila ada (currentUrl)
 */
export function ImageUploadField({
  hook,
  currentUrl,
  label = "Upload Gambar",
  className,
}: {
  hook: UploadHookReturn;
  currentUrl?: string;
  label?: string;
  className?: string;
}) {
  const { state, upload, reset } = hook;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (file) upload(file);
    },
    [upload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile],
  );

  const displayUrl = state.preview ?? currentUrl ?? null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="label-eyebrow text-[11px] uppercase text-body">{label}</span>

      <div
        role="button"
        tabIndex={0}
        onClick={() => !state.uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "group relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors",
          state.uploading && "cursor-not-allowed opacity-70",
          state.error
            ? "border-red-300 bg-red-50"
            : "border-line hover:border-secondary hover:bg-paper",
          displayUrl && "border-solid border-line",
        )}
      >
        {/* Background preview */}
        {displayUrl && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </>
        )}

        {/* Overlay content */}
        <div
          className={cn(
            "relative flex flex-col items-center gap-1.5 text-center transition-opacity",
            displayUrl && "opacity-0 group-hover:opacity-100",
          )}
        >
          {state.uploading ? (
            <>
              <Loader2 size={28} className="animate-spin text-primary" />
              <span className="text-xs font-medium text-primary">Mengupload…</span>
            </>
          ) : state.error ? (
            <>
              <AlertCircle size={28} className="text-red-500" />
              <span className="text-xs text-red-500">{state.error}</span>
              <span className="text-[11px] text-muted">Klik untuk coba lagi</span>
            </>
          ) : (
            <>
              <ImagePlus size={28} className={displayUrl ? "text-white" : "text-secondary"} />
              <span className={cn("text-xs font-medium", displayUrl ? "text-white" : "text-body")}>
                {displayUrl ? "Ganti Gambar" : "Drag & drop atau klik"}
              </span>
              <span className={cn("text-[11px]", displayUrl ? "text-white/70" : "text-muted")}>
                JPG, PNG, WEBP · Maks 5 MB
              </span>
            </>
          )}
        </div>

        {/* Clear button */}
        {(state.preview || state.result) && !state.uploading && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-ink/60 text-white hover:bg-ink/80"
            aria-label="Hapus gambar"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Cloudinary URL info */}
      {state.result?.url && (
        <p className="truncate text-[11px] text-secondary">
          ✓ {state.result.url}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
