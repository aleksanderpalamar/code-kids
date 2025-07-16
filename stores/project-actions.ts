import { Project } from "./types";
import { calculateUserLevel } from "@/lib/level-system";

export const projectActions = (set: any, get: any) => ({
  setProjects: (projects: Project[]) => {
    const newUserLevel = calculateUserLevel(
      get().userStats.videosWatched,
      projects.length,
      get().userStats.projectsExecuted
    );

    set({
      projects,
      userStats: {
        ...get().userStats,
        projectsCreated: projects.length,
        level: newUserLevel.currentLevel,
      },
    });
  },

  addProject: (project: Project) => {
    set((state: any) => {
      const newProjects = [...state.projects, project];
      const newUserLevel = calculateUserLevel(
        state.userStats.videosWatched,
        newProjects.length,
        state.userStats.projectsExecuted
      );

      return {
        projects: newProjects,
        userStats: {
          ...state.userStats,
          projectsCreated: newProjects.length,
          level: newUserLevel.currentLevel,
        },
      };
    });
  },

  updateProject: (updatedProject: Project) => {
    set((state: any) => ({
      projects: state.projects.map((p: Project) =>
        p.id === updatedProject.id ? updatedProject : p
      ),
    }));
  },

  deleteProject: (projectId: string) => {
    set((state: any) => {
      const newProjects = state.projects.filter(
        (p: Project) => p.id !== projectId
      );
      const newUserLevel = calculateUserLevel(
        state.userStats.videosWatched,
        newProjects.length,
        state.userStats.projectsExecuted
      );

      return {
        projects: newProjects,
        userStats: {
          ...state.userStats,
          projectsCreated: newProjects.length,
          level: newUserLevel.currentLevel,
        },
      };
    });
  },
});
