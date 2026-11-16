export type Locale = 'pt' | 'en' | 'fr' | 'es';

export type PersonalityCategory =
  | 'physics_and_science'
  | 'invention_and_universal_genius'
  | 'electrical_engineering'
  | 'classical_philosophy'
  | 'stoic_philosophy'
  | 'military_strategy'
  | 'political_economy'
  | 'management_science'
  | 'radioactivity_and_chemistry'
  | 'ancient_history_and_judaica'
  | 'political_philosophy'
  | 'classical_computing'
  | 'existential_philosophy'
  | 'medicine_and_life_sciences'
  | 'presidential_leadership'
  | 'statecraft_and_parliament'
  | 'industrial_invention'
  | 'classical_historiography';

export interface PersonalityWork {
  id: string;
  title: string;
  year: number;
  originalLanguage: string;
  provenance: string;
  licenseStatus: 'public_domain' | 'open_access';
  description: string;
}

export interface Personality {
  id: string;
  slug: string;
  name: string;
  titleEpithet: string;
  historicalEra: string;
  category: PersonalityCategory;
  shortBio: string;
  coreWorldview: string;
  historicalContextNotes: string; // Contexto crítico, proveniência e limitações historiográficas
  axioms: string[];
  avatarUrl: string;
  quoteFeatured: string;
  bornYear: number;
  deathYear: number;
  nativeLanguage: string;
  works: PersonalityWork[];
  accentColor?: string;
  biographyAndFeats?: string;
  completeCorpusAndTheories?: string;
  philosophicalMethod?: string;
}

export type EpistemicStatus = 
  | 'documented_fact'            // Facto com fonte primária direta
  | 'historical_interpretation'   // Interpretação e inferência historiográfica
  | 'hypothetical_simulation';   // Aplicação da mundivisão a dilemas modernos

export interface MessageCitation {
  id: string;
  workTitle: string;
  section: string;
  quoteSnippet: string;
  similarityScore: number;
  epistemicType: 'primary_source' | 'historical_account' | 'scholarly_commentary';
}

export interface Message {
  id: string;
  conversationId: string;
  senderPersonalityId: string | null; // null = Utilizador
  role: 'user' | 'assistant' | 'system';
  content: string;
  epistemicStatus: EpistemicStatus;
  tokensUsed: number;
  modelUsed?: string;
  createdAt: string;
  citations?: MessageCitation[];
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  mode: 'solo' | 'debate' | 'inquiry';
  status: 'active' | 'archived';
  createdAt: string;
  updated_at: string;
  participants: Personality[];
}

export interface DebateSession {
  id: string;
  conversationId: string;
  debateMotion: string;
  maxRounds: number;
  currentRound: number;
  turnOrder: string[]; // Personality IDs
  consensusSummary?: string;
  divergencePoints?: string;
  status: 'draft' | 'in_progress' | 'completed';
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  subscriptionTier: 'seeker' | 'scholar' | 'institution';
  dailyTokenQuota: number;
  tokensUsedToday: number;
  concurrentRequestsActive: number;
  maxConcurrentRequests: number;
  preferredLocale: Locale;
}

export interface CouncilIntervention {
  id: string;
  personalityId: string;
  personalityName: string;
  personalityAvatar: string;
  roundNumber: number;
  stage: 'independent_thesis' | 'cross_examination' | 'deepening' | 'final_verdict';
  content: string;
  citations: MessageCitation[];
  epistemicStatus: EpistemicStatus;
  tokensUsed: number;
  createdAt: string;
}

export interface CouncilRound {
  roundNumber: number;
  title: string;
  description: string;
  interventions: CouncilIntervention[];
  isCompleted: boolean;
}

export interface CouncilSynthesis {
  coreProblem: string;
  collectiveDiagnosis: string;
  individualPositions: Array<{
    personalityName: string;
    coreArgument: string;
    axiomaticFoundation: string;
  }>;
  convergences: string[];
  irreducibleDivergences: string[];
  strongestArguments: string[];
  systemicRisks: string[];
  strategicRecommendation: string;
  actionPlan: Array<{
    step: number;
    action: string;
    championMind: string;
  }>;
}

export interface CouncilSession {
  id: string;
  userId?: string;
  motion: string;
  contextNotes?: string;
  participants: Personality[];
  maxRounds: number;
  currentRound: number;
  currentSpeakerId?: string;
  status: 'idle' | 'assembling' | 'in_progress' | 'paused' | 'completed' | 'error';
  rounds: CouncilRound[];
  synthesis?: CouncilSynthesis;
  totalTokensUsed: number;
  estimatedCostUsd: number;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export type NavigationTab = 'dashboard' | 'library' | 'chat' | 'agora' | 'settings' | 'about';
