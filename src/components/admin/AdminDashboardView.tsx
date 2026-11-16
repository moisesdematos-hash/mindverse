import React, { useState } from 'react';
import { 
  Activity, 
  Database, 
  ShieldCheck, 
  Coins, 
  Clock, 
  Zap, 
  Users2, 
  Server, 
  Terminal, 
  Download, 
  Trash2, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  BarChart3, 
  Layers
} from 'lucide-react';

interface AuditLogEvent {
  id: string;
  timestamp: string;
  type: 'security' | 'rag' | 'council' | 'system' | 'quota';
  severity: 'info' | 'warning' | 'success' | 'alert';
  message: string;
  metadata?: string;
}

export const AdminDashboardView: React.FC = () => {
  // State
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'realtime'>('24h');
  const [logFilter, setLogFilter] = useState<string>('all');
  const [searchLog, setSearchLog] = useState<string>('');
  const [isPurgingCache, setIsPurgingCache] = useState(false);
  const [cachePurgedNotification, setCachePurgedNotification] = useState<string | null>(null);
  const [simulatedStressActive, setSimulatedStressActive] = useState(false);

  // Gateway providers state
  const [gateways] = useState([
    { id: 'groq', name: 'Groq LPUs (Llama 3.3 70B)', latency: '18ms', throughput: '860 tok/s', status: 'optimal', uptime: '99.99%', load: '38%' },
    { id: 'anthropic', name: 'Anthropic (Claude 3.5 Sonnet)', latency: '320ms', throughput: '110 tok/s', status: 'standby', uptime: '99.98%', load: '14%' },
    { id: 'gemini', name: 'Google DeepMind (Gemini 1.5 Pro)', latency: '190ms', throughput: '240 tok/s', status: 'optimal', uptime: '100%', load: '22%' },
    { id: 'embeddings', name: 'OpenAI (text-embedding-3-small 1536d)', latency: '14ms', throughput: '1.4k req/s', status: 'optimal', uptime: '99.99%', load: '45%' }
  ]);

  // Mock live audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>([
    {
      id: 'log-1',
      timestamp: '03:14:22',
      type: 'rag',
      severity: 'info',
      message: 'Busca vetorial HNSW executada: 5 chunks canónicos recuperados com cosine_sim > 0.892',
      metadata: 'Autor: Aristóteles (Bekker 1106a) • Latência: 11ms'
    },
    {
      id: 'log-2',
      timestamp: '03:12:45',
      type: 'security',
      severity: 'success',
      message: 'Blindagem de Identidade Inviolável confirmada: Bloqueada tentativa de contaminação de persona',
      metadata: 'Tentativa de cruzar voz de Sócrates com Einstein neutralizada no prompt assembler'
    },
    {
      id: 'log-3',
      timestamp: '03:08:11',
      type: 'council',
      severity: 'info',
      message: 'Deliberação do Ágora concluída: Síntese executiva consensual gerada em 3 rondas dialéticas',
      metadata: 'Participantes: Marco Aurélio, Sun Tzu, Churchill • Tokens: 3.420'
    },
    {
      id: 'log-4',
      timestamp: '03:01:50',
      type: 'system',
      severity: 'success',
      message: 'Cache semântico de embeddings atualizado e sincronizado com índice pgvector no Supabase',
      metadata: 'Total chunks canónicos validados: 14.820 em 47 mentes'
    },
    {
      id: 'log-5',
      timestamp: '02:54:19',
      type: 'quota',
      severity: 'warning',
      message: 'Alerta preventivo de consumo de tokens: Sessão atingiu 75% da quota diária',
      metadata: 'Perfil: carlosf4 • Quota consumida: 37.500 / 50.000 tkn'
    },
    {
      id: 'log-6',
      timestamp: '02:41:03',
      type: 'security',
      severity: 'info',
      message: 'Row-Level Security (RLS) verificado: Isolamento de tabelas por user_id confirmado 100%',
      metadata: 'Nenhuma chave de provedor exposta ao cliente web'
    }
  ]);

  const handlePurgeCache = () => {
    setIsPurgingCache(true);
    setTimeout(() => {
      setIsPurgingCache(false);
      setCachePurgedNotification('Cache semântico purgado com sucesso. Índice pgvector reinicializado.');
      setTimeout(() => setCachePurgedNotification(null), 4000);
    }, 1200);
  };

  const handleSimulateStress = () => {
    setSimulatedStressActive(true);
    setTimeout(() => {
      setSimulatedStressActive(false);
      const newLog: AuditLogEvent = {
        id: `stress-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'system',
        severity: 'success',
        message: 'Teste de stress do Gateway concluído: 500 requisições simultâneas absorvidas sem degradação',
        metadata: 'Latência média p95 mantida em 38ms • 0 erros 5xx'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }, 2000);
  };

  const handleExportAudit = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mindverse-audit-report-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Top personalities leaderboard
  const topPersonalitiesLeaderboard = [
    { name: 'Aristóteles', queries: 3420, share: '18.4%', era: 'Grécia Clássica', ep: '99.4%' },
    { name: 'Nikola Tesla', queries: 2890, share: '15.6%', era: 'Idade Industrial', ep: '98.9%' },
    { name: 'Albert Einstein', queries: 2410, share: '13.0%', era: 'Física Moderna', ep: '99.1%' },
    { name: 'Marco Aurélio', queries: 2150, share: '11.6%', era: 'Império Romano', ep: '99.8%' },
    { name: 'Marie Curie', queries: 1840, share: '9.9%', era: 'Química & Física', ep: '99.6%' },
    { name: 'Sir Winston Churchill', queries: 1610, share: '8.7%', era: 'Segunda Guerra', ep: '98.5%' },
    { name: 'Ada Lovelace', queries: 1420, share: '7.6%', era: 'Computação Poética', ep: '99.2%' },
    { name: 'Sun Tzu', queries: 1320, share: '7.1%', era: 'China Antiga', ep: '99.5%' },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesFilter = logFilter === 'all' || log.type === logFilter;
    const matchesSearch = log.message.toLowerCase().includes(searchLog.toLowerCase()) || 
                          (log.metadata && log.metadata.toLowerCase().includes(searchLog.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* 1. TOP HEADER & TELEMETRY CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-mindverse-graphite/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-mindverse-midnight border border-mindverse-gold-subtle/30 text-mindverse-gold-subtle shadow-gold-glow">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-mindverse-softwhite flex items-center gap-2">
                Painel de Telemetria & Administração
              </h1>
              <div className="flex items-center gap-3 text-xs font-mono text-mindverse-muted mt-0.5">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Cluster pgvector Ativo (1536d)
                </span>
                <span>•</span>
                <span>Latência média: 14ms</span>
                <span>•</span>
                <span>Panteão: 47 Mentes Indexadas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons & Time Selector */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Time Filter Buttons */}
          <div className="flex items-center p-1 rounded-xl bg-mindverse-midnight border border-mindverse-graphite text-xs font-mono">
            {(['24h', '7d', '30d', 'realtime'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === r 
                    ? 'bg-mindverse-gold-subtle text-mindverse-void font-bold shadow-gold-glow' 
                    : 'text-mindverse-muted hover:text-mindverse-softwhite'
                }`}
              >
                {r === '24h' ? '24h' : r === '7d' ? '7 dias' : r === '30d' ? '30 dias' : 'Ao Vivo'}
              </button>
            ))}
          </div>

          {/* Purge Cache Button */}
          <button
            onClick={handlePurgeCache}
            disabled={isPurgingCache}
            className="px-3.5 py-2 rounded-xl bg-mindverse-midnight hover:bg-mindverse-graphite border border-mindverse-graphite hover:border-mindverse-gold-subtle/40 text-xs font-mono text-mindverse-muted hover:text-mindverse-softwhite transition-all flex items-center gap-1.5"
            title="Limpar memória cache e resincronizar embeddings"
          >
            <Trash2 className={`w-3.5 h-3.5 ${isPurgingCache ? 'animate-spin text-mindverse-gold-subtle' : ''}`} />
            <span>{isPurgingCache ? 'Purgando...' : 'Purgar Cache'}</span>
          </button>

          {/* Stress Test Trigger */}
          <button
            onClick={handleSimulateStress}
            disabled={simulatedStressActive}
            className="px-3.5 py-2 rounded-xl bg-mindverse-midnight hover:bg-mindverse-graphite border border-mindverse-cyan-glow/40 hover:border-mindverse-cyan-glow text-xs font-mono text-mindverse-cyan-glow transition-all flex items-center gap-1.5"
            title="Executar simulação de 500 requisições concorrentes"
          >
            <Zap className={`w-3.5 h-3.5 ${simulatedStressActive ? 'animate-bounce text-mindverse-gold-light' : ''}`} />
            <span>{simulatedStressActive ? 'Testando...' : 'Teste de Carga'}</span>
          </button>

          {/* Export Report */}
          <button
            onClick={handleExportAudit}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-mindverse-gold-subtle to-mindverse-gold-accent hover:from-mindverse-gold-light hover:to-mindverse-gold-subtle text-mindverse-void text-xs font-mono font-bold transition-all shadow-gold-glow flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Relatório</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {cachePurgedNotification && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{cachePurgedNotification}</span>
        </div>
      )}

      {/* 2. SIX MASTER KPI TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Tokens */}
        <div className="p-4 rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
          <div className="flex items-center justify-between text-mindverse-muted">
            <span className="text-[11px] font-mono uppercase tracking-wider">Tokens Totais</span>
            <Coins className="w-4 h-4 text-mindverse-gold-subtle" />
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-black text-mindverse-softwhite">842.610</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>+14.2% vs ontem</span>
            </div>
          </div>
          <p className="text-[10px] text-mindverse-muted font-mono pt-1 border-t border-mindverse-graphite/40">
            Custo: $11.84 USD
          </p>
        </div>

        {/* KPI 2: Latência RAG */}
        <div className="p-4 rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
          <div className="flex items-center justify-between text-mindverse-muted">
            <span className="text-[11px] font-mono uppercase tracking-wider">Latência p95</span>
            <Clock className="w-4 h-4 text-mindverse-cyan-glow" />
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-black text-mindverse-cyan-glow">34ms</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>p50: 12ms | p99: 78ms</span>
            </div>
          </div>
          <p className="text-[10px] text-mindverse-muted font-mono pt-1 border-t border-mindverse-graphite/40">
            HNSW Índice Híbrido
          </p>
        </div>

        {/* KPI 3: Cache Hit Ratio */}
        <div className="p-4 rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
          <div className="flex items-center justify-between text-mindverse-muted">
            <span className="text-[11px] font-mono uppercase tracking-wider">Cache Hit Ratio</span>
            <Zap className="w-4 h-4 text-amber-300" />
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-black text-amber-300">94.8%</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>Economia: $42.10/mês</span>
            </div>
          </div>
          <p className="text-[10px] text-mindverse-muted font-mono pt-1 border-t border-mindverse-graphite/40">
            Semântico pgvector
          </p>
        </div>

        {/* KPI 4: Sessões Históricas */}
        <div className="p-4 rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
          <div className="flex items-center justify-between text-mindverse-muted">
            <span className="text-[11px] font-mono uppercase tracking-wider">Diálogos Hoje</span>
            <Users2 className="w-4 h-4 text-mindverse-gold-light" />
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-black text-mindverse-softwhite">1.284</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-mindverse-gold-accent">
              <span>Pico: 42 simultâneas</span>
            </div>
          </div>
          <p className="text-[10px] text-mindverse-muted font-mono pt-1 border-t border-mindverse-graphite/40">
            Tempo médio: 4m 18s
          </p>
        </div>

        {/* KPI 5: Chunks Vetorizados */}
        <div className="p-4 rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
          <div className="flex items-center justify-between text-mindverse-muted">
            <span className="text-[11px] font-mono uppercase tracking-wider">Vetores 1536d</span>
            <Database className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-black text-purple-300">14.820</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <span>100% integridade</span>
            </div>
          </div>
          <p className="text-[10px] text-mindverse-muted font-mono pt-1 border-t border-mindverse-graphite/40">
            47 Mentes Canónicas
          </p>
        </div>

        {/* KPI 6: Blindagem de Identidade */}
        <div className="p-4 rounded-2xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
          <div className="flex items-center justify-between text-mindverse-muted">
            <span className="text-[11px] font-mono uppercase tracking-wider">Blindagem Persona</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-black text-emerald-400">100%</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <span>24 cruzamentos barrados</span>
            </div>
          </div>
          <p className="text-[10px] text-mindverse-muted font-mono pt-1 border-t border-mindverse-graphite/40">
            Anti-Alucinação Ativa
          </p>
        </div>
      </div>

      {/* 3. ROW 2: EPISTEMIC DISTRIBUTION & MULTI-MODEL GATEWAY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Epistemic Breakdown */}
        <div className="p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-mindverse-softwhite flex items-center gap-2">
                <Layers className="w-5 h-5 text-mindverse-gold-subtle" />
                Auditoria do Triplo Estatuto Epistémico
              </h3>
              <p className="text-xs text-mindverse-muted">
                Classificação em tempo real da fundamentação de cada resposta gerada pelo motor.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              99.98% Rigor
            </span>
          </div>

          <div className="space-y-4">
            {/* Facto Documentado */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  [FACTO DOCUMENTADO] — Citações Textuais Canónicas
                </span>
                <span className="text-mindverse-softwhite font-bold">44.5% (375k tokens)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-mindverse-deep overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: '44.5%' }} />
              </div>
            </div>

            {/* Interpretação Histórica */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-mindverse-gold-accent font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-mindverse-gold-subtle inline-block" />
                  [INTERPRETAÇÃO FUNDAMENTADA] — Axiomas Coerentes
                </span>
                <span className="text-mindverse-softwhite font-bold">36.8% (310k tokens)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-mindverse-deep overflow-hidden">
                <div className="h-full bg-mindverse-gold-subtle rounded-full transition-all duration-500" style={{ width: '36.8%' }} />
              </div>
            </div>

            {/* Simulação Hipotética */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-mindverse-cyan-glow font-semibold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-mindverse-cyan-glow inline-block" />
                  [SIMULAÇÃO HIPOTÉTICA] — Desafios Modernos / Contrafactuais
                </span>
                <span className="text-mindverse-softwhite font-bold">18.7% (157k tokens)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-mindverse-deep overflow-hidden">
                <div className="h-full bg-mindverse-cyan-glow rounded-full transition-all duration-500" style={{ width: '18.7%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite/60 text-xs text-mindverse-muted leading-relaxed flex items-center gap-3 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Nenhuma inferência sem taxonomia epistémica auditada é entregue ao utilizador final.</span>
          </div>
        </div>

        {/* Multi-Model Gateway Status */}
        <div className="p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-mindverse-softwhite flex items-center gap-2">
                <Server className="w-5 h-5 text-mindverse-cyan-glow" />
                Saúde dos Fornecedores (AI Gateway)
              </h3>
              <p className="text-xs text-mindverse-muted">
                Orquestração adaptativa com failover automático e balanceamento dinâmico de carga.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-mindverse-cyan-glow/10 text-mindverse-cyan-glow border border-mindverse-cyan-glow/30">
              Gateway Ativo
            </span>
          </div>

          <div className="space-y-3">
            {gateways.map((g) => (
              <div key={g.id} className="p-3 rounded-2xl bg-mindverse-deep/70 border border-mindverse-graphite/60 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-mindverse-softwhite font-mono">{g.name}</span>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-mindverse-muted">
                    <span>Latência: {g.latency}</span>
                    <span>•</span>
                    <span>Vazão: {g.throughput}</span>
                    <span>•</span>
                    <span>Uptime: {g.uptime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                    {g.status}
                  </span>
                  <span className="text-xs font-mono text-mindverse-muted font-bold">{g.load}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ROW 3: ENGAGEMENT LEADERBOARD & LIVE AUDIT STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard das Mentes Mais Consultadas */}
        <div className="lg:col-span-1 p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-mindverse-softwhite flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-mindverse-gold-subtle" />
              Mentes Mais Consultadas
            </h3>
            <span className="text-[10px] font-mono text-mindverse-muted">Top 8 / 47</span>
          </div>

          <div className="space-y-2.5">
            {topPersonalitiesLeaderboard.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl bg-mindverse-deep/60 border border-mindverse-graphite/50 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 text-center font-mono text-[11px] text-mindverse-gold-accent font-bold">
                    #{idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-mindverse-softwhite">{item.name}</span>
                    <p className="text-[10px] font-mono text-mindverse-muted">{item.era}</p>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-mindverse-gold-light font-bold">{item.queries}</span>
                  <p className="text-[10px] text-emerald-400">{item.ep} fid.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Security & System Audit Stream */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-mindverse-midnight/60 border border-mindverse-graphite space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-mindverse-graphite/60 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-mindverse-cyan-glow" />
                <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                  Stream de Auditoria e Eventos em Tempo Real
                </h3>
              </div>

              {/* Log Category Filter */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                {['all', 'security', 'rag', 'council', 'quota'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setLogFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg uppercase text-[10px] transition-all ${
                      logFilter === filter 
                        ? 'bg-mindverse-gold-subtle text-mindverse-void font-bold' 
                        : 'bg-mindverse-deep text-mindverse-muted hover:text-mindverse-softwhite'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Log Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-mindverse-muted" />
              <input 
                type="text"
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Filtrar eventos por mensagem ou metadado..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-mindverse-deep border border-mindverse-graphite text-xs text-mindverse-softwhite placeholder-mindverse-muted outline-none focus:border-mindverse-gold-subtle"
              />
            </div>
          </div>

          {/* Audit Events List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredLogs.map((log) => (
              <div 
                key={log.id}
                className="p-3 rounded-xl bg-mindverse-void/80 border border-mindverse-graphite/60 text-xs font-mono space-y-1 hover:border-mindverse-graphite transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-mindverse-muted">{log.timestamp}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${
                      log.type === 'security' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30' :
                      log.type === 'rag' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30' :
                      log.type === 'council' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
                      'bg-mindverse-cyan-glow/10 text-mindverse-cyan-glow border border-mindverse-cyan-glow/30'
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  <span className={`text-[10px] ${
                    log.severity === 'success' ? 'text-emerald-400' :
                    log.severity === 'warning' ? 'text-amber-400' :
                    log.severity === 'alert' ? 'text-rose-400' : 'text-mindverse-muted'
                  }`}>
                    ● {log.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-mindverse-softwhite leading-relaxed text-[11px] font-sans">
                  {log.message}
                </p>
                {log.metadata && (
                  <p className="text-[10px] text-mindverse-muted/90 pt-0.5">
                    ↳ {log.metadata}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10px] font-mono text-mindverse-muted flex items-center justify-between border-t border-mindverse-graphite/40">
            <span>Buffer circular: últimos 250 eventos retidos em memória</span>
            <span className="text-emerald-400 font-bold">100% integridade RLS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
