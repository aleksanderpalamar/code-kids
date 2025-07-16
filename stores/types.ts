export interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

export interface UserStats {
  projectsCreated: number;
  videosWatched: number;
  projectsExecuted: number;
  level: number;
}

export interface CacheEntry {
  data: any;
  timestamp: number;
  etag?: string;
}

export interface YouTubeCache {
  [url: string]: CacheEntry;
}
