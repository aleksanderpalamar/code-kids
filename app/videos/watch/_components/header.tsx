"use client";

import { Button } from "@/components/ui/button";
import { ProcessedVideo } from "@/lib/youtube-api";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function Header() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");

  const video = {
    id: videoId || "",
    publishedAt: "",
  } as ProcessedVideo;

  const handleBookmark = () => {
    if (!videoId) return;

    const bookmarks = localStorage.getItem("bookmarkedVideos");
    let bookmarkedList = bookmarks ? JSON.parse(bookmarks) : [];

    if (isBookmarked) {
      bookmarkedList = bookmarkedList.filter((id: string) => id !== videoId);
    } else {
      bookmarkedList.push(videoId);
    }

    localStorage.setItem("bookmarkedVideos", JSON.stringify(bookmarkedList));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video?.title || "Vídeo CodeKids",
        text: video?.description || "Confira este vídeo educativo!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/videos">
              <Button variant="ghost" size="sm" className="text-purple-600 cursor-pointer transition-colors duration-300">
                <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Assistir Vídeo
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              className={`border-purple-200 cursor-pointer transition-colors duration-300 ${
                isBookmarked
                  ? "bg-purple-100 text-purple-700"
                  : "text-purple-600"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              <span className="hidden sm:inline ml-1">
                {isBookmarked ? "Salvo" : "Salvar"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-purple-200 text-purple-600 transition-colors duration-300 cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Compartilhar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
