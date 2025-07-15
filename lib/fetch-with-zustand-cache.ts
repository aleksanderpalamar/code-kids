import { useAppStore } from "@/stores/app-store";

const TTL = 1000 * 60 * 60; // 1 hora

async function fetchWithZustandCache(url: string): Promise<any> {
  const { getCacheEntry, setCacheEntry, clearExpiredCache } =
    useAppStore.getState();

  // Limpar cache expirado ocasionalmente
  if (Math.random() < 0.1) {
    // 10% de chance a cada chamada
    clearExpiredCache();
  }

  const cacheEntry = getCacheEntry(url);
  const now = Date.now();

  // Verificar se há cache válido
  if (cacheEntry && now - cacheEntry.timestamp < TTL) {
    return cacheEntry.data;
  }

  // Configurar headers para validação de cache
  const headers: HeadersInit = {};
  if (cacheEntry?.etag) {
    headers["If-None-Match"] = cacheEntry.etag;
  }

  try {
    const res = await fetch(url, { headers });

    if (!res.ok) {
      console.error("Erro ao buscar dados do Youtube:", res.status);
      // Se há cache antigo, usar mesmo que expirado
      if (cacheEntry) {
        console.warn("Usando cache expirado devido ao erro");
        return cacheEntry.data;
      }
      throw new Error(`Erro HTTP ${res.status}`);
    }

    // Se recebeu 304 (Not Modified), usar cache existente
    if (res.status === 304 && cacheEntry) {
      console.log("Usando cache validado por Etag");
      // Atualizar timestamp para manter o cache por mais tempo
      setCacheEntry(url, {
        ...cacheEntry,
        timestamp: now,
      });
      return cacheEntry.data;
    }

    // Processar nova resposta
    const data = await res.json();

    // Salvar no cache apenas se houver dados válidos
    if (data?.items) {
      const newEtag = res.headers.get("Etag");
      setCacheEntry(url, {
        data,
        timestamp: now,
        etag: newEtag || undefined,
      });
    }

    return data;
  } catch (error) {
    // Em caso de erro de rede, usar cache se disponível
    if (cacheEntry) {
      console.warn("Usando cache devido ao erro de rede:", error);
      return cacheEntry.data;
    }
    throw error;
  }
}

export default fetchWithZustandCache;
