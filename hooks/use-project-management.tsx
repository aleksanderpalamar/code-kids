"use client"

import { useEffect } from "react";
import { useIDE, Project } from "@/components/ide/ide-context";
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

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("codeProjects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      if (parsedProjects.length > 0) {
        setCurrentProject(parsedProjects[0]);
        setCode(parsedProjects[0].code);
        setLanguage(parsedProjects[0].language);
      }
    } else {
      setCode(defaultCode.javascript);
    }
  }, [setProjects, setCurrentProject, setCode, setLanguage]);

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

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setCurrentProject(newProject);
    setCode(newProject.code);
    localStorage.setItem("codeProjects", JSON.stringify(updatedProjects));

    // Update user stats
    const stats = JSON.parse(
      localStorage.getItem("userStats") ||
        '{"projectsCreated": 0, "videosWatched": 0, "level": 1}'
    );
    stats.projectsCreated = updatedProjects.length;
    localStorage.setItem("userStats", JSON.stringify(stats));

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

    const updatedProjects = projects.map((p) =>
      p.id === currentProject.id ? updatedProject : p
    );

    setProjects(updatedProjects);
    setCurrentProject(updatedProject);
    localStorage.setItem("codeProjects", JSON.stringify(updatedProjects));

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
