"use client"

import { Button } from "@/components/ui/button";

interface VideoEmptyStateProps {
  onReloadAction: () => void;
}

export function VideoEmptyState({ onReloadAction }: VideoEmptyStateProps) {
  return (
    <div className="text-center py-12 md:py-16">
      <div className="text-4xl md:text-6xl mb-4">🔍</div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Nenhum vídeo encontrado</h3>
      <p className="text-gray-600 mb-4 px-4">Tente ajustar os filtros ou termo de busca</p>
      <Button
        onClick={onReloadAction}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        Recarregar Vídeos
      </Button>
    </div>
  );
}
