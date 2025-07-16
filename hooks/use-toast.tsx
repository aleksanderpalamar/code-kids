"use client";

import { useState, useCallback } from "react";

interface ToastState {
  isVisible: boolean;
  message: string;
  type: "success" | "levelup";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showSuccessToast = useCallback((message: string) => {
    setToast({
      isVisible: true,
      message,
      type: "success",
    });
  }, []);

  const showLevelUpToast = useCallback((message: string) => {
    setToast({
      isVisible: true,
      message,
      type: "levelup",
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    toast,
    showSuccessToast,
    showLevelUpToast,
    hideToast,
  };
}
