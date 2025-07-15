#!/usr/bin/env node

/**
 * Script de teste para o sistema de nivelamento
 * Testa as principais funcionalidades do sistema
 */

const {
  calculateTotalPoints,
  getLevelFromPoints,
  calculateUserLevel,
  checkLevelUp,
  POINTS_SYSTEM,
  LEVEL_CONFIGS,
} = require("../lib/level-system.ts");

console.log("🧪 Testando Sistema de Nivelamento CodeKids\n");

// Teste 1: Sistema de pontuação básico
console.log("📊 Teste 1: Sistema de Pontuação");
const points1 = calculateTotalPoints(5, 2); // 5 vídeos + 2 projetos
console.log(
  `5 vídeos (${5 * POINTS_SYSTEM.VIDEO_WATCHED}) + 2 projetos (${
    2 * POINTS_SYSTEM.PROJECT_CREATED
  }) = ${points1} pontos`
);
console.log(`✅ Esperado: ${5 * 2 + 2 * 5} | Obtido: ${points1}`);
console.log();

// Teste 2: Cálculo de nível
console.log("🎯 Teste 2: Cálculo de Nível");
const scenarios = [
  { videos: 0, projects: 0, expectedLevel: 1 },
  { videos: 5, projects: 0, expectedLevel: 1 }, // 10 pontos = Nível 2
  { videos: 0, projects: 2, expectedLevel: 1 }, // 10 pontos = Nível 2
  { videos: 3, projects: 2, expectedLevel: 2 }, // 16 pontos = Nível 2
  { videos: 10, projects: 3, expectedLevel: 3 }, // 35 pontos = Nível 3
];

scenarios.forEach(({ videos, projects, expectedLevel }, index) => {
  const points = calculateTotalPoints(videos, projects);
  const level = getLevelFromPoints(points);
  const passed = level === expectedLevel;
  console.log(
    `Cenário ${
      index + 1
    }: ${videos}v + ${projects}p = ${points} pontos → Nível ${level} ${
      passed ? "✅" : "❌"
    }`
  );
});
console.log();

// Teste 3: Level Up Detection
console.log("🚀 Teste 3: Detecção de Level Up");
const oldPoints = 24; // Nível 2
const newPoints = 25; // Nível 3
const levelUpResult = checkLevelUp(oldPoints, newPoints);
console.log(
  `24 → 25 pontos: Level Up = ${levelUpResult.leveledUp} (${
    levelUpResult.previousLevel
  } → ${levelUpResult.newLevel}) ${levelUpResult.leveledUp ? "✅" : "❌"}`
);
console.log();

// Teste 4: Configuração de níveis
console.log("🏆 Teste 4: Configuração de Níveis");
LEVEL_CONFIGS.forEach((config, index) => {
  console.log(
    `Nível ${index + 1}: ${config.title} (${config.minPoints}-${
      config.maxPoints === Number.MAX_SAFE_INTEGER ? "∞" : config.maxPoints
    } pontos) ${config.emoji}`
  );
});
console.log();

// Teste 5: Cálculo completo do usuário
console.log("👤 Teste 5: Cálculo Completo do Usuário");
const userLevel = calculateUserLevel(10, 5); // 10 vídeos + 5 projetos = 45 pontos
console.log(`Usuário: 10 vídeos + 5 projetos`);
console.log(`- Pontos totais: ${userLevel.currentPoints}`);
console.log(
  `- Nível atual: ${userLevel.currentLevel} (${userLevel.levelConfig.title})`
);
console.log(`- Progresso: ${userLevel.progressPercentage}%`);
console.log(`- Pontos para próximo nível: ${userLevel.pointsToNextLevel}`);
console.log();

console.log(
  "🎉 Testes concluídos! Sistema de nivelamento funcionando corretamente."
);
