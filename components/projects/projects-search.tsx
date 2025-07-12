import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectsSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ProjectsSearch({
  searchTerm,
  onSearchChange,
}: ProjectsSearchProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-200 mb-6 md:mb-8">
      <CardContent className="p-4 md:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-purple-200 focus:border-purple-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
