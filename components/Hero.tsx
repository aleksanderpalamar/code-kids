import { Code, Play, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CTA } from "./cta";
import { Language } from "./language";
import { Features } from "./features";
import { UserStats } from "./user-stats";

import Rocket from "@/public/assests/rocket-chibi.png";
import Image from "next/image";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-6 sm:py-8 md:py-16">
      <div className="text-center mb-6 sm:mb-8 md:mb-16">
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative">
            <Image src={Rocket} alt="Logo" width={64} height={64} />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent px-2 sm:px-4">
          Aprenda a Programar de Forma Divertida!
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          Descubra o mundo mágico da programação com vídeos educativos e uma IDE
          online. Perfeito para crianças e iniciantes de todas as idades! 🚀
        </p>
        {/* User Stats */}
        <UserStats />
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
          <Link href="/videos">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 md:px-8 py-3 rounded-xl w-full sm:w-auto cursor-pointer transition-colors duration-300"
            >
              <Play className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              Começar a Aprender
            </Button>
          </Link>
          <Link href="/ide">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 px-6 md:px-8 py-3 rounded-xl bg-transparent w-full sm:w-auto cursor-pointer transition-colors duration-300"
            >
              <Code className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              Experimentar IDE
            </Button>
          </Link>
        </div>
      </div>
      {/* Features */}
      <Features />
      {/* Languages */}
      <Language />
      {/* CTA Section */}
      <CTA />
    </section>
  );
}
