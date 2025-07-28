interface PythonExecutionResult {
  output: string;
  error?: string;
  success: boolean;
}

interface ExecutePythonRequest {
  code: string;
}

export class PythonExecutionService {
  private static readonly API_ENDPOINT = "/api/v1/execute-python";
  private static readonly TIMEOUT_MS = 10000; // 10 segundos

  /**
   * Executa código Python de forma segura através da API
   * @param code - Código Python para executar
   * @returns Resultado da execução
   */
  static async executeCode(code: string): Promise<PythonExecutionResult> {
    try {
      // Validações básicas no cliente
      if (!code || !code.trim()) {
        return {
          output: "",
          error: "❌ Código vazio. Digite algum código Python para executar!",
          success: false,
        };
      }

      if (code.length > 10000) {
        return {
          output: "",
          error: "❌ Código muito longo (máximo 10.000 caracteres)",
          success: false,
        };
      }

      // Criar um AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const request: ExecutePythonRequest = { code };

      const response = await fetch(this.API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          output: "",
          error: errorData.error || `❌ Erro HTTP: ${response.status}`,
          success: false,
        };
      }

      const result: PythonExecutionResult = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            output: "",
            error:
              "⏰ Tempo limite excedido (10 segundos). Verifique se há loops infinitos!",
            success: false,
          };
        }

        return {
          output: "",
          error: `❌ Erro de conexão: ${error.message}`,
          success: false,
        };
      }

      return {
        output: "",
        error: "❌ Erro desconhecido na execução",
        success: false,
      };
    }
  }

  /**
   * Formata a saída para melhor visualização
   * @param output - Saída bruta da execução
   * @returns Saída formatada
   */
  static formatOutput(output: string): string {
    if (!output) return "";

    // Adicionar timestamp
    const timestamp = new Date().toLocaleTimeString("pt-BR");
    let formattedOutput = `🕒 Executado às ${timestamp}\n\n`;

    // Adicionar o output com formatação
    formattedOutput += output;

    // Adicionar linha separadora se não terminar com quebra de linha
    if (!output.endsWith("\n")) {
      formattedOutput += "\n";
    }

    formattedOutput += "\n" + "─".repeat(50) + "\n";

    return formattedOutput;
  }

  /**
   * Formata mensagens de erro
   * @param error - Mensagem de erro
   * @returns Erro formatado
   */
  static formatError(error: string): string {
    const timestamp = new Date().toLocaleTimeString("pt-BR");
    return `🕒 Erro às ${timestamp}\n\n${error}\n\n${"─".repeat(50)}\n`;
  }

  /**
   * Verifica se o código contém práticas recomendadas para iniciantes
   * @param code - Código Python
   * @returns Dicas e sugestões
   */
  static analyzePythonCode(code: string): string[] {
    const suggestions: string[] = [];

    // Verificar se usa comentários
    if (!code.includes("#")) {
      suggestions.push(
        "💡 Dica: Use comentários (#) para explicar seu código!"
      );
    }

    // Verificar se usa print para debug
    if (code.includes("print(") && code.split("print(").length > 2) {
      suggestions.push(
        "🔍 Ótimo! Você está usando print() para ver os resultados!"
      );
    }

    // Verificar se usa funções
    if (code.includes("def ")) {
      suggestions.push(
        "🎯 Excelente! Você está organizando o código em funções!"
      );
    }

    // Verificar se usa estruturas de controle
    if (
      code.includes("if ") ||
      code.includes("for ") ||
      code.includes("while ")
    ) {
      suggestions.push(
        "🎮 Muito bem! Você está usando estruturas de controle!"
      );
    }

    return suggestions;
  }
}
