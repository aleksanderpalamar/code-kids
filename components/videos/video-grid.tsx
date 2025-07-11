"use client"

import { VideoCard } from "./video-card";
import { ProcessedVideo } from "@/lib/youtube-api";

interface VideoGridProps {
  videos: ProcessedVideo[];
  watchedVideos: string[];
  onWatchAction: (videoId: string, youtubeId: string) => void;
}

export function VideoGrid({ videos, watchedVideos, onWatchAction }: VideoGridProps) {
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
