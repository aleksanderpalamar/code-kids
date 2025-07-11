"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../ui/badge";
import { ReactNode } from "react";

import Javascript from "@/public/assests/javascript.png";
import Python from "@/public/assests/python.png";
import Lua from "@/public/assests/lua.png";
import Code from "@/public/assests/code-icon.png";

interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

interface HeaderProps {
  currentProject: Project | null;
}

export function Header({ currentProject }: HeaderProps) {
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
        return "💻";
    }
  };

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
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Image src={Code} alt="Code icon logo" width={32} height={32} />
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                IDE CodeKids
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentProject && (
              <Badge className="bg-purple-100 text-purple-800 border-0 text-xs md:text-sm">
                {getLanguageEmoji(currentProject.language)}{" "}
                <span className="hidden sm:inline">{currentProject.name}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
