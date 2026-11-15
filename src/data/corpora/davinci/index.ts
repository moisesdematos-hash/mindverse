import { CorpusDocument } from '../josephus';

export const DAVINCI_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-davinci-treatise-painting',
    personalityId: '00000000-0000-0000-0000-000000000002',
    title: 'Tratado da Pintura e da Natureza (Trattato della Pittura)',
    titleOriginal: 'Trattato della Pittura (Codex Urbinas Latinus 1270)',
    author: 'Leonardo da Vinci',
    yearPublished: 1540,
    originalLanguage: 'it',
    translationLanguage: 'pt',
    translator: 'Compilação de Francesco Melzi / Domínio Público',
    edition: 'Bibliotheca Vaticana / Manuscritos Originais de Paris',
    provenance: 'Biblioteca Ambrosiana / Institut de France',
    sourceUrl: 'https://www.gutenberg.org/ebooks/46915',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'ldv-tp-1',
        book: 'Parte I: A Experiência e a Certeza',
        chapter: 'A Primazia da Observação Visual',
        section: 'Saper Vedere e o Método Empírico',
        heading: 'A Experiência como Mãe de Toda a Certeza',
        textOriginalOrTranslation: 'A sabedoria é filha da experiência direta. Aqueles que se apaixonam pela prática sem ciência são como o timoneiro que entra num navio sem leme ou bússola, sem nunca ter a certeza de para onde navega. A prática deve ser sempre construída sobre a boa teoria, da qual a perspetiva e a proporção são a guia e a porta de entrada. Nenhuma investigação humana pode ser chamada de verdadeira ciência se não passar por demonstrações matemáticas e verificação empírica visual.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Leonardo da Vinci, Trattato della Pittura (Codex Urbinas), §1 & §33'
      },
      {
        id: 'ldv-tp-2',
        book: 'Parte II: Mecânica e Forças Naturais',
        chapter: 'A Água, o Peso e o Movimento',
        section: 'Da Dinâmica dos Fluidos e das Máquinas',
        heading: 'A Harmonia Mecânica e os Elementos',
        textOriginalOrTranslation: 'A mecânica é o paraíso das ciências matemáticas, pois é através dela que se colhem os frutos das proporções geométricas. A água é o condutor da natureza: onde a água corre, a vida brota ou a rocha se desgasta. Ao conceber máquinas, devemos imitar a economia suprema com que a natureza constrói os membros dos animais: nenhum elemento é supérfluo, nenhuma força é desperdiçada, cada órgão serve à sua função vital com perfeita elegância.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Leonardo da Vinci, Cadernos de Engenharia e Codex Atlanticus, Folio 147r'
      }
    ]
  }
];
