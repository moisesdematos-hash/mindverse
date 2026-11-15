import { CorpusDocument } from './josephus';
import { JOSEPHUS_CORPUS } from './josephus';
import { ARISTOTLE_CORPUS } from './aristotle';
import { MARCUS_AURELIUS_CORPUS } from './marcus_aurelius';
import { EINSTEIN_CORPUS } from './einstein';
import { DAVINCI_CORPUS } from './davinci';
import { TESLA_CORPUS } from './tesla';
import { SOCRATES_CORPUS } from './socrates';
import { SUNTZU_CORPUS } from './suntzu';
import { ADAM_SMITH_CORPUS } from './smith';
import { PETER_DRUCKER_CORPUS } from './drucker';
import { CURIE_CORPUS } from './curie';

export * from './josephus';
export * from './aristotle';
export * from './marcus_aurelius';
export * from './einstein';
export * from './davinci';
export * from './tesla';
export * from './socrates';
export * from './suntzu';
export * from './smith';
export * from './drucker';
export * from './curie';

export const INITIAL_CORPORA_REGISTRY: Record<string, CorpusDocument[]> = {
  // 1. Albert Einstein
  '00000000-0000-0000-0000-000000000001': EINSTEIN_CORPUS,
  // 2. Leonardo da Vinci
  '00000000-0000-0000-0000-000000000002': DAVINCI_CORPUS,
  // 3. Nikola Tesla
  '00000000-0000-0000-0000-000000000003': TESLA_CORPUS,
  // 4. Aristóteles
  '00000000-0000-0000-0000-000000000004': ARISTOTLE_CORPUS,
  // 5. Sócrates
  '00000000-0000-0000-0000-000000000005': SOCRATES_CORPUS,
  // 6. Marco Aurélio
  '00000000-0000-0000-0000-000000000006': MARCUS_AURELIUS_CORPUS,
  // 7. Sun Tzu
  '00000000-0000-0000-0000-000000000007': SUNTZU_CORPUS,
  // 8. Adam Smith
  '00000000-0000-0000-0000-000000000008': ADAM_SMITH_CORPUS,
  // 9. Peter Drucker
  '00000000-0000-0000-0000-000000000009': PETER_DRUCKER_CORPUS,
  // 10. Marie Curie
  '00000000-0000-0000-0000-000000000010': CURIE_CORPUS,
  // 11. Flávio Josefo
  '00000000-0000-0000-0000-000000000011': JOSEPHUS_CORPUS,
};

export const getAllCanonicalDocuments = (): CorpusDocument[] => {
  return [
    ...EINSTEIN_CORPUS,
    ...DAVINCI_CORPUS,
    ...TESLA_CORPUS,
    ...ARISTOTLE_CORPUS,
    ...SOCRATES_CORPUS,
    ...MARCUS_AURELIUS_CORPUS,
    ...SUNTZU_CORPUS,
    ...ADAM_SMITH_CORPUS,
    ...PETER_DRUCKER_CORPUS,
    ...CURIE_CORPUS,
    ...JOSEPHUS_CORPUS,
  ];
};

export const getDocumentsForPersonality = (personalityId: string): CorpusDocument[] => {
  return INITIAL_CORPORA_REGISTRY[personalityId] || [];
};
