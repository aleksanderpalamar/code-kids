# System Design - Code-Kids

## 1. Visão Geral

O **Code-Kids** é uma plataforma educacional interativa projetada para ensinar programação a crianças e jovens. O sistema oferece um ambiente de desenvolvimento integrado (IDE) online, vídeos educacionais, projetos práticos e funcionalidades de gamificação para tornar o aprendizado acessível e engajador.

A arquitetura é baseada em **Next.js (com App Router)**, utilizando uma abordagem de componentização com React e TypeScript, e um backend integrado através de API Routes para funcionalidades dinâmicas como execução de código e integração com APIs externas.

## 2. Arquitetura do Sistema

A aplicação segue uma arquitetura de cliente-servidor monolítica (Monolithic Frontend) com um backend desacoplado para serviços específicos (Serverless Functions).

### 2.1. Arquitetura Frontend

O frontend é construído com **Next.js** e **React**, o que permite uma renderização híbrida (Server-Side Rendering - SSR e Client-Side Rendering - CSR).

- **Componentização (React):** A interface é dividida em componentes reutilizáveis, localizados em `components/`. A estrutura de componentes é organizada por funcionalidade (e.g., `ide/`, `videos/`, `projects/`) e por elementos de UI genéricos (`ui/`).
- **Roteamento (Next.js App Router):** As rotas da aplicação são definidas pela estrutura de diretórios em `app/`. Cada pasta corresponde a um segmento da URL, e o arquivo `page.tsx` renderiza a UI para aquele segmento.
- **Gerenciamento de Estado (Zustand):** O estado global da aplicação é gerenciado pelo **Zustand**. Os stores são modularizados por domínio (`stores/`), como `projects-store.ts`, `videos-store.ts`, e `user-stats-store.ts`. Essa abordagem mantém o estado desacoplado da UI e facilita a testabilidade.
- **Estilização (PostCSS):** A estilização é feita com CSS padrão e PostCSS, conforme configurado em `postcss.config.mjs` e `globals.css`.

### 2.2. Arquitetura Backend

O backend é implementado utilizando **Next.js API Routes**, que são funções serverless executadas no lado do servidor.

- **Endpoints da API:** Os endpoints estão localizados em `app/api/v1/`. A versão (`v1`) no caminho da URL é uma boa prática para o versionamento da API.
- **Serviço de Execução de Código:**
  - **Endpoints:** `api/v1/execute-python/route.ts` e `api/v1/execute-lua/route.ts`.
  - **Lógica:** Esses endpoints recebem o código do cliente, invocam funções de execução específicas (e.g., `functions/execute-python-code.ts`), e retornam a saída.
  - **Segurança:** A execução de código de terceiros é uma operação de risco. A implementação atual deve garantir um ambiente de **sandboxing** para isolar a execução e prevenir que códigos maliciosos afetem o servidor.
- **Serviço de Integração com o YouTube:**
  - **Endpoint:** `api/v1/youtube/route.ts`.
  - **Lógica:** Atua como um proxy para a API do YouTube. Ele busca dados de vídeos e playlists, centralizando a lógica de acesso e o gerenciamento de chaves de API no backend, evitando expô-las no cliente.

## 3. Gerenciamento de Dados

O sistema lida com diferentes tipos de dados: estado da UI, dados do usuário, conteúdo educacional e cache.

- **Estado do Cliente (Zustand):** O Zustand é a fonte da verdade para o estado da UI e dados em tempo real no cliente.
- **Persistência no Cliente (IndexedDB):** O arquivo `lib/indexeddb.ts` sugere o uso do **IndexedDB** para armazenar dados no navegador do usuário. Isso é ideal para salvar o progresso em projetos, o código no editor ou as estatísticas do usuário de forma offline, melhorando a experiência e a resiliência.
- **Cache de API (Zustand):** O arquivo `lib/fetch-with-zustand-cache.ts` e o store `stores/youtube-cache-store.ts` indicam uma estratégia de cache no cliente para as chamadas à API do YouTube. Isso reduz o número de requisições, melhora a performance e evita atingir os limites de taxa da API.
- **Dados Estáticos:** Informações como listas de canais e playlists do YouTube são mantidas como dados estáticos no diretório `data/`, o que simplifica a configuração inicial.

## 4. Componentes Principais

### 4.1. Plataforma de Vídeos (`app/videos/`)

- **Funcionalidade:** Permite aos usuários assistir a vídeos educacionais de programação.
- **Componentes:** `VideoGrid`, `VideoCard`, `VideoPlayer`, `VideoFilters`.
- **Fluxo de Dados:**
  1. A página busca a lista de vídeos através do hook `use-video-data.tsx`.
  2. O hook utiliza o serviço de integração com o YouTube (`/api/v1/youtube`) para obter os dados.
  3. As interações do usuário (filtros, busca) atualizam o estado no `videos-store.ts`.

### 4.2. IDE Interativa (`app/ide/`)

- **Funcionalidade:** Um ambiente online para escrever e executar código em diferentes linguagens (Python, Lua, JavaScript).
- **Componentes:** `CodeEditor`, `Output`, `Controls`, `Sidebar`.
- **Fluxo de Dados:**
  1. O usuário escreve o código no `CodeEditor`.
  2. Ao clicar em "Executar", o hook `use-code-execution.tsx` envia o código para o endpoint de execução correspondente (e.g., `/api/v1/execute-python`).
  3. O backend executa o código em um ambiente seguro e retorna a saída.
  4. A UI exibe o resultado no componente `Output`.

### 4.3. Projetos (`app/projects/`)

- **Funcionalidade:** Permite que os usuários salvem, gerenciem e retomem seus projetos de código.
- **Componentes:** `ProjectsGrid`, `ProjectCard`, `StatsCards`.
- **Fluxo de Dados:**
  1. Os projetos são gerenciados pelo `use-project-management.tsx`.
  2. Os dados dos projetos (código, nome, linguagem) são persistidos no **IndexedDB** através do `projects-store.ts`.
  3. Isso permite que os projetos do usuário fiquem salvos localmente no navegador.

### 4.4. Sistema de Gamificação

- **Funcionalidade:** Engaja os usuários através de um sistema de níveis e notificações.
- **Componentes:** `LevelUpNotification`, `UserStats`.
- **Lógica:**
  - O hook `use-level-system.tsx` e a lógica em `lib/level-system.tsx` rastreiam as ações do usuário (e.g., completar um projeto, assistir a um vídeo).
  - Com base nessas ações, o `user-stats-store.ts` é atualizado.
  - Ao atingir um novo nível, o `LevelUpNotification` é exibido.

## 5. Princípios de Design e Boas Práticas

- **Separação de Responsabilidades (SoC):**
  - **Hooks (`hooks/`):** Encapsulam a lógica de negócios e interações com o estado.
  - **Componentes (`components/`):** Focados na apresentação (UI).
  - **Stores (`stores/`):** Gerenciam o estado de forma centralizada.
  - **Funções (`functions/`):** Contêm a lógica pura de execução de código, separada da camada de API.
- **API Versionada:** O uso de `/api/v1/` facilita a evolução da API sem quebrar clientes existentes.
- **Design Orientado a Domínios:** A estrutura de pastas e componentes é organizada por funcionalidades de negócio (IDE, Vídeos, Projetos), o que torna o código mais fácil de navegar e manter.
- **Experiência do Usuário (UX):** O sistema investe em UX com features como persistência local (não perde o trabalho), cache (carregamento rápido) e gamificação (engajamento).

## 6. Possíveis Melhorias e Escalabilidade

- **Autenticação de Usuários:** Implementar um sistema de login para que os dados dos usuários possam ser salvos em um banco de dados central e sincronizados entre dispositivos.
- **Banco de Dados Persistente:** Adicionar um banco de dados (e.g., PostgreSQL com Prisma) para armazenar dados de usuários, projetos e progresso de forma robusta no servidor.
- **Sandbox de Execução de Código mais Robusto:** Para um ambiente de produção, utilizar contêineres (e.g., Docker) para cada sessão de execução de código, garantindo total isolamento e segurança.
- **Expansão de Linguagens:** Adicionar suporte a mais linguagens de programação (e.g., JavaScript, HTML/CSS) na IDE.
