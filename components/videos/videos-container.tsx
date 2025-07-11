"use client";

import React, { useEffect, useState } from "react";
import { useVideos } from "./videos-context";
import { useVideoData } from "@/hooks/use-video-data";
import { useVideoFilters } from "@/hooks/use-video-filters";
import { useVideoActions } from "@/hooks/use-video-actions";
import { VideoHeader } from "./video-header";
import { VideoLoading } from "./video-loading";
import { VideoError } from "./video-error";
import { VideoFilters } from "./video-filters";
import { VideoGrid } from "./video-grid";
import { VideoEmptyState } from "./video-empty-state";

export function VideosContainer() {
  const {
    videos,
    filteredVideos,
    watchedVideos,
    loading,
    searchLoading,
    error,
  } = useVideos();

  const { loadInitialVideos } = useVideoData();
  const {
    searchTerm,
    setSearchTerm,
    selectedLanguage,
    setSelectedLanguage,
    selectedDifficulty,
    setSelectedDifficulty,
  } = useVideoFilters();

  // Força o carregamento inicial de vídeos ao montar o componente
  useEffect(() => {
    // Forçar carregamento inicial se não houver vídeos e não estiver carregando
    if (videos.length === 0 && !loading && !error) {
      console.log(
        "🔄 VideosContainer: Forçando carregamento inicial de vídeos"
      );
      loadInitialVideos();
    }
  }, [videos.length, loading, error, loadInitialVideos]);
  const { handleWatchVideo } = useVideoActions();

  // Adicionado timeout para evitar carregamento infinito
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    if (loading) {
      // Configurar um timeout de segurança para evitar carregamento infinito
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 segundos de timeout

      return () => clearTimeout(timer);
    } else {
      setLoadingTimeout(false);
    }
  }, [loading]);

  if (loading && !loadingTimeout) {
    return <VideoLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <VideoHeader videoCount={filteredVideos.length} />

      <div className="container mx-auto px-4 py-8">
        {error && (
          <VideoError error={error} onRetryAction={loadInitialVideos} />
        )}

        <VideoFilters
          searchTerm={searchTerm}
          onSearchChangeAction={setSearchTerm}
          selectedLanguage={selectedLanguage}
          onLanguageChangeAction={setSelectedLanguage}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChangeAction={setSelectedDifficulty}
          searchLoading={searchLoading}
        />

        {loadingTimeout && videos.length === 0 && !error ? (
          // Mostrar mensagem de timeout
          <VideoError
            error="O carregamento está demorando mais do que o esperado. Pode haver um problema de conexão."
            onRetryAction={loadInitialVideos}
          />
        ) : filteredVideos.length > 0 ? (
          // Mostrar grid de vídeos
          <VideoGrid
            videos={filteredVideos}
            watchedVideos={watchedVideos}
            onWatchAction={handleWatchVideo}
          />
        ) : (
          // Mostrar estado vazio
          !loading && <VideoEmptyState onReloadAction={loadInitialVideos} />
        )}
      </div>
    </div>
  );
}
