"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ProcessedVideo } from "@/types";

interface VideosContextType {
  // State
  videos: ProcessedVideo[];
  filteredVideos: ProcessedVideo[];
  searchTerm: string;
  selectedLanguage: string;
  selectedDifficulty: string;
  watchedVideos: string[];
  loading: boolean;
  searchLoading: boolean;
  error: string | null;

  // Actions
  setVideos: (videos: ProcessedVideo[]) => void;
  setFilteredVideos: (videos: ProcessedVideo[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedLanguage: (language: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setWatchedVideos: (videos: string[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markVideoAsWatched: (videoId: string) => void;
}

const VideosContext = createContext<VideosContextType | null>(null);

export function useVideos() {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error("useVideos must be used within a VideosProvider");
  }
  return context;
}

interface VideosProviderProps {
  children: ReactNode;
}

export function VideosProvider({ children }: VideosProviderProps) {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar vídeos assistidos do localStorage ao montar o componente
  useEffect(() => {
    try {
      const watched = localStorage.getItem("watchedVideos");
      if (watched) {
        const parsedWatched = JSON.parse(watched);
        setWatchedVideos(parsedWatched);
      }
    } catch (error) {
      console.error("Erro ao carregar vídeos assistidos:", error);
    }
  }, []);

  const markVideoAsWatched = (videoId: string) => {
    if (!watchedVideos.includes(videoId)) {
      try {
        const newWatchedVideos = [...watchedVideos, videoId];
        setWatchedVideos(newWatchedVideos);
        localStorage.setItem("watchedVideos", JSON.stringify(newWatchedVideos));

        // Atualizar estatísticas do usuário
        const stats = JSON.parse(
          localStorage.getItem("userStats") ||
            '{"projectsCreated": 0, "videosWatched": 0, "level": 1}'
        );
        stats.videosWatched = newWatchedVideos.length;
        stats.level = Math.floor(newWatchedVideos.length / 5) + 1;
        localStorage.setItem("userStats", JSON.stringify(stats));
      } catch (error) {
        console.error("Erro ao marcar vídeo como assistido:", error);
      }
    }
  };

  return (
    <VideosContext.Provider
      value={{
        videos,
        filteredVideos,
        searchTerm,
        selectedLanguage,
        selectedDifficulty,
        watchedVideos,
        loading,
        searchLoading,
        error,
        setVideos,
        setFilteredVideos,
        setSearchTerm,
        setSelectedLanguage,
        setSelectedDifficulty,
        setWatchedVideos,
        setLoading,
        setSearchLoading,
        setError,
        markVideoAsWatched,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
}
