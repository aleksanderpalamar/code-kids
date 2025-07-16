import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { UserStats } from "./types";
import { calculateUserLevel } from "@/lib/level-system";

interface UserStatsState {
  userStats: UserStats;

  // Actions
  updateUserStats: (stats: Partial<UserStats>) => void;
  recordSuccessfulExecution: () => void;
}

export const useUserStatsStore = create<UserStatsState>()(
  subscribeWithSelector((set, get) => ({
    userStats: {
      projectsCreated: 0,
      videosWatched: 0,
      projectsExecuted: 0,
      level: 1,
    },

    updateUserStats: (stats) => {
      set((state) => ({
        userStats: {
          ...state.userStats,
          ...stats,
        },
      }));
    },

    recordSuccessfulExecution: () => {
      console.log("🔍 recordSuccessfulExecution chamado");
      set((state) => {
        console.log("🔍 Estado anterior:", state.userStats);
        const newExecutionCount = state.userStats.projectsExecuted + 1;

        // Calcular novo nível
        const newUserLevel = calculateUserLevel(
          state.userStats.videosWatched,
          state.userStats.projectsCreated,
          newExecutionCount
        );

        const newUserStats = {
          ...state.userStats,
          projectsExecuted: newExecutionCount,
          level: newUserLevel.currentLevel,
        };

        console.log("🔍 Novo estado:", newUserStats);
        return { userStats: newUserStats };
      });
    },
  }))
);
