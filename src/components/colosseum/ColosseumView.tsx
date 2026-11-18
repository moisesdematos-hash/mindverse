import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { COHORT_GENESIS_PERSONALITIES } from '../../data/personalities';
import { Personality } from '../../types';
import { globalRAGOrchestrator } from '../../server/orchestrator';
import { councilAudio } from '../../services/councilAudio';
import { 
  Swords, 
  Play, 
  Volume2, 
  Flame, 
  UserCheck,
  Bell
} from 'lucide-react';

interface DuelRound {
  speaker: Personality;
  roundTitle: string;
  content: string;
  epistemicStatus: 'fact' | 'interpretation' | 'hypothetical';
}

const PRESET_DUELS = [
  {
    title: 'A Batalha das Correntes',
    motion: 'A corrente alternada de alta frequência supera o pragmatismo da corrente contínua para a eletrificação mundial?',
    fighter1Slug: 'nikola-tesla',
    fighter2Slug: 'thomas-edison',
    tag: 'Energia & Invenção'
  },
  {
    title: 'Virtude Moral vs. Razão de Estado',
    motion: 'Deve um governante priorizar a justiça ética incondicional ou a sobrevivência e estabilidade prática do Estado?',
    fighter1Slug: 'socrates',
    fighter2Slug: 'nicolau-maquiavel',
    tag: 'Filosofia Política'
  },
  {
    title: 'Deus Joga aos Dados? O Enigma Quântico',
    motion: 'A realidade subatómica fundamental é indeterminista e probabilística ou existe uma ordem causal estrita subjacente?',
    fighter1Slug: 'niels-bohr',
    fighter2Slug: 'albert-einstein',
    tag: 'Física & Realidade'
  },
  {
    title: 'A Dignidade do Povo vs. Ferro e Sangue',
    motion: 'A preservação de uma nação faz-se pela igualdade inalienável de direitos ou pelo monopólio pragmático da força?',
    fighter1Slug: 'abraham-lincoln',
    fighter2Slug: 'otto-von-bismarck',
    tag: 'Liderança Presidencial'
  }
];

export const ColosseumView: React.FC = () => {
  const { addTokensUsed } = useAppStore();

  const [fighter1, setFighter1] = useState<Personality>(
    COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'nikola-tesla') || COHORT_GENESIS_PERSONALITIES[0]
  );
  const [fighter2, setFighter2] = useState<Personality>(
    COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'thomas-edison') || COHORT_GENESIS_PERSONALITIES[1]
  );
  const [motion, setMotion] = useState(PRESET_DUELS[0].motion);
  const [isDueling, setIsDueling] = useState(false);
  const [rounds, setRounds] = useState<DuelRound[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [arbiterPrompt, setArbiterPrompt] = useState('');
  const [isArbiterActive, setIsArbiterActive] = useState(false);

  const applyPreset = (preset: typeof PRESET_DUELS[0]) => {
    const f1 = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === preset.fighter1Slug);
    const f2 = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === preset.fighter2Slug);
    if (f1) setFighter1(f1);
    if (f2) setFighter2(f2);
    setMotion(preset.motion);
    setRounds([]);
    setCurrentRoundIndex(0);
  };

  const executeDuel = async () => {
    if (!motion.trim() || isDueling) return;
    setIsDueling(true);
    setRounds([]);
    setCurrentRoundIndex(0);

    try {
      // Assalto 1: Ataque & Tese de Abertura (Lutador 1)
      setCurrentRoundIndex(1);
      const res1 = await globalRAGOrchestrator.processInquiry({
        personalityId: fighter1.id,
        userQuery: `No Coliseu Dialético contra ${fighter2.name}, apresenta o teu primeiro golpe de tese inegociável sobre a moção: "${motion}". Não recuas nem cedes: ataca as premissas contrárias com os teus primeiros princípios.`
      });
      addTokensUsed(res1.tokensUsed);
      const round1: DuelRound = {
        speaker: fighter1,
        roundTitle: 'Assalto 1: Golpe de Abertura & Tese Central',
        content: res1.answer,
        epistemicStatus: 'interpretation'
      };
      setRounds([round1]);
      councilAudio.speak(fighter1.id, round1.content);

      // Assalto 2: Contra-Golpe Direto (Lutador 2)
      setCurrentRoundIndex(2);
      const res2 = await globalRAGOrchestrator.processInquiry({
        personalityId: fighter2.id,
        userQuery: `No Coliseu Dialético, ${fighter1.name} acaba de te confrontar dizendo: "${res1.answer.slice(0, 200)}...". Desfere o teu contra-ataque imediato sobre "${motion}", demonstrando as falhas da sua abordagem e defendendo a tua mundivisão com vigor.`
      });
      addTokensUsed(res2.tokensUsed);
      const round2: DuelRound = {
        speaker: fighter2,
        roundTitle: `Assalto 2: Contra-Golpe de ${fighter2.name}`,
        content: res2.answer,
        epistemicStatus: 'interpretation'
      };
      setRounds([round1, round2]);

      // Assalto 3: Clímax & Posição Inegociável dos Dois
      setCurrentRoundIndex(3);
      const res3 = await globalRAGOrchestrator.processInquiry({
        personalityId: fighter1.id,
        userQuery: `Perante o contra-golpe de ${fighter2.name}, apresenta a tua advertência final sobre "${motion}". Deixa claro por que razão a história te dará razão.`
      });
      addTokensUsed(res3.tokensUsed);
      const round3: DuelRound = {
        speaker: fighter1,
        roundTitle: `Assalto 3: Tréplica e Conclusão Histórica`,
        content: res3.answer,
        epistemicStatus: 'interpretation'
      };
      setRounds([round1, round2, round3]);

    } catch (err) {
      console.error('Erro no Coliseu:', err);
    } finally {
      setIsDueling(false);
      setCurrentRoundIndex(0);
    }
  };

  const handleArbiterIntervention = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arbiterPrompt.trim() || isArbiterActive) return;
    setIsArbiterActive(true);

    try {
      const arbiterText = arbiterPrompt.trim();
      setArbiterPrompt('');

      // Ambos os lutadores respondem ao árbitro
      const resF1 = await globalRAGOrchestrator.processInquiry({
        personalityId: fighter1.id,
        userQuery: `O Árbitro do Coliseu (o utilizador) interveio no duelo com a seguinte intimação: "${arbiterText}". Como ${fighter1.name}, responde diretamente ao árbitro defendendo a tua causa.`
      });
      addTokensUsed(resF1.tokensUsed);

      const resF2 = await globalRAGOrchestrator.processInquiry({
        personalityId: fighter2.id,
        userQuery: `O Árbitro do Coliseu interveio com: "${arbiterText}". Como ${fighter2.name}, responde ao árbitro demonstrando por que razão ${fighter1.name} está errado.`
      });
      addTokensUsed(resF2.tokensUsed);

      setRounds(prev => [
        ...prev,
        {
          speaker: fighter1,
          roundTitle: `Veredito do Árbitro: Réplica de ${fighter1.name}`,
          content: resF1.answer,
          epistemicStatus: 'interpretation'
        },
        {
          speaker: fighter2,
          roundTitle: `Veredito do Árbitro: Réplica de ${fighter2.name}`,
          content: resF2.answer,
          epistemicStatus: 'interpretation'
        }
      ]);
    } catch (err) {
      console.error('Erro na intervenção do árbitro:', err);
    } finally {
      setIsArbiterActive(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/40 via-mindverse-midnight to-mindverse-deep border border-mindverse-gold/30 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-mindverse-gold animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-mindverse-gold uppercase font-bold">
                Arena de Confronto Dialético 1 vs 1
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-mindverse-softwhite tracking-tight">
              Coliseu Dialético
            </h1>
            <p className="text-xs text-mindverse-muted max-w-2xl leading-relaxed">
              Coloca dois titãs da história frente a frente num embate de ideias sem meias palavras. Observa o confronto das suas premissas axiológicas em assaltos sucessivos e intervém como árbitro soberano a qualquer momento.
            </p>
          </div>

          <button
            onClick={executeDuel}
            disabled={isDueling || !motion.trim()}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-[#05070B] font-mono font-black text-sm shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isDueling ? (
              <>
                <Flame className="w-5 h-5 text-amber-950 animate-spin" />
                <span>Assalto {currentRoundIndex} em Curso...</span>
              </>
            ) : (
              <>
                <Bell className="w-5 h-5 fill-current text-amber-950 animate-bounce" />
                <span>Soar o Gongo do Duelo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Duels Selection */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-mindverse-muted font-semibold tracking-wider">
          Duelos Lendários Pré-Configurados:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_DUELS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="text-left p-3.5 rounded-xl bg-mindverse-midnight/70 hover:bg-mindverse-midnight border border-mindverse-graphite hover:border-mindverse-gold/50 transition-all hover:-translate-y-0.5 group space-y-1.5"
            >
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mindverse-gold/10 text-mindverse-gold-light border border-mindverse-gold/20">
                {preset.tag}
              </span>
              <h4 className="text-xs font-serif font-bold text-mindverse-softwhite group-hover:text-mindverse-gold transition-colors">
                {preset.title}
              </h4>
              <p className="text-[11px] text-mindverse-muted line-clamp-2">
                {preset.motion}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* The Fighters Ring */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Fighter 1 */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-mindverse-midnight/90 border border-mindverse-gold/30 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <img 
              src={fighter1.avatarUrl} 
              alt={fighter1.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-mindverse-gold"
            />
            <div>
              <span className="text-[10px] font-mono text-mindverse-gold uppercase font-bold tracking-wider">
                Lutador 1 (Tese)
              </span>
              <h3 className="text-base font-serif font-bold text-mindverse-softwhite">
                {fighter1.name}
              </h3>
              <p className="text-[11px] text-mindverse-muted">
                {fighter1.titleEpithet}
              </p>
            </div>
          </div>

          <div className="text-xs">
            <label className="text-[10px] font-mono text-mindverse-muted block mb-1">
              Alterar Combatente 1:
            </label>
            <select
              value={fighter1.id}
              onChange={(e) => {
                const found = COHORT_GENESIS_PERSONALITIES.find(p => p.id === e.target.value);
                if (found) setFighter1(found);
              }}
              className="w-full bg-mindverse-deep text-mindverse-softwhite border border-mindverse-graphite rounded-lg p-2 text-xs font-mono focus:border-mindverse-gold outline-none"
            >
              {COHORT_GENESIS_PERSONALITIES.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.historicalEra})</option>
              ))}
            </select>
          </div>
        </div>

        {/* VS Badge */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-mindverse-deep border-2 border-mindverse-gold flex items-center justify-center font-serif font-black text-mindverse-gold shadow-gold-glow animate-bounce">
            VS
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-mindverse-midnight/90 border border-mindverse-gold/30 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <img 
              src={fighter2.avatarUrl} 
              alt={fighter2.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500"
            />
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                Lutador 2 (Antítese)
              </span>
              <h3 className="text-base font-serif font-bold text-mindverse-softwhite">
                {fighter2.name}
              </h3>
              <p className="text-[11px] text-mindverse-muted">
                {fighter2.titleEpithet}
              </p>
            </div>
          </div>

          <div className="text-xs">
            <label className="text-[10px] font-mono text-mindverse-muted block mb-1">
              Alterar Combatente 2:
            </label>
            <select
              value={fighter2.id}
              onChange={(e) => {
                const found = COHORT_GENESIS_PERSONALITIES.find(p => p.id === e.target.value);
                if (found) setFighter2(found);
              }}
              className="w-full bg-mindverse-deep text-mindverse-softwhite border border-mindverse-graphite rounded-lg p-2 text-xs font-mono focus:border-mindverse-gold outline-none"
            >
              {COHORT_GENESIS_PERSONALITIES.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.historicalEra})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Motion Input Area */}
      <div className="p-4 rounded-xl bg-mindverse-midnight/70 border border-mindverse-graphite space-y-2">
        <label className="text-xs font-mono text-mindverse-gold flex items-center gap-1.5 font-semibold">
          <Flame className="w-3.5 h-3.5 text-mindverse-gold" />
          <span>Moção em Disputa no Coliseu:</span>
        </label>
        <textarea
          value={motion}
          onChange={(e) => setMotion(e.target.value)}
          rows={2}
          placeholder="Escreve o dilema ou tese a ser debatida pelos dois oponentes..."
          className="w-full bg-mindverse-deep/90 border border-mindverse-graphite rounded-xl p-3 text-sm text-mindverse-softwhite focus:border-mindverse-gold outline-none resize-none font-sans"
        />
      </div>

      {/* Prominent Duel Action Bar right under Motion */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-mindverse-midnight via-amber-950/20 to-mindverse-midnight border-2 border-mindverse-gold/40 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-mindverse-gold/20 border border-mindverse-gold/40 text-mindverse-gold">
            <Swords className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-mindverse-softwhite flex items-center gap-2">
              Pronto para o Combate Dialético
            </h3>
            <p className="text-xs text-mindverse-muted">
              {fighter1.name} (Tese) vs {fighter2.name} (Antítese) • 2 Assaltos Canónicos
            </p>
          </div>
        </div>

        <button
          onClick={executeDuel}
          disabled={isDueling || !motion.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-[#05070B] font-mono font-black text-sm sm:text-base shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isDueling ? (
            <>
              <Flame className="w-5 h-5 text-amber-950 animate-spin" />
              <span>Assalto {currentRoundIndex} em Curso...</span>
            </>
          ) : (
            <>
              <Bell className="w-5 h-5 fill-current text-amber-950 animate-bounce" />
              <span>Soar o Gongo do Duelo</span>
              <Play className="w-4 h-4 fill-current text-amber-950" />
            </>
          )}
        </button>
      </div>

      {/* Duel Rounds Transcript */}
      <div className="space-y-4">
        {rounds.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-mindverse-midnight/40 border border-dashed border-mindverse-graphite/60 space-y-3">
            <Swords className="w-10 h-10 text-mindverse-muted mx-auto opacity-40" />
            <h4 className="text-sm font-serif font-bold text-mindverse-muted">
              Os Lutadores aguardam o sinal na arena
            </h4>
            <p className="text-xs text-mindverse-muted/70 max-w-md mx-auto">
              Clica em "Soar o Gongo do Duelo" para ver {fighter1.name} e {fighter2.name} confrontarem-se assalto a assalto com os seus argumentos históricos.
            </p>
            <button
              onClick={executeDuel}
              disabled={isDueling || !motion.trim()}
              className="mt-4 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-[#05070B] font-mono font-black text-sm shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <Bell className="w-5 h-5 fill-current text-amber-950" />
              <span>Soar o Gongo do Duelo Agora</span>
            </button>
          </div>
        ) : (
          rounds.map((round, idx) => {
            const isF1 = round.speaker.id === fighter1.id;
            return (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border transition-all space-y-3 animate-fade-in ${
                  isF1
                    ? 'bg-mindverse-midnight/90 border-mindverse-gold/30 mr-4 md:mr-12'
                    : 'bg-mindverse-deep/90 border-amber-500/30 ml-4 md:ml-12'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={round.speaker.avatarUrl} 
                      alt={round.speaker.name}
                      className="w-10 h-10 rounded-full object-cover border border-mindverse-gold/50"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-mindverse-gold-light uppercase tracking-wider font-semibold">
                        {round.roundTitle}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-mindverse-softwhite">
                        {round.speaker.name}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => councilAudio.speak(round.speaker.id, round.content)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-mindverse-gold/10 hover:bg-mindverse-gold/25 text-xs font-mono text-mindverse-gold-light border border-mindverse-gold/30 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-mindverse-gold" />
                    <span>Ouvir Resposta</span>
                  </button>
                </div>

                <div className="text-xs md:text-sm text-mindverse-softwhite/95 leading-relaxed whitespace-pre-line pl-1 border-l-2 border-mindverse-gold/40">
                  {round.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Arbiter Intervention Form */}
      {rounds.length > 0 && (
        <form onSubmit={handleArbiterIntervention} className="p-4 rounded-2xl bg-mindverse-midnight border border-mindverse-gold/40 space-y-3 shadow-xl">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-mindverse-gold" />
            <span className="text-xs font-mono text-mindverse-gold font-bold uppercase tracking-wider">
              Intervenção do Árbitro Soberano (Tu)
            </span>
          </div>
          <p className="text-xs text-mindverse-muted">
            Intima ambos os combatentes a responder a uma provocação ou ponto cego que tenham ignorado:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={arbiterPrompt}
              onChange={(e) => setArbiterPrompt(e.target.value)}
              placeholder="Ex.: Ambos evitam responder sobre o custo humano desta decisão..."
              disabled={isArbiterActive}
              className="flex-1 bg-mindverse-deep border border-mindverse-graphite rounded-xl px-4 py-2.5 text-xs text-mindverse-softwhite focus:border-mindverse-gold outline-none font-sans"
            />
            <button
              type="submit"
              disabled={isArbiterActive || !arbiterPrompt.trim()}
              className="px-5 py-2.5 rounded-xl bg-mindverse-gold hover:bg-mindverse-gold-light text-mindverse-deep font-mono font-bold text-xs transition-all disabled:opacity-50"
            >
              {isArbiterActive ? 'A Interrogar...' : 'Intimar Ambos'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
