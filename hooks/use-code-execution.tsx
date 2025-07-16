"use client";

import { useIDE } from "@/components/ide/ide-context";
import { useLevelSystem } from "@/hooks/use-level-system";
import { useToast } from "@/hooks/use-toast";
import { PythonExecutionService } from "@/lib/python-execution";
import { LuaExecutionService } from "@/lib/lua-execution";

export function useCodeExecution() {
  const { code, language, setOutput, setIsRunning } = useIDE();
  const { handleSuccessfulExecution } = useLevelSystem();
  const { toast, showSuccessToast, showLevelUpToast, hideToast } = useToast();

  const runCode = async () => {
    setIsRunning(true);
    setOutput("🚀 Executando código...\n");

    try {
      if (language === "python") {
        await executePythonCode();
      } else if (language === "lua") {
        await executeLuaCode();
      } else if (language === "javascript") {
        await executeJavaScriptCode();
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

  const executePythonCode = async () => {
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
          showSuccessToast("Código executado com sucesso! (+10 pontos)");
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
  };

  const executeLuaCode = async () => {
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
          showSuccessToast("Código executado com sucesso! (+10 pontos)");
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
  };

  const executeJavaScriptCode = async () => {
    try {
      // Create a safe console override
      const logs: string[] = [];
      const originalConsole = {
        log: console.log,
        table: console.table,
      };

      // Override console.log
      console.log = (...args) => {
        logs.push(args.map((arg) => String(arg)).join(" "));
      };

      // Override console.table to format arrays/objects nicely
      console.table = (data: any, columns?: string[]) => {
        if (Array.isArray(data)) {
          // Handle 2D arrays (matrices)
          if (Array.isArray(data[0])) {
            let tableOutput = "\n📊 Matriz (formato tabular):\n\n";

            // Calculate column widths
            const maxCols = Math.max(...data.map((row) => row.length));
            const colWidths = Array(maxCols).fill(0);

            // Find max width for each column
            for (let colIndex = 0; colIndex < maxCols; colIndex++) {
              colWidths[colIndex] = Math.max(
                colIndex.toString().length,
                ...data.map((row) =>
                  row[colIndex] !== undefined
                    ? row[colIndex].toString().length
                    : 0
                )
              );
              // Minimum width of 3 characters
              colWidths[colIndex] = Math.max(colWidths[colIndex], 3);
            }

            // Create header with column indices
            let header = "    "; // Row index space
            for (let i = 0; i < maxCols; i++) {
              header += `│ ${i.toString().padStart(colWidths[i], " ")} `;
            }
            header += "│";
            tableOutput += header + "\n";

            // Create separator line
            let separator = "────"; // Row index separator
            for (let i = 0; i < maxCols; i++) {
              separator += `┼${"─".repeat(colWidths[i] + 2)}`;
            }
            separator += "┤";
            tableOutput += separator + "\n";

            // Add rows with data
            data.forEach((row, rowIndex) => {
              let rowOutput = `${rowIndex.toString().padStart(2, " ")} `;
              for (let colIndex = 0; colIndex < maxCols; colIndex++) {
                const value =
                  row[colIndex] !== undefined ? row[colIndex].toString() : "";
                rowOutput += `│ ${value.padStart(colWidths[colIndex], " ")} `;
              }
              rowOutput += "│";
              tableOutput += rowOutput + "\n";
            });

            logs.push(tableOutput);
          } else {
            // Handle 1D arrays
            let tableOutput = "\n📊 Array (formato tabular):\n\n";
            tableOutput +=
              "┌───────┬────────────────────────────────────────┐\n";
            tableOutput +=
              "│ Index │ Value                                  │\n";
            tableOutput +=
              "├───────┼────────────────────────────────────────┤\n";
            data.forEach((item, index) => {
              const value = item.toString().slice(0, 38); // Limit value length
              tableOutput += `│ ${index
                .toString()
                .padStart(5, " ")} │ ${value.padEnd(38, " ")} │\n`;
            });
            tableOutput +=
              "└───────┴────────────────────────────────────────┘\n";
            logs.push(tableOutput);
          }
        } else if (typeof data === "object" && data !== null) {
          // Handle objects
          let tableOutput = "\n📊 Objeto (formato tabular):\n\n";
          tableOutput +=
            "┌─────────────────────┬────────────────────────────────────┐\n";
          tableOutput +=
            "│ Propriedade         │ Valor                              │\n";
          tableOutput +=
            "├─────────────────────┼────────────────────────────────────┤\n";
          Object.entries(data).forEach(([key, value]) => {
            const keyStr = key.slice(0, 19).padEnd(19, " ");
            const valueStr = String(value).slice(0, 34).padEnd(34, " ");
            tableOutput += `│ ${keyStr} │ ${valueStr} │\n`;
          });
          tableOutput +=
            "└─────────────────────┴────────────────────────────────────┘\n";
          logs.push(tableOutput);
        } else {
          // Fallback to regular log
          logs.push(String(data));
        }
      };

      // Execute the code
      console.log("🔍 Executando código JavaScript:", code);
      eval(code);

      console.log("🔍 Chamando handleSuccessfulExecution...");
      // Registrar execução bem-sucedida e verificar level up
      const levelUpResult = handleSuccessfulExecution();
      console.log("🔍 Resultado do level up:", levelUpResult);

      // Restaurar métodos de console
      console.log = originalConsole.log;
      console.table = originalConsole.table;

      // Mostrar toast visual
      if (levelUpResult.leveledUp) {
        showLevelUpToast(levelUpResult.message!);
      } else {
        showSuccessToast("Código executado com sucesso! (+10 pontos)");
      }

      setOutput(
        (prev) => prev + logs.join("\n") + "\n\n✨ Execução concluída!"
      );
    } catch (error) {
      // Restaurar console em caso de erro
      console.log = console.log;
      console.table = console.table;

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setOutput(
        (prev) =>
          prev +
          `\n❌ Erro JavaScript: ${errorMessage}\n\nVerifique seu código e tente novamente! 🤔`
      );
    }
  };

  return { runCode, toast, hideToast };
}
