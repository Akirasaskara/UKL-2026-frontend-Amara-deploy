"use client";

import { useEffect, useState } from "react";

/** Counts down from `initial` seconds and returns a "MM:SS" string. */
export function useCountdown(initial = 900) {
  const [seconds, setSeconds] = useState(initial);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((v) => (v <= 0 ? 0 : v - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
