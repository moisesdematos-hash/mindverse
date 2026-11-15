import { create } from 'zustand';
import { NavigationTab, Personality, UserProfile, Locale, CouncilSession } from '../types';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';
import i18n from '../i18n';

interface AppState {
  currentTab: NavigationTab;
  selectedPersonality: Personality;
  modalPersonality: Personality | null;
  agoraParticipants: Personality[];
  agoraMotion: string;
  agoraRounds: number;
  councilSession: CouncilSession | null;
  isCouncilRunning: boolean;
  currentLiveSpeakerId: string | null;
  currentLiveChunk: string;
  isAuthModalOpen: boolean;
  userProfile: UserProfile;
  errorNotification: string | null;
  currentLocale: Locale;

  // Actions
  setCurrentTab: (tab: NavigationTab) => void;
  setSelectedPersonality: (personality: Personality) => void;
  setModalPersonality: (personality: Personality | null) => void;
  toggleAgoraParticipant: (personality: Personality) => void;
  setAgoraMotion: (motion: string) => void;
  setAgoraRounds: (rounds: number) => void;
  setCouncilSession: (session: CouncilSession | null) => void;
  setIsCouncilRunning: (isRunning: boolean) => void;
  setCurrentLiveSpeaker: (speakerId: string | null, chunk?: string) => void;
  appendLiveChunk: (chunk: string) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setLocale: (locale: Locale) => void;
  setErrorNotification: (message: string | null) => void;
  addTokensUsed: (tokens: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentTab: 'dashboard',
  selectedPersonality: COHORT_GENESIS_PERSONALITIES[0], // Einstein default
  modalPersonality: null,
  agoraParticipants: [
    COHORT_GENESIS_PERSONALITIES[3], // Aristóteles
    COHORT_GENESIS_PERSONALITIES[5], // Marco Aurélio
    COHORT_GENESIS_PERSONALITIES[10] // Flávio Josefo
  ],
  agoraMotion: 'Como deve uma liderança moderna equilibrar a inovação e o crescimento rápido com a prudência ética e o bem comum?',
  agoraRounds: 3,
  councilSession: null,
  isCouncilRunning: false,
  currentLiveSpeakerId: null,
  currentLiveChunk: '',
  isAuthModalOpen: false,
  errorNotification: null,
  currentLocale: (localStorage.getItem('mindverse_locale') as Locale) || 'pt',
  userProfile: {
    id: 'guest-seeker-01',
    email: 'investigador@mindverse.io',
    fullName: 'Investigador Convidado',
    subscriptionTier: 'seeker',
    dailyTokenQuota: 50000,
    tokensUsedToday: 0,
    concurrentRequestsActive: 0,
    maxConcurrentRequests: 2,
    preferredLocale: 'pt'
  },

  setCurrentTab: (tab) => set({ currentTab: tab }),
  setSelectedPersonality: (personality) => set({ selectedPersonality: personality }),
  setModalPersonality: (personality) => set({ modalPersonality: personality }),
  toggleAgoraParticipant: (personality) => set((state) => {
    const exists = state.agoraParticipants.some((p) => p.id === personality.id);
    if (exists) {
      if (state.agoraParticipants.length <= 2) {
        return { errorNotification: 'O Conselho requer no mínimo 2 debatedores.' };
      }
      return { agoraParticipants: state.agoraParticipants.filter((p) => p.id !== personality.id) };
    } else {
      if (state.agoraParticipants.length >= 7) {
        return { errorNotification: 'O Conselho admite até 7 debatedores em simultâneo para garantir a profundidade dialética e a clareza da síntese.' };
      }
      return { agoraParticipants: [...state.agoraParticipants, personality] };
    }
  }),
  setAgoraMotion: (motion) => set({ agoraMotion: motion }),
  setAgoraRounds: (rounds) => set({ agoraRounds: rounds }),
  setCouncilSession: (session) => set({ councilSession: session }),
  setIsCouncilRunning: (isRunning) => set({ isCouncilRunning: isRunning }),
  setCurrentLiveSpeaker: (speakerId, chunk = '') => set({ currentLiveSpeakerId: speakerId, currentLiveChunk: chunk }),
  appendLiveChunk: (chunk) => set((state) => ({ currentLiveChunk: state.currentLiveChunk + chunk })),
  setIsAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  setLocale: (locale) => {
    localStorage.setItem('mindverse_locale', locale);
    i18n.changeLanguage(locale);
    set({ currentLocale: locale });
  },
  setErrorNotification: (message) => set({ errorNotification: message }),
  addTokensUsed: (tokens) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      tokensUsedToday: Math.min(state.userProfile.dailyTokenQuota, state.userProfile.tokensUsedToday + tokens)
    }
  }))
}));
