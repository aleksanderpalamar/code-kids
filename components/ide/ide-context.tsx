"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import { Project } from "@/stores/app-store";

interface IDEContextType {
  // State
  projects: Project[];
  currentProject: Project | null;
  code: string;
  language: string;
  output: string;
  isRunning: boolean;
  showNewProject: boolean;
  newProjectName: string;
  isMobile: boolean;
  editorRef: React.MutableRefObject<any>;

  // Actions
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setOutput: (output: string | ((prev: string) => string)) => void;
  setIsRunning: (running: boolean) => void;
  setShowNewProject: (show: boolean) => void;
  setNewProjectName: (name: string) => void;
  setIsMobile: (mobile: boolean) => void;
}

const IDEContext = createContext<IDEContextType | undefined>(undefined);

export function useIDE() {
  const context = useContext(IDEContext);
  if (context === undefined) {
    throw new Error("useIDE must be used within an IDEProvider");
  }
  return context;
}

interface IDEProviderProps {
  children: ReactNode;
}

export function IDEProvider({ children }: IDEProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const editorRef = useRef<any>(null);

  const value: IDEContextType = {
    // State
    projects,
    currentProject,
    code,
    language,
    output,
    isRunning,
    showNewProject,
    newProjectName,
    isMobile,
    editorRef,

    // Actions
    setProjects,
    setCurrentProject,
    setCode,
    setLanguage,
    setOutput,
    setIsRunning,
    setShowNewProject,
    setNewProjectName,
    setIsMobile,
  };

  return <IDEContext.Provider value={value}>{children}</IDEContext.Provider>;
}
