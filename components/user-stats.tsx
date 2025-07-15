"use client";

import { useLevelSystem } from "@/hooks/use-level-system";
import { useAppInitialization } from "@/hooks/use-app-initialization";

export function UserStats() {
  const {
    videosWatched,
    projectsCreated,
    userLevel,
    levelConfig,
    totalPoints,
  } = useLevelSystem();

  // Inicializar e sincronizar dados
  useAppInitialization();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-6 md:mb-8 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-purple-200 w-full sm:w-auto min-w-[120px]">
        <div className="text-xl md:text-2xl font-bold text-purple-600">
          {projectsCreated}
        </div>
        <div className="text-xs md:text-sm text-gray-600">Projetos Criados</div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-pink-200 w-full sm:w-auto min-w-[120px]">
        <div className="text-xl md:text-2xl font-bold text-pink-600">
          {videosWatched}
        </div>
        <div className="text-xs md:text-sm text-gray-600">
          Vídeos Assistidos
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-blue-200 w-full sm:w-auto min-w-[120px]">
        <div className="text-xl md:text-2xl font-bold text-blue-600">
          {totalPoints}
        </div>
        <div className="text-xs md:text-sm text-gray-600">Pontos Totais</div>
      </div>
      <div
        className={`backdrop-blur-sm rounded-xl p-3 md:p-4 border w-full sm:w-auto min-w-[120px] ${
          levelConfig.color
            .replace("text-", "border-")
            .replace("bg-", "border-")
            .split(" ")[0]
        }`}
      >
        <div className="text-xl md:text-2xl font-bold">
          <span className="mr-1">{levelConfig.emoji}</span>
          Nível {userLevel.currentLevel}
        </div>
        <div className="text-xs md:text-sm text-gray-600">
          {levelConfig.title}
        </div>
      </div>
    </div>
  );
}
