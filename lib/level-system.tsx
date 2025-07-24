import Image from "next/image";

import DevJr from "@/public/assests/dev-jr.png";
import DevPleno from "@/public/assests/dev-pleno.png";
import DevSenior from "@/public/assests/dev-senior.png";
import { LevelConfig, UserLevel } from "@/types";

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    minPoints: 0,
    maxPoints: 50,
    title: "Iniciante",
    emoji: <Image src={DevJr} alt="DevJr" width={32} height={32} />,
    color: "bg-emerald-100 text-emerald-800",
    description: "Aprendendo os fundamentos",
  },
  {
    minPoints: 51,
    maxPoints: 100,
    title: "Intermediario",
    emoji: <Image src={DevPleno} alt="DevPleno" width={32} height={32} />,
    color: "bg-purple-100 text-purple-800",
    description: "Dominando conceitos avançados",
  },
  {
    minPoints: 101,
    maxPoints: Number.MAX_SAFE_INTEGER,
    title: "Avançado",
    emoji: <Image src={DevSenior} alt="DevSenior" width={32} height={32} />,
    color: "bg-yellow-100 text-yellow-800",
    description: "Expert em programação",
  },
];

export const POINTS_SYSTEM = {
  VIDEO_WATCHED: 1,
  PROJECT_CREATED: 2,
  PROJECT_EXECUTED: 3,
  PROJECT_COMPLETED: 5,
  CHALLENGE_COMPLETED: 10,
} as const;

export function calculateTotalPoints(
  videosWatched: number,
  projectsCreated: number,
  projectsExecuted: number = 0,
  projectsCompleted: number = 0,
  challengesCompleted: number = 0
): number {
  return (
    videosWatched * POINTS_SYSTEM.VIDEO_WATCHED +
    projectsCreated * POINTS_SYSTEM.PROJECT_CREATED +
    projectsExecuted * POINTS_SYSTEM.PROJECT_EXECUTED +
    projectsCompleted * POINTS_SYSTEM.PROJECT_COMPLETED +
    challengesCompleted * POINTS_SYSTEM.CHALLENGE_COMPLETED
  );
}

export function getLevelFromPoints(points: number): number {
  for (let i = 0; i < LEVEL_CONFIGS.length; i++) {
    const config = LEVEL_CONFIGS[i];
    if (points >= config.minPoints && points <= config.maxPoints) {
      return i + 1; // Níveis começam em 1.
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
  projectsExecuted: number = 0,
  projectsCompleted: number = 0,
  challengesCompleted: number = 0
): UserLevel {
  const currentPoints = calculateTotalPoints(
    videosWatched,
    projectsCreated,
    projectsExecuted,
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
