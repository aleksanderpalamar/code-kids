import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Code from "@/public/assests/code.png"
import Play from "@/public/assests/play.png"
import Trophy from "@/public/assests/trophy.png"
import Image from "next/image";

export function Features() {
  const features = [
    {
      icon: Play,
      title: "Vídeos Educativos",
      description:
        "Aprenda com os melhores vídeos do YouTube organizados por linguagem",
      color: "bg-purple-100",
    },
    {
      icon: Code,
      title: "IDE Online",
      description: "Escreva e execute código diretamente no navegador",
      color: "bg-blue-100",
    },
    {
      icon: Trophy,
      title: "Sistema de Conquistas",
      description: "Ganhe badges e suba de nível conforme aprende",
      color: "bg-yellow-100",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-16 px-4">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
        >
          <CardHeader className="text-center">
            <div
              className={`w-12 h-12 md:w-16 md:h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}
            >
              <Image
                src={feature.icon.src}
                alt={feature.title}
                width={64}
                height={64}
              />
            </div>
            <CardTitle className="text-lg md:text-xl font-bold text-gray-800">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-gray-600 text-sm md:text-base">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
