const detectDifficulty = (title: string): "Iniciante" | "Intermediário" | "Avançado" => {
  const t = title.toLowerCase();
  if (t.includes('avançado') || t.includes('expert') || t.includes('profissional')) return "Avançado";
  if (t.includes('intermediário') || t.includes('médio')) return "Intermediário";
  return "Iniciante";
};

export default detectDifficulty;