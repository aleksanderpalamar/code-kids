"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";

export function useAppInitialization() {
  const { syncUserStatsFromLocalStorage } = useAppStore();

  useEffect(() => {
    // Sincronizar estatísticas do localStorage na inicialização
    syncUserStatsFromLocalStorage();
  }, [syncUserStatsFromLocalStorage]);
}
