import { ProcessedVideo } from "@/lib/youtube-api";
import { Card } from "./ui/card";
import { useSearchParams } from "next/navigation";

export function VideoPlayer() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const youtubeId = searchParams.get("youtubeId");

  const video = {
    id: videoId || "",
    youtubeId: youtubeId || "",
    publishedAt: "",
  } as ProcessedVideo;

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </Card>
  );
}
