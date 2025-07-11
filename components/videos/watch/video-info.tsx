import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Star } from "lucide-react";
import { ProcessedVideo } from "@/types";
import { useVideoUtils } from "@/hooks/use-video-utils";

interface VideoInfoProps {
  video: ProcessedVideo;
  isWatched: boolean;
}

export function VideoInfo({ video, isWatched }: VideoInfoProps) {
  const { getDifficultyColor, getLanguageEmoji } = useVideoUtils();

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-6">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge className="bg-purple-500 text-white border-0">
            {getLanguageEmoji(video.language)} {video.language}
          </Badge>
          <Badge className={getDifficultyColor(video.difficulty)}>
            {video.difficulty}
          </Badge>
          <Badge className="bg-black/70 text-white border-0">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </Badge>
          {isWatched && (
            <Badge className="bg-green-500 text-white border-0">
              ✓ Assistido
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
          {video.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {video.rating}
          </div>
          <div>{video.views} visualizações</div>
          <div>Canal: {video.channelTitle}</div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 leading-relaxed">
          {video.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
