export interface ProcessedVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  language: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  youtubeId: string;
  views: string;
  rating: number;
  channelTitle: string;
  publishedAt: string;
}

export interface VideoDetails {
  duration: string;
  views: string;
}