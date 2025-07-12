import { ProjectsProvider } from "@/components/projects/projects-context";
import { ProjectsContainer } from "@/components/projects/projects-container";

export default function ProjectPage() {
  return (
    <ProjectsProvider>
      <ProjectsContainer />
    </ProjectsProvider>
  );
}
