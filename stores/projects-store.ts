import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Project, UserStats } from "./types";
import { calculateUserLevel } from "@/lib/level-system";

interface ProjectsState {
  projects: Project[];

  // Actions
  setProjects: (
    projects: Project[],
    userStats: UserStats,
    updateUserStats: (stats: Partial<UserStats>) => void
  ) => void;
  addProject: (
    project: Project,
    userStats: UserStats,
    updateUserStats: (stats: Partial<UserStats>) => void
  ) => void;
  updateProject: (project: Project) => void;
  deleteProject: (
    projectId: string,
    userStats: UserStats,
    updateUserStats: (stats: Partial<UserStats>) => void
  ) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  subscribeWithSelector((set, get) => ({
    projects: [],

    setProjects: (projects, userStats, updateUserStats) => {
      const newUserLevel = calculateUserLevel(
        userStats.videosWatched,
        projects.length,
        userStats.projectsExecuted
      );

      set({ projects });

      updateUserStats({
        projectsCreated: projects.length,
        level: newUserLevel.currentLevel,
      });
    },

    addProject: (project, userStats, updateUserStats) => {
      set((state) => {
        const newProjects = [...state.projects, project];

        const newUserLevel = calculateUserLevel(
          userStats.videosWatched,
          newProjects.length,
          userStats.projectsExecuted
        );

        updateUserStats({
          projectsCreated: newProjects.length,
          level: newUserLevel.currentLevel,
        });

        return { projects: newProjects };
      });
    },

    updateProject: (updatedProject) => {
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === updatedProject.id ? updatedProject : p
        ),
      }));
    },

    deleteProject: (projectId, userStats, updateUserStats) => {
      set((state) => {
        const newProjects = state.projects.filter((p) => p.id !== projectId);

        const newUserLevel = calculateUserLevel(
          userStats.videosWatched,
          newProjects.length,
          userStats.projectsExecuted
        );

        updateUserStats({
          projectsCreated: newProjects.length,
          level: newUserLevel.currentLevel,
        });

        return { projects: newProjects };
      });
    },
  }))
);
