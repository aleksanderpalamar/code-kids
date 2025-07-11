import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

import Rocket from "@/public/assests/rocket-chibi.png";
import CodeIcon from "@/public/assests/code-icon.png"
import PlayIcon from "@/public/assests/play-icon.png"
import Projects from "@/public/assests/projects.png"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex items-center space-x-2">
            <Image src={Rocket} alt="Logo" width={32} height={32} />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CodeKids
            </h1>
          </div>
          <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <Link href="/videos">
              <Button
                variant="ghost"
                className="text-purple-600 hover:bg-purple-100 px-2 sm:px-3 md:px-4 cursor-pointer"
                title="Vídeos"
              >
                <Image 
                  src={PlayIcon}
                  alt="Vídeos"
                  width={32}
                  height={32}
                />
                <span className="hidden sm:inline">Vídeos</span>
              </Button>
            </Link>
            <Link href="/ide">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-100 px-2 sm:px-3 md:px-4 cursor-pointer"
                title="IDE"
              >
                <Image 
                  src={CodeIcon}
                  alt="IDE online"
                  width={32}
                  height={32}
                />
                <span className="hidden sm:inline">IDE</span>
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="ghost"
                className="text-green-600 hover:bg-green-100 px-2 sm:px-3 md:px-4 cursor-pointer"
                title="Projetos"
              >
                <Image 
                  src={Projects}
                  alt="Projetos"
                  width={32}
                  height={32}
                />
                <span className="hidden sm:inline">Projetos</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
