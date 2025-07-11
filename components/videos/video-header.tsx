"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface VideoHeaderProps {
  videoCount: number;
}

export function VideoHeader({ videoCount }: VideoHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-purple-600 transition-colors duration-300 cursor-pointer">
                <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Vídeos do YouTube
            </h1>
          </div>
          <Badge className="bg-purple-100 text-purple-800 border-0 text-xs md:text-sm">
            {videoCount} vídeos
          </Badge>
        </div>
      </div>
    </header>
  );
}
