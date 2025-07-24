import { ReactNode } from "react";

export interface ProcessedVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  language: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  youtubeId: string;
  views: string;
  rating: number;
  channelTitle: string;
  publishedAt: string;
}

export interface VideoDetails {
  duration: string;
  views: string;
}

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
