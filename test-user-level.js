/**
 * Script de teste rápido para verificar o sistema de nivelamento
 */

console.log("🧪 Testando Sistema de Nivelamento - Cenário do Usuário");
console.log("Dados: 3 projetos + 6 vídeos = ?");

// Simulando os dados do usuário das imagens
const videosWatched = 6;
const projectsCreated = 3;

// Pontuação: vídeos (2 pts cada) + projetos (5 pts cada)
const POINTS_VIDEO = 2;
const POINTS_PROJECT = 5;

const totalPoints =
  videosWatched * POINTS_VIDEO + projectsCreated * POINTS_PROJECT;
console.log(
  `Cálculo: ${videosWatched} × ${POINTS_VIDEO} + ${projectsCreated} × ${POINTS_PROJECT} = ${totalPoints} pontos`
);

// Níveis configurados:
const levels = [
  { min: 0, max: 9, title: "Iniciante", level: 1 },
  { min: 10, max: 24, title: "Junior", level: 2 },
  { min: 25, max: 49, title: "Intermediário", level: 3 },
  { min: 50, max: 99, title: "Pleno", level: 4 },
  { min: 100, max: 199, title: "Sênior", level: 5 },
  { min: 200, max: 999999, title: "Master", level: 6 },
];

function getLevelFromPoints(points) {
  for (const level of levels) {
    if (points >= level.min && points <= level.max) {
      return level;
    }
  }
  return levels[levels.length - 1];
}

const userLevel = getLevelFromPoints(totalPoints);
console.log(`\n✅ Resultado:`);
console.log(`   Pontos Totais: ${totalPoints}`);
console.log(`   Nível: ${userLevel.level} - ${userLevel.title}`);
console.log(`   Range: ${userLevel.min}-${userLevel.max} pontos`);

console.log(`\n📊 Análise:`);
console.log(
  `   Na página inicial: deveria mostrar "Nível ${userLevel.level}" e "27 Pontos Totais"`
);
console.log(
  `   Na página projetos: badge deveria mostrar "${userLevel.title}"`
);

if (totalPoints === 27 && userLevel.level === 3) {
  console.log(
    `\n🎉 CORRETO! O usuário está no Nível 3 - Intermediário com 27 pontos`
  );
} else {
  console.log(`\n❌ ERRO! Algo está incorreto no cálculo`);
}
