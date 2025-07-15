import { NextRequest, NextResponse } from "next/server";

interface LuaExecutionRequest {
  code: string;
}

interface LuaExecutionResponse {
  output: string;
  error?: string;
  success: boolean;
}

// Lista de módulos/funções permitidos para segurança
const ALLOWED_LUA_FUNCTIONS = [
  "print",
  "type",
  "tostring",
  "tonumber",
  "next",
  "pairs",
  "ipairs",
  "table.insert",
  "table.remove",
  "table.concat",
  "table.sort",
  "string.len",
  "string.sub",
  "string.find",
  "string.gsub",
  "string.upper",
  "string.lower",
  "math.abs",
  "math.ceil",
  "math.floor",
  "math.max",
  "math.min",
  "math.random",
  "math.sqrt",
  "os.date",
  "os.time",
];

// Palavras-chave perigosas que devem ser bloqueadas
const DANGEROUS_LUA_KEYWORDS = [
  "os.execute",
  "os.exit",
  "os.remove",
  "os.rename",
  "os.tmpname",
  "io.open",
  "io.read",
  "io.write",
  "io.close",
  "io.input",
  "io.output",
  "loadfile",
  "dofile",
  "require",
  "package",
  "module",
  "debug.",
  "coroutine.",
  "_G",
  "getfenv",
  "setfenv",
  "rawget",
  "rawset",
  "rawequal",
  "rawlen",
];

function sanitizeLuaCode(code: string): { isValid: boolean; error?: string } {
  // Verificar palavras-chave perigosas
  for (const keyword of DANGEROUS_LUA_KEYWORDS) {
    if (code.toLowerCase().includes(keyword.toLowerCase())) {
      return {
        isValid: false,
        error: `❌ Comando não permitido por segurança: ${keyword}`,
      };
    }
  }

  // Verificar se há tentativas de acessar o sistema
  const systemCallRegex = /os\s*\.\s*\w+|io\s*\.\s*\w+|debug\s*\.\s*\w+/gi;
  const matches = code.match(systemCallRegex);
  if (matches) {
    for (const match of matches) {
      const normalizedMatch = match.replace(/\s/g, "");
      if (
        !ALLOWED_LUA_FUNCTIONS.some((allowed) =>
          normalizedMatch.toLowerCase().startsWith(allowed.toLowerCase())
        )
      ) {
        return {
          isValid: false,
          error: `❌ Função não permitida por segurança: ${match}`,
        };
      }
    }
  }

  return { isValid: true };
}

async function executeLuaCode(code: string): Promise<LuaExecutionResponse> {
  try {
    // Validar código por segurança
    const validation = sanitizeLuaCode(code);
    if (!validation.isValid) {
      return {
        output: "",
        error: validation.error,
        success: false,
      };
    }

    // Simular execução de Lua (substituir por execução real em produção)
    const simulatedOutput = await simulateLuaExecution(code);

    return {
      output: simulatedOutput,
      success: true,
    };
  } catch (error) {
    return {
      output: "",
      error: `❌ Erro na execução: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
      success: false,
    };
  }
}

async function simulateLuaExecution(code: string): Promise<string> {
  // Esta é uma simulação básica para demonstração
  // Em produção, você executaria o código Lua real em um ambiente seguro

  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("print(")) {
      // Simular print statements
      const match = trimmedLine.match(/print\((.*)\)/);
      if (match) {
        let content = match[1];
        // Remover aspas se for string literal
        content = content.replace(/^["']|["']$/g, "");
        // Processar concatenação de strings
        content = content.replace(/\.\./g, "");
        output += content + "\n";
      }
    } else if (trimmedLine.includes("=") && !trimmedLine.startsWith("--")) {
      // Simular declarações de variáveis
      output += `💾 Variável definida: ${trimmedLine}\n`;
    } else if (
      trimmedLine.startsWith("for ") ||
      trimmedLine.startsWith("while ")
    ) {
      // Simular loops
      output += `🔄 Loop iniciado: ${trimmedLine}\n`;
    } else if (trimmedLine.startsWith("if ")) {
      // Simular condicionais
      output += `🤔 Condição verificada: ${trimmedLine}\n`;
    } else if (trimmedLine.startsWith("function ")) {
      // Simular definição de função
      const funcName = trimmedLine.match(/function\s+(\w+)/)?.[1];
      output += `📝 Função definida: ${funcName}\n`;
    } else if (trimmedLine.startsWith("local ")) {
      // Simular variáveis locais
      const varName = trimmedLine.match(/local\s+(\w+)/)?.[1];
      output += `🔒 Variável local criada: ${varName}\n`;
    }
  }

  if (!output) {
    output = "✅ Código executado com sucesso! (Sem saída de print)\n";
  }

  // Adicionar algumas simulações específicas para código comum
  if (code.includes("math.random")) {
    output += `🎲 Número aleatório gerado: ${
      Math.floor(Math.random() * 100) + 1
    }\n`;
  }

  if (code.includes("table.insert")) {
    output += "📋 Item adicionado à tabela\n";
  }

  if (code.includes("string.")) {
    output += "🔤 Operação de string executada\n";
  }

  if (code.includes("ipairs") || code.includes("pairs")) {
    output += "🔁 Iteração sobre tabela concluída\n";
  }

  return output;
}

export async function POST(request: NextRequest) {
  try {
    const body: LuaExecutionRequest = await request.json();

    if (!body.code || typeof body.code !== "string") {
      return NextResponse.json(
        {
          output: "",
          error: "❌ Código Lua inválido ou vazio",
          success: false,
        },
        { status: 400 }
      );
    }

    // Limitar tamanho do código para segurança
    if (body.code.length > 10000) {
      return NextResponse.json(
        {
          output: "",
          error: "❌ Código muito longo (máximo 10.000 caracteres)",
          success: false,
        },
        { status: 400 }
      );
    }

    const result = await executeLuaCode(body.code);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Lua execution error:", error);
    return NextResponse.json(
      {
        output: "",
        error: "❌ Erro interno do servidor",
        success: false,
      },
      { status: 500 }
    );
  }
}
