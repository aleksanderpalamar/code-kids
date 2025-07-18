"use client";

import { VideoPlayer } from "@/components/video-player";
import { Header } from "@/app/videos/watch/_components/header";
import { useWatchContext } from "./watch-context";
import { WatchLoadingState } from "./watch-loading-state";
import { VideoNotFoundState } from "./video-not-found-state";
import { VideoInfo } from "./video-info";
import { WatchSidebar } from "./watch-sidebar";
import { useAppStore } from "@/stores/app-store";

export function WatchContainer() {
  const { video, loading } = useWatchContext();
  const { isVideoWatched } = useAppStore();

  if (loading) {
    return <WatchLoadingState />;
  }

  if (!video?.youtubeId) {
    return <VideoNotFoundState />;
  }

  const isWatched = isVideoWatched(video.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer />
            <VideoInfo video={video} isWatched={isWatched} />
          </div>
          <WatchSidebar />
        </div>
      </div>
    </div>
  );
}
