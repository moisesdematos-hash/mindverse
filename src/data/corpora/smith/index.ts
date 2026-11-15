import { CorpusDocument } from '../josephus';

export const ADAM_SMITH_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-smith-wealth-of-nations',
    personalityId: '00000000-0000-0000-0000-000000000008',
    title: 'A Riqueza das Nações (The Wealth of Nations)',
    titleOriginal: 'An Inquiry into the Nature and Causes of the Wealth of Nations',
    author: 'Adam Smith',
    yearPublished: 1776,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Edição canónica de Edwin Cannan / Domínio Público',
    edition: 'Methuen & Co., Londres (1904)',
    provenance: 'Project Gutenberg #3300 / Liberty Fund Library',
    sourceUrl: 'https://www.gutenberg.org/ebooks/3300',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'as-wn-1',
        book: 'Livro I',
        chapter: 'Capítulo 1-2',
        section: 'Da Divisão do Trabalho e do Princípio da Troca',
        heading: 'Produtividade pela Especialização e Cooperação Mútua',
        textOriginalOrTranslation: 'O maior aprimoramento nas forças produtivas do trabalho e a maior parte da habilidade, destreza e discernimento com que ele é aplicado parecem ter sido efeito da divisão do trabalho. Não é da benevolência do açougueiro, do cervejeiro ou do padeiro que esperamos o nosso jantar, mas da consideração que eles têm pelo seu próprio interesse. Não nos dirigimos à sua humanidade, mas ao seu amor-próprio, e nunca lhes falamos das nossas necessidades, mas das suas vantagens.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Adam Smith, A Riqueza das Nações, Livro I, Cap. 2'
      },
      {
        id: 'as-wn-4',
        book: 'Livro IV',
        chapter: 'Capítulo 2',
        section: 'Das Restrições à Importação',
        heading: 'A Mão Invisível e a Alocação Eficiente de Capital',
        textOriginalOrTranslation: 'Cada indivíduo se esforça continuamente para encontrar o emprego mais vantajoso para o capital que comanda. É a sua própria vantagem, e não a da sociedade, que ele tem em vista. Ao preferir apoiar a atividade interna em vez da estrangeira, e ao direcionar essa atividade de modo a que a sua produção tenha o maior valor possível, ele busca apenas o seu próprio ganho; e é conduzido por uma mão invisível a promover um fim que não fazia parte das suas intenções. Ao buscar o seu próprio interesse, frequentemente promove o da sociedade de modo mais eficaz do que quando realmente pretende promovê-lo.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Adam Smith, A Riqueza das Nações, Livro IV, Cap. 2, §9'
      }
    ]
  },
  {
    id: 'corp-smith-moral-sentiments',
    personalityId: '00000000-0000-0000-0000-000000000008',
    title: 'Teoria dos Sentimentos Morais (The Theory of Moral Sentiments)',
    titleOriginal: 'The Theory of Moral Sentiments',
    author: 'Adam Smith',
    yearPublished: 1759,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Edição canónica de Raphael e Macfie / Domínio Público',
    edition: 'Glasgow Edition of the Works and Correspondence of Adam Smith, Oxford University Press',
    provenance: 'Liberty Fund / Project Gutenberg',
    sourceUrl: 'https://oll.libertyfund.org/titles/smith-the-theory-of-moral-sentiments-and-on-the-origins-of-languages',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'as-tms-1',
        book: 'Parte II: Da Justiça e da Beneficência',
        chapter: 'Secção II, Capítulo 3',
        section: 'Do Sentimento de Justiça',
        heading: 'A Justiça como Pilar Inegociável da Sociedade',
        textOriginalOrTranslation: 'A beneficência é o ornamento que embeleza o edifício, mas a justiça é o pilar principal que sustenta toda a construção. Se for removida, o imenso tecido da sociedade humana desmoronará num instante e se pulverizará em átomos. A sociedade pode subsistir sem que reine entre os homens a mútua beneficência, ainda que num estado menos agradável; mas a prevalência da injustiça destrói-a completamente pela raiz.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Adam Smith, Teoria dos Sentimentos Morais, Parte II, Sec. II, Cap. 3'
      }
    ]
  }
];
