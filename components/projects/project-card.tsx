import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { useProjectUtils } from "@/hooks/use-project-utils";
import { Project } from "./projects-context";

import Code from "@/public/assests/code-icon.png";

interface ProjectCardProps {
  project: Project;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const { getLanguageEmoji, getLanguageColor, formatDate } = useProjectUtils();

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base md:text-lg font-bold text-gray-800 mb-2">
              {project.name}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getLanguageColor(project.language)}>
                {getLanguageEmoji(project.language)}{" "}
                <span className="hidden sm:inline">{project.language}</span>
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="space-y-4">
          <div className="text-xs md:text-sm text-gray-600">
            <div className="flex items-center mb-1">
              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              <span className="hidden sm:inline">Criado: </span>
              {formatDate(project.createdAt)}
            </div>
            <div className="flex items-center">
              <Edit className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              <span className="hidden sm:inline">Modificado: </span>
              {formatDate(project.lastModified)}
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-2 md:p-3 rounded-lg font-mono text-xs overflow-hidden">
            <div className="line-clamp-3">
              {project.code.split("\n").slice(0, 3).join("\n")}
            </div>
            {project.code.split("\n").length > 3 && (
              <div className="text-gray-500 mt-1">...</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link href={`/ide?project=${project.id}`} className="flex-1">
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
              text-white text-sm transition-colors duration-300 cursor-pointer"
              >
                <Image src={Code} alt="Code" width={24} height={24} />
                Abrir
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(project.id)}
              className="border-rose-100 text-rose-500 hover:bg-rose-200 hover:text-rose-600 transition-colors duration-300 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
