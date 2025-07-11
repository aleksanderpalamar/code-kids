"use client";

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ProcessedVideo } from "@/lib/youtube-api";
import { useSearchParams } from "next/navigation";

export function Progress() {
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const youtubeId = searchParams.get("youtubeId");
  const title = searchParams.get('title') || 'Vídeo Educativo'
  const description =
    searchParams.get("description") ||
    "Aprenda programação com este vídeo incrível!";
  const language = searchParams.get("language") || "Geral";
  const difficulty = searchParams.get("difficulty") || "Iniciante";
  const duration = searchParams.get("duration") || "N/A";
  const views = searchParams.get("views") || "0";
  const rating = parseFloat(searchParams.get("rating") || "5.0");
  const channelTitle = searchParams.get("channelTitle") || "Canal Educativo";

  const video = {
    id: videoId || "",
    title,
    description,
    language,
    difficulty,
    duration,
    views,
    rating,
    channelTitle,
    youtubeId: youtubeId || "",
    thumbnail: "",
    publishedAt: "",
  } as ProcessedVideo;

  useEffect(() => {
    const watched = localStorage.getItem("watchedVideos");
    if (watched) {
      setWatchedVideos(JSON.parse(watched));
    }

    const bookmarks = localStorage.getItem("bookmarkedVideos");
    if (bookmarks && videoId) {
      const bookmarkedList = JSON.parse(bookmarks);
      setIsBookmarked(bookmarkedList.includes(videoId));
    }

    setLoading(false);
  }, [videoId]);

  useEffect(() => {
    // Mark video as watched when component mounts
    if (videoId && !watchedVideos.includes(videoId)) {
      const newWatchedVideos = [...watchedVideos, videoId];
      setWatchedVideos(newWatchedVideos);
      localStorage.setItem("watchedVideos", JSON.stringify(newWatchedVideos));

      // Update user stats
      const stats = JSON.parse(
        localStorage.getItem("userStats") ||
          '{"projectsCreated": 0, "videosWatched": 0, "level": 1}'
      );
      stats.videosWatched = newWatchedVideos.length;
      stats.level = Math.floor(newWatchedVideos.length / 5) + 1;
      localStorage.setItem("userStats", JSON.stringify(stats));
    }
  }, [videoId, watchedVideos]);

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
              {watchedVideos.length}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Nível Atual</span>
            <Badge className="bg-yellow-100 text-yellow-800">
              {Math.floor(watchedVideos.length / 5) + 1}
            </Badge>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Próximo Nível</span>
              <span>{watchedVideos.length % 5}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${(watchedVideos.length % 5) * 20}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
