"use client";

import { useEffect, useState } from "react";

/** Returns true only after the first client render — guards localStorage-backed UI from hydration mismatches. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR mount guard
  useEffect(() => setMounted(true), []);
  return mounted;
}
