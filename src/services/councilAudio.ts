/**
 * MINDVERSE — Serviço de Síntese de Voz das Grandes Mentes
 * Utiliza a Web Speech API com calibração de timbre, cadência e entoação específica para cada pensador.
 * Suporta seleção dinâmica dentro da coleção de vozes do sistema e controle estrito de ativação.
 */

export interface VoiceProfile {
  pitch: number;
  rate: number;
  voiceURI?: string;
  voiceGender?: 'male' | 'female';
}

const DEFAULT_THINKER_VOICE_PROFILES: Record<string, VoiceProfile> = {
  // Cohort Genesis (1-11)
  socrates: { pitch: 0.82, rate: 0.88, voiceGender: 'male' },         // Ponderado, grave, maiêutico
  aristotle: { pitch: 0.95, rate: 0.92, voiceGender: 'male' },        // Metódico, lúcido, estruturado
  marcus_aurelius: { pitch: 0.85, rate: 0.85, voiceGender: 'male' },  // Estoico, solene, introspetivo
  suntzu: { pitch: 0.78, rate: 0.98, voiceGender: 'male' },           // Firme, marcial, conciso
  drucker: { pitch: 1.05, rate: 1.02, voiceGender: 'male' },          // Executivo, enérgico, claro
  curie: { pitch: 1.15, rate: 0.98, voiceGender: 'female' },          // Criteriosa, assertiva, científica
  davinci: { pitch: 0.98, rate: 0.94, voiceGender: 'male' },          // Curioso, vívido, criativo
  tesla: { pitch: 1.10, rate: 1.00, voiceGender: 'male' },            // Elétrico, visionário, intenso
  einstein: { pitch: 0.92, rate: 0.90, voiceGender: 'male' },         // Caloroso, reflexivo, sereno
  smith: { pitch: 0.96, rate: 0.95, voiceGender: 'male' },            // Analítico, articulado, equilibrado
  josephus: { pitch: 0.88, rate: 0.90, voiceGender: 'male' },         // Historiador, testemunhal, sóbrio

  // Expansão Pantheon das Grandes Mentes (+9)
  platao: { pitch: 0.90, rate: 0.90, voiceGender: 'male' },           // Dialético, nobre, contemplativo
  'nicolau-maquiavel': { pitch: 0.88, rate: 1.05, voiceGender: 'male' }, // Incisivo, realista, perspicaz
  'isaac-newton': { pitch: 0.85, rate: 0.92, voiceGender: 'male' },   // Rigoroso, formal, matemático
  'alan-turing': { pitch: 1.02, rate: 0.96, voiceGender: 'male' },    // Lógico, analítico, focado
  'ada-lovelace': { pitch: 1.18, rate: 1.00, voiceGender: 'female' }, // Poética, visionária, brilhante
  'friedrich-nietzsche': { pitch: 0.80, rate: 1.02, voiceGender: 'male' }, // Passional, vigoroso, aforístico
  'alexandre-o-grande': { pitch: 0.95, rate: 1.05, voiceGender: 'male' },  // Heroico, vibrante, comandante
  seneca: { pitch: 0.84, rate: 0.86, voiceGender: 'male' },           // Estoico, calmo, meditativo
  'rene-descartes': { pitch: 0.94, rate: 0.92, voiceGender: 'male' }, // Claro, cartesiano, metódico

  // Laureados com o Prémio Nobel da Ciência
  'max-planck': { pitch: 0.86, rate: 0.90, voiceGender: 'male' },        // Pai da física quântica, grave, sóbrio
  'niels-bohr': { pitch: 0.92, rate: 0.92, voiceGender: 'male' },        // Físico atómico, complementar, reflexivo
  'werner-heisenberg': { pitch: 0.98, rate: 0.98, voiceGender: 'male' }, // Mecânica matricial, perspicaz, rigoroso
  'erwin-schrodinger': { pitch: 0.90, rate: 0.94, voiceGender: 'male' }, // Mecânica ondulatória, filosófico, límpido
  'enrico-fermi': { pitch: 0.96, rate: 1.00, voiceGender: 'male' },      // Arquiteto nuclear, pragmático, rápido
  'richard-feynman': { pitch: 1.05, rate: 1.06, voiceGender: 'male' },   // QED, dinâmico, entusiasta e pedagógico
  'ernest-rutherford': { pitch: 0.82, rate: 1.02, voiceGender: 'male' }, // Descobridor do núcleo, vigoroso e direto
  'linus-pauling': { pitch: 0.95, rate: 0.96, voiceGender: 'male' },     // Ligação química, caloroso e humanista
  'alexander-fleming': { pitch: 0.89, rate: 0.92, voiceGender: 'male' }, // Penicilina, atento, meticuloso e sereno
};

export interface VoiceOption {
  name: string;
  lang: string;
  voiceURI: string;
  isPortuguese: boolean;
  genderHint: 'female' | 'male' | 'neutral';
}

export class CouncilAudioSynthesizer {
  // Por padrão a voz vem DESATIVADA: só fala quando explicitamente ativada pelo utilizador
  private isVoiceActivated: boolean = false;
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingActive: boolean = false;
  private speechRateMultiplier: number = 1.0;
  private subscribers: Set<(speaking: boolean, activeId: string | null) => void> = new Set();
  private currentSpeakerId: string | null = null;
  private customVoiceProfiles: Record<string, VoiceProfile> = {};

  constructor() {
    this.loadPersistedSettings();
  }

  public get activeUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }

  private loadPersistedSettings() {
    if (typeof window === 'undefined') return;
    try {
      const savedActivation = localStorage.getItem('mindverse_voice_activated');
      if (savedActivation !== null) {
        this.isVoiceActivated = savedActivation === 'true';
      }
      const savedProfiles = localStorage.getItem('mindverse_voice_profiles');
      if (savedProfiles) {
        this.customVoiceProfiles = JSON.parse(savedProfiles);
      }
    } catch {
      // Ignora falha de storage
    }
  }

  private saveSettings() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('mindverse_voice_activated', String(this.isVoiceActivated));
      localStorage.setItem('mindverse_voice_profiles', JSON.stringify(this.customVoiceProfiles));
    } catch {
      // Ignora falha de storage
    }
  }

  public subscribe(cb: (speaking: boolean, activeId: string | null) => void): () => void {
    this.subscribers.add(cb);
    cb(this.isSpeakingActive, this.currentSpeakerId);
    return () => this.subscribers.delete(cb);
  }

  private notify() {
    for (const sub of this.subscribers) {
      sub(this.isSpeakingActive, this.currentSpeakerId);
    }
  }

  public get isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public get isActivated(): boolean {
    return this.isVoiceActivated;
  }

  public get isMute(): boolean {
    return this.isMuted || !this.isVoiceActivated;
  }

  /**
   * Ativa ou desativa a reprodução de voz falada.
   */
  public setActivated(active: boolean): void {
    this.isVoiceActivated = active;
    this.saveSettings();
    if (!this.isVoiceActivated) {
      this.stop();
    }
  }

  public toggleActivation(): boolean {
    this.isVoiceActivated = !this.isVoiceActivated;
    this.saveSettings();
    if (!this.isVoiceActivated) {
      this.stop();
    }
    return this.isVoiceActivated;
  }

  public setRate(multiplier: number) {
    this.speechRateMultiplier = Math.max(0.7, Math.min(1.5, multiplier));
  }

  public getRate(): number {
    return this.speechRateMultiplier;
  }

  public stop() {
    if (!this.isSupported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignora erro de cancelamento
    }
    this.isSpeakingActive = false;
    this.currentSpeakerId = null;
    this.currentUtterance = null;
    this.notify();
  }

  /**
   * Obtém a coleção de vozes disponíveis no navegador do utilizador.
   */
  public getVoiceCollection(): VoiceOption[] {
    if (!this.isSupported) return [];
    const voices = window.speechSynthesis.getVoices();
    
    return voices.map((v) => {
      const isPt = v.lang.toLowerCase().startsWith('pt');
      let genderHint: 'female' | 'male' | 'neutral' = 'neutral';
      if (/female|mulher|maria|helena|luciana|vitória|camila|zira|yolanda/i.test(v.name)) {
        genderHint = 'female';
      } else if (/male|homem|duarte|joão|antónio|felipe|daniel|david|george/i.test(v.name)) {
        genderHint = 'male';
      }

      return {
        name: v.name,
        lang: v.lang,
        voiceURI: v.voiceURI,
        isPortuguese: isPt,
        genderHint,
      };
    }).sort((a, b) => {
      // Prioriza vozes em português no topo da coleção
      if (a.isPortuguese && !b.isPortuguese) return -1;
      if (!a.isPortuguese && b.isPortuguese) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  public getThinkerProfile(thinkerId: string): VoiceProfile {
    return this.customVoiceProfiles[thinkerId] || DEFAULT_THINKER_VOICE_PROFILES[thinkerId] || { pitch: 1.0, rate: 0.95 };
  }

  public setThinkerVoice(thinkerId: string, voiceURI: string, pitch?: number, rate?: number): void {
    const current = this.getThinkerProfile(thinkerId);
    this.customVoiceProfiles[thinkerId] = {
      ...current,
      voiceURI,
      pitch: pitch ?? current.pitch,
      rate: rate ?? current.rate,
    };
    this.saveSettings();
  }

  public setGlobalVoiceForAll(voiceURI: string, pitch?: number, rate?: number): void {
    for (const key of Object.keys(DEFAULT_THINKER_VOICE_PROFILES)) {
      this.setThinkerVoice(key, voiceURI, pitch, rate);
    }
  }

  /**
   * Converte texto com etiquetas epistémicas para discurso natural audível.
   */
  private prepareSpeechText(rawText: string): string {
    return rawText
      .replace(/\[FACTO DOCUMENTADO\]/gi, '')
      .replace(/\[INTERPRETAÇÃO FUNDAMENTADA\]/gi, '')
      .replace(/\[SIMULAÇÃO HIPOTÉTICA\]/gi, '')
      .replace(/\[LIMITAÇÃO HISTÓRICA RECONHECIDA\]/gi, '')
      .replace(/\[Referência:[^\]]+\]/gi, '')
      .replace(/\[Transparência:[^\]]+\]/gi, '')
      .replace(/--- \[FONTE \d+:[^\]]+\] ---/gi, '')
      .replace(/[*_#`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Encontra a voz selecionada na coleção ou uma correspondência ideal.
   */
  private findMatchingVoice(profile: VoiceProfile): SpeechSynthesisVoice | null {
    if (!this.isSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    // Se o utilizador escolheu uma voz específica na coleção
    if (profile.voiceURI) {
      const match = voices.find(v => v.voiceURI === profile.voiceURI);
      if (match) return match;
    }

    // Procura voz portuguesa (pt-PT ou pt-BR)
    const ptVoices = voices.filter(v => v.lang.toLowerCase().startsWith('pt'));
    if (ptVoices.length > 0) {
      if (profile.voiceGender === 'female') {
        const female = ptVoices.find(v => /female|mulher|maria|helena|luciana|vitória|camila/i.test(v.name));
        if (female) return female;
      } else {
        const male = ptVoices.find(v => /male|homem|duarte|joão|antónio|felipe|daniel/i.test(v.name));
        if (male) return male;
      }
      return ptVoices[0];
    }

    // Fallback: primeira voz disponível
    return voices[0] || null;
  }

  /**
   * Reproduz uma amostra de teste para a voz selecionada.
   */
  public previewVoice(voiceURI: string, pitch = 1.0, rate = 1.0, customText?: string): void {
    if (!this.isSupported) return;
    this.stop();

    const sample = customText || 'A verdadeira sabedoria reside no rigor do pensamento e na busca da verdade.';
    const utterance = new SpeechSynthesisUtterance(sample);
    utterance.pitch = pitch;
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.voiceURI === voiceURI) || voices[0];
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    this.isSpeakingActive = true;
    this.notify();

    utterance.onend = () => {
      this.isSpeakingActive = false;
      this.notify();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeakingActive = false;
      this.notify();
    }
  }

  /**
   * Pronuncia a intervenção de um pensador no Conselho com a sua entoação personalizada.
   * Só fala se a voz estiver ativada (ou se forcePlay for true, ex: clique direto do utilizador no botão Ouvir).
   */
  public speak(
    thinkerId: string,
    rawText: string,
    onComplete?: () => void,
    forcePlay: boolean = false
  ): void {
    // REGRA FUNDAMENTAL: Só fala se a voz estiver ATIVADA ou se o utilizador clicou diretamente para ouvir
    if (!this.isSupported || (!this.isVoiceActivated && !forcePlay)) {
      onComplete?.();
      return;
    }

    const textToSpeak = this.prepareSpeechText(rawText);
    if (!textToSpeak) {
      onComplete?.();
      return;
    }

    // Interrompe qualquer áudio prévio
    this.stop();

    const profile = this.getThinkerProfile(thinkerId);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate * this.speechRateMultiplier;
    utterance.lang = 'pt-PT';

    const matchedVoice = this.findMatchingVoice(profile);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    }

    this.currentSpeakerId = thinkerId;
    this.isSpeakingActive = true;
    this.currentUtterance = utterance;
    this.notify();

    utterance.onend = () => {
      this.isSpeakingActive = false;
      this.currentSpeakerId = null;
      this.currentUtterance = null;
      this.notify();
      onComplete?.();
    };

    utterance.onerror = (e) => {
      console.warn('[CouncilAudio] Erro na síntese de voz:', e);
      this.isSpeakingActive = false;
      this.currentSpeakerId = null;
      this.currentUtterance = null;
      this.notify();
      onComplete?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[CouncilAudio] Falha ao iniciar fala:', err);
      this.isSpeakingActive = false;
      this.notify();
      onComplete?.();
    }
  }
}

export const councilAudio = new CouncilAudioSynthesizer();
