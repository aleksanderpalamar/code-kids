"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { ProcessedVideo } from "@/types";

interface WatchContextType {
  video: ProcessedVideo | null;
  watchedVideos: string[];
  isBookmarked: boolean;
  loading: boolean;
  setWatchedVideos: (videos: string[]) => void;
  setIsBookmarked: (bookmarked: boolean) => void;
  markVideoAsWatched: (videoId: string) => void;
}

const WatchContext = createContext<WatchContextType | null>(null);

export function useWatchContext() {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error("useWatchContext must be used within a WatchProvider");
  }
  return context;
}

interface WatchProviderProps {
  children: ReactNode;
}

export function WatchProvider({ children }: WatchProviderProps) {
  const searchParams = useSearchParams();
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const videoId = searchParams.get("id");
  const youtubeId = searchParams.get("youtubeId");
  const title = searchParams.get("title") || "Vídeo Educativo";
  const description =
    searchParams.get("description") ||
    "Aprenda programação com este vídeo incrível!";
  const language = searchParams.get("language") || "Geral";
  const difficulty = searchParams.get("difficulty") || "Iniciante";
  const duration = searchParams.get("duration") || "N/A";
  const views = searchParams.get("views") || "0";
  const rating = parseFloat(searchParams.get("rating") || "5.0");
  const channelTitle = searchParams.get("channelTitle") || "Canal Educativo";

  const video: ProcessedVideo | null = videoId
    ? {
        id: videoId,
        title,
        description,
        language,
        difficulty: difficulty as "Iniciante" | "Intermediário" | "Avançado",
        duration,
        views,
        rating,
        channelTitle,
        youtubeId: youtubeId || "",
        thumbnail: "",
        publishedAt: "",
      }
    : null;

  const markVideoAsWatched = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
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
  };

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
      markVideoAsWatched(videoId);
    }
  }, [videoId, watchedVideos]);

  return (
    <WatchContext.Provider
      value={{
        video,
        watchedVideos,
        isBookmarked,
        loading,
        setWatchedVideos,
        setIsBookmarked,
        markVideoAsWatched,
      }}
    >
      {children}
    </WatchContext.Provider>
  );
}
