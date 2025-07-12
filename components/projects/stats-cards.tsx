import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { UserStats } from "./projects-context";

import Play from "@/public/assests/play-icon.png";
import Code from "@/public/assests/code-icon.png";

interface StatsCardsProps {
  userStats: UserStats;
}

export function StatsCards({ userStats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-4 md:p-6 text-center">
          <div className="text-2xl md:text-3xl font-bold mb-2">
            {userStats.projectsCreated}
          </div>
          <div className="text-purple-100 text-sm md:text-base">
            Projetos Criados
          </div>
          <Image
            src={Code}
            alt="Code"
            width={32}
            height={32}
            className="h-8 w-8 md:h-8 md:w-8 mx-auto mt-2 opacity-80"
          />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0">
        <CardContent className="p-4 md:p-6 text-center">
          <div className="text-2xl md:text-3xl font-bold mb-2">
            {userStats.videoWatched}
          </div>
          <div className="text-blue-100 text-sm md:text-base">
            Vídeos Assistidos
          </div>
          <Image
            src={Play}
            alt="Play"
            width={32}
            height={32}
            className="h-8 w-8 md:h-8 md:w-8 mx-auto mt-2 opacity-80"
          />
        </CardContent>
      </Card>
    </div>
  );
}
