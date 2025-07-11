"use client"

import { useEffect } from "react";
import { useVideos } from "@/components/videos/videos-context";
import { useVideoData } from "./use-video-data";

export function useVideoFilters() {
  const {
    videos,
    searchTerm,
    selectedLanguage,
    selectedDifficulty,
    setFilteredVideos,
    setSearchTerm,
    setSelectedLanguage,
    setSelectedDifficulty,
  } = useVideos();
  
  const { handleSearch } = useVideoData();

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle filters
  useEffect(() => {
    let filtered = videos;

    if (selectedLanguage !== "all") {
      filtered = filtered.filter((video) => video.language === selectedLanguage);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((video) => video.difficulty === selectedDifficulty);
    }

    if (!searchTerm) {
      setFilteredVideos(filtered);
    }
  }, [selectedLanguage, selectedDifficulty, videos, searchTerm, setFilteredVideos]);

  return {
    searchTerm,
    setSearchTerm,
    selectedLanguage,
    setSelectedLanguage,
    selectedDifficulty,
    setSelectedDifficulty,
  };
}
