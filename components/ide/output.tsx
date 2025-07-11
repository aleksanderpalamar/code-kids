"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Terminal } from "lucide-react";

interface OutputProps {
  output: string;
}

export function Output({ output }: OutputProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center text-sm md:text-base">
          <Terminal className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
          Saída do Programa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-80 md:h-96 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs sm:text-sm overflow-y-auto">
          {output ||
            "💡 Execute seu código para ver o resultado aqui!\n\nDicas:\n• Use console.log() em JavaScript\n• Use print() em Python e Lua\n• Experimente criar funções divertidas! 🎉"}
        </div>
      </CardContent>
    </Card>
  );
}
