"use client";

import { useSearchParams } from "next/navigation";
import { WatchProvider } from "./watch-context";
import { ReactNode } from "react";

interface WatchSearchParamsWrapperProps {
  children: ReactNode;
}

export function WatchSearchParamsWrapper({
  children,
}: WatchSearchParamsWrapperProps) {
  const searchParams = useSearchParams();

  const videoData = {
    videoId: searchParams.get("id"),
    youtubeId: searchParams.get("youtubeId"),
    title: searchParams.get("title") || "Vídeo Educativo",
    description:
      searchParams.get("description") ||
      "Aprenda programação com este vídeo incrível!",
    language: searchParams.get("language") || "Geral",
    difficulty: searchParams.get("difficulty") || "Iniciante",
    duration: searchParams.get("duration") || "N/A",
    views: searchParams.get("views") || "0",
    rating: parseFloat(searchParams.get("rating") || "5.0"),
    channelTitle: searchParams.get("channelTitle") || "Canal Educativo",
  };

  return <WatchProvider videoData={videoData}>{children}</WatchProvider>;
}
