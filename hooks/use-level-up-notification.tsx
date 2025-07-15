"use client";

import { useState, useCallback } from "react";
import { useLevelSystem } from "./use-level-system";

interface LevelUpState {
  isVisible: boolean;
  message: string;
  newLevel: number;
  levelTitle: string;
}

export function useLevelUpNotification() {
  const [notification, setNotification] = useState<LevelUpState>({
    isVisible: false,
    message: "",
    newLevel: 0,
    levelTitle: "",
  });

  const { levelConfig } = useLevelSystem();

  const showLevelUpNotification = useCallback(
    (message: string, newLevel: number) => {
      const newLevelConfig = levelConfig;
      setNotification({
        isVisible: true,
        message,
        newLevel,
        levelTitle: newLevelConfig.title,
      });
    },
    [levelConfig]
  );

  const hideLevelUpNotification = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    notification,
    showLevelUpNotification,
    hideLevelUpNotification,
  };
}
