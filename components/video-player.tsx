import { ProcessedVideo } from "@/types";
import { Card } from "./ui/card";
import { useWatchContext } from "./videos/watch/watch-context";

export function VideoPlayer() {
  const { video } = useWatchContext();

  if (!video?.youtubeId) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
        <div className="aspect-video flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Vídeo não encontrado</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </Card>
  );
}
