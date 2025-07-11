"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"
import Link from "next/link"
import { ProcessedVideo } from "@/lib/youtube-api"
import { QuickNavigation } from "@/components/quick-navigation"
import { Progress } from "@/components/progress"
import { Actions } from "@/components/actions"
import { Header } from "./_components/header"
import { VideoPlayer } from "@/components/video-player"

export default function WatchVideoPage() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get('id')
  const youtubeId = searchParams.get('youtubeId')
  const title = searchParams.get('title') || 'Vídeo Educativo'
  const description = searchParams.get('description') || 'Aprenda programação com este vídeo incrível!'
  const language = searchParams.get('language') || 'Geral'
  const difficulty = searchParams.get('difficulty') || 'Iniciante'
  const duration = searchParams.get('duration') || 'N/A'
  const views = searchParams.get('views') || '0'
  const rating = parseFloat(searchParams.get('rating') || '5.0')
  const channelTitle = searchParams.get('channelTitle') || 'Canal Educativo'
  
  const [watchedVideos, setWatchedVideos] = useState<string[]>([])
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  const video = {
    id: videoId || '',
    title,
    description,
    language,
    difficulty,
    duration,
    views,
    rating,
    channelTitle,
    youtubeId: youtubeId || '',
    thumbnail: '',
    publishedAt: ''
  } as ProcessedVideo

  useEffect(() => {
    const watched = localStorage.getItem("watchedVideos")
    if (watched) {
      setWatchedVideos(JSON.parse(watched))
    }

    const bookmarks = localStorage.getItem("bookmarkedVideos")
    if (bookmarks && videoId) {
      const bookmarkedList = JSON.parse(bookmarks)
      setIsBookmarked(bookmarkedList.includes(videoId))
    }

    setLoading(false)
  }, [videoId])

  useEffect(() => {
    // Mark video as watched when component mounts
    if (videoId && !watchedVideos.includes(videoId)) {
      const newWatchedVideos = [...watchedVideos, videoId]
      setWatchedVideos(newWatchedVideos)
      localStorage.setItem("watchedVideos", JSON.stringify(newWatchedVideos))

      // Update user stats
      const stats = JSON.parse(
        localStorage.getItem("userStats") || '{"projectsCreated": 0, "videosWatched": 0, "level": 1}',
      )
      stats.videosWatched = newWatchedVideos.length
      stats.level = Math.floor(newWatchedVideos.length / 5) + 1
      localStorage.setItem("userStats", JSON.stringify(stats))
    }
  }, [videoId, watchedVideos])  

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "bg-green-100 text-green-800"
      case "Intermediário":
        return "bg-yellow-100 text-yellow-800"
      case "Avançado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLanguageEmoji = (language: string) => {
    switch (language) {
      case "JavaScript":
        return "🟨"
      case "Python":
        return "🐍"
      case "Lua":
        return "🌙"
      case "HTML/CSS":
        return "🎨"
      case "Geral":
        return "💻"
      default:
        return "💻"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Carregando vídeo...</h2>
          <p className="text-gray-600">Preparando o player para você! 🎬</p>
        </div>
      </div>
    )
  }

  if (!youtubeId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Vídeo não encontrado</h2>
          <p className="text-gray-600 mb-4">O vídeo que você está procurando não existe ou foi removido.</p>
          <Link href="/videos">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
              Voltar para Vídeos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer />

            {/* Video Info */}
            {video && (
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
                    {watchedVideos.includes(video.id) && (
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
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Actions />
            {/* Stats */}
            <Progress />
            {/* Quick Navigation */}
            <QuickNavigation />            
          </div>
        </div>
      </div>
    </div>
  )
}
