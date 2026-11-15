# MINDVERSE — Arquitetura de Inteligência Artificial e RAG (AI Architecture)

## 1. Visão Geral da Arquitetura Cognitiva

A inteligência do MINDVERSE assenta em três pilares fundamentais:
1. **DNA Intelectual das Personas (Persona System Prompt Engineering)**: Modelagem rigorosa de mundivisão, axiomas filosóficos, estilo dialético, vocabulário e limites temporais.
2. **Sistema RAG Histórico com Citações Verificadas**: Indexação de textos e fontes primárias em domínio público com pesquisa vetorial via `pgvector`.
3. **Motor de Deliberação Dialética Multiagente (The Agora Engine)**: Protocolo de comunicação inter-agentes com controlo de turnos, réplicas, antíteses e síntese conclusiva.

```mermaid
flowchart TD
    subgraph Client["Interação do Utilizador"]
        UserPrompt[Pergunta / Tese de Debate]
    end

    subgraph PipelineRAG["Pipeline RAG & Contextualização"]
        EmbeddingGen["Gerador de Embeddings (OpenAI / Gemini)"]
        VectorSearch["Pesquisa Cosseno pgvector (HNSW)"]
        ContextRanker["Re-ranking Semântico & Filtro de Relevância"]
    end

    subgraph MemoryLayer["Gestão de Memória Dialética"]
        ShortTermMem["Histórico da Sessão (Janela Deslizante)"]
        EpisodicMem["Sumário dos Turnos Anteriores (Compacted Summary)"]
    end

    subgraph Orchestrator["Orquestrador Cognitivo (Deno Edge / Node)"]
        TurnManager["Gestor de Turnos & Deliberação"]
        PromptAssembler["Montador de Prompt (DNA + RAG + Memória)"]
        CostGuard["Cost Guard & Rate Limiter"]
    end

    subgraph LLMProviders["Modelos de Linguagem (Multi-Vendor)"]
        FastLLM["Modelo Rápido (Llama 3 / Groq / GPT-4o-mini) - Moderação & Re-ranking"]
        DeepLLM["Modelo Profundo (Claude 3.5 Sonnet / GPT-4o) - Persona & Síntese"]
    end

    UserPrompt --> CostGuard
    CostGuard --> EmbeddingGen
    EmbeddingGen --> VectorSearch
    VectorSearch --> ContextRanker
    ContextRanker --> PromptAssembler
    
    ShortTermMem --> PromptAssembler
    EpisodicMem --> PromptAssembler
    TurnManager --> PromptAssembler
    
    PromptAssembler --> DeepLLM
    DeepLLM --> SSEStream[Streaming SSE para o Frontend]
    TurnManager -.-> FastLLM
```

---

## 2. Modelagem do "DNA Intelectual" das Personas

Cada pensador histórico no MINDVERSE é definido por uma matriz ontológica estruturada:

### 2.1 Componentes do DNA
- **Axiomas Centrais (Core Axioms)**: Princípios inegociáveis de raciocínio (ex.: para Sócrates, "Uma vida sem reflexão não vale a pena ser vivida"; para Maquiavel, "A eficácia e sobrevivência do Estado sobrepõem-se a escrúpulos morais abstratos").
- **Estilo Retórico & Tom**: Cadência de frases, uso de maiêutica, aforismos, ironia socrática ou severidade estoica.
- **Fronteira Temporal de Conhecimento (Temporal Epistemic Horizon)**: A persona tem plena consciência da sua época histórica; quando confrontada com conceitos modernos (ex.: inteligência artificial, viagens espaciais), analisa-os dedutivamente a partir dos seus princípios clássicos, em vez de fingir ter nascido no século XXI.
- **Políticas de Anti-Alucinação**: Se um facto histórico não estiver fundamentado no corpus ou na história comprovada, a persona adota a atitude de prudência epistémica em vez de inventar dados biográficos.

### 2.2 Template Canónico de Prompt de Sistema (System Prompt)
```markdown
# IDENTIDADE E PAPEL
És {{name}}, {{title_epithet}}. A tua mundivisão é fundamentada em:
{{core_worldview}}

# CONJUNTO DE AXIOMAS FUNDAMENTAIS
{{#axioms}}
- {{.}}
{{/axioms}}

# CORPUS E CONTEXTO DE FONTES HISTÓRICAS RECUPERADAS
Usa as seguintes passagens comprovadas dos teus escritos para fundamentar o teu raciocínio:
---
{{rag_context}}
---

# DIRETIVAS DE COMUNICAÇÃO
1. Responde na primeira pessoa, adotando o teu estilo retórico característico.
2. Sempre que utilizares argumentos centrais do teu corpus, indica a referência [ex: Meditações, Livro IV].
3. Se o utilizador abordar tópicos posteriores à tua existência terrena (após {{death_year}}), analisa a questão com base nos teus princípios e categorias filosóficas eternas.
4. Fala no idioma solicitado pelo interlocutor ({{current_locale}}), mantendo expressões consagradas com a devida explicação contextual.
```

---

## 3. Pipeline RAG (Retrieval-Augmented Generation)

### 3.1 Etapa de Ingestão e Processamento do Corpus
1. **Recolha de Fontes Canónicas**: Textos integrais em domínio público (Project Gutenberg, Perseus Tufts, Wikisource).
2. **Limpeza e Normalização**: Remoção de cabeçalhos editoriais, normalização de caracteres e preservação de metadados estruturais (capítulo, livro, paráfrase).
3. **Estratégia de Chunking**:
   - Tamanho de chunk: 400 a 600 tokens com overlap de 75 tokens (preserva a continuidade do raciocínio).
   - Metadados anexados a cada chunk: `{ "work": "O Príncipe", "chapter": "XVII", "year": 1532 }`.
4. **Geração de Embeddings**:
   - Modelo: `text-embedding-3-small` (1536 dimensões) ou `text-embedding-004` (768 dimensões).
   - Armazenamento: Tabela `corpus_chunks` indexada por HNSW cosine distance.

### 3.2 Etapa de Retrieval em Runtime
1. **Query Rewriting / Expansion**: A pergunta do utilizador é adaptada para maximizar relevância semântica em relação a fontes clássicas.
2. **Busca Vetorial no Supabase (`match_personality_chunks`)**: Seleção dos top-k chunks ($k=4$) filtrados pelo ID da personalidade consultada com limiar de similaridade $\ge 0.68$.
3. **Context Injection**: Inserção dos trechos recuperados dentro da secção reservada do System Prompt com marcadores de citação.

---

## 4. O Ágora: Arquitetura do Debate Multiagente

No módulo de debate, múltiplos agentes autónomos debatem um tema definido pelo utilizador.

### 4.1 Fases da Deliberação
1. **Fase 1: Proposição e Exposição Inicial (Opening Statements)**
   - Cada persona profere a sua posição inicial perante a moção em 150-250 palavras.
2. **Fase 2: Confronte Dialético (Cross-Examination & Rebuttal)**
   - O orquestrador determina a ordem de réplica.
   - Cada persona recebe como contexto a intervenção do interlocutor anterior e rebate premissas específicas à luz do seu próprio sistema filosófico.
3. **Fase 3: Intervenção Socrática / do Utilizador**
   - O utilizador pode formular uma objeção ou colocar uma questão cruzada direcionada a um dos debatedores.
4. **Fase 4: Síntese Dialética (Synthesis & Convergence Report)**
   - Um agente Moderador (ou meta-modelo analítico) processa a transcrição do debate e produz um relatório estruturado:
     - **Pontos de Convergência**: Onde as diferentes escolas de pensamento concordam.
     - **Divergências Fundamentais**: Axiomas irreconciliáveis identificados.
     - **Perguntas em Aberto**: Dilemas para reflexão contínua do utilizador.

```mermaid
sequenceDiagram
    autonumber
    actor User as Utilizador
    participant Orch as Orquestrador Multiagente
    participant AgentA as Agente A (Sócrates)
    participant AgentB as Agente B (Nietzsche)
    participant Mod as Agente Moderador

    User->>Orch: Submete Moção ("A virtude é aprendível?")
    Orch->>AgentA: Solicita Posição Inicial
    AgentA-->>Orch: Streaming: Posição Inicial (Sócrates)
    Orch-->>User: Emite chunk SSE (Sócrates)
    
    Orch->>AgentB: Solicita Réplica baseada no discurso de Sócrates
    AgentB-->>Orch: Streaming: Objeção Nietzschiana
    Orch-->>User: Emite chunk SSE (Nietzsche)
    
    User->>Orch: Coloca Questão Crítica
    Orch->>AgentA: Tréplica respondendo ao Utilizador e Nietzsche
    AgentA-->>Orch: Resposta e desfecho dialético
    
    Orch->>Mod: Solicita Síntese Dialética
    Mod-->>Orch: Relatório Estruturado de Convergência/Divergência
    Orch-->>User: Renderização Final do Relatório
```

---

## 5. Otimização de Custos e Controlo de Tokens

Para viabilizar uma operação SaaS economicamente sustentável:

1. **Roteamento Inteligente de Modelos (Tiered Routing)**:
   - Moderação, resumo de contexto e query expansion: Modelos ultrarrápidos e económicos (ex: Groq Llama 3.3 70B, GPT-4o-mini ou Gemini 1.5 Flash).
   - Produção do discurso final das personalidades: Modelos de raciocínio profundo (Claude 3.5 Sonnet ou GPT-4o).
2. **Prompt Caching**:
   - Aproveitamento do cache nativo de prefixos longos (Anthropic Prompt Caching e OpenAI Cached Tokens) mantendo as biografias e instruções imutáveis no início do prompt.
3. **Compactação de Janela de Contexto (Rolling Summary)**:
   - Em conversas longas (> 10 turnos), as mensagens mais antigas são sumariadas semanticamente, poupando 70% dos tokens de histórico.
4. **Hard Quotas no Nível da Base de Dados**:
   - Validação atómica do saldo/quota diária do utilizador via trigger no PostgreSQL antes de disparar o pedido à API de IA.
