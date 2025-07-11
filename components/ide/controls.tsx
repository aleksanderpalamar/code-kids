"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Play, Save } from "lucide-react";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";

interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

interface ControlsProps {
  language: string;
  currentProject: Project | null;
  isRunning: boolean;
  onLanguageChange: (language: string) => void;
  onSaveProject: () => void;
  onRunCode: () => void;
}

export function Controls({
  language,
  currentProject,
  isRunning,
  onLanguageChange,
  onSaveProject,
  onRunCode,
}: ControlsProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-4 w-full sm:w-auto">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full sm:w-40 md:w-48 border-purple-200 text-sm cursor-pointer p-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript" className="cursor-pointer">
                  <Image
                    src={Javascript}
                    alt="Javascript"
                    width={28}
                    height={28}
                  />
                  JavaScript
                </SelectItem>
                <SelectItem value="python" className="cursor-pointer">
                  <Image src={Python} alt="Python" width={28} height={28} />
                  Python
                </SelectItem>
                <SelectItem value="lua" className="cursor-pointer">
                  <Image src={Lua} alt="Lua" width={28} height={28} />
                  Lua
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button
              onClick={onSaveProject}
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent text-sm flex-1 sm:flex-none transition-colors duration-300 cursor-pointer"
              disabled={!currentProject}
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Salvar</span>
              <span className="sm:hidden">Salvar</span>
            </Button>
            <Button
              onClick={onRunCode}
              disabled={isRunning}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm flex-1 sm:flex-none transition-colors duration-300 cursor-pointer"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? (
                <span className="hidden sm:inline">Executando...</span>
              ) : (
                <span>Executar</span>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
