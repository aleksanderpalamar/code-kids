"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Project {
  id: string;
  name: string;
  language: string;
  code: string;
  createdAt: string;
  lastModified: string;
}

export interface UserStats {
  projectsCreated: number;
  videoWatched: number;
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    projectsCreated: 0,
    videoWatched: 0,
    level: 1,
  });

  const loadProjects = () => {
    const savedProjects = localStorage.getItem("codeProjects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      setFilteredProjects(parsedProjects);
    }
  };

  const loadUserStats = () => {
    const stats = localStorage.getItem("userStats");
    if (stats) {
      setUserStats(JSON.parse(stats));
    }
  };

  const refreshProjects = () => {
    loadProjects();
    loadUserStats();
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    setFilteredProjects(
      updatedProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.language.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    localStorage.setItem("codeProjects", JSON.stringify(updatedProjects));

    const stats = { ...userStats, projectsCreated: updatedProjects.length };
    setUserStats(stats);
    localStorage.setItem("userStats", JSON.stringify(stats));
  };

  useEffect(() => {
    loadProjects();
    loadUserStats();
  }, []);

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
