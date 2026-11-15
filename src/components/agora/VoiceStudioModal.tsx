import React, { useState, useEffect } from 'react';
import { Personality } from '../../types';
import { councilAudio, VoiceOption } from '../../services/councilAudio';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Play, 
  RotateCcw, 
  Sparkles,
  Check,
  Languages
} from 'lucide-react';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: Personality[];
}

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  participants,
}) => {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [isActivated, setIsActivated] = useState<boolean>(councilAudio.isActivated);
  const [selectedThinkerId, setSelectedThinkerId] = useState<string>(participants[0]?.id || 'aristotle');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [pitch, setPitch] = useState<number>(1.0);
  const [rate, setRate] = useState<number>(1.0);
  const [isPlayingSample, setIsPlayingSample] = useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadVoices = () => {
      const collection = councilAudio.getVoiceCollection();
      setVoices(collection);

      const profile = councilAudio.getThinkerProfile(selectedThinkerId);
      setPitch(profile.pitch);
      setRate(profile.rate);
      if (profile.voiceURI) {
        setSelectedVoiceURI(profile.voiceURI);
      } else if (collection.length > 0) {
        setSelectedVoiceURI(collection[0].voiceURI);
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    setIsActivated(councilAudio.isActivated);
  }, [isOpen, selectedThinkerId]);

  if (!isOpen) return null;

  const handleToggleActivation = () => {
    const nextState = councilAudio.toggleActivation();
    setIsActivated(nextState);
  };

  const handlePlaySample = () => {
    const thinker = participants.find(p => p.id === selectedThinkerId);
    const sampleText = thinker 
      ? `Sou ${thinker.name}. A sabedoria imortal nasce da clareza dos princípios e da busca incansável pela verdade.`
      : 'A verdadeira sabedoria reside no rigor do pensamento e na busca da verdade.';

    setIsPlayingSample(true);
    councilAudio.previewVoice(selectedVoiceURI, pitch, rate, sampleText);
    setTimeout(() => setIsPlayingSample(false), 4500);
  };

  const handleApplyToCurrentThinker = () => {
    councilAudio.setThinkerVoice(selectedThinkerId, selectedVoiceURI, pitch, rate);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleApplyToAll = () => {
    councilAudio.setGlobalVoiceForAll(selectedVoiceURI, pitch, rate);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-b from-mindverse-deep via-[#0d1527] to-[#070b14] border border-mindverse-gold/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header do Estúdio */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-mindverse-gold/15 border border-mindverse-gold/30 flex items-center justify-center text-mindverse-gold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-mindverse-softwhite flex items-center gap-2">
                <span>Coleção de Vozes & Estúdio Vocal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mindverse-gold/15 text-mindverse-gold-light border border-mindverse-gold/30">
                  Web Speech API
                </span>
              </h3>
              <p className="text-xs text-mindverse-muted">
                Configura as vozes e ativa a reprodução falada para o Conselho e Diálogos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-mindverse-muted hover:text-mindverse-softwhite hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
          
          {/* Card de Ativação Geral (Regra: Só fala depois de ativada) */}
          <div className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
            isActivated 
              ? 'bg-mindverse-gold/10 border-mindverse-gold/40 shadow-[0_0_20px_rgba(217,169,79,0.15)]' 
              : 'bg-white/[0.03] border-white/10'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isActivated ? 'bg-mindverse-gold text-mindverse-deep' : 'bg-white/10 text-mindverse-muted'
              }`}>
                {isActivated ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-mindverse-softwhite">
                  Reprodução de Voz Falada
                </h4>
                <p className="text-xs text-mindverse-muted mt-0.5">
                  {isActivated 
                    ? 'A voz está ativa: os pensadores falarão as suas teses durante a deliberação.'
                    : 'A voz está desativada: as deliberações decorrem em silêncio até ativares este comando.'
                  }
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleActivation}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shrink-0 ${
                isActivated
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-mindverse-gold hover:bg-amber-400 text-mindverse-deep'
              }`}
            >
              {isActivated ? 'Voz Ativa (Ligada)' : 'Ativar Voz Agora'}
            </button>
          </div>

          {/* Seleção do Pensador a Personalizar */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-mindverse-gold-light tracking-wider flex items-center justify-between">
              <span>Personalidade Alvo</span>
              <span className="text-[10px] text-mindverse-muted">Escolhe a mente que pretendes calibrar</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {participants.map((p) => {
                const isSelected = selectedThinkerId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedThinkerId(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-mindverse-gold/20 border-mindverse-gold shadow-[0_0_15px_rgba(217,169,79,0.3)]'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-mindverse-midnight border border-mindverse-gold/40 shrink-0">
                      <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-serif text-xs text-mindverse-softwhite truncate">
                      {p.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coleção de Vozes Disponíveis no Sistema */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-mindverse-gold-light tracking-wider flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              <span>Coleção de Vozes Instaladas no Sistema ({voices.length})</span>
            </label>
            <select
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-mindverse-midnight border border-white/15 text-mindverse-softwhite text-xs font-mono focus:border-mindverse-gold focus:outline-none"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI} className="bg-mindverse-deep text-mindverse-softwhite">
                  {v.isPortuguese ? '🇵🇹 ' : '🌐 '}
                  {v.name} ({v.lang})
                  {v.genderHint !== 'neutral' ? ` [${v.genderHint}]` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Ajuste de Tom (Pitch) e Velocidade (Rate) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-mindverse-muted">Timbre / Gravidade (Pitch)</span>
                <span className="font-mono text-mindverse-gold-light">{pitch.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.05"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-mindverse-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-mindverse-muted font-mono">
                <span>Grave / Solene</span>
                <span>Agudo / Límpido</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-mindverse-muted">Cadência / Ritmo (Speed)</span>
                <span className="font-mono text-mindverse-gold-light">{rate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.35"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-mindverse-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-mindverse-muted font-mono">
                <span>Pausado</span>
                <span>Ágil</span>
              </div>
            </div>
          </div>

          {/* Botão de Amostra de Teste */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePlaySample}
              disabled={isPlayingSample}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-mindverse-gold-light transition-all disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 text-mindverse-gold ${isPlayingSample ? 'animate-spin' : ''}`} />
              <span>{isPlayingSample ? 'A Reproduzir Amostra...' : 'Ouvir Amostra de Voz'}</span>
            </button>

            {saveSuccessNotice && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono animate-fadeIn">
                <Check className="w-4 h-4" />
                Voz guardada com sucesso!
              </span>
            )}
          </div>
        </div>

        {/* Rodapé com Ações de Gravação */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-t border-white/10 bg-white/[0.02]">
          <button
            onClick={handleApplyToAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-mindverse-softwhite/80 hover:text-mindverse-softwhite font-mono transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-mindverse-gold" />
            <span>Aplicar a Todo o Conselho</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-mindverse-softwhite transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handleApplyToCurrentThinker}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-mindverse-gold hover:bg-amber-400 text-mindverse-deep font-serif font-bold text-xs shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guardar para esta Mente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
