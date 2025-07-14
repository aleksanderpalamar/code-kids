"use client";

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSearchParams } from "next/navigation";
import { useVideos } from "./videos/videos-context";

export function Progress() {
  const { watchedVideos } = useVideos();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");

  useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarkedVideos");
    if (bookmarks && videoId) {
      const bookmarkedList = JSON.parse(bookmarks);
      setIsBookmarked(bookmarkedList.includes(videoId));
    }

    setLoading(false);
  }, [videoId]);

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
