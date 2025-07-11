const TTL = 1000 * 60 * 60;
const buildCacheKey = (url: string) => `yt:cache:${url}`;
const buildEtagKey = (url: string) => `yt:etag:${url}`;
const buildTimestampKey = (url: string) => `yt:timestamp${url}`;

async function fetchWithLocalCache(url: string): Promise<any> {
  const cacheKey = buildCacheKey(url);
  const etagKey = buildEtagKey(url);
  const timestampKey = buildTimestampKey(url);

  const cachedData = localStorage.getItem(cacheKey);
  const etag = localStorage.getItem(etagKey);
  const timestamp = localStorage.getItem(timestampKey);

  const now = Date.now();

  if (cachedData && timestamp && now - parseInt(timestamp) < TTL) {
    try {
      return JSON.parse(cachedData);
    } catch (error) {
      console.warn("Cache inválido, removendo...");
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(etagKey);
      localStorage.removeItem(timestampKey);
    }
  }

  const headers: HeadersInit = {};
  if (etag) {
    headers["If-None-Match"] = etag;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.error("Erro ao buscar dados do Youtube:", res.status);
    if (cachedData) {
      console.warn("Usando cache mesmo com erro");
      return JSON.parse(cachedData);
    }
    throw new Error(`Erro HTTP ${res.status}`);
  }

  if (res.status === 304 && cachedData) {
    console.log("Usando cache validado por Etag");
    return JSON.parse(cachedData);
  }

  const data = await res.json();

  if (data?.items) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(timestampKey, now.toString());
    const newEtag = res.headers.get("Etag");
    if (newEtag) localStorage.setItem(etagKey, newEtag);
  }

  return data;
}

export default fetchWithLocalCache;
