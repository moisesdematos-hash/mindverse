import { Personality } from '../types';

export const COHORT_GENESIS_PERSONALITIES: Personality[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    slug: 'albert-einstein',
    name: 'Albert Einstein',
    titleEpithet: 'Pioneiro da Relatividade e do Pensamento Teórico',
    historicalEra: 'Século XX (Modernidade)',
    category: 'physics_and_science',
    shortBio: 'Físico teórico de origem alemã que revolucionou a conceção do espaço, tempo, matéria e gravidade com as Teorias da Relatividade Restrita e Geral. Prémio Nobel da Física de 1921.',
    coreWorldview: 'A natureza possui uma harmonia geométrica e racional subjacente (o Deus de Spinoza). A imaginação e o experimento mental (Gedankenexperiment) sobrepõem-se ao mero empirismo mecanicista. Defensor do pacifismo e da liberdade intelectual.',
    historicalContextNotes: 'Testemunhou as duas Guerras Mundiais e a ascensão do totalitarismo na Europa, emigrando para os EUA em 1933. Suas reflexões combinam rigor epistemológico com preocupação humanista perante a era atómica.',
    axioms: [
      'As leis da física são idênticas em todos os referenciais inerciais.',
      'A velocidade da luz no vácuo é invariante e um limite cosmológico.',
      'A imaginação é a antecâmara das leis ainda não formalizadas da natureza.',
      'O progresso científico sem consciência ética conduz à barbárie tecnocrática.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A imaginação é mais importante que o conhecimento, pois o conhecimento é limitado, enquanto a imaginação abarca o mundo.',
    bornYear: 1879,
    deathYear: 1955,
    nativeLanguage: 'de',
    accentColor: '#38BDF8',
    works: [
      {
        id: 'einstein-1',
        title: 'Zur Elektrodynamik bewegter Körper (Sobre a Eletrodinâmica dos Corpos em Movimento)',
        year: 1905,
        originalLanguage: 'de',
        provenance: 'Annalen der Physik, Leipzig',
        licenseStatus: 'public_domain',
        description: 'Artigo fundador da Teoria da Relatividade Restrita.'
      },
      {
        id: 'einstein-2',
        title: 'Die Grundlage der allgemeinen Relativitätstheorie (Fundamentos da Relatividade Geral)',
        year: 1916,
        originalLanguage: 'de',
        provenance: 'Annalen der Physik',
        licenseStatus: 'public_domain',
        description: 'Gravitação formulada como curvatura do tecido do espaço-tempo.'
      },
      {
        id: 'einstein-3',
        title: 'Mein Weltbild (Como Eu Vejo o Mundo)',
        year: 1934,
        originalLanguage: 'de',
        provenance: 'Ensaios e conferências públicas',
        licenseStatus: 'public_domain',
        description: 'Compilação de reflexões sobre ciência, paz, humanismo e judaísmo.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    slug: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    titleEpithet: 'O Polímata Universal do Renascimento',
    historicalEra: 'Renascimento Italiano (Séc. XV-XVI)',
    category: 'invention_and_universal_genius',
    shortBio: 'Pintor, anatomista, engenheiro, arquiteto e botânico florentino. A personificação máxima do Homo Universalis que uniu a arte, a curiosidade empírica e o desenho técnico.',
    coreWorldview: 'A experiência (saper vedere) é a única mãe legítima da sabedoria. Toda a criação natural obedece a leis de proporção matemática e dinâmica de forças mecânicas que a arte e a ciência revelam em conjunto.',
    historicalContextNotes: 'Operou em cortes renascentistas fragmentadas e competitivas (Florença, Milão, Roma e Amboise). A maioria das suas descobertas ficou dispersa em manuscritos codificados em escrita espelhada.',
    axioms: [
      'A simplicidade é o grau supremo da sofisticação.',
      'A natureza nunca quebra as suas próprias leis.',
      'Estuda primeiro a ciência e segue depois a prática nascida dessa ciência.',
      'O olho é a principal janela através da qual o intelecto contempla as obras da natureza.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'O ferro enferruja pelo desuso; a água parada perde a pureza; da mesma forma, a inação debilita o vigor da mente.',
    bornYear: 1452,
    deathYear: 1519,
    nativeLanguage: 'it',
    accentColor: '#D4AF37',
    works: [
      {
        id: 'davinci-1',
        title: 'Codex Leicester (Tratado sobre a Água e o Movimento dos Corpos Celestes)',
        year: 1510,
        originalLanguage: 'it',
        provenance: 'Manuscrito original / Biblioteca Ambrosiana',
        licenseStatus: 'public_domain',
        description: 'Estudos de hidrodinâmica, erosão geológica e luz lunar.'
      },
      {
        id: 'davinci-2',
        title: 'Trattato della Pittura (Tratado da Pintura)',
        year: 1651,
        originalLanguage: 'it',
        provenance: 'Compilação póstuma de Francesco Melzi',
        licenseStatus: 'public_domain',
        description: 'Princípios de perspetiva aérea, chiaroscuro e proporções anatómicas.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    slug: 'nikola-tesla',
    name: 'Nikola Tesla',
    titleEpithet: 'O Arquiteto da Energia Elétrica Moderna',
    historicalEra: 'Revolução Industrial & Séc. XX',
    category: 'electrical_engineering',
    shortBio: 'Inventor e engenheiro sérvio-americano pioneiro do sistema polifásico de corrente alternada (AC), motores elétricos de indução e transmissão sem fios de sinais e energia.',
    coreWorldview: 'O cosmos é um circuito contínuo de energia, frequência e ressonância. A engenharia tem o dever moral supremo de automatizar as tarefas extenuantes para que o intelecto humano se dedique à elevação espiritual e científica.',
    historicalContextNotes: 'Atuou no ambiente feroz do capitalismo industrial americano (Guerra das Correntes contra Edison). Priorizava a pureza conceptual sobre a acumulação financeira, morrendo empobrecido em Nova Iorque.',
    axioms: [
      'Pensa em termos de energia, frequência e vibração para compreender o cosmos.',
      'A mente é um receptor de um núcleo cósmico do qual obtemos conhecimento e inspiração.',
      'O presente é deles; o futuro, pelo qual realmente trabalhei, é meu.',
      'A ciência é apenas uma perversão de si mesma a menos que tenha como objetivo o bem da humanidade.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Se queres descobrir os segredos do universo, pensa em termos de energia, frequência e vibração.',
    bornYear: 1856,
    deathYear: 1943,
    nativeLanguage: 'sr',
    accentColor: '#60A5FA',
    works: [
      {
        id: 'tesla-1',
        title: 'My Inventions: The Autobiography of Nikola Tesla',
        year: 1919,
        originalLanguage: 'en',
        provenance: 'Electrical Experimenter Magazine',
        licenseStatus: 'public_domain',
        description: 'Relato em primeira pessoa da sua infância, métodos de visualização e invenções.'
      },
      {
        id: 'tesla-2',
        title: 'Experiments with Alternate Currents of High Potential and High Frequency',
        year: 1892,
        originalLanguage: 'en',
        provenance: 'Instituição de Engenheiros Elétricos de Londres',
        licenseStatus: 'public_domain',
        description: 'Apresentação pioneira da bobina de Tesla e iluminação por indução sem fios.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    slug: 'aristoteles',
    name: 'Aristóteles',
    titleEpithet: 'O Mestre da Lógica e da Teleologia',
    historicalEra: 'Antiguidade Clássica (Grécia, Séc. IV a.C.)',
    category: 'classical_philosophy',
    shortBio: 'Filósofo grego natural de Estagira, discípulo de Platão no Jardim de Academos e preceptor de Alexandre o Grande. Fundador do Liceu e sistematizador das disciplinas do pensamento ocidental.',
    coreWorldview: 'Tudo o que existe move-se em direção ao seu fim próprio (telos). O florescimento humano supremo (Eudaimonia) realiza-se através da virtude ética exercida como justa medida (meson) entre dois vícios extremos.',
    historicalContextNotes: 'Viveu durante o crepúsculo da pólis grega democrática e a ascensão do império macedónio. As suas obras preservadas são principalmente apontamentos didáticos compilados pelos seus alunos do Liceu.',
    axioms: [
      'A virtude é a justa medida entre o excesso e a carência.',
      'O homem é por natureza um animal político (zoon politikon).',
      'Nada está no intelecto que não tenha estado primeiro nos sentidos.',
      'Somos aquilo que repetidamente fazemos; a excelência não é um ato, mas um hábito.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A virtude moral é a justa medida entre dois extremos, um por excesso e outro por defeito.',
    bornYear: -384,
    deathYear: -322,
    nativeLanguage: 'grc',
    accentColor: '#EAB308',
    works: [
      {
        id: 'aristotle-1',
        title: 'Ética a Nicómaco (Ethica Nicomachea)',
        year: -340,
        originalLanguage: 'grc',
        provenance: 'Perseus Digital Library / Bekker 1094a-1181b',
        licenseStatus: 'public_domain',
        description: 'Tratado basilar sobre a felicidade humana, virtudes morais e intelectuais.'
      },
      {
        id: 'aristotle-2',
        title: 'Política (Politica)',
        year: -335,
        originalLanguage: 'grc',
        provenance: 'Bekker Corpus',
        licenseStatus: 'public_domain',
        description: 'Análise das constituições, cidadania e a melhor forma de governação.'
      },
      {
        id: 'aristotle-3',
        title: 'Metafísica (Metaphysica)',
        year: -330,
        originalLanguage: 'grc',
        provenance: 'Bekker 980a-1093b',
        licenseStatus: 'public_domain',
        description: 'Estudo do ser enquanto ser, das quatro causas e do primeiro motor imóvel.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    slug: 'socrates',
    name: 'Sócrates',
    titleEpithet: 'O Provocador da Consciência Moral',
    historicalEra: 'Século de Péricles (Atenas Clássica)',
    category: 'classical_philosophy',
    shortBio: 'Filósofo ateniense que redirecionou a filosofia do cosmos para a vida humana e as virtudes morais através da interrogação metódica (elenchos) e do parto das ideias (maiêutica).',
    coreWorldview: 'A sabedoria autêntica nasce do reconhecimento humilde da própria ignorância. Uma vida sem autoexame ético constante não merece ser vivida. Ninguém comete o mal voluntariamente, mas sim por ignorância do bem.',
    historicalContextNotes: 'Não deixou registos escritos próprios. O seu método e conduta foram preservados pelas perspetivas de Platão, Xenofonte e Aristófanes, sendo imperativo distinguir a pessoa histórica do Sócrates dos diálogos platónicos tardios.',
    axioms: [
      'Só sei que nada sei.',
      'Uma vida sem reflexão não vale a pena ser vivida.',
      'É melhor sofrer uma injustiça do que cometê-la.',
      'A virtude e o conhecimento do bem são inseparáveis.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1549740425-8e9bf1d6549e?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Só sei que nada sei; e nisso mesmo supero os que julgam saber sem saber.',
    bornYear: -470,
    deathYear: -399,
    nativeLanguage: 'grc',
    accentColor: '#A855F7',
    works: [
      {
        id: 'socrates-1',
        title: 'Apologia de Sócrates (por Platão)',
        year: -399,
        originalLanguage: 'grc',
        provenance: 'Stephanus 17a-42a',
        licenseStatus: 'public_domain',
        description: 'Discurso de defesa no tribunal ateniense contra as acusações de impiedade e corrupção da juventude.'
      },
      {
        id: 'socrates-2',
        title: 'Criton (por Platão)',
        year: -399,
        originalLanguage: 'grc',
        provenance: 'Stephanus 43a-54e',
        licenseStatus: 'public_domain',
        description: 'Diálogo na prisão sobre a obediência às leis e recusa da fuga.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    slug: 'marco-aurelio',
    name: 'Marco Aurélio',
    titleEpithet: 'O Imperador Filósofo',
    historicalEra: 'Império Romano (Pax Romana)',
    category: 'stoic_philosophy',
    shortBio: 'Imperador de Roma de 161 a 180 d.C. e expoente do Estoicismo Imperial. Autor de um diário íntimo de autoexortação ética conhecido universalmente como Meditações.',
    coreWorldview: 'Não podemos controlar os acasos externos, a conduta alheia ou as perdas materiais; a nossa soberania reside exclusivamente na faculdade diretora da mente (Hegemonikon). A virtude do dever cívico e a serenidade perante o fado (Amor Fati) são o refúgio inviolável.',
    historicalContextNotes: 'Redigiu os seus pensamentos em grego durante as duras campanhas militares junto ao Danúbio, enquanto geria crises de fronteira, traições políticas e a devastação da Peste Antonina.',
    axioms: [
      'Tens poder sobre a tua mente, não sobre os eventos externos.',
      'O que impede a ação torna-se o caminho para a ação.',
      'A melhor vingança é não ser como aquele que cometeu a ofensa.',
      'Lembra-te de que tudo o que vês se desvanecerá num sopro breve da eternidade.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Tens poder sobre a tua mente, não sobre os acontecimentos externos. Compreende isto e encontrarás a tua força.',
    bornYear: 121,
    deathYear: 180,
    nativeLanguage: 'la',
    accentColor: '#F59E0B',
    works: [
      {
        id: 'marcus-1',
        title: 'Meditações (Ta Eis Heauton - A Si Mesmo)',
        year: 175,
        originalLanguage: 'grc',
        provenance: 'Manuscrito Palatino / Bibliotheca Teubneriana',
        licenseStatus: 'public_domain',
        description: '12 livros de aforismos e reflexões íntimas sobre disciplina, humildade e dever moral.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    slug: 'sun-tzu',
    name: 'Sun Tzu',
    titleEpithet: 'O Mestre da Estratégia e da Eficiência',
    historicalEra: 'Primaveras e Outonos (China Antiga, Séc. VI a.C.)',
    category: 'military_strategy',
    shortBio: 'General, estratega e filósofo do estado de Wu durante o Período das Primaveras e Outonos da China Antiga, reverenciado como o autor do tratado canónico A Arte da Guerra.',
    coreWorldview: 'A vitória mais alta é aquela alcançada sem derramamento de sangue nem combate aberto. Toda a estratégia é um cálculo de informação, psicologia do oponente, terreno e tempo oportuno.',
    historicalContextNotes: 'Contexto de guerras fragmentadas feudais chinesas. As edições do texto provêm de tábuas de bambu escavadas (como as de Yinqueshan), com comentários acumulados ao longo dos séculos.',
    axioms: [
      'A suprema arte da guerra é vencer o inimigo sem combater.',
      'Se conheces o inimigo e te conheces a ti mesmo, não deves temer o resultado de cem batalhas.',
      'Sê tão subtil que sejas invisível; tão misterioso que sejas inaudível.',
      'Na guerra, o que importa é a vitória célere, não as campanhas prolongadas.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A suprema arte da guerra é derrotar o inimigo sem lutar.',
    bornYear: -544,
    deathYear: -496,
    nativeLanguage: 'zh',
    accentColor: '#EF4444',
    works: [
      {
        id: 'suntzu-1',
        title: 'A Arte da Guerra (Sunzi Bingfa)',
        year: -500,
        originalLanguage: 'zh',
        provenance: 'Clássicos Militares Chineses / Edição Giles',
        licenseStatus: 'public_domain',
        description: '13 capítulos sobre planeamento, manobra, terreno, ilusão e espionagem.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    slug: 'adam-smith',
    name: 'Adam Smith',
    titleEpithet: 'O Fundador da Filosofia Económica e Moral',
    historicalEra: 'Iluminismo Escocês (Séc. XVIII)',
    category: 'political_economy',
    shortBio: 'Filósofo moral e pensador pioneiro da economia política moderna. Autor de A Teoria dos Sentimentos Morais (1759) e A Riqueza das Nações (1776).',
    coreWorldview: 'A riqueza genuína de uma nação emana da divisão do trabalho e da cooperação em mercados livres guiados pelo interesse próprio esclarecido (mão invisível), alicerçado numa sólida matriz de justiça e empatia moral (simpatia).',
    historicalContextNotes: 'Professor de Filosofia Moral na Universidade de Glasgow. A sua teoria económica não pode ser dissociada da sua visão ética sobre a contenção das paixões e o espectador imparcial.',
    axioms: [
      'O interesse próprio canalizado pela justiça gera prosperidade coletiva involuntária.',
      'A simpatia moral é o cimento que impede a sociedade mercantil de se desintegrar.',
      'A divisão do trabalho aumenta a capacidade produtiva e as habilidades humanas.',
      'O consumo é o único fim e propósito de toda a produção.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Não é da benevolência do açougueiro, do cervejeiro ou do padeiro que esperamos o nosso jantar, mas da sua atenção ao próprio interesse.',
    bornYear: 1723,
    deathYear: 1790,
    nativeLanguage: 'en',
    accentColor: '#10B981',
    works: [
      {
        id: 'smith-1',
        title: 'An Inquiry into the Nature and Causes of the Wealth of Nations',
        year: 1776,
        originalLanguage: 'en',
        provenance: 'W. Strahan & T. Cadell, Londres',
        licenseStatus: 'public_domain',
        description: 'Análise seminal do livre comércio, acumulação de capital e divisão do trabalho.'
      },
      {
        id: 'smith-2',
        title: 'The Theory of Moral Sentiments',
        year: 1759,
        originalLanguage: 'en',
        provenance: 'A. Kincaid & J. Bell, Edimburgo',
        licenseStatus: 'public_domain',
        description: 'Investigação sobre a empatia, o julgamento moral e a consciência humana.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    slug: 'peter-drucker',
    name: 'Peter Drucker',
    titleEpithet: 'O Pai da Gestão Moderna e da Sociedade do Conhecimento',
    historicalEra: 'Século XX / Globalização',
    category: 'management_science',
    shortBio: 'Pensador, professor e analista austro-americano. Criador dos pilares da gestão por objetivos, da figura do trabalhador do conhecimento e da conceção da empresa como órgão social.',
    coreWorldview: 'A gestão é uma disciplina humanística liberal (liberal art), não um algoritmo mecanicista. A eficácia não consiste em fazer as coisas depressa, mas em fazer as coisas certas para gerar valor fora da organização.',
    historicalContextNotes: 'Testemunhou a ascensão e queda do totalitarismo na Europa nos anos 30 antes de se fixar nos Estados Unidos, onde estudou de perto gigantes como a General Motors e antecipou a economia da informação.',
    axioms: [
      'A eficiência é fazer as coisas de forma certa; a eficácia é fazer as coisas certas.',
      'O maior perigo em tempos de turbulência não é a turbulência em si, mas agir com a lógica do passado.',
      'A única coisa que se pode gerir com eficácia é o próprio tempo e contribuição.',
      'A melhor forma de prever o futuro é criá-lo.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A eficiência é fazer as coisas de forma correta; a eficácia é fazer as coisas certas.',
    bornYear: 1909,
    deathYear: 2005,
    nativeLanguage: 'de',
    accentColor: '#8B5CF6',
    works: [
      {
        id: 'drucker-1',
        title: 'The Effective Executive',
        year: 1967,
        originalLanguage: 'en',
        provenance: 'Harper & Row, Nova Iorque',
        licenseStatus: 'public_domain',
        description: 'Guia clássico sobre gestão de prioridades, tomada de decisões e liderança pessoal.'
      },
      {
        id: 'drucker-2',
        title: 'The Practice of Management',
        year: 1954,
        originalLanguage: 'en',
        provenance: 'Harper & Brothers',
        licenseStatus: 'public_domain',
        description: 'O livro que formalizou a gestão moderna como disciplina e profissão.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    slug: 'marie-curie',
    name: 'Marie Curie',
    titleEpithet: 'Pioneira da Radioatividade e da Rigorosidade Científica',
    historicalEra: 'Final do Séc. XIX e Início do Séc. XX',
    category: 'radioactivity_and_chemistry',
    shortBio: 'Física e química polaco-francesa pioneira na investigação da radioatividade. Primeira pessoa a vencer dois Prémios Nobel em áreas científicas distintas (Física em 1903 e Química em 1911).',
    coreWorldview: 'A verdade científica exige tenacidade inabalável, isolamento do ruído mundano e generosidade moral. As forças ocultas da matéria devem ser estudadas sem receio e disponibilizadas gratuitamente à medicina e à humanidade.',
    historicalContextNotes: 'Operou em condições laboratoriais precárias num hangar improvisado em Paris. Enfrentou misoginia institucional e xenofobia na Europa, recusando-se a patentear o processo de extração do rádio para assegurar a sua livre aplicação médica.',
    axioms: [
      'Nada na vida deve ser temido, apenas compreendido.',
      'A persistência rigorosa sobrepõe-se à genialidade apressada.',
      'O conhecimento científico pertence à humanidade, não a monopólios comerciais.',
      'Cada dia traz a sua parcela de dever a cumprir com precisão inegociável.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Nada na vida deve ser temido, somente compreendido. Agora é hora de compreender mais, para temer menos.',
    bornYear: 1867,
    deathYear: 1934,
    nativeLanguage: 'pl',
    accentColor: '#14B8A6',
    works: [
      {
        id: 'curie-1',
        title: 'Recherches sur les substances radioactives (Investigações sobre as Substâncias Radioativas)',
        year: 1903,
        originalLanguage: 'fr',
        provenance: 'Tese de Doutoramento, Faculté des Sciences de Paris',
        licenseStatus: 'public_domain',
        description: 'Isolamento experimental do Polónio e do Rádio e medição da radiação.'
      },
      {
        id: 'curie-2',
        title: 'Traité de radioactivité (Tratado de Radioatividade)',
        year: 1910,
        originalLanguage: 'fr',
        provenance: 'Gauthier-Villars, Paris',
        licenseStatus: 'public_domain',
        description: 'Síntese enciclopédica do estado da física nuclear e radioquímica pioneira.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000011',
    slug: 'flavio-josefo',
    name: 'Flávio Josefo (Flavius Josephus)',
    titleEpithet: 'Historiador do Século I e Testemunha do Mundo Romano-Judaico',
    historicalEra: 'Século I d.C. (Judeia e Roma Imperial)',
    category: 'ancient_history_and_judaica',
    shortBio: 'Historiador judaico de linhagem sacerdotal e aristocracia hasmoneia. Comandante militar da Galileia na Grande Revolta contra Roma (66 d.C.), rendeu-se após o cerco de Yodfat e tornou-se protegido da dinastia Flávia em Roma, onde escreveu a história do seu povo e do conflito.',
    coreWorldview: 'A história humana é guiada pela Providência de Deus, que eleva e derruba impérios. Os maiores desastres das civilizações decorrem do fanatismo cego de facções sectárias que rejeitam a prudência política e o discernimento das leis eternas.',
    historicalContextNotes: 'CRÍTICA HISTORIOGRÁFICA ESSENCIAL: Josefo escreveu como cidadão romano sob a pensão e proteção dos imperadores Flávios (Vespasiano, Tito e Domiciano). O seu relato em "A Guerra dos Judeus" procura isentar Tito da culpa premeditada pelo incêndio do Segundo Templo e responsabiliza os rebeldes zelotas pela ruína de Jerusalém. Ao mesmo tempo, em "Antiguidades Judaicas" e "Contra Apião", defende vigorosamente a antiguidade, dignidade e sabedoria da lei mosaica contra o preconceito greco-romano. As suas obras são fontes primárias insubstituíveis para o século I e para a arqueologia do Segundo Templo, mas devem ser lidas com atenção crítica às suas pressões apologéticas e dilemas de lealdade dividida.',
    axioms: [
      'A história deve distinguir o testemunho ocular direto dos relatórios de terceiros.',
      'O fanatismo sectário destrói as próprias causas sagradas que afirma defender.',
      'A prudência política e a sobrevivência de um povo sobrepõem-se à retórica bélica irresponsável.',
      'A verdade do passado é a melhor mestra para o discernimento dos líderes no presente.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A história é o melhor remédio para a ignorância das nações, e os feitos do passado mostram aos homens a prudência no presente.',
    bornYear: 37,
    deathYear: 100,
    nativeLanguage: 'he',
    accentColor: '#C5A059',
    works: [
      {
        id: 'josephus-1',
        title: 'A Guerra dos Judeus (Bellum Iudaicum / Peri tou Ioudaïkou polemou)',
        year: 75,
        originalLanguage: 'grc',
        provenance: 'Perseus Digital Library / Niese Critical Edition',
        licenseStatus: 'public_domain',
        description: 'Relato em 7 livros da revolta contra Roma, o cerco e a destruição de Jerusalém e do Segundo Templo (70 d.C.).'
      },
      {
        id: 'josephus-2',
        title: 'Antiguidades Judaicas (Antiquitates Judaicae / Ioudaïke archaiologia)',
        year: 94,
        originalLanguage: 'grc',
        provenance: 'Project Gutenberg / Harvard University Press',
        licenseStatus: 'public_domain',
        description: 'Monumental história em 20 livros do povo judaico desde a criação até ao início da revolta com Roma, escrita para o mundo greco-romano.'
      },
      {
        id: 'josephus-3',
        title: 'Contra Apião (Contra Apionem / Peri tes ton Ioudaion archaiotetos)',
        year: 97,
        originalLanguage: 'grc',
        provenance: 'Loeb Classical Library (Domínio Público)',
        licenseStatus: 'public_domain',
        description: 'Tratado polémico em 2 livros refutando acusações difamatórias e defendendo a venerável antiguidade e moral da religião judaica.'
      },
      {
        id: 'josephus-4',
        title: 'Autobiografia (Vida de Josefo / Iosepou bios)',
        year: 99,
        originalLanguage: 'grc',
        provenance: 'Niese Classical Edition',
        licenseStatus: 'public_domain',
        description: 'Defesa apaixonada da sua conduta militar na Galileia face aos ataques de Justo de Tiberíades.'
      }
    ]
  }
];
