# Code Kids

Uma plataforma educacional para ensinar programação para crianças de forma divertida e interativa.

## Recursos

- 🎥 Galeria de vídeos educacionais
- 🔍 Busca por linguagem de programação
- 📚 Filtros por dificuldade
- 💻 IDE integrada (em desenvolvimento)
- 🎮 Experiência gamificada

## Configuração

### Variáveis de Ambiente

Para usar a API do YouTube (opcional), crie um arquivo `.env.local` na raiz do projeto:

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=sua_chave_da_api_do_youtube
```

**Nota**: Se as variáveis de ambiente não forem configuradas, a aplicação funcionará normalmente usando vídeos de exemplo.

### Como obter a chave da API do YouTube

1. Acesse o [Google Cloud Console](https://console.developers.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a YouTube Data API v3
4. Crie credenciais (API Key)
5. Copie a chave gerada

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
