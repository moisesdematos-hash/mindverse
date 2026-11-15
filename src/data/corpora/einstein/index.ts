import { CorpusDocument } from '../josephus';

export const EINSTEIN_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-einstein-special-relativity',
    personalityId: '00000000-0000-0000-0000-000000000001',
    title: 'Sobre a Eletrodinâmica dos Corpos em Movimento (Zur Elektrodynamik bewegter Körper)',
    titleOriginal: 'Zur Elektrodynamik bewegter Körper',
    author: 'Albert Einstein',
    yearPublished: 1905,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Edição canónica de domínio público',
    edition: 'Annalen der Physik, Leipzig, Vol. 17',
    provenance: 'Annalen der Physik (1905) / John Stachel (Einstein Collected Papers)',
    sourceUrl: 'https://einsteinpapers.press.princeton.edu/',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'ein-sr-1',
        book: 'Parte I: Cinemática',
        chapter: 'Secção 1-2',
        section: 'Definição de Simultaneidade e Princípio da Relatividade',
        heading: 'A Invariância da Luz e a Relatividade do Tempo',
        textOriginalOrTranslation: 'As leis pelas quais os estados dos sistemas físicos se alteram não dependem de a que referencial, de entre dois sistemas de coordenadas em movimento uniforme de translação, essas alterações de estado sejam referidas. A velocidade da luz no vazio possui sempre o mesmo valor c, independentemente do estado de movimento do corpo emissor. O tempo não possui valor absoluto: dois acontecimentos simultâneos para um observador inercial não são simultâneos para outro em movimento relativo.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Albert Einstein, Zur Elektrodynamik bewegter Körper, Annalen der Physik 17 (1905), §1-2'
      },
      {
        id: 'ein-sr-2',
        book: 'Parte II: Eletrodinâmica',
        chapter: 'Secção 10',
        section: 'Equivalência Massa-Energia',
        heading: 'A Inércia de um Corpo Depende do seu Conteúdo Energético',
        textOriginalOrTranslation: 'Se um corpo emite a energia L sob a forma de radiação, a sua massa diminui em L/c². A massa de um corpo é uma medida do seu conteúdo de energia; se a energia for alterada por E, a massa varia na mesma proporção em E/(9 × 10²⁰), quando a energia for medida em ergs e a massa em gramas.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Albert Einstein, Ist die Trägheit eines Körpers von seinem Energieinhalt abhängig?, Annalen der Physik (1905), §1'
      }
    ]
  },
  {
    id: 'corp-einstein-worldview',
    personalityId: '00000000-0000-0000-0000-000000000001',
    title: 'Como Eu Vejo o Mundo (Mein Weltbild)',
    titleOriginal: 'Mein Weltbild',
    author: 'Albert Einstein',
    yearPublished: 1934,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Tradução de domínio público',
    edition: 'Mein Weltbild, Querido Verlag, Amesterdão',
    provenance: 'Einstein Archives / Public Domain Essays',
    sourceUrl: 'https://einsteinpapers.press.princeton.edu/',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'ein-wb-1',
        book: 'O Sentido da Vida e a Liberdade',
        chapter: 'Capítulo 1',
        section: 'O Significado da Vida Humana',
        heading: 'Humanismo, Cooperação e Liberdade Intelectual',
        textOriginalOrTranslation: 'O homem existe para os outros homens: em primeiro lugar, para aqueles de cujo sorriso e bem-estar depende a nossa felicidade; depois, para os incontáveis desconhecidos a cujo destino estamos ligados por laços de simpatia. Todos os dias lembro a mim mesmo que a minha vida exterior e interior repousa no trabalho dos outros homens, vivos e mortos, e que devo esforçar-me por retribuir na mesma medida em que recebi e continuo a receber.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Albert Einstein, Mein Weltbild (1934), Cap. 1: O Sentido da Vida'
      },
      {
        id: 'ein-wb-2',
        book: 'Ciência e Religião Cósmica',
        chapter: 'Capítulo 3',
        section: 'A Religiosidade Cósmica',
        heading: 'A Harmonia Racional da Natureza e o Mistério',
        textOriginalOrTranslation: 'A experiência mais bela e profunda que o homem pode ter é a sensação do misterioso. É o princípio gerador de toda a arte e ciência autêntica. Aquele para quem essa emoção é estranha já está, por assim dizer, morto. O sentimento religioso cósmico consiste na admiração reverente perante a harmonia sublime das leis naturais, na qual se revela uma inteligência de tal magnitude que, comparada com ela, todo o pensamento e esforço humano são reflexos pálidos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Albert Einstein, Mein Weltbild (1934), Cap. 3: Religiosidade Cósmica'
      }
    ]
  }
];
