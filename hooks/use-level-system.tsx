"use client";

import { useMemo, useCallback } from "react";
import { useAppStore } from "@/stores/app-store";
import {
  calculateUserLevel,
  calculateTotalPoints,
  checkLevelUp,
  getLevelUpMessage,
  getLevelConfig,
  POINTS_SYSTEM,
} from "@/lib/level-system";
import { LevelConfig, UserLevel } from "@/types";

export interface UseLevelSystemReturn {
  // Informações do nível atual
  userLevel: UserLevel;
  levelConfig: LevelConfig;

  // Estatísticas
  totalPoints: number;
  videosWatched: number;
  projectsCreated: number;

  // Progresso
  progressToNextLevel: number;
  pointsToNextLevel: number;

  // Ações
  handleVideoWatched: (videoId: string) => {
    leveledUp: boolean;
    message?: string;
  };
  handleProjectCreated: () => { leveledUp: boolean; message?: string };
  handleSuccessfulExecution: () => { leveledUp: boolean; message?: string };

  // Utilitários
  getPointsForAction: (action: keyof typeof POINTS_SYSTEM) => number;
  isMaxLevel: boolean;
}

export function useLevelSystem(): UseLevelSystemReturn {
  const {
    userStats,
    markVideoAsWatched,
    addProject,
    recordSuccessfulExecution,
    watchedVideos,
  } = useAppStore();

  // Calcular informações do nível atual
  const userLevel = useMemo(() => {
    return calculateUserLevel(
      userStats.videosWatched,
      userStats.projectsCreated,
      userStats.projectsExecuted || 0
    );
  }, [
    userStats.videosWatched,
    userStats.projectsCreated,
    userStats.projectsExecuted,
  ]);

  const totalPoints = useMemo(() => {
    return calculateTotalPoints(
      userStats.videosWatched,
      userStats.projectsCreated,
      userStats.projectsExecuted || 0
    );
  }, [
    userStats.videosWatched,
    userStats.projectsCreated,
    userStats.projectsExecuted,
  ]);

  const levelConfig = useMemo(() => {
    return getLevelConfig(userLevel.currentLevel);
  }, [userLevel.currentLevel]);

  const isMaxLevel = useMemo(() => {
    return userLevel.pointsToNextLevel === 0;
  }, [userLevel.pointsToNextLevel]);

  // Função para lidar com vídeo assistido com verificação de level up
  const handleVideoWatched = useCallback(
    (videoId: string) => {
      // Verificar se o vídeo já foi assistido
      if (watchedVideos.includes(videoId)) {
        return { leveledUp: false };
      }

      const previousPoints = totalPoints;

      // Marcar vídeo como assistido (isso já atualiza as estatísticas)
      markVideoAsWatched(videoId);

      const newPoints = previousPoints + POINTS_SYSTEM.VIDEO_WATCHED;
      const levelCheck = checkLevelUp(previousPoints, newPoints);

      if (levelCheck.leveledUp) {
        return {
          leveledUp: true,
          message: getLevelUpMessage(levelCheck.newLevel),
        };
      }

      return { leveledUp: false };
    },
    [totalPoints, markVideoAsWatched, watchedVideos]
  );

  // Função para lidar com projeto criado com verificação de level up
  const handleProjectCreated = useCallback(() => {
    const previousPoints = totalPoints;
    const newPoints = previousPoints + POINTS_SYSTEM.PROJECT_CREATED;
    const levelCheck = checkLevelUp(previousPoints, newPoints);

    if (levelCheck.leveledUp) {
      return {
        leveledUp: true,
        message: getLevelUpMessage(levelCheck.newLevel),
      };
    }

    return { leveledUp: false };
  }, [totalPoints]);

  // Função para lidar com execução bem-sucedida com verificação de level up
  const handleSuccessfulExecution = useCallback(() => {
    console.log(
      "🔍 handleSuccessfulExecution iniciado - pontos atuais:",
      totalPoints
    );

    const previousPoints = totalPoints;
    const newPoints = previousPoints + POINTS_SYSTEM.PROJECT_EXECUTED;
    const levelCheck = checkLevelUp(previousPoints, newPoints);

    console.log("🔍 Pontos anteriores:", previousPoints);
    console.log("🔍 Novos pontos:", newPoints);
    console.log("🔍 Level check:", levelCheck);

    // Registrar a execução no store
    recordSuccessfulExecution();

    if (levelCheck.leveledUp) {
      const result = {
        leveledUp: true,
        message: getLevelUpMessage(levelCheck.newLevel),
      };
      console.log("🔍 Level up detectado:", result);
      return result;
    }

    const result = { leveledUp: false };
    console.log("🔍 Sem level up:", result);
    return result;
  }, [totalPoints, recordSuccessfulExecution]);

  // Função utilitária para obter pontos de uma ação
  const getPointsForAction = useCallback(
    (action: keyof typeof POINTS_SYSTEM) => {
      return POINTS_SYSTEM[action];
    },
    []
  );

  return {
    userLevel,
    levelConfig,
    totalPoints,
    videosWatched: userStats.videosWatched,
    projectsCreated: userStats.projectsCreated,
    progressToNextLevel: userLevel.progressPercentage,
    pointsToNextLevel: userLevel.pointsToNextLevel,
    handleVideoWatched,
    handleProjectCreated,
    handleSuccessfulExecution,
    getPointsForAction,
    isMaxLevel,
  };
}
