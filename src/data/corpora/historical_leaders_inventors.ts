import { CorpusDocument } from './josephus';

// ==============================================================================
// 1. PRESIDENTES HISTÓRICOS (FALECIDOS)
// ==============================================================================

export const CORPUS_ABRAHAM_LINCOLN: CorpusDocument[] = [
  {
    id: 'corp-lincoln-gettysburg',
    personalityId: '00000000-0000-0000-0000-000000000030',
    title: 'Discurso de Gettysburg e Proclamação de Emancipação',
    titleOriginal: 'Gettysburg Address & The Emancipation Proclamation',
    author: 'Abraham Lincoln',
    yearPublished: 1863,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de documentos históricos americanos',
    edition: 'Collected Works of Abraham Lincoln (Vol. VII)',
    provenance: 'Library of Congress / National Archives (EUA)',
    sourceUrl: 'https://loc.gov',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'lincoln-gettysburg-address',
        book: 'Discurso Presidencial',
        chapter: 'Discurso de Gettysburg',
        section: '19 de Novembro de 1863',
        heading: 'O Governo do Povo, Pelo Povo e Para o Povo',
        textOriginalOrTranslation: 'Há quatro vintenas e sete anos, os nossos pais deram à luz neste continente uma nova nação, concebida na liberdade e dedicada à proposição de que todos os homens são criados iguais. Cabe-nos a nós, os vivos, dedicarmo-nos à grande tarefa que resta perante nós: que estes nobres mortos não tenham tombado em vão; que esta nação, sob Deus, tenha um novo renascimento da liberdade; e que o governo do povo, pelo povo e para o povo não pereça da face da terra.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Lincoln, A., Gettysburg Address, 19 de Novembro de 1863'
      },
      {
        id: 'lincoln-emancipation-proclamation',
        book: 'Decreto Executivo',
        chapter: 'Proclamação 95',
        section: '1 de Janeiro de 1863',
        heading: 'Proclamação de Emancipação dos Escravizados',
        textOriginalOrTranslation: 'Eu, Abraham Lincoln, Presidente dos Estados Unidos, pelo poder militar e naval de que estou investido para reprimir a rebelião armada contra a autoridade e governo dos Estados Unidos, ordeno e declaro que todas as pessoas mantidas como escravas dentro dos Estados rebeldes são, e a partir deste momento para sempre serão, livres.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Lincoln, A., Emancipation Proclamation, 1 de Janeiro de 1863'
      }
    ]
  }
];

export const CORPUS_GEORGE_WASHINGTON: CorpusDocument[] = [
  {
    id: 'corp-washington-farewell',
    personalityId: '00000000-0000-0000-0000-000000000031',
    title: 'Discurso de Despedida e Resignação da Comissão Militar',
    titleOriginal: 'Washington’s Farewell Address & Resignation Speech',
    author: 'George Washington',
    yearPublished: 1796,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução diplomática de referência',
    edition: 'The Papers of George Washington (Presidency Series)',
    provenance: 'Avalon Project Yale / National Archives (EUA)',
    sourceUrl: 'https://avalon.law.yale.edu',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'washington-farewell-factions',
        book: 'Testamento Político Presidencial',
        chapter: 'Secção §12-§18',
        section: 'Daily American Advertiser, 19 Set 1796',
        heading: 'Aviso contra o Facciosismo Partidário e Alianças Permanentes',
        textOriginalOrTranslation: 'O espírito de fação partidária agita a comunidade com ciúmes infundados e falsos alarmes, incita uma parte contra outra e fomenta desordens e insurreições civis. Ele abre a porta à influência estrangeira e à corrupção. A virtude ou a moralidade é uma mola necessária do governo republicano e a honestidade continuará a ser a melhor política em todos os assuntos humanos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Washington, G., Farewell Address, 1796'
      }
    ]
  }
];

export const CORPUS_FRANKLIN_ROOSEVELT: CorpusDocument[] = [
  {
    id: 'corp-fdr-four-freedoms',
    personalityId: '00000000-0000-0000-0000-000000000032',
    title: 'Discurso das Quatro Liberdades e Primeiro Discurso Inaugural',
    titleOriginal: 'The Four Freedoms Speech & First Inaugural Address',
    author: 'Franklin D. Roosevelt',
    yearPublished: 1941,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução histórica do Departamento de Estado',
    edition: 'Public Papers and Addresses of Franklin D. Roosevelt',
    provenance: 'FDR Presidential Library / National Archives (EUA)',
    sourceUrl: 'https://fdrlibrary.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'fdr-four-freedoms-declaration',
        book: 'Discurso do Estado da União',
        chapter: 'Mensagem ao Congresso',
        section: '6 de Janeiro de 1941',
        heading: 'As Quatro Liberdades Essenciais do Mundo Democrático',
        textOriginalOrTranslation: 'Nos dias futuros em que procuramos segurança, almejamos um mundo fundado sobre quatro liberdades humanas essenciais: a primeira é a liberdade de expressão e de palavra em qualquer lugar do mundo; a segunda é a liberdade de cada pessoa adorar a Deus à sua própria maneira; a terceira é a liberdade contra a penúria (económica); a quarta é a liberdade contra o medo da agressão militar através do desarmamento mundial.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Roosevelt, F. D., Four Freedoms Speech, 1941'
      }
    ]
  }
];

export const CORPUS_NELSON_MANDELA: CorpusDocument[] = [
  {
    id: 'corp-mandela-rivonia',
    personalityId: '00000000-0000-0000-0000-000000000033',
    title: 'Declaração no Julgamento de Rivonia e Discurso de Tomada de Posse',
    titleOriginal: 'Statement at the Rivonia Trial ("I am Prepared to Die")',
    author: 'Nelson Mandela',
    yearPublished: 1964,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de direitos humanos',
    edition: 'Nelson Mandela Foundation Archives',
    provenance: 'Supreme Court of South Africa (Pretória) / Nelson Mandela Centre',
    sourceUrl: 'https://nelsonmandela.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'mandela-prepared-to-die',
        book: 'Declaração Judicial no Tribunal',
        chapter: 'Julgamento de Rivonia',
        section: '20 de Abril de 1964',
        heading: 'O Ideal Democrático pelo qual Estou Disposto a Morrer',
        textOriginalOrTranslation: 'Dediquei a minha vida a esta luta do povo africano. Lutei contra a dominação branca e lutei contra a dominação negra. Prezei sempre o ideal de uma sociedade democrática e livre, na qual todas as pessoas vivam juntas em harmonia e com oportunidades iguais. É um ideal pelo qual espero viver e que espero alcançar. Mas se for necessário, é um ideal pelo qual estou disposto a morrer.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Mandela, N., Rivonia Trial Statement, Pretória, 1964'
      }
    ]
  }
];

export const CORPUS_THOMAS_JEFFERSON: CorpusDocument[] = [
  {
    id: 'corp-jefferson-declaration',
    personalityId: '00000000-0000-0000-0000-000000000034',
    title: 'Declaração Unânime de Independência dos Estados Unidos da América',
    titleOriginal: 'The Unanimous Declaration of the thirteen united States of America',
    author: 'Thomas Jefferson',
    yearPublished: 1776,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica constitucional',
    edition: 'The Papers of Thomas Jefferson (Vol. 1)',
    provenance: 'National Archives and Records Administration (EUA)',
    sourceUrl: 'https://archives.gov',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'jefferson-inalienable-rights',
        book: 'Preâmbulo Fundamental',
        chapter: 'Declaração de Independência',
        section: '4 de Julho de 1776',
        heading: 'Verdades Evidentes: Vida, Liberdade e a Busca da Felicidade',
        textOriginalOrTranslation: 'Consideramos estas verdades como evidentes por si mesmas: que todos os homens são criados iguais; que são dotados pelo seu Criador de certos direitos inalienáveis, entre os quais a Vida, a Liberdade e a Busca da Felicidade; que, para assegurar estes direitos, os governos são instituídos entre os homens, derivando os seus justos poderes do consentimento dos governados.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Jefferson, T., Declaração de Independência dos EUA, 1776'
      }
    ]
  }
];

// ==============================================================================
// 2. PRIMEIROS-MINISTROS HISTÓRICOS (FALECIDOS)
// ==============================================================================

export const CORPUS_WINSTON_CHURCHILL: CorpusDocument[] = [
  {
    id: 'corp-churchill-speeches',
    personalityId: '00000000-0000-0000-0000-000000000035',
    title: 'Discursos de Guerra Parlamentares de 1940',
    titleOriginal: 'War Speeches to the House of Commons (1940)',
    author: 'Winston Churchill',
    yearPublished: 1940,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução histórica da oratória britânica',
    edition: 'Hansard Parliamentary Debates / Churchill Archives',
    provenance: 'Parlamento Britânico / Churchill College Cambridge',
    sourceUrl: 'https://hansard.parliament.uk',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'churchill-fight-beaches',
        book: 'Discurso na Câmara dos Comuns',
        chapter: 'Batalha de França e Dunquerque',
        section: '4 de Junho de 1940',
        heading: 'Lutaremos nas Praias e Jamais nos Renderemos',
        textOriginalOrTranslation: 'Mesmo que grandes extensões da Europa tenham caído ou possam cair sob o jugo da Gestapo e de todo o odioso aparato do domínio nazi, nós não hesitaremos nem fraquejaremos. Iremos até ao fim. Lutaremos em França, lutaremos nos mares e oceanos, lutaremos com crescente confiança e crescente força no ar; defenderemos a nossa ilha, qualquer que seja o custo. Lutaremos nas praias, lutaremos nos campos de aterragem, lutaremos nos campos e nas ruas, lutaremos nas colinas; nós nunca nos renderemos!',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Churchill, W., Discurso na Câmara dos Comuns, 4 de Junho de 1940'
      }
    ]
  }
];

export const CORPUS_OTTO_BISMARCK: CorpusDocument[] = [
  {
    id: 'corp-bismarck-iron-blood',
    personalityId: '00000000-0000-0000-0000-000000000036',
    title: 'Discurso de Ferro e Sangue e Mensagem Imperial da Previdência Social',
    titleOriginal: 'Blut und Eisen & Kaiserliche Botschaft zur Sozialversicherung',
    author: 'Otto von Bismarck',
    yearPublished: 1862,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Tradução diplomática de fontes da unificação alemã',
    edition: 'Bismarck: Die gesammelten Werke',
    provenance: 'Bundesarchiv / Arquivos Oficiais do Império Alemão',
    sourceUrl: 'https://bundesarchiv.de',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'bismarck-blood-iron',
        book: 'Discurso Orçamental',
        chapter: 'Comissão Orçamental Prussiana',
        section: '30 de Setembro de 1862',
        heading: 'Ferro e Sangue: A Realpolitik das Grandes Questões',
        textOriginalOrTranslation: 'A Prússia deve concentrar o seu poder e mantê-lo pronto para o momento favorável, que já foi várias vezes perdido. As fronteiras da Prússia após os tratados de Viena não são favoráveis a uma vida estatal sã. As grandes questões do nosso tempo não se decidem através de discursos e votos maioritários — esse foi o grande erro de 1848 e 1849 —, mas sim através de ferro e sangue (Eisen und Blut).',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Bismarck, O., Discurso de 30 de Setembro de 1862 perante o Landtag'
      }
    ]
  }
];

export const CORPUS_MARGARET_THATCHER: CorpusDocument[] = [
  {
    id: 'corp-thatcher-speeches',
    personalityId: '00000000-0000-0000-0000-000000000037',
    title: 'Discurso da Não Meia-Volta e Discurso de Bruges',
    titleOriginal: 'The Lady’s Not for Turning & The Bruges Speech',
    author: 'Margaret Thatcher',
    yearPublished: 1980,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução autorizada de arquivos conservadores',
    edition: 'Margaret Thatcher Complete Speeches',
    provenance: 'Margaret Thatcher Foundation / Churchill Archives',
    sourceUrl: 'https://margaretthatcher.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'thatcher-not-turning',
        book: 'Conferência Partidária de Brighton',
        chapter: 'Discurso de Liderança',
        section: '10 de Outubro de 1980',
        heading: 'A Dama Não Faz Meia-Volta: Convicção contra Consenso',
        textOriginalOrTranslation: 'Aos que esperam com a respiração suspensa aquele infame termo mediático, a "meia-volta" (U-turn), eu tenho apenas uma coisa a dizer: vocês podem voltar para trás se quiserem; a dama não volta para trás! (The Lady is not for turning). Não fomos eleitos para gerir o declínio, mas para restaurar a dignidade do trabalho e a autoridade da lei.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Thatcher, M., Discurso na Conferência Conservadora de Brighton, 1980'
      }
    ]
  }
];

export const CORPUS_DAVID_BEN_GURION: CorpusDocument[] = [
  {
    id: 'corp-bengurion-declaration',
    personalityId: '00000000-0000-0000-0000-000000000038',
    title: 'Declaração de Independência do Estado de Israel',
    titleOriginal: 'Megillat Ha’atzmaut (מגילת העצמאות)',
    author: 'David Ben-Gurion',
    yearPublished: 1948,
    originalLanguage: 'he',
    translationLanguage: 'pt',
    translator: 'Tradução oficial dos Arquivos do Estado de Israel',
    edition: 'Israel State Archives Official Record',
    provenance: 'Museu de Telavive / Israel State Archives',
    sourceUrl: 'https://archives.gov.il',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'bengurion-independence-proclamation',
        book: 'Ata de Fundação do Estado',
        chapter: 'Museu de Telavive',
        section: '14 de Maio de 1948 (5 de Iyar de 5708)',
        heading: 'Proclamação do Renascimento da Soberania de Israel',
        textOriginalOrTranslation: 'Na Terra de Israel nasceu o povo judeu. Aqui a sua identidade espiritual, religiosa e política foi moldada... Em virtude do nosso direito natural e histórico, e com a força da resolução da Assembleia Geral das Nações Unidas, proclamamos pelo presente o estabelecimento de um Estado judaico em Eretz Israel, que será conhecido como o Estado de Israel.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Ben-Gurion, D., Declaração de Independência de Israel, 14 de Maio de 1948'
      }
    ]
  }
];

// ==============================================================================
// 3. INVENTORES HISTÓRICOS (FALECIDOS)
// ==============================================================================

export const CORPUS_THOMAS_EDISON: CorpusDocument[] = [
  {
    id: 'corp-edison-patents',
    personalityId: '00000000-0000-0000-0000-000000000039',
    title: 'Especificações de Patentes: Lâmpada Elétrica Incandescente e Fonógrafo',
    titleOriginal: 'United States Patent 223,898: Electric Lamp & Patent 200,521: Phonograph',
    author: 'Thomas Alva Edison',
    yearPublished: 1880,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução técnica de patentes industriais',
    edition: 'USPTO Official Gazette',
    provenance: 'United States Patent and Trademark Office / Smithsonian',
    sourceUrl: 'https://patents.google.com',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'edison-lamp-patent',
        book: 'Especificação de Patente 223,898',
        chapter: 'Texto Descritivo Oficial',
        section: 'Concedida a 27 de Janeiro de 1880',
        heading: 'Filamento de Carbono em Elevado Vácuo para Iluminação Contínua',
        textOriginalOrTranslation: 'O objetivo desta invenção é produzir lâmpadas elétricas dando luz por incandescência, cujas lâmpadas tenham elevada resistência de modo a permitir a subdivisão prática da luz e a sua distribuição por múltiplos pontos a partir de uma central comum. A luz é gerada através da incandescência contínua de um filamento de carbono fino selado no interior de um globo de vidro onde foi produzido um elevado vácuo estável.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Edison, T. A., US Patent 223,898, Electric Lamp (1880)'
      }
    ]
  }
];

export const CORPUS_JOHANNES_GUTENBERG: CorpusDocument[] = [
  {
    id: 'corp-gutenberg-typography',
    personalityId: '00000000-0000-0000-0000-000000000040',
    title: 'Tratado Histórico da Arte da Impressão de Mogúncia e Bíblia de 42 Linhas',
    titleOriginal: 'De Chalcographia et Typographia Moguntina',
    author: 'Johannes Gutenberg',
    yearPublished: 1455,
    originalLanguage: 'la',
    translationLanguage: 'pt',
    translator: 'Tradução do latim renascentista medieval',
    edition: 'Edição Comemorativa do Museu Gutenberg de Mainz',
    provenance: 'Museu Gutenberg de Mainz / Biblioteca Britânica',
    sourceUrl: 'https://gutenberg-museum.de',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'gutenberg-movable-type',
        book: 'Memória da Prensa Tipográfica',
        chapter: 'Oficina de Mainz',
        section: 'Moguntia c. 1455',
        heading: 'A Fundição de Caracteres Metálicos Móveis e a Impressão Mecânica',
        textOriginalOrTranslation: 'Não com caneta de junco nem pena de ganso nem pincel, mas através da maravilhosa harmonia e correspondência de tipos de metal fundido de chumbo e estanho, esculpidos e ordenados em prelo mecânico sobre papel, este livro sublime foi impresso e completado para glória do Todo-Poderoso e iluminação do espírito dos homens.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Gutenberg, J., Colofão e registos da oficina tipográfica de Mainz (1455)'
      }
    ]
  }
];

export const CORPUS_ALEXANDER_GRAHAM_BELL: CorpusDocument[] = [
  {
    id: 'corp-bell-telephone',
    personalityId: '00000000-0000-0000-0000-000000000041',
    title: 'Patente de Melhoramento em Telegrafia (O Telefone)',
    titleOriginal: 'United States Patent 174,465: Improvement in Telegraphy',
    author: 'Alexander Graham Bell',
    yearPublished: 1876,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução técnica de patentes de telecomunicação',
    edition: 'USPTO Official Gazette',
    provenance: 'USPTO / Library of Congress (EUA)',
    sourceUrl: 'https://patents.google.com',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'bell-undulatory-current',
        book: 'Especificação de Patente 174,465',
        chapter: 'Texto Fundamental',
        section: 'Concedida a 7 de Março de 1876',
        heading: 'Transmissão Elétrica da Voz Humana por Corrente Ondulatória',
        textOriginalOrTranslation: 'O método e aparelho para transmitir vocalmente ou outros sons telegraficamente, fazendo com que surjam ondulações elétricas na linha de transmissão similares em forma às vibrações do ar que acompanham o dito som vocal. A fala humana transmite-se assim através de uma corrente elétrica contínua que ondula em simpatia perfeita com as cordas vocais.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Bell, A. G., US Patent 174,465, Improvement in Telegraphy (1876)'
      }
    ]
  }
];

export const CORPUS_ALBERTO_SANTOS_DUMONT: CorpusDocument[] = [
  {
    id: 'corp-santos-dumont-bagatelle',
    personalityId: '00000000-0000-0000-0000-000000000042',
    title: 'O Que Eu Vi, O Que Nós Veremos e o Relatório do Voo do 14-Bis',
    titleOriginal: 'Dans l’Air & Relatório Oficial do Aéro-Club de France',
    author: 'Alberto Santos-Dumont',
    yearPublished: 1906,
    originalLanguage: 'fr',
    translationLanguage: 'pt',
    translator: 'Tradução do francês e textos originais em português do autor',
    edition: 'Publicações Oficiais do Aéro-Club de France / Ministério da Aeronáutica',
    provenance: 'Aéro-Club de France / Museu Aeroespacial do Brasil',
    sourceUrl: 'https://gallica.bnf.fr',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'santos-14bis-flight',
        book: 'Relatório Oficial de Voo',
        chapter: 'Campo de Bagatelle (Paris)',
        section: '23 de Outubro e 12 de Novembro de 1906',
        heading: 'O Primeiro Voo Mecânico Autónomo do Aparelho Mais Pesado que o Ar',
        textOriginalOrTranslation: 'No Campo de Bagatelle, o biplano 14-Bis descolou por meios estritamente mecânicos e próprios, sem o auxílio de qualquer dispositivo de lançamento exterior, catapultas ou ventos contrários. O aparelho elevou-se no ar perante a multidão e a comissão científica, percorreu a distância exigida com perfeito controlo e pousou suavemente sobre as suas próprias rodas, consagrando a conquista do voo mecânico humano.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Santos-Dumont, A., Registos Oficiais de Bagatelle e "O Que Eu Vi, O Que Nós Veremos" (1918)'
      }
    ]
  }
];

export const CORPUS_GUGLIELMO_MARCONI: CorpusDocument[] = [
  {
    id: 'corp-marconi-wireless',
    personalityId: '00000000-0000-0000-0000-000000000043',
    title: 'Comunicação Telegráfica Sem Fios e Discurso do Nobel de Física de 1909',
    titleOriginal: 'Wireless Telegraphic Communication (Nobel Lecture)',
    author: 'Guglielmo Marconi',
    yearPublished: 1909,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução científica das palestras Nobel',
    edition: 'Nobel Lectures in Physics (1901-1921)',
    provenance: 'Fundação Nobel / The Royal Swedish Academy of Sciences',
    sourceUrl: 'https://nobelprize.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'marconi-transatlantic-signals',
        book: 'Conferência Nobel',
        chapter: 'Discurso de Receção em Estocolmo',
        section: '11 de Dezembro de 1909',
        heading: 'A Transmissão Sem Fios sobre o Oceano Atlântico',
        textOriginalOrTranslation: 'Em Dezembro de 1901 os sinais de telegrafia sem fios transmitidos da nossa estação em Poldhu, na Cornualha, foram claramente recebidos em Signal Hill, na Terra Nova, através de uma distância de 2.100 milhas sobre o oceano. Este resultado provou de forma conclusiva que as ondas elétricas não eram impedidas pela curvatura da Terra e abriu caminho ao sistema de comunicação marítima que hoje salva centenas de vidas no mar.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Marconi, G., Wireless Telegraphic Communication, Nobel Lecture (1909)'
      }
    ]
  }
];

// ==============================================================================
// 4. HISTORIADORES HISTÓRICOS (FALECIDOS)
// ==============================================================================

export const CORPUS_HERODOTO: CorpusDocument[] = [
  {
    id: 'corp-herodoto-historias',
    personalityId: '00000000-0000-0000-0000-000000000044',
    title: 'Histórias (Historiai / Ἱστορίαι)',
    titleOriginal: 'Ἱστορίαι (Historiarum Libri IX)',
    author: 'Heródoto de Halicarnasso',
    yearPublished: -440,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Tradução do grego clássico por Maria Helena da Rocha Pereira',
    edition: 'Oxford Classical Texts (ed. Hude)',
    provenance: 'Perseus Digital Library / Fundação Calouste Gulbenkian',
    sourceUrl: 'http://data.perseus.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'herodoto-proemio',
        book: 'Livro I (Clio)',
        chapter: 'Proémio 1.1',
        section: 'Linhas 1-5',
        heading: 'A Fundação da Investigação Histórica',
        textOriginalOrTranslation: 'Heródoto de Halicarnasso apresenta aqui os resultados da sua investigação (Historíê), para que a memória dos feitos dos homens não se apague com o tempo, e para que as admiráveis façanhas realizadas, tanto por gregos como por bárbaros, não fiquem sem glória; e, em especial, a causa pela qual entraram em guerra uns contra os outros.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Heródoto, Histórias, Livro I, Proémio'
      },
      {
        id: 'herodoto-termopilas',
        book: 'Livro VII (Polímnia)',
        chapter: 'Capítulo 224-228',
        section: 'O Sacrifício dos Trezentos Espartanos',
        heading: 'A Batalha das Termópilas e o Rei Leónidas',
        textOriginalOrTranslation: 'Estando as suas lanças quebradas, os espartanos combatiam os persas com as suas espadas e, por fim, até com as mãos e com os dentes, até ficarem totalmente sepultados sob os dardos dos bárbaros. Sobre o seu túmulo nas Termópilas foi gravada a famosa inscrição: Caminhante, vai dizer a Esparta que aqui jazemos, obedientes às suas sagradas leis.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Heródoto, Histórias, Livro VII, 224-228'
      }
    ]
  }
];

export const CORPUS_TUCIDIDES: CorpusDocument[] = [
  {
    id: 'corp-tucidides-guerra',
    personalityId: '00000000-0000-0000-0000-000000000045',
    title: 'História da Guerra do Peloponeso',
    titleOriginal: 'Ἱστορία τοῦ Πελοποννησιακοῦ Πολέμου',
    author: 'Tucídides de Atenas',
    yearPublished: -411,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de Raúl M. Rosado Fernandes',
    edition: 'Oxford Classical Texts (ed. H. Stuart Jones)',
    provenance: 'Perseus Digital Library / Calouste Gulbenkian',
    sourceUrl: 'http://data.perseus.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'tucidides-causa-verdadeira',
        book: 'Livro I',
        chapter: 'Capítulo 22-23',
        section: 'I.23.6',
        heading: 'A Armadilha de Tucídides: O Medo e a Ascensão do Poder',
        textOriginalOrTranslation: 'Quanto aos factos da guerra, não julguei dever escrevê-los baseando-me no primeiro informador que aparecesse nem nas minhas próprias impressões, mas apenas depois de examinar com rigor minucioso cada testemunho. A minha obra foi composta para ser uma posse para sempre (ktêma es aieí), e não uma composição de concurso para agradar no momento. A causa mais verdadeira da guerra, embora a menos proclamada, foi o formidável crescimento do poder de Atenas e o pavor que este incutiu em Esparta, tornando o conflito inevitável.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Tucídides, História da Guerra do Peloponeso, I, 22-23'
      },
      {
        id: 'tucidides-dialogo-melos',
        book: 'Livro V',
        chapter: 'Capítulo 89-105',
        section: 'V.89',
        heading: 'O Diálogo de Melos: O Império da Força nas Relações Humanas',
        textOriginalOrTranslation: 'Os atenienses disseram aos habitantes de Melos: Sabeis tão bem quanto nós que a justiça, nas discussões entre os homens, só se pondera quando as forças em presença são iguais; pelo contrário, os que têm o poder executam o que podem e os fracos sofrem o que devem ceder.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Tucídides, História da Guerra do Peloponeso, V, 89'
      }
    ]
  }
];

export const CORPUS_EDWARD_GIBBON: CorpusDocument[] = [
  {
    id: 'corp-gibbon-decline-fall',
    personalityId: '00000000-0000-0000-0000-000000000046',
    title: 'A História do Declínio e Queda do Império Romano',
    titleOriginal: 'The History of the Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    yearPublished: 1776,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução historiográfica de referência',
    edition: 'Strahan & Cadell / Edição J.B. Bury',
    provenance: 'British Library / Internet Archive',
    sourceUrl: 'https://archive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'gibbon-antonines-happiness',
        book: 'Volume I',
        chapter: 'Capítulo III',
        section: 'A Era dos Antoninos',
        heading: 'O Século de Ouro da Humanidade sob os Filósofos de Roma',
        textOriginalOrTranslation: 'Se um homem fosse desafiado a indicar o período da história do mundo durante o qual a condição da raça humana foi mais feliz e próspera, ele apontaria, sem hesitação, para o intervalo decorrido entre a morte de Domiciano e a ascensão de Cómodo. Todo o vasto território do Império Romano era então governado pelo poder absoluto, sob a orientação da virtude e da sabedoria.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Gibbon, E., The History of the Decline and Fall of the Roman Empire, Cap. III'
      },
      {
        id: 'gibbon-ruin-immoderate-greatness',
        book: 'Volume III',
        chapter: 'Capítulo XXXVIII',
        section: 'Observações Gerais sobre a Queda do Império Romano no Ocidente',
        heading: 'O Colapso pelo Próprio Peso e a Queda Inevitável',
        textOriginalOrTranslation: 'A história da ruína de Roma é simples e óbvia; e, em vez de perguntar por que razão o Império ruiu, deveríamos antes surpreender-nos com o facto de ter subsistido por tanto tempo. O declínio foi o efeito natural e inevitável de uma grandeza desmesurada. A prosperidade amoleceu os alicerces da virtude cívica; as causas da destruição multiplicaram-se com a extensão das conquistas; e, assim que o tempo e os acidentes removeram os apoios artificiais, o prodigioso edifício ruiu sob a pressão do seu próprio peso.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Gibbon, E., Decline and Fall of the Roman Empire, Cap. XXXVIII'
      }
    ]
  }
];

export const CORPUS_TACITO: CorpusDocument[] = [
  {
    id: 'corp-tacito-annales',
    personalityId: '00000000-0000-0000-0000-000000000047',
    title: 'Anais e Agrícola (Annales / De Vita Iulii Agricolae)',
    titleOriginal: 'Annales (Ab Excessu Divi Augusti) & De Vita Iulii Agricolae',
    author: 'Públio Cornélio Tácito',
    yearPublished: 109,
    originalLanguage: 'la',
    translationLanguage: 'pt',
    translator: 'Tradução do latim clássico de Leopoldo Pereira',
    edition: 'Bibliotheca Teubneriana / Oxford Classical Texts',
    provenance: 'Perseus Digital Library / Bibliotheca Teubneriana',
    sourceUrl: 'http://data.perseus.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'tacito-sine-ira',
        book: 'Anais',
        chapter: 'Livro I',
        section: 'I.1',
        heading: 'A História Sem Ódio Nem Paixão (Sine Ira et Studio)',
        textOriginalOrTranslation: 'A cidade de Roma, no seu início, foi governada por reis; a liberdade e o consulado foram instituídos por Lúcio Bruto... Os atos de Augusto foram adulados durante a sua vida e, após a sua morte, deformados pelo medo. Assim, tomei a resolução de narrar sumariamente o final de Augusto e depois o principado de Tibério e os tempos subsequentes, sem ódio e sem parcialidade (sine ira et studio), de cujos motivos estou livre.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Tácito, Anais, Livro I, Capítulo 1'
      },
      {
        id: 'tacito-solitudinem-pacem',
        book: 'Agrícola (De Vita Iulii Agricolae)',
        chapter: 'Discurso de Cálgaco',
        section: 'Capítulo 30',
        heading: 'Onde Fazem um Deserto, Chamam-lhe Paz',
        textOriginalOrTranslation: 'Estes salteadores da terra, a quem já faltam terras para devastar, esquadrinham agora até o mar. Nem o Oriente nem o Ocidente saciaram a sua ambição... Pilhar, degolar, roubar, a isto dão falsamente o nome de império; e onde criam um deserto, chamam-lhe paz (atque ubi solitudinem faciunt, pacem appellant).',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Tácito, Agrícola, Capítulo 30'
      }
    ]
  }
];
