import React, { useEffect, useState } from 'react';
import { Personality, CouncilSession } from '../../types';
import { councilAudio } from '../../services/councilAudio';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles, 
  Crown,
  FastForward
} from 'lucide-react';

interface CouncilChamberProps {
  participants: Personality[];
  activeSpeakerId: string | null;
  liveChunk: string;
  session: CouncilSession | null;
  motion: string;
}

export const CouncilChamber: React.FC<CouncilChamberProps> = ({
  participants,
  activeSpeakerId,
  liveChunk,
  session,
  motion
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(councilAudio.isMute);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);

  useEffect(() => {
    const unsubscribe = councilAudio.subscribe((speaking) => {
      setIsSpeakingAudio(speaking);
    });
    return () => unsubscribe();
  }, []);

  const toggleMute = () => {
    const muted = councilAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  const cycleSpeed = () => {
    const nextSpeed = speechSpeed === 1.0 ? 1.2 : speechSpeed === 1.2 ? 0.85 : 1.0;
    setSpeechSpeed(nextSpeed);
    councilAudio.setRate(nextSpeed);
  };

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
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-mindverse-deep via-[#0d1424] to-[#070b14] border border-mindverse-gold/20 shadow-2xl overflow-hidden p-6 md:p-8 min-h-[560px] flex flex-col justify-between">
      
      {/* Luz ambiente superior / Foco teatral */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-radial-glow from-mindverse-gold/15 via-transparent to-transparent pointer-events-none blur-2xl" />

      {/* Top HUD: Título da Câmara, Ronda e Controlos de Voz */}
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

        {/* Controles de Áudio e Velocidade */}
        <div className="flex items-center gap-2">
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-mindverse-softwhite/80 transition-colors"
            title="Ajustar velocidade da voz"
          >
            <FastForward className="w-3.5 h-3.5 text-mindverse-gold" />
            <span>{speechSpeed}x</span>
          </button>

          <button
            onClick={toggleMute}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isAudioMuted 
                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                : 'bg-mindverse-gold/10 border-mindverse-gold/30 text-mindverse-gold-light hover:bg-mindverse-gold/20'
            }`}
            title={isAudioMuted ? 'Ativar Voz Falada' : 'Silenciar Voz'}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span>Voz Desativada</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-mindverse-gold animate-pulse" />
                <span>Voz Falada Ativa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cénico Central: Proscénio com o Orador Ativo em Discurso */}
      {activeThinker && (
        <div className="relative z-20 my-4 p-5 rounded-xl bg-mindverse-dark/80 backdrop-blur-md border border-mindverse-gold/40 shadow-[0_0_30px_rgba(217,169,79,0.15)] animate-fadeIn">
          <div className="flex items-start gap-4">
            {/* Avatar em grande plano com anel radiante */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-mindverse-gold shadow-[0_0_20px_rgba(217,169,79,0.5)]">
                <img 
                  src={activeThinker.avatarUrl} 
                  alt={activeThinker.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback visual elegante
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

      {/* Cenário da Mesa Redonda: Pensadores Sentados no Conselho */}
      <div className="relative z-10 mt-2 pt-6">
        
        {/* Mesa Central do Conselho (Efeito Perspetiva 3D) */}
        <div className="relative mx-auto max-w-4xl">
          
          {/* Tampo da Mesa Redonda em Elipse */}
          <div className="relative mx-auto w-11/12 md:w-4/5 h-24 md:h-28 rounded-[100%] bg-gradient-to-b from-[#162035] via-[#0e1626] to-[#080d17] border-2 border-mindverse-gold/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(217,169,79,0.15)] flex items-center justify-center">
            
            {/* Brasão Dourado Gravado no Centro da Mesa */}
            <div className="flex flex-col items-center justify-center opacity-70">
              <Crown className="w-6 h-6 text-mindverse-gold/60 mb-0.5" />
              <span className="font-serif text-[11px] md:text-xs uppercase tracking-widest text-mindverse-gold/70 font-semibold">
                Ágora • Mindverse
              </span>
              <span className="text-[9px] font-mono text-mindverse-gold/40">
                Conselho das Grandes Mentes
              </span>
            </div>
          </div>

          {/* Assentos dos Pensadores em Arco ao Redor da Mesa */}
          <div className="relative -mt-16 md:-mt-20 flex flex-wrap justify-center items-end gap-3 md:gap-6 px-2">
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
                  {/* Foco de Luz Vertical para o Orador Ativo */}
                  {isSpeaking && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-32 bg-gradient-to-b from-mindverse-gold/30 via-mindverse-gold/10 to-transparent pointer-events-none rounded-t-full blur-md" />
                  )}

                  {/* Cadeira / Trono do Pensador */}
                  <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
                    isSpeaking 
                      ? 'bg-gradient-to-t from-mindverse-gold via-amber-300 to-amber-100 shadow-[0_0_25px_rgba(217,169,79,0.6)]' 
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
                      {/* Iniciais em caso de falha de carregamento */}
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
    </div>
  );
};
