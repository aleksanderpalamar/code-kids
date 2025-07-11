import { Card, CardContent } from "./ui/card";
import Image from "next/image";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";
import Html from "@/public/assests/html.png";

export function Language() {
    const languages = [
    { name: "JavaScript", color: "bg-yellow-400", icon: Javascript },
    { name: "Python", color: "bg-blue-400", icon: Python },
    { name: "Lua", color: "bg-purple-400", icon: Lua },
    { name: "HTML/CSS", color: "bg-orange-400", icon: Html },
  ];
    return (
        <div className="text-center mb-8 md:mb-16 px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">
          Linguagens Disponíveis
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {languages.map((lang, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="flex flex-col items-center py-6">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3 flex justify-center">
                  <Image
                    src={lang.icon}
                    alt={lang.name}
                    width={64}
                    height={64}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="font-bold text-gray-800 text-sm md:text-base">
                  {lang.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
}