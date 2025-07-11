"use client"

import { useEffect } from "react";
import { useIDE } from "@/components/ide/ide-context";

export function useMobileDetection() {
  const { setIsMobile } = useIDE();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);
}
