import Link from "next/link";
import { Button } from "@/components/ui/button";

export function VideoNotFoundState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Vídeo não encontrado
        </h2>
        <p className="text-gray-600 mb-4">
          O vídeo que você está procurando não existe ou foi removido.
        </p>
        <Link href="/videos">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            Voltar para Vídeos
          </Button>
        </Link>
      </div>
    </div>
  );
}
