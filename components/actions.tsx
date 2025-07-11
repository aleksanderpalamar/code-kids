import { ExternalLink, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ProcessedVideo } from "@/lib/youtube-api";
import { useSearchParams } from "next/navigation";

export function Actions() {
    const searchParams = useSearchParams();
    const youtubeId = searchParams.get("youtubeId");
    const video = {
        youtubeId: youtubeId || "",
        thumbnail: "",
        publishedAt: "",
      } as ProcessedVideo;
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white cursor-pointer transition-colors duration-300"
          onClick={() =>
            window.open(
              `https://www.youtube.com/watch?v=${youtubeId}`,
              "_blank"
            )
          }
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir no YouTube
        </Button>
        <Button
          variant="outline"
          className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors duration-300"
          onClick={() =>
            window.open(
              `https://www.youtube.com/channel/${video?.channelTitle}`,
              "_blank"
            )
          }
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Visitar Canal
        </Button>
      </CardContent>
    </Card>
  );
}
