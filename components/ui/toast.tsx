"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, TrendingUp } from "lucide-react";

interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: "success" | "levelup";
  duration?: number;
  onCloseAction: () => void;
}

export function Toast({
  isVisible,
  message,
  type = "success",
  duration = 4000,
  onCloseAction,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onCloseAction, 300); // Wait for animation
  };

  if (!isVisible) return null;

  const bgColor =
    type === "levelup"
      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
      : "bg-gradient-to-r from-green-500 to-emerald-500";

  const icon = type === "levelup" ? TrendingUp : CheckCircle;
  const Icon = icon;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg
          transform transition-all duration-300 ease-in-out
          ${show ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
          max-w-sm flex items-center gap-3
        `}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
