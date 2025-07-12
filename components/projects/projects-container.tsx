"use client";

import { ProjectsHeader } from "./projects-header";
import { StatsCards } from "./stats-cards";
import { ProjectsSearch } from "./projects-search";
import { ProjectsGrid } from "./projects-grid";
import { useProjectsContext } from "./projects-context";

export function ProjectsContainer() {
  const {
    projects,
    filteredProjects,
    userStats,
    searchTerm,
    setSearchTerm,
    deleteProject,
  } = useProjectsContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <ProjectsHeader userStats={userStats} />

      <div className="container mx-auto px-4 py-8">
        <ProjectsSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <StatsCards userStats={userStats} />
        <ProjectsGrid
          projects={projects}
          filteredProjects={filteredProjects}
          onDeleteProject={deleteProject}
        />
      </div>
    </div>
  );
}
