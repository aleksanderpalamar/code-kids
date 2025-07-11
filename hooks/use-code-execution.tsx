"use client"

import { useIDE } from "@/components/ide/ide-context";

export function useCodeExecution() {
  const { code, language, setOutput, setIsRunning } = useIDE();

  const runCode = async () => {
    setIsRunning(true);
    setOutput("🚀 Executando código...\n");

    try {
      if (language === "javascript") {
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
        eval(code);

        // Restore console methods
        console.log = originalConsole.log;
        console.table = originalConsole.table;

        setOutput(
          (prev) => prev + logs.join("\n") + "\n\n✨ Execução concluída!"
        );
      } else {
        setOutput(
          (prev) =>
            prev +
            `\n⚠️ Execução de ${language} ainda não implementada na versão web.\nMas seu código está salvo e pronto! 🎉`
        );
      }
    } catch (error) {
      setOutput(
        (prev) =>
          prev + `\n❌ Erro: ${error}\n\nDica: Verifique sua sintaxe! 🤔`
      );
    }

    setIsRunning(false);
  };

  return { runCode };
}
