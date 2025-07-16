"use client";

import { useIDE } from "@/components/ide/ide-context";
import { useLevelSystem } from "@/hooks/use-level-system";
import { useToast } from "@/hooks/use-toast";
import { executePythonCode } from "@/functions/execute-python-code";
import { executeLuaCode } from "@/functions/execute-lua-code";
import { executeJavaScriptCode } from "@/functions/execute-javascript-code";

export function useCodeExecution() {
  const { code, language, setOutput, setIsRunning } = useIDE();
  const { handleSuccessfulExecution } = useLevelSystem();
  const { toast, showSuccessToast, showLevelUpToast, hideToast } = useToast();

  const runCode = async () => {
    setIsRunning(true);
    setOutput("🚀 Executando código...\n");

    try {
      const executionParams = {
        code,
        setOutput,
        handleSuccessfulExecution,
        showSuccessToast,
        showLevelUpToast,
      };

      if (language === "python") {
        await executePythonCode(executionParams);
      } else if (language === "lua") {
        await executeLuaCode(executionParams);
      } else if (language === "javascript") {
        await executeJavaScriptCode(executionParams);
      } else {
        setOutput(
          (prev) =>
            prev +
            `\n⚠️ Execução de ${language} ainda não implementada na versão web.\nMas seu código está salvo e pronto! 🎉`
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setOutput(
        (prev) =>
          prev + `\n❌ Erro inesperado: ${errorMessage}\n\nTente novamente! 🤔`
      );
    }

    setIsRunning(false);
  };

  return { runCode, toast, hideToast };
}
