"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Code,
  Edit,
  Play,
  Search,
  Star,
  Trash2,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [userStats, setUserStats] = useState({
    projectsCreated: 0,
    videoWatched: 0,
    level: 1,
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem("codeProjects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      setFilteredProjects(parsedProjects);
    }

    const stats = localStorage.getItem("userStats");
    if (stats) {
      setUserStats(JSON.parse(stats));
    }
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    setFilteredProjects(updatedProjects);
    localStorage.setItem("codeProjects", JSON.stringify(updatedProjects));

    const stats = { ...userStats, projectsCreated: updatedProjects.length };
    setUserStats(stats);
    localStorage.setItem("userStats", JSON.stringify(stats));
  };

  const getLanguageEmoji = (language: string) => {
    switch (language) {
      case "javascript":
        return "🟨"
      case "python":
        return "🐍"
      case "lua":
        return "🌙"
      default:
        return "💻"
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "javascript":
        return "bg-yellow-100 text-yellow-800"
      case "python":
        return "bg-blue-100 text-blue-800"
      case "lua":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getLevelBadge = (level: number) => {
    if (level >= 10) return { emoji: "🏆", title: "Mestre", color: "bg-yellow-100 text-yellow-800" }
    if (level >= 5) return { emoji: "⭐", title: "Avançado", color: "bg-purple-100 text-purple-800" }
    if (level >= 3) return { emoji: "🚀", title: "Intermediário", color: "bg-blue-100 text-blue-800" }
    return { emoji: "🌱", title: "Iniciante", color: "bg-green-100 text-green-800" }
  }

  const levelBadge = getLevelBadge(userStats.level)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Voltar</span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Meus Projetos
                </h1>
              </div>
            </div>
            <Badge className={`${levelBadge.color} border-0 text-xs md:text-sm lg:text-base px-2 md:px-3 py-1`}>
              {levelBadge.emoji} <span className="hidden sm:inline">{levelBadge.title} - </span>Nível {userStats.level}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2">
                {userStats.projectsCreated}
              </div>
              <div className="text-purple-100 text-sm md:text-base">Projetos Criados</div>
              <Code className="h-6 w-6 md:h-8 md:w-8 mx-auto mt-2 opacity-80" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2">
                {userStats.videoWatched}
              </div>
              <div className="text-blue-100 text-sm md:text-base">Vídeos Assistidos</div>
              <Play className="h-6 w-6 md:h-8 md:w-8 mx-auto mt-2 opacity-80" />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2">
                Nível {userStats.level}
              </div>
              <div className="text-green-100 text-sm md:text-base">{levelBadge.title}</div>
              <Star className="h-6 w-6 md:h-8 md:w-8 mx-auto mt-2 opacity-80" />
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200 mb-6 md:mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              >
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
                        <span className="hidden sm:inline">Criado: </span>{formatDate(project.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Edit className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        <span className="hidden sm:inline">Modificado: </span>{formatDate(project.lastModified)}
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
                      <Link
                        href={`/ide?project=${project.id}`}
                        className="flex-1"
                      >
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm">
                          <Code className="h-4 w-4 mr-2" />
                          Abrir
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProject(project.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {projects.length === 0 ? (
              <>
                <div className="text-4xl md:text-6xl mb-4">🚀</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Nenhum projeto ainda
                </h3>
                <p className="text-gray-600 mb-6 px-4">
                  Que tal criar seu primeiro projeto na IDE?
                </p>
                <Link href="/ide">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Code className="h-4 w-4 mr-2" />
                    Criar Primeiro Projeto
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-4xl md:text-6xl mb-4">🔍</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-gray-600 px-4">Tente ajustar o termo de busca</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
