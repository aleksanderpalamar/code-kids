"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAppStore, Project } from "@/stores/app-store";

export type { Project };

export interface UserStats {
  projectsCreated: number;
  videosWatched: number; // Corrigido para manter consistência
  projectsExecuted: number;
  level: number;
}

interface ProjectsContextType {
  projects: Project[];
  filteredProjects: Project[];
  userStats: UserStats;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  deleteProject: (projectId: string) => void;
  refreshProjects: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function useProjectsContext() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "useProjectsContext must be used within a ProjectsProvider"
    );
  }
  return context;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    projectsCreated: 0,
    videosWatched: 0,
    projectsExecuted: 0,
    level: 1,
  });

  const {
    projects,
    deleteProject: deleteStoreProject,
    userStats: storeUserStats,
  } = useAppStore();

  // Sincronizar userStats locais com store
  useEffect(() => {
    setUserStats({
      projectsCreated: storeUserStats.projectsCreated,
      videosWatched: storeUserStats.videosWatched,
      projectsExecuted: storeUserStats.projectsExecuted || 0,
      level: storeUserStats.level,
    });
  }, [storeUserStats]);

  const loadProjects = () => {
    // Os projetos já vêm do store, não precisamos carregar do localStorage
    setFilteredProjects(projects);
  };

  const loadUserStats = () => {
    // As estatísticas já vêm do store
    setUserStats({
      projectsCreated: storeUserStats.projectsCreated,
      videosWatched: storeUserStats.videosWatched,
      projectsExecuted: storeUserStats.projectsExecuted || 0,
      level: storeUserStats.level,
    });
  };

  const refreshProjects = () => {
    loadProjects();
    loadUserStats();
  };

  const deleteProject = (projectId: string) => {
    // Deletar projeto do store (que gerencia automaticamente a persistência)
    deleteStoreProject(projectId);

    // Atualizar projetos filtrados
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setFilteredProjects(
      updatedProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.language.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    loadProjects();
    loadUserStats();
  }, [projects]); // Reagir às mudanças nos projetos do store

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        filteredProjects,
        userStats,
        searchTerm,
        setSearchTerm,
        deleteProject,
        refreshProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
