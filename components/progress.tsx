"use client";

import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLevelSystem } from "@/hooks/use-level-system";

import Trophy from "@/public/assests/trophy.png";

export function Progress() {
  const {
    userLevel,
    levelConfig,
    videosWatched,
    projectsCreated,
    totalPoints,
    progressToNextLevel,
    pointsToNextLevel,
    isMaxLevel,
  } = useLevelSystem();

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Seu Progresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Vídeos Assistidos</span>
            <Badge className="bg-purple-100 text-purple-800">
              {videosWatched}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Projetos Criados</span>
            <Badge className="bg-blue-100 text-blue-800">
              {projectsCreated}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pontos Totais</span>
            <Badge className="bg-green-100 text-green-800">{totalPoints}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Nível Atual</span>
            <Badge className={levelConfig.color}>
              {levelConfig.emoji} {levelConfig.title}
            </Badge>
          </div>
          {!isMaxLevel && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Próximo Nível</span>
                <span>{pointsToNextLevel} pontos restantes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressToNextLevel}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                {progressToNextLevel}% completo
              </div>
            </div>
          )}
          {isMaxLevel && (
            <div className="mt-4 text-center">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Image src={Trophy} alt="Trophy" width={32} height={32} />
                Nível Máximo Alcançado!
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
