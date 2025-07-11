"use client"

import { Loader2 } from "lucide-react";

export function VideoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Carregando vídeos incríveis...</h2>
        <p className="text-gray-600">Buscando os melhores conteúdos do YouTube para você! 🚀</p>
      </div>
    </div>
  );
}
