"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Premium delete-confirmation modal that replaces browser `confirm()`.
 *
 * Features:
 * - Backdrop blur + fade-in animation
 * - Animated warning icon
 * - Loading state on the confirm button
 * - Closes on Escape or backdrop click
 */
export function DeleteMenuModal({
  open,
  menuName,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  menuName: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  /* Focus the cancel button when the modal opens */
  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-[2px] animate-[fadeIn_150ms_ease]"
        onClick={() => !loading && onCancel()}
        aria-hidden
      />

      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-desc"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[scaleIn_200ms_ease]"
      >
        <div className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl">
          {/* Close icon */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="absolute right-4 top-4 text-muted hover:text-ink transition-colors disabled:opacity-40"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>

          {/* Warning icon */}
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-red-50">
            <AlertTriangle size={28} className="text-red-500 animate-[wiggle_400ms_ease-in-out]" />
          </div>

          {/* Title */}
          <h3
            id="delete-modal-title"
            className="text-center font-serif text-xl font-bold text-ink"
          >
            Hapus Menu?
          </h3>

          {/* Description */}
          <p
            id="delete-modal-desc"
            className="mt-2 text-center text-sm text-muted leading-relaxed"
          >
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-semibold text-ink">&ldquo;{menuName}&rdquo;</span>?
            <br />
            Tindakan ini tidak bisa dibatalkan.
          </p>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              ref={cancelRef}
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 rounded-lg border border-line py-3 text-sm font-semibold text-body transition-colors hover:bg-black/5 disabled:opacity-40"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Menghapus…
                </>
              ) : (
                "Ya, Hapus"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe styles (scoped) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(4px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg) }
          25%      { transform: rotate(-8deg) }
          75%      { transform: rotate(8deg) }
        }
      `}</style>
    </>
  );
}
