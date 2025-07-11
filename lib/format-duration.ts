const formatDuration = (duration: string): string => {
  // Remove PT do início da string de duração do YouTube
  const time = duration.replace('PT', '');
  
  // Extrair horas, minutos e segundos
  let hours = time.match(/(\d+)H/)?.[1] || '0';
  let minutes = time.match(/(\d+)M/)?.[1] || '0';
  let seconds = time.match(/(\d+)S/)?.[1] || '0';

  // Converter para números
  const h = parseInt(hours);
  const m = parseInt(minutes);
  const s = parseInt(seconds);

  // Formatar a duração
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default formatDuration;