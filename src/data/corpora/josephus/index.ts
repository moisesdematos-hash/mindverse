export interface DocumentSection {
  id: string;
  book: string;
  chapter: string;
  section: string;
  heading: string;
  textOriginalOrTranslation: string;
  epistemicType: 'primary_source' | 'historical_account' | 'scholarly_commentary';
  bibliographicCitation: string;
}

export interface CorpusDocument {
  id: string;
  personalityId: string;
  title: string;
  titleOriginal: string;
  author: string;
  yearPublished: number;
  originalLanguage: string;
  translationLanguage: string;
  translator: string;
  edition: string;
  provenance: string;
  sourceUrl: string;
  licenseStatus: 'public_domain';
  sections: DocumentSection[];
}

export const JOSEPHUS_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-josephus-jewish-war',
    personalityId: '00000000-0000-0000-0000-000000000011',
    title: 'A Guerra dos Judeus',
    titleOriginal: 'Phlauiou Iosēpou peri tou Ioudaïkou polemou (Bellum Iudaicum)',
    author: 'Flavius Josephus (Flávio Josefo)',
    yearPublished: 75,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de domínio público baseada na edição crítica de Benedikt Niese e William Whiston',
    edition: 'Editio Maior de Niese (Berlim, 1887) / Perseus Digital Library',
    provenance: 'Perseus Digital Library (Tufts University) / Project Gutenberg #2850',
    sourceUrl: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'jw-5-1',
        book: 'Livro V',
        chapter: 'Capítulo 1',
        section: 'Secção 1-5',
        heading: 'As Facções Fanáticas em Jerusalém Antes do Cerco Romano',
        textOriginalOrTranslation: 'A cidade de Jerusalém estava despedaçada por três facções sediciosas em fúria mútua: Eleazar, filho de Simão, mantinha o Templo interior; João de Giscala ocupava as galerias exteriores e a colina do Templo; e Simão bar Giora dominava a cidade alta e grande parte da cidade baixa. Em vez de unirem forças para repelir o perigo que se avizinhava sob o estandarte de Roma, os sediciosos guerreavam entre si, queimando os celeiros de cereais que teriam alimentado o povo durante muitos anos de cerco. Assim, a fome foi provocada antes pela discórdia dos nossos próprios homens do que pelas armas dos romanos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, A Guerra dos Judeus, Livro V, Cap. 1, §1-5'
      },
      {
        id: 'jw-5-9',
        book: 'Livro V',
        chapter: 'Capítulo 9',
        section: 'Secção 3-4',
        heading: 'Discurso de Josefo sob as Muralhas de Jerusalém Pedindo a Rendição',
        textOriginalOrTranslation: 'Eu, Josefo, rodeei as muralhas e roguei em língua hebraica aos meus concidadãos que poupassem a si mesmos, ao povo, à sua pátria e ao Templo venerável. Declarei-lhes: "Não percebeis que as armas romanas são o instrumento do destino pelo qual Deus transfere o poder dos impérios? Quando foi que os nossos antepassados venceram os gentios pela violência armada sem a misericórdia de Deus? Pousai as vossas espadas; a guerra contra Roma é uma guerra contra a própria ordem providencial que agora sustenta o César Tito". Mas os rebeldes cobriram-me de injúrias e lançaram setas contra mim a partir dos adarves.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, A Guerra dos Judeus, Livro V, Cap. 9, §3-4'
      },
      {
        id: 'jw-6-4',
        book: 'Livro VI',
        chapter: 'Capítulo 4',
        section: 'Secção 5-7',
        heading: 'O Incêndio do Segundo Templo e a Vontade de Tito',
        textOriginalOrTranslation: 'Tito reuniu o conselho de generais para deliberar se o Templo deveria ser demolido ou poupado. Tito declarou formalmente que, mesmo que os judeus continuassem a combater de dentro dele, ele jamais destruiria uma obra tão magnífica que pertencia a todo o império e honrava o género humano. Todavia, a 10 do mês de Lous (Ab), um soldado romano, impelido por fúria cega e sem esperar ordem de qualquer comandante, arremessou um tição ardente através de uma janela dourada para o interior das câmaras do Templo. Ao ver as chamas erguerem-se, Tito correu para o local bradando e acenando com a mão direita para que os soldados extinguissem o fogo, mas o tumulto das armas e a cólera contra os rebeldes impediram que a sua voz fosse ouvida.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, A Guerra dos Judeus, Livro VI, Cap. 4, §5-7'
      },
      {
        id: 'jw-7-8',
        book: 'Livro VII',
        chapter: 'Capítulo 8',
        section: 'Secção 6-7',
        heading: 'O Cerco de Massada e o Discurso de Eleazar ben Ya\'ir',
        textOriginalOrTranslation: 'Em Massada, vendo que a muralha fora batida pelo aríete de Flávio Silva e que as chamas consumiam a paliçada interior, Eleazar ben Ya\'ir reuniu os mais bravos dos sicários e persuadiu-os de que a morte livre pela própria mão, antes que ver as suas esposas e filhos caírem na escravatura romana, era a resolução mais digna e fiel a Deus. Assim, escolheram dez homens por sorteio para imolarem os restantes, e o último deitou fogo à fortaleza antes de se trespassar com a espada.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, A Guerra dos Judeus, Livro VII, Cap. 8, §6-7'
      }
    ]
  },
  {
    id: 'corp-josephus-antiquities',
    personalityId: '00000000-0000-0000-0000-000000000011',
    title: 'Antiguidades Judaicas',
    titleOriginal: 'Ioudaïkē archaiologia (Antiquitates Judaicae)',
    author: 'Flavius Josephus (Flávio Josefo)',
    yearPublished: 94,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Edição de William Whiston / Corpus Niese',
    edition: 'Antiquitates Judaicae, 20 Livros (Roma, 94 d.C.)',
    provenance: 'Perseus Digital Library / Project Gutenberg #2848',
    sourceUrl: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0146',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'ant-18-1',
        book: 'Livro XVIII',
        chapter: 'Capítulo 1',
        section: 'Secção 2-6',
        heading: 'As Quatro Seitas Judaicas: Fariseus, Saduceus, Essénios e Zelotas',
        textOriginalOrTranslation: 'Os judeus possuíam desde tempos antigos três escolas de filosofia: os Fariseus, que atribuem todos os acontecimentos ao Destino e a Deus sem anular a liberdade da vontade humana, vivendo com sobriedade; os Saduceus, que negam a sobrevivência da alma e afirmam que o homem é o único autor da sua virtude ou vício, aceitando unicamente a Lei escrita; e os Essénios, que praticam a comunhão de bens, a pureza corporal e a caridade inabalável. Judas da Galileia e Zadoque fundaram uma Quarta Filosofia: partilham as crenças dos Fariseus, mas possuem uma paixão indomável pela liberdade, recusando chamar Senhor a qualquer homem mortal que não Deus, tornando-se a semente da rebelião fatal.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, Antiguidades Judaicas, Livro XVIII, Cap. 1, §2-6'
      },
      {
        id: 'ant-18-3',
        book: 'Livro XVIII',
        chapter: 'Capítulo 3',
        section: 'Secção 3',
        heading: 'O Governo de Pôncio Pilatos na Judeia e o Testimonium Flavianum',
        textOriginalOrTranslation: 'Por essa altura apareceu Jesus, um homem sábio, se é lícito chamá-lo homem, pois operava feitos admiráveis e era mestre dos homens que recebem a verdade com regozijo. Atraiu muitos judeus e muitos gentios. Ele era o Cristo. E quando Pilatos, instigado pelos principais entre nós, o condenou à cruz, aqueles que o amaram no início não cessaram de o seguir, pois ele apareceu-lhes vivo ao terceiro dia, como os divinos profetas haviam predito acerca dele.',
        epistemicType: 'historical_account',
        bibliographicCitation: 'Flávio Josefo, Antiguidades Judaicas, Livro XVIII, Cap. 3, §3 (Nota: Passagem amplamente debatida pela crítica filológica quanto a interpolações cristãs primitivas)'
      }
    ]
  },
  {
    id: 'corp-josephus-against-apion',
    personalityId: '00000000-0000-0000-0000-000000000011',
    title: 'Contra Apião',
    titleOriginal: 'Peri tēs tōn Ioudaiōn archaiotētos (Contra Apionem)',
    author: 'Flavius Josephus (Flávio Josefo)',
    yearPublished: 97,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Edição Loeb Classical Library / H. St. J. Thackeray',
    edition: 'Flavius Josephus Against Apion (Harvard University Press / Domínio Público)',
    provenance: 'Loeb Classical Library (1926)',
    sourceUrl: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0215',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'apion-2-16',
        book: 'Livro II',
        chapter: 'Capítulo 16',
        section: 'Secção 164-168',
        heading: 'A Definição de Teocracia e a Excelência Moral da Lei Mosaica',
        textOriginalOrTranslation: 'Alguns legisladores conferiram o poder político a monarquias, outros a oligarquias, outros ainda à multidão democrática. Mas o nosso legislador Moisés não adotou nenhuma dessas formas: instituiu o que poderíamos denominar, forçando a língua grega, uma Teocracia (Theokratia), colocando todo o poder e autoridade nas mãos de Deus. Persuadiu todos a olhar para Ele como o autor de todos os bens e o observador de todas as ações e pensamentos ocultos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, Contra Apião, Livro II, Cap. 16, §164-168'
      }
    ]
  },
  {
    id: 'corp-josephus-life',
    personalityId: '00000000-0000-0000-0000-000000000011',
    title: 'Vida de Josefo (Autobiografia)',
    titleOriginal: 'Iōsēpou bios (De Vita Sua)',
    author: 'Flavius Josephus (Flávio Josefo)',
    yearPublished: 99,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Edição Teubner / William Whiston',
    edition: 'The Life of Flavius Josephus (Niese Edition)',
    provenance: 'Perseus Digital Library',
    sourceUrl: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0150',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'life-1',
        book: 'Autobiografia',
        chapter: 'Secção 1-2',
        section: 'Parágrafo 1-12',
        heading: 'Origem Sacerdotal e Formação Intelectual em Jerusalém',
        textOriginalOrTranslation: 'A minha linhagem não é vulgar, mas provém de sacerdotes desde as origens. Do lado materno descendo da dinastia real dos Hasmoneus. Aos dezasseis anos decidi experimentar as três seitas judaicas — os Fariseus, os Saduceus e os Essénios — para escolher a melhor. Vendo que isso não bastava, passei três anos no deserto junto ao eremita Bano. Aos dezanove anos regressei à cidade e comecei a conduzir a minha vida segundo as regras dos Fariseus.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Flávio Josefo, Vida de Josefo, §1-12'
      }
    ]
  }
];
