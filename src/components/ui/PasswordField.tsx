"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { TextField, type TextFieldProps } from "./TextField";

export const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<TextFieldProps, "type" | "rightSlot">
>((props, ref) => {
  const [show, setShow] = useState(false);
  return (
    <TextField
      ref={ref}
      type={show ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-muted transition-colors hover:text-body"
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
});
PasswordField.displayName = "PasswordField";
