"use client";

import { useEffect, useState } from "react";
import { useVideos } from "./videos/videos-context";

export function UserStats() {
  const { watchedVideos } = useVideos();
  const [userStats, setUserStats] = useState({
    projectsCreated: 0,
    videosWatched: 0,
    level: 1,
  });

  useEffect(() => {
    const stats = localStorage.getItem("userStats");
    if (stats) {
      const parsedStats = JSON.parse(stats);
      setUserStats({
        ...parsedStats,
        videosWatched: watchedVideos.length,
        level: Math.floor(watchedVideos.length / 5) + 1,
      });
    } else {
      setUserStats({
        projectsCreated: 0,
        videosWatched: watchedVideos.length,
        level: Math.floor(watchedVideos.length / 5) + 1,
      });
    }
  }, [watchedVideos]);
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-6 md:mb-8 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-purple-200 w-full sm:w-auto min-w-[120px]">
        <div className="text-xl md:text-2xl font-bold text-purple-600">
          {userStats.projectsCreated}
        </div>
        <div className="text-xs md:text-sm text-gray-600">Projetos Criados</div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-pink-200 w-full sm:w-auto min-w-[120px]">
        <div className="text-xl md:text-2xl font-bold text-pink-600">
          {userStats.videosWatched}
        </div>
        <div className="text-xs md:text-sm text-gray-600">
          Vídeos Assistidos
        </div>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-blue-200 w-full sm:w-auto min-w-[120px]">
        <div className="text-xl md:text-2xl font-bold text-blue-600">
          Nível {userStats.level}
        </div>
        <div className="text-xs md:text-sm text-gray-600">Seu Nível</div>
      </div>
    </div>
  );
}
