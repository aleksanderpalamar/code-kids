/**
 * Utilitários para gerenciar playlists do YouTube
 */

import { PLAYLISTS } from "@/data/playlists";

/**
 * Valida se um ID de playlist é válido
 * @param playlistId - ID da playlist para validar
 * @returns true se válido, false caso contrário
 */
export function isValidPlaylistId(playlistId: string): boolean {
  // IDs de playlist do YouTube geralmente começam com "PL" e têm pelo menos 16 caracteres
  return /^PL[a-zA-Z0-9_-]{16,}$/.test(playlistId);
}

/**
 * Filtra apenas playlists válidas da configuração
 * @returns Array de IDs de playlists válidas
 */
export function getValidPlaylists(): string[] {
  return PLAYLISTS.filter(isValidPlaylistId);
}

/**
 * Obtém informações sobre as playlists configuradas
 * @returns Objeto com estatísticas das playlists
 */
export function getPlaylistsInfo(): {
  total: number;
  valid: number;
  invalid: string[];
} {
  const validPlaylists = getValidPlaylists();
  const invalidPlaylists = PLAYLISTS.filter((id) => !isValidPlaylistId(id));

  return {
    total: PLAYLISTS.length,
    valid: validPlaylists.length,
    invalid: invalidPlaylists,
  };
}

/**
 * Constrói URL da API do YouTube para buscar itens de uma playlist
 * @param playlistId - ID da playlist
 * @param apiKey - Chave da API do YouTube
 * @param maxResults - Número máximo de resultados (padrão: 50)
 * @returns URL formatada para a API
 */
export function buildPlaylistItemsUrl(
  playlistId: string,
  apiKey: string,
  maxResults: number = 50
): string {
  const baseUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
  const params = new URLSearchParams({
    part: "snippet",
    playlistId,
    maxResults: maxResults.toString(),
    key: apiKey,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Constrói URL da API do YouTube para buscar detalhes de vídeos
 * @param videoIds - IDs dos vídeos separados por vírgula
 * @param apiKey - Chave da API do YouTube
 * @returns URL formatada para a API
 */
export function buildVideoDetailsUrl(videoIds: string, apiKey: string): string {
  const baseUrl = "https://www.googleapis.com/youtube/v3/videos";
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    id: videoIds,
    key: apiKey,
  });

  return `${baseUrl}?${params.toString()}`;
}
