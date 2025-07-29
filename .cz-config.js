module.exports = {
  types: [
    { value: "feat", name: "feat: Nova funcionalidade" },
    { value: "fix", name: "fix: Correção de bug" },
    { value: "docs", name: "docs: Apenas documentação" },
    {
      value: "style",
      name: "style: Formatação (espaço, ponto e vírgula, etc)",
    },
    {
      value: "refactor",
      name: "refactor: Refatoração sem mudança de funcionalidade",
    },
    { value: "perf", name: "perf: Melhorias de performance" },
    { value: "test", name: "test: Adiciona ou ajusta testes" },
    { value: "chore", name: "chore: Manutenção, build, etc" },
  ],
};
