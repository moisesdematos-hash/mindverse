import { CorpusDocument } from '../josephus';

export const SUNTZU_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-suntzu-art-of-war',
    personalityId: '00000000-0000-0000-0000-000000000007',
    title: 'A Arte da Guerra (Sunzi Bingfa)',
    titleOriginal: 'Sūnzǐ Bīngfǎ (孫子兵法)',
    author: 'Sun Tzu (孫武)',
    yearPublished: -500,
    originalLanguage: 'zh',
    translationLanguage: 'pt',
    translator: 'Edição canónica de Lionel Giles / Domínio Público',
    edition: 'The Art of War, Luzac & Co. (1910) / Textos de Yinqueshan',
    provenance: 'Project Gutenberg #132 / Perseus Digital Library',
    sourceUrl: 'https://www.gutenberg.org/ebooks/132',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'st-art-1',
        book: 'Capítulo I',
        chapter: 'Avaliação dos Planos Iniciais (Ji)',
        section: '§1-5',
        heading: 'Os Cinco Fatores Fundamentais da Estratégia',
        textOriginalOrTranslation: 'A arte da guerra é de importância vital para o Estado: é matéria de vida ou de morte, o caminho para a sobrevivência ou para a ruína. Por isso, deve ser governada por cinco fatores constantes: o Caminho Moral (Dao), o Céu (Tempo), a Terra (Terreno), o Comando (Liderança) e a Doutrina (Organização e Disciplina). O Caminho Moral faz com que o povo esteja em completa harmonia com os seus governantes, de modo a segui-los sem temer as suas vidas nem recuar perante o perigo.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Sun Tzu, A Arte da Guerra, Cap. I: Avaliação Estrutural, §1-5'
      },
      {
        id: 'st-art-3',
        book: 'Capítulo III',
        chapter: 'Ataque por Estratégia (Mou Gong)',
        section: '§1-3',
        heading: 'A Vitória Suprema: Vencer sem Batalhar',
        textOriginalOrTranslation: 'Em toda a arte militar, o supremo princípio é preservar intacto o país inimigo; destruí-lo é inferior. Assim, combater e vencer cem batalhas não é o cume da habilidade; subjugar o exército inimigo sem travar batalha, essa é a excelência suprema. A ordem suprema do estratega é desmantelar a estratégia do adversário; a segunda melhor é romper as suas alianças; a terceira é atacar o exército no campo; a pior de todas as políticas é assediar cidades amuralhadas.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Sun Tzu, A Arte da Guerra, Cap. III: Ataque por Estratégia, §1-3'
      },
      {
        id: 'st-art-6',
        book: 'Capítulo VI',
        chapter: 'O Vazio e o Cheio (Xu Shi)',
        section: '§25-29',
        heading: 'Adaptação Fluida como a Água',
        textOriginalOrTranslation: 'As táticas militares são como a água corrente: assim como a água corrente se afasta das alturas e se precipita para as terras baixas, o exército evita a força do inimigo e ataca o seu vazio. Assim como a água molda o seu curso segundo a natureza do terreno por onde corre, o comandante conquista a vitória adaptando-se continuamente às movimentações e fraquezas do inimigo. As condições da guerra não admitem rigidez perene, tal como a água não tem forma imutável.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Sun Tzu, A Arte da Guerra, Cap. VI: O Vazio e o Cheio, §25-29'
      }
    ]
  }
];
