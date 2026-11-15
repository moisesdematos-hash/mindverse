# MINDVERSE

> **Plataforma SaaS Global de Inteligência Humana Aumentada por IA**  
> Converse com representações intelectuais de grandes personalidades da história e convoque debates multiagente para resolver dilemas complexos.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38b2ac.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%2B%20pgvector-3ecf8e.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## 🏛️ Sobre o Projeto

O **MINDVERSE** é uma plataforma que transforma o conhecimento e a mundivisão de pensadores, cientistas, estrategas e filósofos históricos em interlocutores dialógicos dinâmicos.

Ao cruzar **modelagem psicológica e intelectual rigorosa**, **RAG (Retrieval-Augmented Generation)** baseado em fontes primárias indexadas no `pgvector` e um **motor de deliberação multiagente**, o MINDVERSE permite:
- **Diálogo Socrático 1:1**: Sessões de aprofundamento dialético com pensadores individuais, com citação de capítulos e obras históricas.
- **O Ágora / Senado Dialético**: Debates multiagente autónomos entre personalidades antagónicas ou complementares (ex.: Aristóteles vs. Nietzsche vs. Ada Lovelace), culminando em sínteses de consenso e divergência.
- **Isolamento de IA Agnóstico**: Camada de adaptação que suporta OpenAI, Anthropic, Google Gemini e Groq sem acoplamento a um único fornecedor.

---

## 📚 Documentação Técnica de Arquitetura

Toda a documentação técnica foi estruturada na pasta [`docs/`](./docs/):

| Documento | Descrição |
| :--- | :--- |
| [**PROJECT_OVERVIEW.md**](./docs/PROJECT_OVERVIEW.md) | Visão executiva, proposta de valor, personas de lançamento e modelo de negócio SaaS. |
| [**TECHNICAL_ARCHITECTURE.md**](./docs/TECHNICAL_ARCHITECTURE.md) | Diagramas de componentes, stack tecnológica, adapter pattern de IA e fluxo de streaming SSE. |
| [**DATABASE_DESIGN.md**](./docs/DATABASE_DESIGN.md) | Esquema relacional PostgreSQL, DDL de tabelas, índices HNSW vetoriais e políticas RLS. |
| [**AI_ARCHITECTURE.md**](./docs/AI_ARCHITECTURE.md) | Engenharia de personas (DNA), pipeline RAG, orquestrador de debate do Ágora e controlo de custos. |
| [**DEVELOPMENT_ROADMAP.md**](./docs/DEVELOPMENT_ROADMAP.md) | Fases de desenvolvimento, marcos, entregáveis e critérios de aceitação. |
| [**QUALITY_STANDARDS.md**](./docs/QUALITY_STANDARDS.md) | Padrões de testes, tipagem, segurança de prompts, acessibilidade e performance. |

---

## 🛠️ Stack Tecnológica

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Radix UI.
- **Estado & Dados**: Zustand (estado de UI), TanStack Query (cache e sync assíncrono).
- **Backend & Base de Dados**: Supabase (PostgreSQL 15+, `pgvector`, Row-Level Security, Supabase Auth, Storage).
- **Internacionalização**: 4 idiomas de interface nativos (Português, Inglês, Francês, Espanhol).
- **Cohort Genesis (11 Personalidades Canónicas)**: Albert Einstein, Leonardo da Vinci, Nikola Tesla, Aristóteles, Sócrates, Marco Aurélio, Sun Tzu, Adam Smith, Peter Drucker, Marie Curie e Flávio Josefo (*Flavius Josephus*).
- **Orquestração de IA**: Supabase Edge Functions (Deno) / Vercel Edge Functions com streaming via Server-Sent Events (SSE).
- **Provedores de IA**: Adaptador agnóstico suportando Anthropic Claude 3.5, OpenAI GPT-4o, Google Gemini 1.5/2.0 e Groq Llama 3.3.
- **Deploy & Infraestrutura**: Vercel (Frontend & Edge CDN) + Supabase Cloud.

---

## 🚀 Como Começar

### Pré-requisitos
- **Node.js**: `v20+` (Recomendado `v22.17.0` ou superior).
- **npm**: `v10+`.
- **Git** instalado.
- Conta e projeto ativo no [Supabase](https://supabase.com).

### Instalação e Configuração

1. Clone o repositório ou navegue até à pasta:
   ```bash
   cd MINDVERSE
   ```

2. Duplique o ficheiro de variáveis de ambiente e preencha as credenciais:
   ```bash
   cp .env.example .env
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🔒 Princípios de Segurança e Governação

- **Zero Chaves de IA no Cliente**: O frontend não possui nem armazena segredos de fornecedores de IA. Todas as invocações passam pela camada de orquestração segura.
- **Row-Level Security (RLS)**: Cada utilizador só tem acesso estrito às suas próprias conversas, histórico e quotas.
- **Guardrails Financeiros**: Limites diários de tokens e controle por tier de subscrição para mitigar custos inesperados.

---

## 📄 Licença

Proprietário. Todos os direitos reservados — MINDVERSE Inc.
