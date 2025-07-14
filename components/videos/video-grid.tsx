"use client";

import { VideoCard } from "./video-card";
import { ProcessedVideo } from "@/types";
import { useAppStore } from "@/stores/app-store";

interface VideoGridProps {
  videos: ProcessedVideo[];
  onWatchAction: (videoId: string, youtubeId: string) => void;
}

export function VideoGrid({ videos, onWatchAction }: VideoGridProps) {
  const { watchedVideos } = useAppStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isWatched={watchedVideos.includes(video.id)}
          onWatchAction={onWatchAction}
        />
      ))}
    </div>
  );
}
