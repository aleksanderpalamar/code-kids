import { PythonExecutionService } from "@/lib/python-execution";

interface ExecutionParams {
  code: string;
  setOutput: (updater: (prev: string) => string) => void;
  handleSuccessfulExecution: () => { leveledUp: boolean; message?: string };
  showSuccessToast: (message: string) => void;
  showLevelUpToast: (message: string) => void;
}

export async function executePythonCode({
  code,
  setOutput,
  handleSuccessfulExecution,
  showSuccessToast,
  showLevelUpToast,
}: ExecutionParams): Promise<void> {
  try {
    // Analisar código para dar dicas
    const suggestions = PythonExecutionService.analyzePythonCode(code);

    // Executar código Python
    const result = await PythonExecutionService.executeCode(code);

    if (result.success) {
      // Registrar execução bem-sucedida e verificar level up
      const levelUpResult = handleSuccessfulExecution();

      const formattedOutput = PythonExecutionService.formatOutput(
        result.output
      );

      // Mostrar toast visual
      if (levelUpResult.leveledUp) {
        showLevelUpToast(levelUpResult.message!);
      } else {
        showSuccessToast("Código executado com sucesso!");
      }

      setOutput((prev) => prev + formattedOutput);

      // Adicionar sugestões se houver
      if (suggestions.length > 0) {
        setOutput(
          (prev) =>
            prev +
            "\n📚 Dicas de programação:\n" +
            suggestions.join("\n") +
            "\n"
        );
      }

      setOutput((prev) => prev + "\n✨ Execução Python concluída!");
    } else {
      const formattedError = PythonExecutionService.formatError(
        result.error || "Erro desconhecido"
      );
      setOutput((prev) => prev + formattedError);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro na comunicação";
    const formattedError = PythonExecutionService.formatError(
      `Erro de conexão: ${errorMessage}`
    );
    setOutput((prev) => prev + formattedError);
  }
}
