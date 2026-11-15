// Supabase Edge Function: chat-stream (Deno Runtime)
// Orquestrador Seguro de RAG e Streaming SSE

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { personalityId, query, userId } = await req.json();

    if (!personalityId || !query) {
      return new Response(JSON.stringify({ error: 'Parâmetros personalityId e query são obrigatórios.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Verificação Atómica de Quota Diária (Server-Side)
    if (userId) {
      const { data: hasQuota, error: quotaError } = await supabaseClient.rpc(
        'atomic_reserve_tokens',
        {
          p_user_id: userId,
          p_estimated_tokens: 300,
        }
      );

      if (quotaError || !hasQuota) {
        return new Response(
          JSON.stringify({ error: 'Quota diária de tokens excedida ou limite de concorrência atingido.' }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // 2. Geração de Embedding da Consulta
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    let queryEmbedding: number[] = [];

    if (openaiKey) {
      const embRes = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          input: query,
          model: 'text-embedding-3-small',
          dimensions: 1536,
        }),
      });

      if (embRes.ok) {
        const embData = await embRes.json();
        queryEmbedding = embData.data[0].embedding;
      }
    }

    // 3. Pesquisa RAG Vetorial no PostgreSQL via RPC pgvector
    let retrievedChunks: any[] = [];
    if (queryEmbedding.length === 1536) {
      const { data: matches } = await supabaseClient.rpc('match_personality_chunks', {
        p_personality_id: personalityId,
        p_query_embedding: queryEmbedding,
        p_match_threshold: 0.55,
        p_match_count: 4,
      });
      retrievedChunks = matches || [];
    }

    // 4. Configuração de Resposta com Streaming SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        // Envia metadados de fontes iniciais
        const metadataEvent = `event: metadata\ndata: ${JSON.stringify({
          sourcesCount: retrievedChunks.length,
          hasSufficientDocumentation: retrievedChunks.length > 0,
        })}\n\n`;
        controller.enqueue(encoder.encode(metadataEvent));

        // Envia evento de conclusão
        const doneEvent = `event: done\ndata: [DONE]\n\n`;
        controller.enqueue(encoder.encode(doneEvent));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
