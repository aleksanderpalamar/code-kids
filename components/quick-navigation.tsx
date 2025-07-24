import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

import PlayIcon from "@/public/assests/play-icon.png";
import CodeIcon from "@/public/assests/code-icon.png";
import Projects from "@/public/assests/projects.png";

export function QuickNavigation() {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Navegação Rápida
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href="/videos">
          <Button
            variant="ghost"
            className="w-full justify-start text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors duration-300"
          >
            <Image
              src={PlayIcon}
              alt="Todos os Vídeos"
              width={32}
              height={32}
            />
            Todos os Vídeos
          </Button>
        </Link>
        <Link href="/ide">
          <Button
            variant="ghost"
            className="w-full justify-start text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors duration-300"
          >
            <Image src={CodeIcon} alt="IDE online" width={32} height={32} />
            IDE Online
          </Button>
        </Link>
        <Link href="/projects">
          <Button
            variant="ghost"
            className="w-full justify-start text-purple-600 hover:bg-purple-50 cursor-pointer transition-colors duration-300"
          >
            <Image src={Projects} alt="Meus Projetos" width={32} height={32} />
            Meus Projetos
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
