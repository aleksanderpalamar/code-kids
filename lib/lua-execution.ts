interface LuaExecutionResult {
  output: string;
  error?: string;
  success: boolean;
}

interface ExecuteLuaRequest {
  code: string;
}

export class LuaExecutionService {
  private static readonly API_ENDPOINT = "/api/v1/execute-lua";
  private static readonly TIMEOUT_MS = 10000; // 10 segundos

  /**
   * Executa código Lua de forma segura através da API
   * @param code - Código Lua para executar
   * @returns Resultado da execução
   */
  static async executeCode(code: string): Promise<LuaExecutionResult> {
    try {
      // Validações básicas no cliente
      if (!code || !code.trim()) {
        return {
          output: "",
          error: "❌ Código vazio. Digite algum código Lua para executar!",
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

      const request: ExecuteLuaRequest = { code };

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

      const result: LuaExecutionResult = await response.json();
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
   * Verifica se o código contém práticas recomendadas para iniciantes em Lua
   * @param code - Código Lua
   * @returns Dicas e sugestões
   */
  static analyzeLuaCode(code: string): string[] {
    const suggestions: string[] = [];

    // Verificar se usa comentários
    if (!code.includes("--")) {
      suggestions.push(
        "💡 Dica: Use comentários (--) para explicar seu código Lua!"
      );
    }

    // Verificar se usa print para debug
    if (code.includes("print(") && code.split("print(").length > 2) {
      suggestions.push(
        "🔍 Ótimo! Você está usando print() para ver os resultados!"
      );
    }

    // Verificar se usa funções
    if (code.includes("function ")) {
      suggestions.push(
        "🎯 Excelente! Você está organizando o código em funções!"
      );
    }

    // Verificar se usa variáveis locais
    if (code.includes("local ")) {
      suggestions.push(
        "🔒 Muito bem! Você está usando variáveis locais - boa prática!"
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

    // Verificar se usa tabelas (arrays/objetos em Lua)
    if (code.includes("{") && code.includes("}")) {
      suggestions.push(
        "📋 Ótimo! Você está usando tabelas para organizar dados!"
      );
    }

    // Verificar se usa iterators
    if (code.includes("ipairs") || code.includes("pairs")) {
      suggestions.push(
        "🔁 Excelente! Você está usando iteradores para percorrer tabelas!"
      );
    }

    // Verificar se usa módulos da biblioteca padrão
    if (
      code.includes("math.") ||
      code.includes("string.") ||
      code.includes("table.")
    ) {
      suggestions.push(
        "📚 Muito bem! Você está usando funções da biblioteca padrão do Lua!"
      );
    }

    return suggestions;
  }

  /**
   * Converte sintaxe comum de outras linguagens para Lua
   * @param code - Código que pode ter sintaxe mista
   * @returns Código com sugestões de conversão
   */
  static suggestLuaSyntax(code: string): string[] {
    const suggestions: string[] = [];

    // Sugestões de conversão de sintaxe
    if (code.includes("console.log")) {
      suggestions.push("💡 Em Lua, use print() ao invés de console.log()");
    }

    if (code.includes("[]") && !code.includes("{}")) {
      suggestions.push("💡 Em Lua, use {} para criar tabelas (arrays)");
    }

    if (
      code.includes("len(") &&
      !code.includes("string.len") &&
      !code.includes("#")
    ) {
      suggestions.push(
        "💡 Em Lua, use # para obter o tamanho ou string.len() para strings"
      );
    }

    if (code.includes("&&") || code.includes("||")) {
      suggestions.push('💡 Em Lua, use "and" e "or" ao invés de && e ||');
    }

    if (code.includes("!=")) {
      suggestions.push('💡 Em Lua, use ~= ao invés de != para "diferente"');
    }

    return suggestions;
  }
}
