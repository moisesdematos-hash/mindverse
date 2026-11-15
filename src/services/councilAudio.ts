/**
 * MINDVERSE — Serviço de Síntese de Voz das Grandes Mentes
 * Utiliza a Web Speech API com calibração de timbre, cadência e entoação específica para cada pensador.
 */

export interface VoiceProfile {
  pitch: number;
  rate: number;
  langPrefix?: string;
  voiceGender?: 'male' | 'female';
}

const THINKER_VOICE_PROFILES: Record<string, VoiceProfile> = {
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
};

export class CouncilAudioSynthesizer {
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingActive: boolean = false;

  public get activeUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }
  private speechRateMultiplier: number = 1.0;
  private subscribers: Set<(speaking: boolean, activeId: string | null) => void> = new Set();
  private currentSpeakerId: string | null = null;

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

  public get isMute(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }

  public setRate(multiplier: number) {
    this.speechRateMultiplier = Math.max(0.7, Math.min(1.5, multiplier));
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
   * Converte texto com etiquetas epistémicas para discurso natural audível.
   */
  private prepareSpeechText(rawText: string): string {
    return rawText
      .replace(/\[FACTO DOCUMENTADO\]/gi, 'Facto documentado:')
      .replace(/\[INTERPRETAÇÃO FUNDAMENTADA\]/gi, 'Interpretação fundamentada:')
      .replace(/\[SIMULAÇÃO HIPOTÉTICA\]/gi, 'Simulação hipotética:')
      .replace(/\[LIMITAÇÃO HISTÓRICA RECONHECIDA\]/gi, 'Limitação histórica reconhecida:')
      .replace(/\[Referência:[^\]]+\]/gi, '')
      .replace(/\[Transparência:[^\]]+\]/gi, '')
      .replace(/--- \[FONTE \d+:[^\]]+\] ---/gi, '')
      .replace(/[*_#`]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  }

  /**
   * Encontra a melhor voz disponível no sistema do utilizador (preferência por português).
   */
  private findBestVoice(gender?: 'male' | 'female'): SpeechSynthesisVoice | null {
    if (!this.isSupported) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    // Procura voz portuguesa (pt-PT ou pt-BR)
    const ptVoices = voices.filter(v => v.lang.startsWith('pt'));
    if (ptVoices.length > 0) {
      if (gender === 'female') {
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
   * Pronuncia a intervenção de um pensador no Conselho com a sua entoação personalizada.
   */
  public speak(
    thinkerId: string,
    rawText: string,
    onComplete?: () => void
  ): void {
    if (!this.isSupported || this.isMuted) {
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

    const profile = THINKER_VOICE_PROFILES[thinkerId] || { pitch: 1.0, rate: 0.95 };
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate * this.speechRateMultiplier;
    utterance.lang = 'pt-PT';

    const bestVoice = this.findBestVoice(profile.voiceGender);
    if (bestVoice) {
      utterance.voice = bestVoice;
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
