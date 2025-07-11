import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, Zap } from "lucide-react";

export function CTA() {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 md:p-12 text-center text-white mx-4">
        <div className="flex justify-center mb-4 md:mb-6">
          <Heart className="h-8 w-8 md:h-12 md:w-12 animate-pulse" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
          Pronto para Começar sua Jornada?
        </h3>
        <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
          Junte-se a milhares de jovens programadores e descubra o poder da
          criação!
        </p>
        <Link href="/videos">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-6 md:px-8 py-3 rounded-xl font-bold w-full sm:w-auto cursor-pointer transition-colors duration-300"
          >
            <Zap className="h-4 md:h-5 w-4 md:w-5 mr-2" />
            Começar Agora
          </Button>
        </Link>
      </div>
    )
}