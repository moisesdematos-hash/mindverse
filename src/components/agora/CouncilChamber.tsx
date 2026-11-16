import React, { useEffect, useState } from 'react';
import { Personality, CouncilSession } from '../../types';
import { councilAudio } from '../../services/councilAudio';
import { VoiceStudioModal } from './VoiceStudioModal';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles, 
  Crown,
  FastForward,
  Sliders,
  Hand,
  Flame,
  X,
  Send,
  Zap
} from 'lucide-react';

interface CouncilChamberProps {
  participants: Personality[];
  activeSpeakerId: string | null;
  liveChunk: string;
  session: CouncilSession | null;
  motion: string;
  isCouncilRunning?: boolean;
  onInterpellate?: (thinkerId: string, question: string) => Promise<void> | void;
}

export const CouncilChamber: React.FC<CouncilChamberProps> = ({
  participants,
  activeSpeakerId,
  liveChunk,
  session,
  motion,
  isCouncilRunning = false,
  onInterpellate
}) => {
  const [isVoiceActive, setIsVoiceActive] = useState(councilAudio.isActivated);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);

  // Estado do Modal de Interpelação ("Pedir a Palavra")
  const [isInterpellateModalOpen, setIsInterpellateModalOpen] = useState(false);
  const [selectedInterpellateThinkerId, setSelectedInterpellateThinkerId] = useState<string>(
    participants[0]?.id || ''
  );
  const [interpellateQuestion, setInterpellateQuestion] = useState('');
  const [isSubmittingInterpellation, setIsSubmittingInterpellation] = useState(false);

  useEffect(() => {
    if (participants.length > 0 && !selectedInterpellateThinkerId) {
      setSelectedInterpellateThinkerId(participants[0].id);
    }
  }, [participants, selectedInterpellateThinkerId]);

  useEffect(() => {
    const unsubscribe = councilAudio.subscribe((speaking) => {
      setIsSpeakingAudio(speaking);
      setIsVoiceActive(councilAudio.isActivated);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleVoice = () => {
    const nextState = councilAudio.toggleActivation();
    setIsVoiceActive(nextState);
  };

  const cycleSpeed = () => {
    const nextSpeed = speechSpeed === 1.0 ? 1.2 : speechSpeed === 1.2 ? 0.85 : 1.0;
    setSpeechSpeed(nextSpeed);
    councilAudio.setRate(nextSpeed);
  };

  const handleSendInterpellation = async () => {
    if (!interpellateQuestion.trim() || !onInterpellate) return;
    setIsSubmittingInterpellation(true);
    try {
      await onInterpellate(selectedInterpellateThinkerId, interpellateQuestion.trim());
      setInterpellateQuestion('');
      setIsInterpellateModalOpen(false);
    } finally {
      setIsSubmittingInterpellation(false);
    }
  };

  // Cálculo da Tensão Dialética do Conselho
  const roundNum = session?.currentRound || 1;
  const isCompleted = session?.status === 'completed';
  const tensionScore = isCompleted ? 20 : roundNum === 1 ? 35 : roundNum === 2 ? 88 : 65;
  const tensionLabel = isCompleted 
    ? 'Convergência e Pacificação' 
    : roundNum === 1 
    ? 'Mapeamento de Teses Iniciais' 
    : roundNum === 2 
    ? 'Conflito Axiológico Máximo' 
    : 'Aprofundamento & Síntese Crítica';

  // Eixo de conflito dialético dinâmico
  const conflictAxis = participants.length >= 2
    ? `${participants[0]?.name.split(' ')[0]} (${participants[0]?.category || 'Visão'}) ⚡ ${participants[1]?.name.split(' ')[0]} (${participants[1]?.category || 'Pragmatismo'})`
    : 'Pragmatismo Operacional ⚡ Limites Axiológicos';

  // Encontra a personalidade que está a discursar
  const activeThinker = participants.find(p => p.id === activeSpeakerId) || null;

  // Última intervenção completa do orador para exibição se o streaming terminou
  const currentRound = session?.rounds[session.rounds.length - 1];
  const latestIntervention = currentRound?.interventions.slice(-1)[0];

  const displayedSpeechText = liveChunk || (
    activeThinker && latestIntervention?.personalityId === activeThinker.id 
      ? latestIntervention.content 
      : ''
  );

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-mindverse-deep via-[#0d1424] to-[#070b14] border border-mindverse-gold/20 shadow-2xl overflow-hidden p-6 md:p-8 min-h-[580px] flex flex-col justify-between">
      
      {/* Luz ambiente superior / Foco teatral */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-radial-glow from-mindverse-gold/15 via-transparent to-transparent pointer-events-none blur-2xl" />

      {/* Top HUD: Título da Câmara, Pedir a Palavra e Controlos de Voz */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-mindverse-gold animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-mindverse-gold-light">
              Câmara Deliberativa do Ágora
            </span>
          </div>
          <h3 className="text-base md:text-lg font-serif font-medium text-mindverse-softwhite mt-0.5 line-clamp-1">
            {motion || 'O Conselho das Grandes Mentes está reunido'}
          </h3>
        </div>

        {/* Controles de Interpelação, Áudio, Coleção de Vozes e Velocidade */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Botão OPÇÃO 1: Pedir a Palavra */}
          {onInterpellate && (
            <button
              onClick={() => setIsInterpellateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-mindverse-gold/20 hover:from-amber-500/30 hover:to-mindverse-gold/30 border border-mindverse-gold/50 text-xs font-medium text-mindverse-gold-light hover:text-white transition-all shadow-[0_0_15px_rgba(217,169,79,0.25)] hover:scale-105 active:scale-95"
              title="Pedir a Palavra ao Conselho e interpelar uma mente diretamente"
            >
              <Hand className="w-3.5 h-3.5 text-mindverse-gold animate-bounce" />
              <span className="font-semibold">{isCouncilRunning ? 'Pedir a Palavra' : 'Interpelar Pensador'}</span>
            </button>
          )}

          <button
            onClick={() => setIsVoiceStudioOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-mindverse-gold/30 text-xs font-mono text-mindverse-gold-light hover:text-white transition-colors"
            title="Escolher vozes da coleção e calibrar timbre"
          >
            <Sliders className="w-3.5 h-3.5 text-mindverse-gold" />
            <span>Coleção de Vozes</span>
          </button>

          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-mindverse-softwhite/80 transition-colors"
            title="Ajustar velocidade da voz"
          >
            <FastForward className="w-3.5 h-3.5 text-mindverse-gold" />
            <span>{speechSpeed}x</span>
          </button>

          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isVoiceActive 
                ? 'bg-mindverse-gold/20 border-mindverse-gold text-mindverse-gold-light shadow-[0_0_15px_rgba(217,169,79,0.3)]' 
                : 'bg-white/5 border-white/15 text-mindverse-muted hover:text-white hover:border-white/30'
            }`}
            title={isVoiceActive ? 'Voz Falada Ativada (Clique para Silenciar)' : 'Voz Desativada (Clique para Ativar Fala)'}
          >
            {isVoiceActive ? (
              <>
                <Volume2 className="w-4 h-4 text-mindverse-gold animate-pulse" />
                <span className="font-semibold text-mindverse-gold-light">Voz Ativa</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-mindverse-muted" />
                <span>Ativar Voz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cénico Central: Proscénio Cinematográfico com o Orador Ativo em Discurso */}
      {activeThinker && (
        <div className="relative z-20 my-4 p-5 rounded-xl bg-mindverse-dark/85 backdrop-blur-md border border-mindverse-gold/40 shadow-[0_0_35px_rgba(217,169,79,0.2)] animate-fadeIn">
          <div className="flex items-start gap-4">
            {/* Avatar em grande plano com anel radiante */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-mindverse-gold shadow-[0_0_25px_rgba(217,169,79,0.5)]">
                <img 
                  src={activeThinker.avatarUrl} 
                  alt={activeThinker.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Indicador de Oratória Ativa */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-mindverse-gold text-mindverse-deep flex items-center justify-center shadow-lg">
                <Mic className="w-3.5 h-3.5 animate-pulse" />
              </div>
            </div>

            {/* Balão de Discurso do Orador com Efeito de Ondas Sonoras */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div>
                  <span className="font-serif text-base font-semibold text-mindverse-gold-light">
                    {activeThinker.name}
                  </span>
                  <span className="text-xs text-mindverse-muted ml-2">
                    ({activeThinker.titleEpithet})
                  </span>
                </div>

                {/* Ondas Sonoras Animadas */}
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-mindverse-gold/10 border border-mindverse-gold/30">
                  <span className="w-1 h-3 rounded-full bg-mindverse-gold animate-[bounce_0.6s_ease-in-out_infinite]" />
                  <span className="w-1 h-4 rounded-full bg-mindverse-gold animate-[bounce_0.8s_ease-in-out_infinite_0.2s]" />
                  <span className="w-1 h-2 rounded-full bg-mindverse-gold animate-[bounce_0.5s_ease-in-out_infinite_0.4s]" />
                  <span className="w-1 h-5 rounded-full bg-mindverse-gold animate-[bounce_0.7s_ease-in-out_infinite_0.1s]" />
                  <span className="text-[10px] font-mono text-mindverse-gold uppercase tracking-wider ml-1">
                    {isSpeakingAudio ? 'A Pronunciar' : 'A Deliberar'}
                  </span>
                </div>
              </div>

              {/* Texto Sincronizado do Discurso */}
              <div className="text-sm md:text-base font-sans text-mindverse-softwhite/95 leading-relaxed max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                {displayedSpeechText ? (
                  <p className="italic">"{displayedSpeechText}"</p>
                ) : (
                  <p className="text-mindverse-muted italic">A preparar intervenção fundamentada no corpus canónico...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cenário da Mesa Redonda: Pensadores Sentados e Termómetro Dialético */}
      <div className="relative z-10 mt-2 pt-4">
        
        {/* Mesa Central do Conselho com Termómetro de Tensão Dialética (OPÇÃO 3) */}
        <div className="relative mx-auto max-w-4xl">
          
          {/* Tampo da Mesa Redonda em Elipse com Efeito 3D */}
          <div className="relative mx-auto w-11/12 md:w-4/5 h-28 md:h-32 rounded-[100%] bg-gradient-to-b from-[#18233a] via-[#0f1728] to-[#070b13] border-2 border-mindverse-gold/35 shadow-[0_15px_45px_rgba(0,0,0,0.85),inset_0_2px_20px_rgba(217,169,79,0.2)] flex flex-col items-center justify-center p-3">
            
            {/* Brasão Dourado Superior */}
            <div className="flex items-center gap-1.5 opacity-80 mb-1">
              <Crown className="w-4 h-4 text-mindverse-gold/80" />
              <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-mindverse-gold/90 font-semibold">
                Ágora • Mesa das Decisões
              </span>
            </div>

            {/* OPÇÃO 3: Termómetro de Tensão Dialética Central */}
            <div className="w-4/5 max-w-xs flex flex-col items-center gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="w-full flex items-center justify-between text-[10px] font-mono">
                <span className="flex items-center gap-1 text-mindverse-gold-light">
                  <Flame className={`w-3 h-3 ${tensionScore > 70 ? 'text-amber-400 animate-pulse' : 'text-mindverse-gold'}`} />
                  <span>Atrito Dialético:</span>
                </span>
                <span className="font-bold text-mindverse-softwhite">{tensionScore}%</span>
              </div>

              {/* Barra Gradiente da Tensão */}
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500"
                  style={{ width: `${tensionScore}%` }}
                />
              </div>

              {/* Eixo de Conflito Ativo */}
              <div className="flex items-center gap-1 text-[9px] font-mono text-mindverse-muted truncate max-w-full">
                <Zap className="w-2.5 h-2.5 text-mindverse-gold/80 shrink-0" />
                <span className="truncate">{conflictAxis}</span>
              </div>
            </div>

            <span className="text-[9px] font-mono text-mindverse-gold/50 mt-1">
              {tensionLabel}
            </span>
          </div>

          {/* Assentos dos Pensadores em Arco ao Redor da Mesa */}
          <div className="relative -mt-14 md:-mt-16 flex flex-wrap justify-center items-end gap-3 md:gap-6 px-2">
            {participants.map((thinker) => {
              const isSpeaking = activeSpeakerId === thinker.id;

              return (
                <div
                  key={thinker.id}
                  className={`group relative flex flex-col items-center transition-all duration-500 ${
                    isSpeaking 
                      ? 'scale-115 -translate-y-4 z-30' 
                      : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100 z-10'
                  }`}
                >
                  {/* Foco de Luz Vertical para o Orador Ativo (OPÇÃO 3) */}
                  {isSpeaking && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-32 bg-gradient-to-b from-mindverse-gold/35 via-mindverse-gold/15 to-transparent pointer-events-none rounded-t-full blur-md animate-pulse" />
                  )}

                  {/* Cadeira / Trono do Pensador */}
                  <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
                    isSpeaking 
                      ? 'bg-gradient-to-t from-mindverse-gold via-amber-300 to-amber-100 shadow-[0_0_28px_rgba(217,169,79,0.7)]' 
                      : 'bg-white/10 hover:bg-mindverse-gold/40'
                  }`}>
                    
                    {/* Retrato do Pensador Sentado */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-mindverse-deep border-2 border-mindverse-deep flex items-center justify-center">
                      <img 
                        src={thinker.avatarUrl} 
                        alt={thinker.name} 
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isSpeaking ? 'scale-110' : 'grayscale-[20%] group-hover:grayscale-0'
                        }`}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="font-serif font-bold text-sm text-mindverse-gold">
                        {thinker.name.charAt(0)}
                      </span>
                    </div>

                    {/* Emblema de Oratória ou Escuta */}
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold flex items-center gap-1 shadow-md ${
                      isSpeaking 
                        ? 'bg-mindverse-gold text-mindverse-deep' 
                        : 'bg-black/60 text-mindverse-softwhite/70'
                    }`}>
                      {isSpeaking ? (
                        <>
                          <Mic className="w-2.5 h-2.5" />
                          <span>Voz</span>
                        </>
                      ) : (
                        <span>Assento</span>
                      )}
                    </div>
                  </div>

                  {/* Placa com Nome e Era Histórica do Pensador */}
                  <div className="mt-2 text-center max-w-[90px] md:max-w-[110px]">
                    <p className={`font-serif text-xs leading-tight transition-colors truncate ${
                      isSpeaking ? 'text-mindverse-gold-light font-bold' : 'text-mindverse-softwhite/80'
                    }`}>
                      {thinker.name.split(' ')[0]}
                    </p>
                    <p className="text-[9px] text-mindverse-muted truncate">
                      {thinker.titleEpithet}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rodapé Informativo da Câmara */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-mindverse-muted border-t border-white/5 pt-3 mt-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {participants.length} Pensadores Reunidos
          </span>
          <span>•</span>
          <span>{session?.rounds.length || 0} Rondas Concluídas</span>
        </div>

        <div className="flex items-center gap-2 text-mindverse-gold/70 italic font-serif">
          <Sparkles className="w-3.5 h-3.5 text-mindverse-gold" />
          <span>"Onde as mentes divergem com rigor, a verdade consolida-se."</span>
        </div>
      </div>

      {/* Modal OPÇÃO 1: Interpelação do Líder Convocante ("Pedir a Palavra") */}
      {isInterpellateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-mindverse-deep to-[#090e1a] border border-mindverse-gold/50 shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-mindverse-gold/20 border border-mindverse-gold/40">
                  <Hand className="w-4 h-4 text-mindverse-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-mindverse-softwhite">
                    Pedir a Palavra ao Conselho
                  </h3>
                  <p className="text-xs text-mindverse-muted font-mono">
                    Interpela uma mente e obtém resposta viva imediata
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsInterpellateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-mindverse-muted hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Escolha do Pensador a Interpelar */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-light block">
                Escolhe a Mente a Interpelar:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {participants.map((p) => {
                  const isSelected = selectedInterpellateThinkerId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedInterpellateThinkerId(p.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-mindverse-gold/20 border-mindverse-gold text-mindverse-gold-light shadow-[0_0_15px_rgba(217,169,79,0.3)]'
                          : 'bg-white/5 border-white/10 text-mindverse-softwhite/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-mindverse-gold/40 shrink-0">
                        <img 
                          src={p.avatarUrl} 
                          alt={p.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                      <span className="text-xs font-serif font-medium truncate">{p.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pergunta ou Contestação */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-mindverse-gold-light block">
                A Tua Interpelação / Objeção:
              </label>
              <textarea
                value={interpellateQuestion}
                onChange={(e) => setInterpellateQuestion(e.target.value)}
                placeholder="Ex: Como respondes à objeção levantada pelo Conselho sobre a velocidade de execução vs rigor ético?"
                rows={3}
                className="w-full p-3 rounded-xl bg-mindverse-midnight border border-white/15 text-xs text-mindverse-softwhite placeholder-mindverse-muted focus:border-mindverse-gold outline-none resize-none"
              />
            </div>

            {/* Ações */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsInterpellateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-mindverse-muted hover:text-white transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={!interpellateQuestion.trim() || isSubmittingInterpellation}
                onClick={handleSendInterpellation}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-mindverse-gold to-amber-400 hover:from-amber-400 hover:to-mindverse-gold text-mindverse-void font-serif font-bold text-xs shadow-gold-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmittingInterpellation ? 'A Interpelar...' : 'Submeter Interpelação'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Estúdio e Coleção de Vozes */}
      <VoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
        participants={participants}
      />
    </div>
  );
};
