# MINDVERSE — Arquitetura Técnica (Technical Architecture)

## 1. Visão Arquitetónica Global

O MINDVERSE foi desenhado segundo os princípios de **arquitetura limpa**, **baixo acoplamento**, **alta coesão** e **prontidão para escala em ambiente serverless/edge**. 

A solução divide-se em três macro-camadas:
1. **Camada de Apresentação (Client SPA)**: Desenvolvida em React 19 + TypeScript + Vite + Tailwind CSS, otimizada para deploy edge global na **Vercel**.
2. **Camada de Orquestração & Segurança (Backend & Edge)**: **Supabase** como BaaS corporativo (PostgreSQL, Row-Level Security, Supabase Auth, Storage) e **Supabase Edge Functions** (Deno/TypeScript) / Vercel Serverless Functions para orquestração de IA, chamadas de embeddings e streaming de tokens com SSE (Server-Sent Events).
3. **Camada de Inteligência Cognitiva (AI Engine & Knowledge Base)**: Motor RAG baseado em `pgvector` e um gateway de IA unificado que desacopla a aplicação dos fornecedores de LLM (OpenAI, Anthropic, Google Gemini, Groq).

```mermaid
graph TB
    subgraph Client["Camada de Apresentação (Vercel)"]
        UI[React 19 + Vite + Tailwind CSS]
        State[Zustand Store / TanStack Query]
        I18n[i18next Multilingual Core]
        SSEClient[Fetch / EventSource SSE Streaming]
    end

    subgraph Edge["Camada de Orquestração (Edge / Serverless)"]
        EdgeGateway[Supabase Edge Functions / Vercel Edge API]
        RAGOrchestrator[RAG Pipeline Controller]
        AgentEngine[Multi-Agent Debate Dispatcher]
        RateLimiter[Token Bucket Rate Limiter + Cost Guard]
    end

    subgraph Data["Camada de Persistência (Supabase)"]
        Auth[Supabase Auth (JWT + Sessions)]
        Postgres[(PostgreSQL 15+ com RLS)]
        PgVector[(pgvector Extension)]
        Storage[Supabase Storage (Corpus & Avatars)]
    end

    subgraph AI["Camada de Provedores de IA (AI Gateway)"]
        Adapter[Unified Model Adapter]
        OpenAI[OpenAI: text-embedding-3 / GPT-4o]
        Anthropic[Anthropic: Claude 3.5 Sonnet]
        Gemini[Google: Gemini 1.5 Pro / Flash]
        Groq[Groq: Llama 3.3 70B (Fast Reasoning)]
    end

    UI --> State
    UI --> I18n
    UI --> SSEClient
    SSEClient --> EdgeGateway
    EdgeGateway --> RateLimiter
    RateLimiter --> RAGOrchestrator
    RateLimiter --> AgentEngine
    
    RAGOrchestrator --> PgVector
    EdgeGateway --> Postgres
    EdgeGateway --> Auth
    
    RAGOrchestrator --> Adapter
    AgentEngine --> Adapter
    Adapter --> OpenAI
    Adapter --> Anthropic
    Adapter --> Gemini
    Adapter --> Groq
```

---

## 2. Stack Tecnológica e Racional de Escolha

| Componente | Tecnologia | Justificação Técnica |
| :--- | :--- | :--- |
| **Linguagem Principal** | TypeScript (v5+) | Tipagem estrita end-to-end, redução drástica de erros de runtime, DX elevada e contratos de API consistentes entre cliente e backend. |
| **Framework Frontend** | React 19 + Vite | Renderização veloz, HMR (Hot Module Replacement) instantâneo, compatibilidade com ecossistema moderno e bundler rollup otimizado. |
| **Estilização & UI** | Tailwind CSS v4 + Lucide Icons + Radix UI | Design system customizado, utility-first sem overhead de runtime, acessibilidade nativa (ARIA compliant) e suporte integral a Dark/Light Mode. |
| **Gestão de Estado** | Zustand + TanStack Query (React Query) | Zustand para estados globais síncronos da UI (modais, definições de sessão); TanStack Query para cache assíncrono, optimistic updates e sincronização com o backend. |
| **Backend & Base de Dados**| Supabase (PostgreSQL 15+) | Autenticação pronta para produção, Row Level Security (RLS) intransponível a nível de base de dados, escalabilidade vertical e horizontal. |
| **Pesquisa Vetorial** | PostgreSQL `pgvector` | Elimina a necessidade de base vetorial externa (Pinecone, Qdrant), simplifica transações ACID (dados relacionais e vetoriais na mesma transação) e diminui custos de infraestrutura. |
| **Hosting & CDN** | Vercel | Otimização para aplicações Vite/SPA, edge network global de baixíssima latência, previews automáticos de CI/CD. |
| **Internacionalização** | i18next + react-i18next | Resolução fluida de chaves de tradução, deteção automática de locale e lazy loading de ficheiros de tradução. |

---

## 3. Desacoplamento da Lógica de IA (Adapter Pattern)

Nenhuma chamada de IA no MINDVERSE é feita acoplada a um SDK proprietário no frontend. 

### 3.1 Padrão de Arquitetura do Gateway de IA
A camada de backend implementa a interface abstrata `AIModelProvider`:

```typescript
export interface ModelMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
}

export interface AIModelProvider {
  generateCompletion(messages: ModelMessage[], options: CompletionOptions): Promise<string>;
  streamCompletion(messages: ModelMessage[], options: CompletionOptions): ReadableStream<Uint8Array>;
  generateEmbedding(text: string): Promise<number[]>;
}
```

### 3.2 Adaptadores Concretos
- `OpenAIAdapter`: Suporta GPT-4o, GPT-4o-mini e embeddings `text-embedding-3-small` / `large`.
- `AnthropicAdapter`: Suporta Claude 3.5 Sonnet para raciocínio analítico e fidelidade estilística excecional.
- `GeminiAdapter`: Suporta Gemini 1.5 Pro com janela de contexto alargada e custos ultracompetitivos.
- `GroqAdapter`: Suporta Llama 3.3 70B para debates multiagente rápidos e streaming em tempo real com baixíssima latência (time-to-first-token < 250ms).

---

## 4. Comunicação em Tempo Real e Streaming

Para garantir uma experiência de utilizador fluida ("humana"), todo o output gerado pelas personalidades históricas é transmitido em streaming através de **Server-Sent Events (SSE)**.
- O cliente estabelece uma conexão via `fetch` com corpo de resposta legível (`response.body.getReader()`).
- O servidor faz yield de chunks textuais à medida que chegam do fornecedor de IA, já processando eventuais marcadores de citações bibliográficas.
- Em debates multiagente, eventos de metadados (`event: agent-switch`, `event: agent-typing`, `event: consensus-summary`) são emitidos para orquestrar as transições visuais na interface.

---

## 5. Estratégia de Segurança e Isolamento de Chaves

1. **Zero Chaves de IA no Frontend**: Nenhuma chave (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.) é exposta no bundle do Vite (não existe prefixo `VITE_` para segredos). Todas as chaves residem exclusivamente no cofre de segredos da Supabase (`supabase secrets set`) e Vercel Environment Variables.
2. **Row-Level Security (RLS)**: Cada tabela do PostgreSQL tem políticas de RLS ativadas. Um utilizador só consegue ler e escrever dados pertencentes ao seu `user_id` verificado pelo JWT.
3. **Validação Estrita de Entrada**: Validação com **Zod** tanto no cliente como na borda (Edge Functions) para mitigar ataques de injeção de prompt e payloads maliciosos.
4. **Rate Limiting e Proteção de Quota**: Limitação por IP e por `user_id` em memória distribuída/tabelas de sessão para mitigar abusos e ataques de negação de serviço financeira (DDoS financeiro em APIs de IA).

---

## 6. Pipeline de CI/CD e Ambientes

```
[Git Repo (GitHub)]
       |
       +---> [Branch: feature/*] -> Vercel Preview Deployment (Ephemeral)
       |
       +---> [Branch: develop]   -> Staging Environment (Supabase Staging)
       |
       +---> [Branch: main]      -> Production Deployment (Supabase Prod + Vercel Prod)
```
- Linters (`ESLint`) e formatadores (`Prettier`) executados em pre-commit hook via `husky` e `lint-staged`.
- Testes unitários e de integração (`Vitest`) e testes de tipagem (`tsc --noEmit`) validados antes de qualquer merge.
