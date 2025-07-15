import { NextRequest, NextResponse } from "next/server";

interface PythonExecutionRequest {
  code: string;
}

interface PythonExecutionResponse {
  output: string;
  error?: string;
  success: boolean;
}

// Lista de módulos permitidos para segurança
const ALLOWED_IMPORTS = [
  "math",
  "random",
  "datetime",
  "json",
  "statistics",
  "collections",
  "itertools",
  "functools",
  "operator",
  "string",
  "re",
  "os.path",
  "sys",
];

// Palavras-chave perigosas que devem ser bloqueadas
const DANGEROUS_KEYWORDS = [
  "import os",
  "import subprocess",
  "import sys",
  "exec(",
  "eval(",
  "__import__",
  "open(",
  "file(",
  "input(",
  "raw_input(",
  "compile(",
  "globals(",
  "locals(",
  "vars(",
  "dir(",
  "getattr(",
  "setattr(",
  "delattr(",
  "hasattr(",
  "exit(",
  "quit(",
  "reload(",
  "help(",
];

function sanitizeCode(code: string): { isValid: boolean; error?: string } {
  // Verificar palavras-chave perigosas
  for (const keyword of DANGEROUS_KEYWORDS) {
    if (code.toLowerCase().includes(keyword.toLowerCase())) {
      return {
        isValid: false,
        error: `❌ Comando não permitido por segurança: ${keyword}`,
      };
    }
  }

  // Verificar imports permitidos
  const importRegex =
    /import\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const moduleName = match[1];
    if (!ALLOWED_IMPORTS.includes(moduleName)) {
      return {
        isValid: false,
        error: `❌ Módulo não permitido por segurança: ${moduleName}`,
      };
    }
  }

  return { isValid: true };
}

async function executePythonCode(
  code: string
): Promise<PythonExecutionResponse> {
  try {
    // Validar código por segurança
    const validation = sanitizeCode(code);
    if (!validation.isValid) {
      return {
        output: "",
        error: validation.error,
        success: false,
      };
    }

    // Simular execução de Python (substituir por execução real em produção)
    // Em produção, você usaria um container Docker ou serviço especializado
    const simulatedOutput = await simulatePythonExecution(code);

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

async function simulatePythonExecution(code: string): Promise<string> {
  // Esta é uma simulação básica para demonstração
  // Em produção, você executaria o código Python real em um ambiente seguro

  let output = "";
  const lines = code.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("print(")) {
      // Simular print statements
      const match = trimmedLine.match(/print\((.*)\)/);
      if (match) {
        const content = match[1];
        // Remover aspas se for string literal
        const cleanContent = content.replace(/^["']|["']$/g, "");
        output += cleanContent + "\n";
      }
    } else if (trimmedLine.includes("=") && !trimmedLine.startsWith("#")) {
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
    } else if (trimmedLine.startsWith("def ")) {
      // Simular definição de função
      const funcName = trimmedLine.match(/def\s+(\w+)/)?.[1];
      output += `📝 Função definida: ${funcName}\n`;
    }
  }

  if (!output) {
    output = "✅ Código executado com sucesso! (Sem saída de print)\n";
  }

  // Adicionar algumas simulações específicas para código comum
  if (code.includes("random.randint")) {
    output += `🎲 Número aleatório gerado: ${
      Math.floor(Math.random() * 100) + 1
    }\n`;
  }

  if (code.includes("len(")) {
    output += "📏 Comprimento calculado\n";
  }

  return output;
}

export async function POST(request: NextRequest) {
  try {
    const body: PythonExecutionRequest = await request.json();

    if (!body.code || typeof body.code !== "string") {
      return NextResponse.json(
        {
          output: "",
          error: "❌ Código Python inválido ou vazio",
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

    const result = await executePythonCode(body.code);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Python execution error:", error);
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
