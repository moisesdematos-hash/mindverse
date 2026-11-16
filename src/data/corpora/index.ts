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
import { 
  PLATO_CORPUS,
  MACHIAVELLI_CORPUS,
  NEWTON_CORPUS,
  TURING_CORPUS,
  LOVELACE_CORPUS,
  NIETZSCHE_CORPUS,
  ALEXANDER_CORPUS,
  SENECA_CORPUS,
  DESCARTES_CORPUS
} from './expansion_minds';
import {
  NOBEL_PLANCK_CORPUS,
  NOBEL_BOHR_CORPUS,
  NOBEL_HEISENBERG_CORPUS,
  NOBEL_SCHRODINGER_CORPUS,
  NOBEL_FERMI_CORPUS,
  NOBEL_FEYNMAN_CORPUS,
  NOBEL_RUTHERFORD_CORPUS,
  NOBEL_PAULING_CORPUS,
  NOBEL_FLEMING_CORPUS
} from './nobel_minds';

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
export * from './expansion_minds';
export * from './nobel_minds';

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
  // 12. Platão
  '00000000-0000-0000-0000-000000000012': PLATO_CORPUS,
  // 13. Nicolau Maquiavel
  '00000000-0000-0000-0000-000000000013': MACHIAVELLI_CORPUS,
  // 14. Sir Isaac Newton
  '00000000-0000-0000-0000-000000000014': NEWTON_CORPUS,
  // 15. Alan Turing
  '00000000-0000-0000-0000-000000000015': TURING_CORPUS,
  // 16. Ada Lovelace
  '00000000-0000-0000-0000-000000000016': LOVELACE_CORPUS,
  // 17. Friedrich Nietzsche
  '00000000-0000-0000-0000-000000000017': NIETZSCHE_CORPUS,
  // 18. Alexandre, o Grande
  '00000000-0000-0000-0000-000000000018': ALEXANDER_CORPUS,
  // 19. Séneca
  '00000000-0000-0000-0000-000000000019': SENECA_CORPUS,
  // 20. René Descartes
  '00000000-0000-0000-0000-000000000020': DESCARTES_CORPUS,
  // 21. Max Planck
  '00000000-0000-0000-0000-000000000021': NOBEL_PLANCK_CORPUS,
  // 22. Niels Bohr
  '00000000-0000-0000-0000-000000000022': NOBEL_BOHR_CORPUS,
  // 23. Werner Heisenberg
  '00000000-0000-0000-0000-000000000023': NOBEL_HEISENBERG_CORPUS,
  // 24. Erwin Schrödinger
  '00000000-0000-0000-0000-000000000024': NOBEL_SCHRODINGER_CORPUS,
  // 25. Enrico Fermi
  '00000000-0000-0000-0000-000000000025': NOBEL_FERMI_CORPUS,
  // 26. Richard Feynman
  '00000000-0000-0000-0000-000000000026': NOBEL_FEYNMAN_CORPUS,
  // 27. Ernest Rutherford
  '00000000-0000-0000-0000-000000000027': NOBEL_RUTHERFORD_CORPUS,
  // 28. Linus Pauling
  '00000000-0000-0000-0000-000000000028': NOBEL_PAULING_CORPUS,
  // 29. Alexander Fleming
  '00000000-0000-0000-0000-000000000029': NOBEL_FLEMING_CORPUS,
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
    ...PLATO_CORPUS,
    ...MACHIAVELLI_CORPUS,
    ...NEWTON_CORPUS,
    ...TURING_CORPUS,
    ...LOVELACE_CORPUS,
    ...NIETZSCHE_CORPUS,
    ...ALEXANDER_CORPUS,
    ...SENECA_CORPUS,
    ...DESCARTES_CORPUS,
    ...NOBEL_PLANCK_CORPUS,
    ...NOBEL_BOHR_CORPUS,
    ...NOBEL_HEISENBERG_CORPUS,
    ...NOBEL_SCHRODINGER_CORPUS,
    ...NOBEL_FERMI_CORPUS,
    ...NOBEL_FEYNMAN_CORPUS,
    ...NOBEL_RUTHERFORD_CORPUS,
    ...NOBEL_PAULING_CORPUS,
    ...NOBEL_FLEMING_CORPUS,
  ];
};

export const getDocumentsForPersonality = (personalityId: string): CorpusDocument[] => {
  return INITIAL_CORPORA_REGISTRY[personalityId] || [];
};
