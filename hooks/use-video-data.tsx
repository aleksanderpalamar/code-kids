"use client";

import { useEffect, useCallback } from "react";
import { useVideos } from "@/components/videos/videos-context";
import {
  searchBrazilianProgrammingVideos,
  searchProgrammingVideos,
} from "@/lib/youtube-api";

export function useVideoData() {
  const {
    videos,
    setVideos,
    setFilteredVideos,
    setWatchedVideos,
    setLoading,
    setSearchLoading,
    setError,
  } = useVideos();

  const loadInitialVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const initialVideos = await searchBrazilianProgrammingVideos(
        "tutorial programação iniciantes"
      );

      // Verificar se o vídeo retornado é um indicador de erro de cota
      if (
        initialVideos.length === 1 &&
        initialVideos[0].id === "quota-exceeded"
      ) {
        setError(
          "Cota da API do YouTube excedida. Tente novamente mais tarde ou contacte o administrador."
        );
        setVideos([]);
        setFilteredVideos([]);
      } else {
        setVideos(initialVideos);
        setFilteredVideos(initialVideos);
      }
    } catch (err) {
      // Este catch não deve ser acionado com as mudanças em youtube-api.ts
      // mas mantemos por segurança
      console.log("Erro genérico ao carregar vídeos:", err);
      setError(
        "Erro ao carregar vídeos. Verifique sua conexão com a internet."
      );
      setVideos([]);
      setFilteredVideos([]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setVideos, setFilteredVideos]);

  // Carregamento automático dos vídeos
  useEffect(() => {
    const loadVideos = async () => {
      console.log("🎯 useVideoData: Iniciando carregamento automático");
      console.log("🎯 useVideoData: videos.length =", videos.length);

      try {
        console.log("🎯 useVideoData: Chamando setLoading(true)");
        setLoading(true);
        setError(null);

        console.log("🎯 useVideoData: Fazendo chamada para API");
        const initialVideos = await searchBrazilianProgrammingVideos(
          "tutorial programação iniciantes"
        );
        console.log("🎯 useVideoData: Recebeu", initialVideos.length, "vídeos");

        // Verificar se o vídeo retornado é um indicador de erro de cota
        if (
          initialVideos.length === 1 &&
          initialVideos[0].id === "quota-exceeded"
        ) {
          console.log("🎯 useVideoData: Detectada cota excedida");
          setError(
            "Cota da API do YouTube excedida. Tente novamente mais tarde ou contacte o administrador."
          );
          setVideos([]);
          setFilteredVideos([]);
        } else {
          console.log("🎯 useVideoData: Salvando no estado");
          setVideos(initialVideos);
          setFilteredVideos(initialVideos);
          console.log("🎯 useVideoData: Estado atualizado!");
        }
      } catch (err) {
        console.log("🚨 useVideoData: Erro genérico:", err);
        setError(
          "Erro ao carregar vídeos. Verifique sua conexão com a internet."
        );

        // Definir vídeos como array vazio para mostrar estado vazio
        setVideos([]);
        setFilteredVideos([]);
      } finally {
        console.log("🎯 useVideoData: Chamando setLoading(false)");
        setLoading(false);
      }
    };

    // Sempre carregar vídeos novos diretamente da API ao montar o componente
    loadVideos();
  }, [setVideos, setFilteredVideos, setLoading, setError]); // Incluir todas as dependências necessárias

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setFilteredVideos(videos);
      return;
    }

    try {
      setSearchLoading(true);
      // Use Brazilian search for better results
      const searchResults = await searchBrazilianProgrammingVideos(term);

      // Verificar se o vídeo retornado é um indicador de erro de cota
      if (
        searchResults.length === 1 &&
        searchResults[0].id === "quota-exceeded"
      ) {
        setError(
          "Cota da API do YouTube excedida. Tente novamente mais tarde ou contacte o administrador."
        );
        setFilteredVideos([]);
      } else {
        setFilteredVideos(searchResults);
      }
    } catch (err) {
      console.log("Erro na busca de vídeos:", err);
      setError("Erro na busca. Tente novamente.");
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    loadInitialVideos,
    handleSearch,
  };
}
