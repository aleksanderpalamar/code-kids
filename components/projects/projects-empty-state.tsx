import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

interface EmptyStateProps {
  hasProjects: boolean;
}

export function ProjectsEmptyState({ hasProjects }: EmptyStateProps) {
  if (hasProjects) {
    // Estado quando existe projetos mas nenhum foi encontrado na busca
    return (
      <div className="text-center py-16">
        <div className="text-4xl md:text-6xl mb-4">🔍</div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Nenhum projeto encontrado
        </h3>
        <p className="text-gray-600 px-4">Tente ajustar o termo de busca</p>
      </div>
    );
  }

  // Estado quando não há projetos
  return (
    <div className="text-center py-16">
      <div className="text-4xl md:text-6xl mb-4">🚀</div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
        Nenhum projeto ainda
      </h3>
      <p className="text-gray-600 mb-6 px-4">
        Que tal criar seu primeiro projeto na IDE?
      </p>
      <Link href="/ide">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
          <Code className="h-4 w-4 mr-2" />
          Criar Primeiro Projeto
        </Button>
      </Link>
    </div>
  );
}
