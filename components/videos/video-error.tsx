"use client"

interface VideoErrorProps {
  error: string;
  onRetryAction: () => void;
}

export function VideoError({ error }: VideoErrorProps) {
  const isQuotaError = error.toLowerCase().includes('cota') || error.toLowerCase().includes('quota');
  
  return (
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-6 rounded-lg mb-6 max-w-2xl mx-auto">
      <div className="text-3xl mb-4 text-center">⚠️</div>
      <h3 className="text-xl font-bold mb-3 text-center">
        {isQuotaError ? 'Erro: Cota da API do YouTube Excedida' : 'Erro ao Carregar Vídeos'}
      </h3>
      <p className="font-medium text-center mb-4">{error}</p>
      {isQuotaError && (
        <p className="mb-4 text-center">
          Isso ocorre quando o limite gratuito de requisições foi atingido. 
          Por favor, tente novamente mais tarde ou contacte o administrador.
        </p>
      )}
    </div>
  );
}
