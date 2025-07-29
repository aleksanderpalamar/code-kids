# Requisitos do Projeto Code-Kids

## 1. Visão Geral

O projeto "code-kids" é uma plataforma educacional interativa projetada para que crianças e jovens aprendam programação de forma prática e divertida. O objetivo é facilitar o acesso à educação em programação, tornando-a envolvente e adaptada para o público infantil.

## 2. Requisitos Funcionais (RF)

| ID       | Requisito                         | Descrição                                                                                                                                                                      |
| :------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RF01** | Módulo de Ensino por Vídeo        | A plataforma deve permitir que os usuários assistam a vídeos educacionais de programação. Os vídeos serão integrados a partir da API do YouTube.                               |
| **RF02** | Filtro de Vídeos                  | Os usuários devem poder filtrar os vídeos por categoria, dificuldade ou tecnologia (ex: JavaScript, Python, Lua).                                                              |
| **RF03** | Ambiente de Desenvolvimento (IDE) | A plataforma deve fornecer um IDE online onde os usuários possam escrever, testar e executar códigos em diferentes linguagens.                                                 |
| **RF04** | Suporte a Múltiplas Linguagens    | O IDE deve suportar a execução de código nas linguagens JavaScript, Python e Lua.                                                                                              |
| **RF05** | Gestão de Projetos                | Os usuários devem poder criar, salvar e gerenciar seus projetos de programação pessoais.                                                                                       |
| **RF06** | Sistema de Gamificação            | A plataforma deve incluir um sistema de níveis que recompensa os usuários com pontos e avanços de nível com base em suas atividades (ex: assistir vídeos, completar projetos). |
| **RF07** | Notificações de Progresso         | O sistema deve notificar os usuários visualmente quando eles sobem de nível.                                                                                                   |
| **RF08** | Painel de Estatísticas do Usuário | Deve haver uma área onde o usuário possa ver suas estatísticas, como nível atual, projetos concluídos e vídeos assistidos.                                                     |

## 3. Requisitos Não Funcionais (RNF)

| ID        | Requisito        | Descrição                                                                                                                                                            |
| :-------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF01** | Usabilidade      | A interface deve ser intuitiva, amigável e visualmente atraente para o público infantil. O design deve ser responsivo para se adaptar a diferentes tamanhos de tela. |
| **RNF02** | Desempenho       | As páginas e os recursos da plataforma devem carregar rapidamente. A execução de código no IDE deve ter um tempo de resposta baixo.                                  |
| **RNF03** | Segurança        | A execução de código no IDE deve ser realizada em um ambiente isolado (sandbox) para impedir a execução de códigos maliciosos que possam afetar o servidor.          |
| **RNF04** | Escalabilidade   | A arquitetura deve ser capaz de suportar um aumento no número de usuários, vídeos e projetos sem degradação do desempenho.                                           |
| **RNF05** | Manutenibilidade | O código-fonte deve ser limpo, bem documentado, modular e seguir as convenções de estilo definidas para o projeto (Google TypeScript Style Guide).                   |

## 4. Requisitos Técnicos

| Categoria                   | Tecnologia/Framework                              |
| :-------------------------- | :------------------------------------------------ |
| **Linguagem Principal**     | TypeScript                                        |
| **Framework Principal**     | Next.js (com App Router)                          |
| **Gerenciamento de Estado** | Zustand                                           |
| **Estilização**             | PostCSS / CSS Modules                             |
| **Roteamento de API**       | Next.js API Routes (versionadas em `/api/v1/...`) |
| **Banco de Dados (ORM)**    | Prisma                                            |
| **Gerenciador de Pacotes**  | npm                                               |
| **Integrações**             | API do YouTube                                    |
