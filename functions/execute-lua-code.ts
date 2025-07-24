import { LuaExecutionService } from "@/lib/lua-execution";

interface ExecutionParams {
  code: string;
  setOutput: (updater: (prev: string) => string) => void;
  handleSuccessfulExecution: () => { leveledUp: boolean; message?: string };
  showSuccessToast: (message: string) => void;
  showLevelUpToast: (message: string) => void;
}

export async function executeLuaCode({
  code,
  setOutput,
  handleSuccessfulExecution,
  showSuccessToast,
  showLevelUpToast,
}: ExecutionParams): Promise<void> {
  try {
    // Analisar código para dar dicas
    const suggestions = LuaExecutionService.analyzeLuaCode(code);
    const syntaxSuggestions = LuaExecutionService.suggestLuaSyntax(code);

    // Executar código Lua
    const result = await LuaExecutionService.executeCode(code);

    if (result.success) {
      // Registrar execução bem-sucedida e verificar level up
      const levelUpResult = handleSuccessfulExecution();

      const formattedOutput = LuaExecutionService.formatOutput(result.output);

      // Mostrar toast visual
      if (levelUpResult.leveledUp) {
        showLevelUpToast(levelUpResult.message!);
      } else {
        showSuccessToast("Código executado com sucesso!");
      }

      setOutput((prev) => prev + formattedOutput);

      // Adicionar sugestões se houver
      const allSuggestions = [...suggestions, ...syntaxSuggestions];
      if (allSuggestions.length > 0) {
        setOutput(
          (prev) =>
            prev +
            "\n📚 Dicas de programação:\n" +
            allSuggestions.join("\n") +
            "\n"
        );
      }

      setOutput((prev) => prev + "\n✨ Execução Lua concluída!");
    } else {
      const formattedError = LuaExecutionService.formatError(
        result.error || "Erro desconhecido"
      );
      setOutput((prev) => prev + formattedError);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro na comunicação";
    const formattedError = LuaExecutionService.formatError(
      `Erro de conexão: ${errorMessage}`
    );
    setOutput((prev) => prev + formattedError);
  }
}
