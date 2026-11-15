-- ==============================================================================
-- MINDVERSE — MIGRAÇÃO INICIAL DDL (20261115000001_initial_schema.sql)
-- ==============================================================================

-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. TABELA: PROFILES (Perfis de Utilizador e Controlo de Quotas)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT NOT NULL,
    avatar_url TEXT,
    subscription_tier TEXT NOT NULL DEFAULT 'seeker' CHECK (subscription_tier IN ('seeker', 'scholar', 'institution')),
    daily_token_quota INTEGER NOT NULL DEFAULT 50000,
    tokens_used_today INTEGER NOT NULL DEFAULT 0,
    last_token_reset_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    concurrent_requests_active INTEGER NOT NULL DEFAULT 0,
    max_concurrent_requests INTEGER NOT NULL DEFAULT 2,
    preferences JSONB NOT NULL DEFAULT '{"locale": "pt", "theme": "dark", "socratic_intensity": "balanced"}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. TABELA: PERSONALITIES (Catálogo e DNA Intelectual das Personas Históricas)
CREATE TABLE public.personalities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    title_epithet TEXT NOT NULL,
    historical_era TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'physics_and_science',
        'invention_and_universal_genius',
        'electrical_engineering',
        'classical_philosophy',
        'stoic_philosophy',
        'military_strategy',
        'political_economy',
        'management_science',
        'radioactivity_and_chemistry',
        'ancient_history_and_judaica'
    )),
    short_bio TEXT NOT NULL,
    core_worldview TEXT NOT NULL,
    prompt_system_template TEXT NOT NULL,
    historical_context_notes TEXT NOT NULL, -- Contexto crítico, perspetivas e limitações historiográficas
    avatar_url TEXT,
    quote_featured TEXT NOT NULL,
    born_year INTEGER,
    death_year INTEGER,
    native_language TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. TABELA: PERSONALITY_CORPORA (Obras e Documentos Canónicos)
CREATE TABLE public.personality_corpora (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    personality_id UUID NOT NULL REFERENCES public.personalities(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year_published INTEGER,
    original_language TEXT NOT NULL DEFAULT 'en',
    provenance TEXT NOT NULL, -- ex: "Project Gutenberg #1234", "Perseus Digital Library", "Académie des Sciences"
    source_url TEXT,
    license_status TEXT NOT NULL DEFAULT 'public_domain' CHECK (license_status IN ('public_domain', 'open_access', 'proprietary_permission')),
    verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('verified', 'scholarly_consensus', 'pending_review')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. TABELA: CORPUS_CHUNKS (Fragmentos e Embeddings Vetoriais com Versionamento)
CREATE TABLE public.corpus_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    corpus_id UUID NOT NULL REFERENCES public.personality_corpora(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    token_count INTEGER NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb, -- { "chapter": "...", "section": "...", "page": 12 }
    epistemic_type TEXT NOT NULL DEFAULT 'primary_source' CHECK (epistemic_type IN ('primary_source', 'historical_account', 'scholarly_commentary')),
    embedding VECTOR(1536), -- Dimensão oficial OpenAI text-embedding-3-small
    embedding_model TEXT NOT NULL DEFAULT 'text-embedding-3-small',
    embedding_version TEXT NOT NULL DEFAULT 'v1',
    embedding_dimension INTEGER NOT NULL DEFAULT 1536 CHECK (embedding_dimension = 1536),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Índice HNSW de alta performance para busca semântica
CREATE INDEX idx_corpus_chunks_embedding_hnsw ON public.corpus_chunks
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE INDEX idx_corpus_chunks_corpus_id ON public.corpus_chunks(corpus_id);
CREATE INDEX idx_corpus_chunks_model_version ON public.corpus_chunks(embedding_model, embedding_version);

-- 6. TABELA: CONVERSATIONS (Sessões Dialógicas)
CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Novo Diálogo',
    mode TEXT NOT NULL CHECK (mode IN ('solo', 'debate', 'inquiry')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_conversations_user ON public.conversations(user_id, updated_at DESC);

-- 7. TABELA: CONVERSATION_PARTICIPANTS
CREATE TABLE public.conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    personality_id UUID NOT NULL REFERENCES public.personalities(id) ON DELETE CASCADE,
    role_in_session TEXT NOT NULL DEFAULT 'debater' CHECK (role_in_session IN ('primary', 'debater', 'moderator', 'critic')),
    order_index INTEGER NOT NULL DEFAULT 0,
    UNIQUE (conversation_id, personality_id)
);

-- 8. TABELA: MESSAGES (Histórico com Rastreabilidade Epistémica)
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_personality_id UUID REFERENCES public.personalities(id) ON DELETE SET NULL, -- NULL se for o utilizador
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    epistemic_status TEXT NOT NULL DEFAULT 'documented_fact' CHECK (epistemic_status IN ('documented_fact', 'historical_interpretation', 'hypothetical_simulation')),
    tokens_used INTEGER NOT NULL DEFAULT 0,
    model_used TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_messages_conversation_date ON public.messages(conversation_id, created_at ASC);

-- 9. TABELA: MESSAGE_CITATIONS (Rastreabilidade das Fontes Originais)
CREATE TABLE public.message_citations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    chunk_id UUID NOT NULL REFERENCES public.corpus_chunks(id) ON DELETE CASCADE,
    similarity_score DOUBLE PRECISION NOT NULL,
    quote_snippet TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. TABELA: DEBATE_SESSIONS (Sessões do Conselho das Grandes Mentes)
CREATE TABLE public.debate_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL UNIQUE REFERENCES public.conversations(id) ON DELETE CASCADE,
    debate_motion TEXT NOT NULL,
    max_rounds INTEGER NOT NULL DEFAULT 3,
    current_round INTEGER NOT NULL DEFAULT 1,
    turn_order UUID[] NOT NULL,
    consensus_summary TEXT,
    divergence_points TEXT,
    deliberation_log JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. TABELA: USAGE_LEDGER (Auditoria Financeira e de Consumo de IA)
CREATE TABLE public.usage_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL CHECK (request_type IN ('chat_solo', 'debate_turn', 'embedding', 'synthesis')),
    model_name TEXT NOT NULL,
    prompt_tokens INTEGER NOT NULL,
    completion_tokens INTEGER NOT NULL,
    estimated_cost_usd NUMERIC(10, 6) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_usage_ledger_user_date ON public.usage_ledger(user_id, created_at DESC);

-- ==============================================================================
-- FUNÇÕES RPC SEGURAS (PostgreSQL)
-- ==============================================================================

-- 12. RPC: Busca de Similaridade Vetorial com Validação de Modelo e Dimensão
CREATE OR REPLACE FUNCTION match_personality_chunks(
    p_personality_id UUID,
    p_query_embedding VECTOR(1536),
    p_match_threshold DOUBLE PRECISION,
    p_match_count INTEGER,
    p_expected_model TEXT DEFAULT 'text-embedding-3-small'
)
RETURNS TABLE (
    id UUID,
    corpus_id UUID,
    content TEXT,
    metadata JSONB,
    epistemic_type TEXT,
    similarity DOUBLE PRECISION
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.corpus_id,
        c.content,
        c.metadata,
        c.epistemic_type,
        1 - (c.embedding <=> p_query_embedding) AS similarity
    FROM public.corpus_chunks c
    INNER JOIN public.personality_corpora corp ON c.corpus_id = corp.id
    WHERE corp.personality_id = p_personality_id
      AND c.embedding_model = p_expected_model
      AND c.embedding_dimension = 1536
      AND 1 - (c.embedding <=> p_query_embedding) >= p_match_threshold
    ORDER BY c.embedding <=> p_query_embedding
    LIMIT p_match_count;
END;
$$;

-- 13. RPC: Verificação e Dedução Atómica de Quota (Previne Condições de Corrida)
CREATE OR REPLACE FUNCTION atomic_reserve_tokens(
    p_user_id UUID,
    p_estimated_tokens INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_quota INTEGER;
    v_used INTEGER;
    v_reset_at TIMESTAMPTZ;
    v_now TIMESTAMPTZ := timezone('utc'::text, now());
    v_concurrent INTEGER;
    v_max_concurrent INTEGER;
BEGIN
    -- Bloqueio exclusivo de linha (FOR UPDATE) para proteger contra concorrência
    SELECT 
        daily_token_quota, 
        tokens_used_today, 
        last_token_reset_at,
        concurrent_requests_active,
        max_concurrent_requests
    INTO 
        v_quota, 
        v_used, 
        v_reset_at,
        v_concurrent,
        v_max_concurrent
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;

    -- Reset da quota diária se tiver decorrido mais de 24 horas
    IF v_now >= v_reset_at + INTERVAL '24 hours' THEN
        v_used := 0;
        v_reset_at := v_now;
    END IF;

    -- Validar se excede pedidos concorrentes simultâneos
    IF v_concurrent >= v_max_concurrent THEN
        RETURN FALSE;
    END IF;

    -- Validar se ultrapassa o teto diário
    IF (v_used + p_estimated_tokens) > v_quota THEN
        RETURN FALSE;
    END IF;

    -- Atualizar perfil atomicamente
    UPDATE public.profiles
    SET 
        tokens_used_today = v_used + p_estimated_tokens,
        last_token_reset_at = v_reset_at,
        concurrent_requests_active = v_concurrent + 1,
        updated_at = v_now
    WHERE id = p_user_id;

    RETURN TRUE;
END;
$$;

-- 14. RPC: Libertação de Bloqueio Concorrente
CREATE OR REPLACE FUNCTION atomic_release_concurrent_lock(
    p_user_id UUID,
    p_actual_tokens_diff INTEGER DEFAULT 0
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.profiles
    SET 
        concurrent_requests_active = GREATEST(0, concurrent_requests_active - 1),
        tokens_used_today = GREATEST(0, tokens_used_today + p_actual_tokens_diff),
        updated_at = timezone('utc'::text, now())
    WHERE id = p_user_id;
END;
$$;

-- ==============================================================================
-- POLÍTICAS ROW-LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personality_corpora ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corpus_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debate_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_ledger ENABLE ROW LEVEL SECURITY;

-- Catálogo de Conhecimento: Leitura Pública
CREATE POLICY "Catálogo de personalidades público" ON public.personalities
    FOR SELECT USING (is_active = true);

CREATE POLICY "Corpora histórico público" ON public.personality_corpora
    FOR SELECT USING (true);

CREATE POLICY "Chunks de conhecimento públicos" ON public.corpus_chunks
    FOR SELECT USING (true);

-- Dados Privados: Isolados por UID do Utilizador
CREATE POLICY "Utilizador acede ao seu perfil" ON public.profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Utilizador acede apenas às suas conversas" ON public.conversations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Utilizador acede aos participantes das suas conversas" ON public.conversation_participants
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = conversation_participants.conversation_id 
              AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Utilizador acede às mensagens das suas conversas" ON public.messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = messages.conversation_id 
              AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Utilizador acede às citações das suas conversas" ON public.message_citations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.messages m
            INNER JOIN public.conversations c ON m.conversation_id = c.id
            WHERE m.id = message_citations.message_id 
              AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Utilizador acede aos seus debates" ON public.debate_sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = debate_sessions.conversation_id 
              AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Utilizador consulta o seu registo de custos" ON public.usage_ledger
    FOR SELECT USING (auth.uid() = user_id);
