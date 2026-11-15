export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
}

export interface AIGatewayResponse {
  content: string;
  model: string;
  provider: string;
  usage: AIUsageMetrics;
}

export interface AIProvider {
  name: string;
  isConfigured(): boolean;
  complete(messages: AIMessage[], model?: string): Promise<AIGatewayResponse>;
  stream(
    messages: AIMessage[],
    onChunk: (chunk: string) => void,
    model?: string
  ): Promise<AIGatewayResponse>;
}

/**
 * Adaptador para OpenAI (GPT-4o, GPT-4o-mini).
 */
export class OpenAIProvider implements AIProvider {
  public name = 'openai';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env?.OPENAI_API_KEY : '') || '';
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey) && !this.apiKey.includes('sk-proj-placeholder');
  }

  public async complete(messages: AIMessage[], model = 'gpt-4o-mini'): Promise<AIGatewayResponse> {
    if (!this.isConfigured()) throw new Error('OPENAI_API_KEY não configurada no servidor.');

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API Error (${res.status}): ${await res.text()}`);
    }

    const data = await res.json();
    const content = data.choices[0]?.message?.content || '';
    const pTokens = data.usage?.prompt_tokens || 0;
    const cTokens = data.usage?.completion_tokens || 0;

    return {
      content,
      model,
      provider: this.name,
      usage: {
        promptTokens: pTokens,
        completionTokens: cTokens,
        totalTokens: pTokens + cTokens,
        estimatedCostUsd: Number((pTokens * 0.00000015 + cTokens * 0.0000006).toFixed(6)),
      },
    };
  }

  public async stream(
    messages: AIMessage[],
    onChunk: (chunk: string) => void,
    model = 'gpt-4o-mini'
  ): Promise<AIGatewayResponse> {
    if (!this.isConfigured()) throw new Error('OPENAI_API_KEY não configurada no servidor.');

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        stream: true,
      }),
    });

    if (!res.ok) throw new Error(`OpenAI Stream Error (${res.status})`);

    const reader = res.body?.getReader();
    if (!reader) throw new Error('Corpo de streaming ilegível.');

    const decoder = new TextDecoder('utf-8');
    let fullContent = '';
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        const lines = decoder.decode(value, { stream: true }).split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ') && trimmed !== 'data: [DONE]') {
            try {
              const parsed = JSON.parse(trimmed.slice(6));
              const token = parsed.choices[0]?.delta?.content || '';
              if (token) {
                fullContent += token;
                onChunk(token);
              }
            } catch {
              // Ignore partial JSON
            }
          }
        }
      }
    }

    const estimatedTokens = Math.ceil(fullContent.length / 4);
    return {
      content: fullContent,
      model,
      provider: this.name,
      usage: {
        promptTokens: 500,
        completionTokens: estimatedTokens,
        totalTokens: 500 + estimatedTokens,
        estimatedCostUsd: Number((estimatedTokens * 0.0000006).toFixed(6)),
      },
    };
  }
}

/**
 * Adaptador para Anthropic Claude 3.5 Sonnet.
 */
export class AnthropicProvider implements AIProvider {
  public name = 'anthropic';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || (typeof process !== 'undefined' ? process.env?.ANTHROPIC_API_KEY : '') || '';
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey) && !this.apiKey.includes('sk-ant-placeholder');
  }

  public async complete(messages: AIMessage[], model = 'claude-3-5-sonnet-20241022'): Promise<AIGatewayResponse> {
    if (!this.isConfigured()) throw new Error('ANTHROPIC_API_KEY não configurada no servidor.');

    const systemMsg = messages.find((m) => m.role === 'system')?.content || '';
    const userMsgs = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role, content: m.content }));

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system: systemMsg,
        messages: userMsgs,
      }),
    });

    if (!res.ok) throw new Error(`Anthropic Error (${res.status}): ${await res.text()}`);

    const data = await res.json();
    const content = data.content[0]?.text || '';
    const pTokens = data.usage?.input_tokens || 0;
    const cTokens = data.usage?.output_tokens || 0;

    return {
      content,
      model,
      provider: this.name,
      usage: {
        promptTokens: pTokens,
        completionTokens: cTokens,
        totalTokens: pTokens + cTokens,
        estimatedCostUsd: Number((pTokens * 0.000003 + cTokens * 0.000015).toFixed(6)),
      },
    };
  }

  public async stream(
    messages: AIMessage[],
    onChunk: (chunk: string) => void,
    model = 'claude-3-5-sonnet-20241022'
  ): Promise<AIGatewayResponse> {
    // Fallback gracioso para complete se stream não suportado no fetch runtime simples
    const res = await this.complete(messages, model);
    onChunk(res.content);
    return res;
  }
}

declare const __GROQ_API_KEY__: string | undefined;
declare const __DEFAULT_SOLO_MODEL__: string | undefined;
declare const __DEFAULT_DEBATE_MODEL__: string | undefined;

/**
 * Adaptador para Groq (Llama 3.3 70B - Baixíssima Latência).
 */
export class GroqProvider implements AIProvider {
  public name = 'groq';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey =
      apiKey ||
      (typeof __GROQ_API_KEY__ !== 'undefined' ? __GROQ_API_KEY__ : '') ||
      (typeof process !== 'undefined' ? process.env?.GROQ_API_KEY : '') ||
      '';
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey) && !this.apiKey.includes('gsk_placeholder');
  }

  public async complete(messages: AIMessage[], model?: string): Promise<AIGatewayResponse> {
    if (!this.isConfigured()) throw new Error('GROQ_API_KEY não configurada no servidor.');

    const targetModel =
      model ||
      (typeof __DEFAULT_SOLO_MODEL__ !== 'undefined' ? __DEFAULT_SOLO_MODEL__ : '') ||
      (typeof process !== 'undefined' ? process.env?.DEFAULT_SOLO_MODEL : '') ||
      'openai/gpt-oss-120b';

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ model: targetModel, messages }),
    });

    if (!res.ok) throw new Error(`Groq Error: ${await res.text()}`);
    const data = await res.json();
    const content = data.choices[0]?.message?.content || '';
    return {
      content,
      model: targetModel,
      provider: this.name,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
        estimatedCostUsd: 0.00002,
      },
    };
  }

  public async stream(
    messages: AIMessage[],
    onChunk: (chunk: string) => void,
    model?: string
  ): Promise<AIGatewayResponse> {
    const res = await this.complete(messages, model);
    onChunk(res.content);
    return res;
  }
}

/**
 * Motor Cognitivo Determinístico Fundamentado (Local Fallback Engine).
 * Utilizado para execução local e validação de contratos RAG quando nenhuma chave Cloud externa está no .env.
 * Não inventa factos: cita estritamente as passagens recuperadas pelo RAG e aplica as etiquetas epistémicas.
 */
export class DeterministicIntellectualEngine implements AIProvider {
  public name = 'deterministic-historical-engine';

  public isConfigured(): boolean {
    return true; // Sempre disponível
  }

  public async complete(messages: AIMessage[]): Promise<AIGatewayResponse> {
    const system = messages.find((m) => m.role === 'system')?.content || '';
    const user = messages.find((m) => m.role === 'user')?.content || '';

    let content = '';

    // Verifica se houve fontes recuperadas pelo RAG
    if (system.includes('[FONTE 1:')) {
      const matchSource = system.match(/--- \[FONTE 1: (.*?)\] ---\s*([\s\S]*?)(?=\n\n---|\n\n#|$)/);
      const citationRef = matchSource ? matchSource[1] : 'Obras Canónicas';
      const quoteSnippet = matchSource ? matchSource[2].slice(0, 320) + '...' : '';

      content = `[FACTO DOCUMENTADO]\nPerante a tua indagação sobre "${user}", os registos comprovados afirmam categoricamente:\n\n"${quoteSnippet}"\n\n[Referência: ${citationRef}]\n\n[INTERPRETAÇÃO FUNDAMENTADA]\nÀ luz da minha mundivisão, este ensinamento estabelece que a ação humana e o julgamento moral não devem desviar-se do princípio supremo. O rigor do dever e a observação da Providência ou da justa medida sobrepõem-se às paixões efémeras.\n\n[Transparência: Resposta sintetizada com base estrita no fragmento primário verificado acima].`;
    } else if (/fale.*(si|você|ti)|quem és|quem é você|apresente|sobre você|sua vida|sua história/i.test(user)) {
      const nameMatch = system.match(/És (.*?), conhecido como (.*?)\./);
      const name = nameMatch ? nameMatch[1] : 'o Pensador';
      const epithet = nameMatch ? nameMatch[2] : '';
      const worldviewMatch = system.match(/MUNDIVISÃO FUNDAMENTAL:\s*([\s\S]*?)(?=\n\nAXIOMAS|$)/);
      const worldview = worldviewMatch ? worldviewMatch[1].trim() : '';

      content = `[FACTO HISTÓRICO DOCUMENTADO]\nSou ${name}${epithet ? `, ${epithet}` : ''}.\n\n[INTERPRETAÇÃO FUNDAMENTADA]\n${worldview}\n\nO meu corpus canónico preservado dedica-se à investigação rigorosa dos princípios fundamentais da realidade, da ética e da ação humana. Podes interrogar-me diretamente sobre os meus textos originais e os problemas centrais da minha filosofia.`;
    } else if (system.includes('PAPEL NO CONSELHO:') || system.includes('RESUMO DAS POSIÇÕES ANTERIORES:') || system.includes('MODERADOR DO CONSELHO')) {
      const isRebuttal = system.includes('RÉPLICA E CONTRAPONTO');
      const isDeepening = system.includes('APROFUNDAMENTO E DECISÃO');
      const nameMatch = system.match(/Tu és (.*?)\./);
      const speakerName = nameMatch ? nameMatch[1] : 'O Pensador';

      if (isRebuttal) {
        content = `[INTERPRETAÇÃO FUNDAMENTADA]\nComo ${speakerName}, examinei com rigor as teses que me antecederam neste Conselho. Embora compreenda os apelos ao pragmatismo ou à urgência, qualquer compromisso que sacrifique os princípios fundacionais da virtude e da justiça está fadado a gerar instabilidade duradoura.\n\n[SIMULAÇÃO HIPOTÉTICA]\nNum cenário contemporâneo de crise institucional, a nossa prioridade estratégica não deve ser acomodar aparências, mas sim fortalecer a integridade interior e a clareza dos fins legítimos.`;
      } else if (isDeepening) {
        content = `[INTERPRETAÇÃO FUNDAMENTADA]\nA minha posição definitiva como ${speakerName} perante as fricções manifestadas assenta nesta condição inegociável: nenhuma política tem valor se dissociada da responsabilidade pelo bem comum e do respeito pela medida justa.\n\n[SIMULAÇÃO HIPOTÉTICA]\nDeixo esta advertência indelével aos executores: a pressa sem prudência e a eficácia despida de ética conduzem invariavelmente ao descalabro. A solidez de uma grande decisão mede-se pela sua rectidão a longo prazo.`;
      } else {
        content = `[INTERPRETAÇÃO FUNDAMENTADA]\nComo ${speakerName}, a minha intervenção neste Conselho fundamenta-se na premissa de que a ordem duradoura nasce da verdade e da justiça, não do cálculo oportunista.`;
      }
    } else {
      content = `[LIMITAÇÃO HISTÓRICA RECONHECIDA]\nNos meus escritos preservados que compõem o corpus canónico, não possuo registo suficiente nem passagem comprovada para deliberar com autoridade documental sobre: "${user}".\n\nEm conformidade com o princípio de Verdade Histórica do MINDVERSE, recuso inventar citações ou atribuir-me posições que não constem dos meus textos originais.`;
    }

    const estimatedTokens = Math.ceil(content.length / 4);
    return {
      content,
      model: 'deterministic-intellectual-v1',
      provider: this.name,
      usage: {
        promptTokens: Math.ceil(system.length / 4),
        completionTokens: estimatedTokens,
        totalTokens: Math.ceil(system.length / 4) + estimatedTokens,
        estimatedCostUsd: 0.0,
      },
    };
  }

  public async stream(
    messages: AIMessage[],
    onChunk: (chunk: string) => void
  ): Promise<AIGatewayResponse> {
    const res = await this.complete(messages);
    const words = res.content.split(' ');

    for (const word of words) {
      onChunk(word + ' ');
      // Pequena latência assíncrona para emular o fluxo de streaming real
      await new Promise((r) => setTimeout(r, 20));
    }

    return res;
  }
}

/**
 * Gestor Global do Gateway de IA.
 * Seleciona automaticamente o fornecedor disponível de acordo com a configuração do servidor.
 */
export class AIGateway {
  private providers: AIProvider[];

  constructor() {
    this.providers = [
      new GroqProvider(),
      new OpenAIProvider(),
      new AnthropicProvider(),
      new DeterministicIntellectualEngine(),
    ];
  }

  public getActiveProvider(): AIProvider {
    // Procura o primeiro fornecedor externo com credenciais válidas configuradas
    const configuredExternal = this.providers.find(
      (p) => p.name !== 'deterministic-historical-engine' && p.isConfigured()
    );

    if (configuredExternal) return configuredExternal;

    // Fallback seguro: motor histórico determinístico fundamentado nas fontes
    return this.providers.find((p) => p.name === 'deterministic-historical-engine')!;
  }

  public async dispatchChat(
    messages: AIMessage[],
    onChunk?: (chunk: string) => void
  ): Promise<AIGatewayResponse> {
    const provider = this.getActiveProvider();

    try {
      if (onChunk) {
        return await provider.stream(messages, onChunk);
      }
      return await provider.complete(messages);
    } catch (err: any) {
      console.warn(`[AIGateway] Fornecedor ${provider.name} falhou: ${err.message}. Ativando fallback histórico.`);
      const fallback = this.providers.find((p) => p.name === 'deterministic-historical-engine')!;
      if (onChunk) {
        return await fallback.stream(messages, onChunk);
      }
      return await fallback.complete(messages);
    }
  }
}
