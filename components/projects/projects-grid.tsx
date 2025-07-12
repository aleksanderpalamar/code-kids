import { ProjectCard } from "./project-card";
import { ProjectsEmptyState } from "./projects-empty-state";
import { Project } from "./projects-context";

interface ProjectsGridProps {
  projects: Project[];
  filteredProjects: Project[];
  onDeleteProject: (projectId: string) => void;
}

export function ProjectsGrid({
  projects,
  filteredProjects,
  onDeleteProject,
}: ProjectsGridProps) {
  if (filteredProjects.length === 0) {
    return <ProjectsEmptyState hasProjects={projects.length > 0} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDeleteProject}
        />
      ))}
    </div>
  );
}
