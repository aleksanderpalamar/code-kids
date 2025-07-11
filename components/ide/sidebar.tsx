"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FileText, FolderOpen, Plus } from "lucide-react";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";
import Code from "@/public/assests/code.png"
import Image from "next/image";
import { ReactNode } from "react";

interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

interface SidebarProps {
  projects: Project[];
  currentProject: Project | null;
  showNewProject: boolean;
  newProjectName: string;
  language: string;
  onShowNewProjectChange: (show: boolean) => void;
  onNewProjectNameChange: (name: string) => void;
  onLanguageChange: (language: string) => void;
  onCreateNewProject: () => void;
  onLoadProject: (project: Project) => void;
}

export function Sidebar({
  projects,
  currentProject,
  showNewProject,
  newProjectName,
  language,
  onShowNewProjectChange,
  onNewProjectNameChange,
  onLanguageChange,
  onCreateNewProject,
  onLoadProject,
}: SidebarProps) {
  const getLanguageEmoji = (lang: ReactNode | string) => {
    switch (lang) {
      case "javascript":
        return (
          <Image src={Javascript} alt="Javascript" width={28} height={28} />
        );
      case "python":
        return <Image src={Python} alt="Python" width={28} height={28} />;
      case "lua":
        return <Image src={Lua} alt="Lua" width={28} height={28} />;
      default:
        return <Image src={Code} alt="Code" width={28} height={28} />;
    }
  };

  return (
    <div className="lg:col-span-1 order-1 lg:order-1">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center text-sm md:text-base">
              <FolderOpen className="h-4 w-4 md:h-5 md:w-5 mr-2 text-purple-600" />
              Projetos
            </span>
            <Button
              size="sm"
              onClick={() => onShowNewProjectChange(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer transition-colors duration-300"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-1 sr-only">Novo</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {showNewProject && (
            <div className="space-y-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Input
                placeholder="Nome do projeto"
                value={newProjectName}
                onChange={(e) => onNewProjectNameChange(e.target.value)}
                className="border-purple-200 text-sm"
              />
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="border-purple-200 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">
                    <Image
                      src={Javascript}
                      alt="Javascript"
                      width={28}
                      height={28}
                    />
                    JavaScript
                  </SelectItem>
                  <SelectItem value="python">
                    <Image src={Python} alt="Python" width={28} height={28} />
                    Python
                  </SelectItem>
                  <SelectItem value="lua">
                    <Image src={Lua} alt="Lua" width={28} height={28} />
                    Lua
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={onCreateNewProject}
                  className="flex-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer transition-colors duration-300"
                >
                  Criar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onShowNewProjectChange(false)}
                  className="text-sm cursor-pointer transition-colors duration-300"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {projects.length === 0 && !showNewProject && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum projeto ainda</p>
              <p className="text-xs">Crie seu primeiro projeto!</p>
            </div>
          )}

          <div className="max-h-64 lg:max-h-96 overflow-y-auto space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentProject?.id === project.id
                    ? "bg-purple-100 border-2 border-purple-300"
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                }`}
                onClick={() => onLoadProject(project)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {project.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      {getLanguageEmoji(project.language)}{" "}
                      <span className="hidden sm:inline ml-1">
                        {project.language}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
