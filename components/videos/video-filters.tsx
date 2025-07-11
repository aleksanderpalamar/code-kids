"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Loader2 } from "lucide-react";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";
import Html from "@/public/assests/html.png";
import Code from "@/public/assests/code-icon.png";
import Image from "next/image";

interface VideoFiltersProps {
  searchTerm: string;
  onSearchChangeAction: (term: string) => void;
  selectedLanguage: string;
  onLanguageChangeAction: (language: string) => void;
  selectedDifficulty: string;
  onDifficultyChangeAction: (difficulty: string) => void;
  searchLoading: boolean;
}

export function VideoFilters({
  searchTerm,
  onSearchChangeAction,
  selectedLanguage,
  onLanguageChangeAction,
  selectedDifficulty,
  onDifficultyChangeAction,
  searchLoading,
}: VideoFiltersProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-purple-200">
      <div className="flex flex-col gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          {searchLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4 animate-spin" />
          )}
          <Input
            placeholder="Buscar vídeos no YouTube..."
            value={searchTerm}
            onChange={(e) => onSearchChangeAction(e.target.value)}
            className="pl-10 pr-10 border-purple-200 focus:border-purple-400"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Select
            value={selectedLanguage}
            onValueChange={onLanguageChangeAction}
          >
            <SelectTrigger className="w-full sm:w-48 border-purple-200">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Linguagem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Linguagens</SelectItem>
              <SelectItem value="JavaScript">
                <Image
                  src={Javascript}
                  alt="Javascript"
                  width={24}
                  height={24}
                />
                JavaScript
              </SelectItem>
              <SelectItem value="Python">
                <Image src={Python} alt="Python" width={24} height={24} />
                Python
              </SelectItem>
              <SelectItem value="Lua">
                <Image src={Lua} alt="Lua" width={24} height={24} />
                Lua
              </SelectItem>
              <SelectItem value="HTML/CSS">
                <Image src={Html} alt="Html" width={24} height={24} />
                HTML/CSS
              </SelectItem>
              <SelectItem value="Geral">
                <Image src={Code} alt="Code" width={24} height={24} />
                Geral
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedDifficulty}
            onValueChange={onDifficultyChangeAction}
          >
            <SelectTrigger className="w-full sm:w-48 border-purple-200">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Dificuldades</SelectItem>
              <SelectItem value="Iniciante">Iniciante</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
