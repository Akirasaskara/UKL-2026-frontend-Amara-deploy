"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, User as UserIcon } from "lucide-react";
import { TextField } from "@/components/ui/TextField";
import { PasswordField } from "@/components/ui/PasswordField";
import { Button } from "@/components/ui/Button";
import { authService } from "@/lib/api/auth.service";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await authService.register(values);
      // Auto-login after successful registration.
      await login({ email: values.email, password: values.password });
      router.push("/");
    } catch {
      setServerError("Registrasi gagal. Email mungkin sudah terdaftar.");
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <TextField
        label="Nama"
        placeholder="Nama lengkap"
        leftIcon={<UserIcon size={18} />}
        error={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Email"
        type="email"
        placeholder="nama@email.com"
        leftIcon={<Mail size={18} />}
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordField
        label="Password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <Button
        type="submit"
        variant="maroon"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Memproses…" : "Daftar"}
      </Button>
    </form>
  );
}
