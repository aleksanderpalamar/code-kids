import { ReactNode } from "react";
import Image from "next/image";

import DevJr from "@/public/assests/dev-jr.png";
import DevPleno from "@/public/assests/dev-pleno.png";
import DevSenior from "@/public/assests/dev-senior.png";

export interface LevelConfig {
  minPoints: number;
  maxPoints: number;
  title: string;
  emoji: ReactNode;
  color: string;
  description: string;
}

export interface UserLevel {
  currentLevel: number;
  currentPoints: number;
  pointsToNextLevel: number;
  progressPercentage: number;
  levelConfig: LevelConfig;
}

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    minPoints: 0,
    maxPoints: 49,
    title: "Junior",
    emoji: <Image src={DevJr} alt="DevJr" width={32} height={32} />,
    color: "bg-emerald-100 text-emerald-800",
    description: "Aprendendo os fundamentos",
  },
  {
    minPoints: 50,
    maxPoints: 99,
    title: "Pleno",
    emoji: <Image src={DevPleno} alt="DevPleno" width={32} height={32} />,
    color: "bg-purple-100 text-purple-800",
    description: "Dominando conceitos avançados",
  },
  {
    minPoints: 100,
    maxPoints: Number.MAX_SAFE_INTEGER,
    title: "Sênior",
    emoji: <Image src={DevSenior} alt="DevSenior" width={32} height={32} />,
    color: "bg-yellow-100 text-yellow-800",
    description: "Expert em programação",
  },
];

export const POINTS_SYSTEM = {
  VIDEO_WATCHED: 2,
  PROJECT_CREATED: 5,
  PROJECT_COMPLETED: 3, // Para futuras implementações
  CHALLENGE_COMPLETED: 8, // Para futuras implementações
} as const;

/**
 * Calcula os pontos totais do usuário baseado nas atividades
 */
export function calculateTotalPoints(
  videosWatched: number,
  projectsCreated: number,
  projectsCompleted: number = 0,
  challengesCompleted: number = 0
): number {
  return (
    videosWatched * POINTS_SYSTEM.VIDEO_WATCHED +
    projectsCreated * POINTS_SYSTEM.PROJECT_CREATED +
    projectsCompleted * POINTS_SYSTEM.PROJECT_COMPLETED +
    challengesCompleted * POINTS_SYSTEM.CHALLENGE_COMPLETED
  );
}

export function getLevelFromPoints(points: number): number {
  for (let i = 0; i < LEVEL_CONFIGS.length; i++) {
    const config = LEVEL_CONFIGS[i];
    if (points >= config.minPoints && points <= config.maxPoints) {
      return i + 1; // Níveis começam em 1, não em 0
    }
  }
  return LEVEL_CONFIGS.length; // Nível máximo se exceder todos os ranges
}

export function getLevelConfig(level: number): LevelConfig {
  const index = Math.max(0, Math.min(level - 1, LEVEL_CONFIGS.length - 1));
  return LEVEL_CONFIGS[index];
}

export function calculateUserLevel(
  videosWatched: number,
  projectsCreated: number,
  projectsCompleted: number = 0,
  challengesCompleted: number = 0
): UserLevel {
  const currentPoints = calculateTotalPoints(
    videosWatched,
    projectsCreated,
    projectsCompleted,
    challengesCompleted
  );

  const currentLevel = getLevelFromPoints(currentPoints);
  const levelConfig = getLevelConfig(currentLevel);

  const nextLevelConfig =
    currentLevel < LEVEL_CONFIGS.length ? LEVEL_CONFIGS[currentLevel] : null;

  const pointsToNextLevel = nextLevelConfig
    ? nextLevelConfig.minPoints - currentPoints
    : 0;

  const pointsInCurrentLevel = currentPoints - levelConfig.minPoints;
  const totalPointsInLevel = levelConfig.maxPoints - levelConfig.minPoints + 1;
  const progressPercentage = Math.min(
    100,
    Math.round((pointsInCurrentLevel / totalPointsInLevel) * 100)
  );

  return {
    currentLevel,
    currentPoints,
    pointsToNextLevel: Math.max(0, pointsToNextLevel),
    progressPercentage,
    levelConfig,
  };
}

export function checkLevelUp(
  previousPoints: number,
  newPoints: number
): { leveledUp: boolean; newLevel: number; previousLevel: number } {
  const previousLevel = getLevelFromPoints(previousPoints);
  const newLevel = getLevelFromPoints(newPoints);

  return {
    leveledUp: newLevel > previousLevel,
    newLevel,
    previousLevel,
  };
}

export function getLevelUpMessage(newLevel: number): string {
  const config = getLevelConfig(newLevel);
  const messages = [
    `🎉 Parabéns! Você alcançou o nível ${config.title}!`,
    `🚀 Incrível! Agora você é um ${config.title}!`,
    `⭐ Fantástico! Você evoluiu para ${config.title}!`,
    `🏆 Excelente trabalho! Nível ${config.title} desbloqueado!`,
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}
