"use client"

import { createContext, useContext, useState, ReactNode } from "react";
import { ProcessedVideo } from "@/lib/youtube-api";

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
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

export function useVideos() {
  const context = useContext(VideosContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideosProvider');
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
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value: VideosContextType = {
    // State
    videos,
    filteredVideos,
    searchTerm,
    selectedLanguage,
    selectedDifficulty,
    watchedVideos,
    loading,
    searchLoading,
    error,
    
    // Actions
    setVideos,
    setFilteredVideos,
    setSearchTerm,
    setSelectedLanguage,
    setSelectedDifficulty,
    setWatchedVideos,
    setLoading,
    setSearchLoading,
    setError,
  };

  return (
    <VideosContext.Provider value={value}>
      {children}
    </VideosContext.Provider>
  );
}
