"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { makeQueryClient } from "@/lib/query";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Toaster } from "@/components/ui/Toaster";
import { env } from "@/config/env";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  const tree = (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );

  // Only mount Google provider when a client id is configured.
  return env.googleClientId ? (
    <GoogleOAuthProvider clientId={env.googleClientId}>
      {tree}
    </GoogleOAuthProvider>
  ) : (
    tree
  );
}
