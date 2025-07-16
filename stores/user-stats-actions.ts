import { calculateUserLevel } from "@/lib/level-system";

export const userStatsActions = (set: any, get: any) => ({
  recordSuccessfulExecution: () => {
    console.log("🔍 recordSuccessfulExecution chamado");
    set((state: any) => {
      console.log("🔍 Estado anterior:", state.userStats);
      const newExecutionCount = state.userStats.projectsExecuted + 1;

      // Calcular novo nível
      const newUserLevel = calculateUserLevel(
        state.userStats.videosWatched,
        state.userStats.projectsCreated,
        newExecutionCount
      );

      const newState = {
        userStats: {
          ...state.userStats,
          projectsExecuted: newExecutionCount,
          level: newUserLevel.currentLevel,
        },
      };

      console.log("🔍 Novo estado:", newState.userStats);
      return newState;
    });
  },
});
