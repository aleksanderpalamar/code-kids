"use client"

import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star } from "lucide-react";
import { ProcessedVideo } from "@/types";


import Javascript from "@/public/assests/javascript.png"
import Python from "@/public/assests/python.png"
import Lua from "@/public/assests/lua.png"
import Html from "@/public/assests/html.png"
import Code from "@/public/assests/code-icon.png"
import Play from "@/public/assests/play-icon.png"

interface VideoCardProps {
  video: ProcessedVideo;
  isWatched: boolean;
  onWatchAction: (videoId: string, youtubeId: string) => void;
}

export function VideoCard({ video, isWatched, onWatchAction }: VideoCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "bg-green-100 text-green-800";
      case "Intermediário":
        return "bg-yellow-100 text-yellow-800";
      case "Avançado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLanguageEmoji = (language: ReactNode | string) => {
    switch (language) {
      case "JavaScript":
        return <Image src={Javascript} alt="Javascript" width={24} height={24}/>;
      case "Python":
        return <Image src={Python} alt="Python" width={24} height={24} />;
      case "Lua":
        return <Image src={Lua} alt="Lua" width={24} height={24} />;
      case "HTML/CSS":
        return <Image src={Html} alt="Html" width={24} height={24} />;
      case "Geral":
        return <Image src={Code} alt="Code" width={24} height={24} />;
      default:
        return <Image src={Code} alt="Code" width={24} height={24} />;
    }
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="relative">
        <img
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          className="w-full h-36 md:h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=180&width=320";
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-black/70 text-white border-0 text-[10px] md:text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-purple-500 text-white border-0 text-[10px] md:text-xs">
            {getLanguageEmoji(video.language)} <span className="hidden sm:inline">{video.language}</span>
          </Badge>
        </div>
        {isWatched && (
          <div className="absolute bottom-2 right-2">
            <Badge className="bg-green-500 text-white border-0 text-[10px] md:text-xs">✓ <span className="hidden sm:inline">Assistido</span></Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base md:text-lg font-bold text-gray-800 line-clamp-2">{video.title}</CardTitle>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge className={getDifficultyColor(video.difficulty)}>{video.difficulty}</Badge>
          <div className="flex items-center text-[10px] md:text-sm text-gray-600">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
            {video.rating}
          </div>
          <div className="text-[10px] md:text-sm text-gray-600">{video.views}</div>
        </div>
        <div className="text-[10px] md:text-sm text-gray-500 truncate">Canal: {video.channelTitle}</div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <CardDescription className="text-gray-600 mb-4 line-clamp-2 text-sm">{video.description}</CardDescription>
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm cursor-pointer transition-colors duration-300"
          onClick={() => onWatchAction(video.id, video.youtubeId)}
        >
          <Image src={Play} alt="Play" width={24} height={24} />
          <span className="hidden sm:inline">Assistir Vídeo</span>
          <span className="sm:hidden">Assistir</span>
        </Button>
      </CardContent>
    </Card>
  );
}
