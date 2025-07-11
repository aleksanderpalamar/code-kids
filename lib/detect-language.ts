const detectLanguage = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('javascript') || t.includes('js')) return "JavaScript";
  if (t.includes('python')) return "Python";
  if (t.includes('html') || t.includes('css')) return "HTML/CSS";
  if (t.includes('lua')) return "Lua";
  return "Geral";
};

export default detectLanguage;