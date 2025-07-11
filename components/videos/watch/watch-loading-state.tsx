import Image from "next/image";

import Player from "@/public/assests/play-icon.png";

export function WatchLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Carregando vídeo...
        </h2>
        <p className="text-gray-600">
          Preparando o player para você!{" "}
          <Image
            src={Player}
            alt="Player"
            width={24}
            height={24}
            className="ml-2"
          />
        </p>
      </div>
    </div>
  );
}
