"use client";

import { useEffect } from "react";
import { useIDE } from "@/components/ide/ide-context";
import { useAppStore, Project } from "@/stores/app-store";
import { defaultCode } from "@/data/default-code";

export function useProjectManagement() {
  const {
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
    code,
    setCode,
    language,
    setLanguage,
    setOutput,
    newProjectName,
    setNewProjectName,
    setShowNewProject,
  } = useIDE();

  const {
    projects: storeProjects,
    setProjects: setStoreProjects,
    addProject: addStoreProject,
    updateProject: updateStoreProject,
  } = useAppStore();

  // Load projects from store on mount and sync with IDE context
  useEffect(() => {
    // Carregar projetos do store do Zustand
    setProjects(storeProjects);
    if (storeProjects.length > 0) {
      setCurrentProject(storeProjects[0]);
      setCode(storeProjects[0].code);
      setLanguage(storeProjects[0].language);
    } else {
      setCode(defaultCode.javascript);
    }
  }, [storeProjects, setProjects, setCurrentProject, setCode, setLanguage]);

  const createNewProject = () => {
    if (!newProjectName.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      language: language,
      code: defaultCode[language as keyof typeof defaultCode] || "",
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    // Adicionar projeto ao store (que gerencia automaticamente a persistência)
    addStoreProject(newProject);

    // Atualizar contexto IDE
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setCurrentProject(newProject);
    setCode(newProject.code);

    setNewProjectName("");
    setShowNewProject(false);
  };

  const saveProject = () => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      code: code,
      language: language,
      lastModified: new Date().toISOString(),
    };

    // Atualizar projeto no store
    updateStoreProject(updatedProject);

    // Atualizar contexto IDE
    const updatedProjects = projects.map((p) =>
      p.id === currentProject.id ? updatedProject : p
    );
    setProjects(updatedProjects);
    setCurrentProject(updatedProject);

    setOutput((prev) => prev + "\n✅ Projeto salvo com sucesso!");
  };

  const loadProject = (project: Project) => {
    setCurrentProject(project);
    setCode(project.code);
    setLanguage(project.language);
    setOutput("");
  };

  return {
    createNewProject,
    saveProject,
    loadProject,
  };
}
