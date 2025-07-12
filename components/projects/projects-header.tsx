import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useProjectUtils } from "@/hooks/use-project-utils";
import { UserStats } from "./projects-context";

interface ProjectsHeaderProps {
  userStats: UserStats;
}

export function ProjectsHeader({ userStats }: ProjectsHeaderProps) {
  const { getLevelBadge } = useProjectUtils();
  const levelBadge = getLevelBadge(userStats.level);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 transition-colors duration-300 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meus Projetos
              </h1>
            </div>
          </div>
          <Badge
            className={`${levelBadge.color} border-0 text-xs md:text-sm lg:text-base px-2 md:px-3 py-1`}
          >
            {levelBadge.emoji}{" "}
            <span className="hidden sm:inline">{levelBadge.title}</span>
          </Badge>
        </div>
      </div>
    </header>
  );
}
