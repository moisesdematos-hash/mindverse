import { CorpusDocument } from './josephus';
import { JOSEPHUS_CORPUS } from './josephus';
import { ARISTOTLE_CORPUS } from './aristotle';
import { MARCUS_AURELIUS_CORPUS } from './marcus_aurelius';

export * from './josephus';
export * from './aristotle';
export * from './marcus_aurelius';

export const INITIAL_CORPORA_REGISTRY: Record<string, CorpusDocument[]> = {
  '00000000-0000-0000-0000-000000000011': JOSEPHUS_CORPUS,
  '00000000-0000-0000-0000-000000000004': ARISTOTLE_CORPUS,
  '00000000-0000-0000-0000-000000000006': MARCUS_AURELIUS_CORPUS,
};

export const getAllCanonicalDocuments = (): CorpusDocument[] => {
  return [
    ...JOSEPHUS_CORPUS,
    ...ARISTOTLE_CORPUS,
    ...MARCUS_AURELIUS_CORPUS,
  ];
};

export const getDocumentsForPersonality = (personalityId: string): CorpusDocument[] => {
  return INITIAL_CORPORA_REGISTRY[personalityId] || [];
};
