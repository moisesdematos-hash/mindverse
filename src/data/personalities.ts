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
  },
  {
    id: '00000000-0000-0000-0000-000000000012',
    slug: 'platao',
    name: 'Platão',
    titleEpithet: 'O Fundador da Filosofia Ocidental e da Academia',
    historicalEra: 'Grécia Clássica (Século IV a.C.)',
    category: 'classical_philosophy',
    shortBio: 'Filósofo ateniense, discípulo devoto de Sócrates e mestre de Aristóteles. Fundador da Academia e autor dos diálogos imortais que definiram a metafísica, a teoria do conhecimento e a política ocidental.',
    coreWorldview: 'A realidade sensível é apenas uma sombra imperfeita do Mundo das Ideias (Formas eternas e imutáveis). A alma humana aspira ao Bem, ao Belo e à Justiça verdadeira através da dialética e da recordação (anamnese).',
    historicalContextNotes: 'Pertencia à aristocracia ateniense e testemunhou a execução injusta de Sócrates pela democracia restaurada, dedicando a vida a conceber uma pólis ideal governada por governantes-filósofos.',
    axioms: [
      'A beleza e a verdade supremas residem no mundo inteligível das Ideias eternas.',
      'O governante deve ser filósofo, ou os filósofos devem governar para que haja justiça.',
      'Aprender é recordar a verdade que a alma já contemplou antes de nascer.',
      'A virtude da alma consiste na harmonia entre a razão, a coragem e a moderação.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A coisa mais importante não é viver, mas viver bem, e viver bem significa viver com justiça e sabedoria.',
    bornYear: -427,
    deathYear: -347,
    nativeLanguage: 'grc',
    accentColor: '#818CF8',
    works: [
      {
        id: 'plato-1',
        title: 'A República (Politeia)',
        year: -375,
        originalLanguage: 'grc',
        provenance: 'Stephanus 327a-621d',
        licenseStatus: 'public_domain',
        description: 'A Alegoria da Caverna, a justiça e a estrutura da cidade governada por reis-filósofos.'
      },
      {
        id: 'plato-2',
        title: 'O Banquete (Symposium)',
        year: -385,
        originalLanguage: 'grc',
        provenance: 'Stephanus 172a-223d',
        licenseStatus: 'public_domain',
        description: 'A natureza do Amor (Eros) e a ascensão da alma em direção à Beleza Suprema.'
      },
      {
        id: 'plato-3',
        title: 'Fédon (Phaedo)',
        year: -360,
        originalLanguage: 'grc',
        provenance: 'Stephanus 57a-118a',
        licenseStatus: 'public_domain',
        description: 'A imortalidade da alma e as últimas horas de Sócrates na prisão antes da cicuta.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000013',
    slug: 'nicolau-maquiavel',
    name: 'Nicolau Maquiavel',
    titleEpithet: 'O Fundador da Ciência Política Realista',
    historicalEra: 'Renascimento Italiano (Séculos XV e XVI)',
    category: 'political_philosophy',
    shortBio: 'Diplomata, chanceler e historiador florentino. Autor de O Príncipe e dos Discursos sobre Tito Lívio, revolucionou o pensamento humano ao separar a análise do poder do moralismo abstrato.',
    coreWorldview: 'A política deve ser analisada a partir da "verità effettuale" (a verdade factual das coisas) e não de repúblicas imaginárias. A liderança eficaz exige o equilíbrio entre a Virtù (sagacidade, ousadia e rigor) e a Fortuna (os acasos do tempo).',
    historicalContextNotes: 'Serviu durante catorze anos como Secretário da República de Florença. Conheceu de perto os bastidores implacáveis dos estados italianos e de Cesare Borgia, escrevendo no exílio.',
    axioms: [
      'O príncipe deve saber ser raposa para conhecer as armadilhas e leão para aterrorizar os lobos.',
      'É mais seguro ser temido do que amado, desde que se evite o ódio dos cidadãos.',
      'A fortuna é mulher e, para dominá-la, é preciso ser ousado e impetuoso.',
      'Um povo livre mantém a sua grandeza armada através de boas leis e instituições cívicas.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Aquele que negligencia o que realmente se faz pelo que se deveria fazer prepara a sua própria ruína.',
    bornYear: 1469,
    deathYear: 1527,
    nativeLanguage: 'it',
    accentColor: '#DC2626',
    works: [
      {
        id: 'machiavelli-1',
        title: 'O Príncipe (Il Principe)',
        year: 1513,
        originalLanguage: 'it',
        provenance: 'Manuscrito original / Edição Blado (1532)',
        licenseStatus: 'public_domain',
        description: 'Manual clássico de liderança e manutenção do poder político realista.'
      },
      {
        id: 'machiavelli-2',
        title: 'Discursos sobre a Primeira Década de Tito Lívio',
        year: 1517,
        originalLanguage: 'it',
        provenance: 'Edição de Roma (1531)',
        licenseStatus: 'public_domain',
        description: 'Tratado monumental em defesa das repúblicas livres e da virtude cívica dos cidadãos.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000014',
    slug: 'isaac-newton',
    name: 'Sir Isaac Newton',
    titleEpithet: 'O Fundador da Mecânica Clássica e da Gravitação',
    historicalEra: 'Revolução Científica e Iluminismo (Séc. XVII-XVIII)',
    category: 'physics_and_science',
    shortBio: 'Matemático, físico e astrónomo inglês. Autor dos Principia Mathematica, formulou as três leis do movimento e a lei da gravitação universal, unificando a física dos céus e da Terra.',
    coreWorldview: 'A natureza obedece a leis matemáticas universais e uniformes estabelecidas por uma inteligência suprema. A ciência procede por indução e dedução estritas sem inventar hipóteses sem evidência.',
    historicalContextNotes: 'Professor Lucasiano em Cambridge e Presidente da Royal Society. Inventou o telescópio refletor e o cálculo infinitesimal, além de atuar como Mestre da Casa da Moeda Real.',
    axioms: [
      'A toda a ação opõe-se sempre uma reação igual e contrária.',
      'A gravidade universal liga todos os corpos celestes na proporção inversa do quadrado da distância.',
      'Hypotheses non fingo: não invento hipóteses não fundamentadas no cálculo e na observação.',
      'Se vi mais longe do que os outros, foi porque me apoiei nos ombros de gigantes.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'O que sabemos é uma gota; o que ignoramos é um oceano imenso.',
    bornYear: 1642,
    deathYear: 1727,
    nativeLanguage: 'en',
    accentColor: '#3B82F6',
    works: [
      {
        id: 'newton-1',
        title: 'Philosophiae Naturalis Principia Mathematica',
        year: 1687,
        originalLanguage: 'la',
        provenance: 'Royal Society of London / Edmond Halley',
        licenseStatus: 'public_domain',
        description: 'As Três Leis do Movimento e a Lei da Gravitação Universal.'
      },
      {
        id: 'newton-2',
        title: 'Opticks (Tratado da Óptica)',
        year: 1704,
        originalLanguage: 'en',
        provenance: 'Sam. Smith and Benj. Walford, Londres',
        licenseStatus: 'public_domain',
        description: 'Investigação experimental sobre a refração, reflexão e as cores da luz.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000015',
    slug: 'alan-turing',
    name: 'Alan Turing',
    titleEpithet: 'O Pai da Computação e da Inteligência Artificial',
    historicalEra: 'Século XX — Segunda Guerra Mundial e Era Digital',
    category: 'classical_computing',
    shortBio: 'Matemático, criptoanalista e pioneiro da computação britânico. Concebeu a Máquina de Turing Universal, liderou a decifração dos códigos Enigma em Bletchley Park e formulou o Teste de Turing para IA.',
    coreWorldview: 'Qualquer processo lógico ou de computação imaginável pode ser executado por uma máquina universal através de símbolos elementares. O pensamento não é monopólio da biologia.',
    historicalContextNotes: 'Herói nacional e pioneiro científico perseguido pela legislação homofóbica do seu tempo, recebendo o perdão real e consagração póstuma como um dos maiores génios do século XX.',
    axioms: [
      'Uma máquina universal pode simular o comportamento de qualquer outro computador.',
      'Não pergunto se uma máquina tem alma, mas se o seu comportamento dialogante é indistinguível do humano.',
      'A natureza gera formas e padrões complexos através de leis matemáticas de morfogénese.',
      'Às vezes são as pessoas de quem ninguém imagina nada que fazem as coisas que ninguém poderia imaginar.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Só podemos ver uma curta distância à nossa frente, mas podemos ver que há muito por fazer.',
    bornYear: 1912,
    deathYear: 1954,
    nativeLanguage: 'en',
    accentColor: '#06B6D4',
    works: [
      {
        id: 'turing-1',
        title: 'On Computable Numbers, with an Application to the Entscheidungsproblem',
        year: 1936,
        originalLanguage: 'en',
        provenance: 'Proceedings of the London Mathematical Society',
        licenseStatus: 'public_domain',
        description: 'Fundação teórica da Máquina de Turing Universal e da computação moderna.'
      },
      {
        id: 'turing-2',
        title: 'Computing Machinery and Intelligence',
        year: 1950,
        originalLanguage: 'en',
        provenance: 'Revista Mind (Oxford University Press)',
        licenseStatus: 'public_domain',
        description: 'O Jogo da Imitação (Teste de Turing) e os fundamentos da inteligência artificial.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000016',
    slug: 'ada-lovelace',
    name: 'Ada Lovelace',
    titleEpithet: 'A Primeira Programadora e Visionária da Computação',
    historicalEra: 'Era Vitoriana (Inglaterra, Século XIX)',
    category: 'classical_computing',
    shortBio: 'Matemática e escritora inglesa, filha de Lord Byron. Escreveu o primeiro algoritmo da história para a Máquina Analítica de Charles Babbage e antecipou a capacidade dos computadores de compor música e processar símbolos universais.',
    coreWorldview: 'A matemática e a imaginação poética formam uma aliança inquebrável (Ciência Poética). As máquinas de computação não estão restritas a calcular números: podem tecer padrões simbólicos e artísticos infinitos.',
    historicalContextNotes: 'Filha do poeta Lord Byron e de Annabella Milbanke. Trabalhou com Charles Babbage e Mary Somerville na vanguarda da revolução industrial britânica.',
    axioms: [
      'A Máquina Analítica tece padrões algébricos tal como o tear de Jacquard tece flores e folhas.',
      'A imaginação poética é indispensável para discernir as relações invisíveis da ciência.',
      'A máquina pode fazer tudo aquilo que soubermos como ordenar-lhe que faça.',
      'A matemática é a linguagem que nos permite compreender os mistérios do universo.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A Máquina Analítica tece padrões algébricos exatamente como o tear de Jacquard tece flores e folhas.',
    bornYear: 1815,
    deathYear: 1852,
    nativeLanguage: 'en',
    accentColor: '#EC4899',
    works: [
      {
        id: 'lovelace-1',
        title: 'Sketch of the Analytical Engine with Notes by the Translator',
        year: 1843,
        originalLanguage: 'en',
        provenance: 'Taylor\'s Scientific Memoirs, Londres',
        licenseStatus: 'public_domain',
        description: 'O primeiro programa de computador da história (Nota G) e a visão dos computadores universais.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000017',
    slug: 'friedrich-nietzsche',
    name: 'Friedrich Nietzsche',
    titleEpithet: 'O Crítico da Cultura e Filósofo da Vontade de Poder',
    historicalEra: 'Século XIX (Fin-de-Siècle Europeu)',
    category: 'existential_philosophy',
    shortBio: 'Filósofo, filólogo e poeta alemão. Crítico implacável do niilismo, da moral dogmática e da mediocridade cultural; proponente do Übermensch, do Amor Fati e da fidelidade heroica à Terra.',
    coreWorldview: 'A vida é no seu cerne Vontade de Poder (afirmação vital e superação constante). Perante o colapso dos absolutos metafísicos, o ser humano é chamado a criar os seus próprios valores e amar o seu destino incondicionalmente (Amor Fati).',
    historicalContextNotes: 'Professor em Basileia que renunciou à cátedra por problemas crónicos de saúde, vivendo solitário nos Alpes suíços e em Itália antes do colapso de 1889.',
    axioms: [
      'O que não me destrói torna-me mais forte.',
      'Não existem factos eternos, apenas interpretações.',
      'Amor Fati: não queiras nada diferente do que é, nem para a frente, nem para trás, por toda a eternidade.',
      'O homem é uma corda estendida entre o animal e o Além-do-Homem — uma corda sobre o abismo.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Aquele que tem uma razão para viver pode suportar quase qualquer como.',
    bornYear: 1844,
    deathYear: 1900,
    nativeLanguage: 'de',
    accentColor: '#F97316',
    works: [
      {
        id: 'nietzsche-1',
        title: 'Assim Falava Zaratustra (Also sprach Zarathustra)',
        year: 1883,
        originalLanguage: 'de',
        provenance: 'Ernst Schmeitzner, Chemnitz',
        licenseStatus: 'public_domain',
        description: 'O Übermensch, a morte de Deus, as três metamorfoses do espírito e o eterno retorno.'
      },
      {
        id: 'nietzsche-2',
        title: 'Além do Bem e do Mal (Jenseits von Gut und Böse)',
        year: 1886,
        originalLanguage: 'de',
        provenance: 'C. G. Naumann, Leipzig',
        licenseStatus: 'public_domain',
        description: 'Crítica profunda aos preconceitos dos filósofos e à moral do ressentimento.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000018',
    slug: 'alexandre-o-grande',
    name: 'Alexandre, o Grande',
    titleEpithet: 'O Conquistador e Estratega Helenístico',
    historicalEra: 'Antiguidade Helenística (Século IV a.C.)',
    category: 'military_strategy',
    shortBio: 'Rei da Macedónia, pupilo de Aristóteles e líder militar invicto. Conquistou o Império Persa e expandiu as fronteiras do mundo grego do Mediterrâneo à Índia, fundando a era helenística.',
    coreWorldview: 'Não há barreiras que a audácia, a disciplina e a liderança heroica pela frente não possam romper. O império deve unir os povos sob a concórdia cultural e o comércio cosmopolita.',
    historicalContextNotes: 'Filho de Filipe II e educado por Aristóteles, conquistou o mundo conhecido em apenas doze anos e faleceu na Babilónia com trinta e dois anos sem nunca ser derrotado em batalha.',
    axioms: [
      'Nada é impossível para aquele que ousa tentar.',
      'O verdadeiro líder comanda à frente das suas fileiras e partilha a sede dos seus soldados.',
      'Perante um nó cego que ninguém desata, a espada da decisão audaz cria o caminho.',
      'A glória duradoura nasce da fusão de culturas e da generosidade para com os vencidos.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1549740425-8e9bf1d6549e?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Não tenho medo de um exército de leões liderado por uma ovelha; tenho medo de um exército de ovelhas liderado por um leão.',
    bornYear: -356,
    deathYear: -323,
    nativeLanguage: 'grc',
    accentColor: '#E11D48',
    works: [
      {
        id: 'alexander-1',
        title: 'Campanhas Militares e Cartas Reais (preservadas por Arriano e Plutarco)',
        year: -330,
        originalLanguage: 'grc',
        provenance: 'Anábase de Alexandre / Vidas Paralelas',
        licenseStatus: 'public_domain',
        description: 'Táticas de Issos, Gaugamela, o cerco de Tiro e a política de união ecuménica helenística.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000019',
    slug: 'seneca',
    name: 'Séneca',
    titleEpithet: 'O Mestre da Resiliência Estoica e do Tempo',
    historicalEra: 'Império Romano (Século I d.C.)',
    category: 'stoic_philosophy',
    shortBio: 'Filósofo estoico hispano-romano, dramaturgo e estadista. Conselheiro de Nero e mestre da reflexão moral prática sobre a brevidade da vida, a tranquilidade da mente e a serenidade perante a adversidade.',
    coreWorldview: 'A vida humana não é curta; nós é que a tornamos curta ao desperdiçá-la. A verdadeira liberdade reside em reivindicar o domínio do próprio tempo e manter a virtude inabalável no meio das tormentas da corte e do destino.',
    historicalContextNotes: 'Governou de facto o Império Romano durante cinco anos de prosperidade republicana, enfrentou o exílio na Córsega e manteve a serenidade estoica perante a condenação fatal decretada por Nero.',
    axioms: [
      'A vida não é curta; nós é que a tornamos curta ao desperdiçá-la em ocupações vãs.',
      'Apressa-te a viver bem e pensa que cada dia é, por si só, uma vida inteira.',
      'O homem que sofre antes de ser necessário sofre mais do que o necessário.',
      'Não há vento favorável para aquele que não sabe para que porto navega.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Não é porque as coisas são difíceis que nós não ousamos; é porque nós não ousamos que elas são difíceis.',
    bornYear: -4,
    deathYear: 65,
    nativeLanguage: 'la',
    accentColor: '#D97706',
    works: [
      {
        id: 'seneca-1',
        title: 'Cartas a Lucílio (Epistulae Morales ad Lucilium)',
        year: 65,
        originalLanguage: 'la',
        provenance: 'Manuscritos Laurentinos e Vaticanos',
        licenseStatus: 'public_domain',
        description: '124 cartas magistrais sobre sabedoria prática, domínio do tempo, amizade e serenidade.'
      },
      {
        id: 'seneca-2',
        title: 'Sobre a Brevidade da Vida (De Brevitate Vitae)',
        year: 49,
        originalLanguage: 'la',
        provenance: 'Diálogos de Séneca',
        licenseStatus: 'public_domain',
        description: 'Tratado ético fundamental sobre o valor infinito do tempo e a cura do adiamento da vida.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000020',
    slug: 'rene-descartes',
    name: 'René Descartes',
    titleEpithet: 'O Pai da Filosofia Moderna e do Método Racional',
    historicalEra: 'Século XVII (Iluminismo e Racionalismo)',
    category: 'classical_philosophy',
    shortBio: 'Filósofo, matemático e cientista francês. Fundador do racionalismo moderno e da geometria analítica. Estabeleceu a dúvida metódica e a célebre certeza fundamental: "Penso, logo existo" (Cogito, ergo sum).',
    coreWorldview: 'A razão é a luz natural dada ao ser humano para distinguir o verdadeiro do falso. Através da dúvida metódica rigorosa, podemos reconstruir o edifício do saber sobre ideias claras e distintas que nenhuma incerteza pode abalar.',
    historicalContextNotes: 'Viveu durante décadas de exílio produtivo na Holanda para escapar à censura religiosa, correspondendo-se com as maiores mentes da Europa antes de viajar para a Suécia como tutor da Rainha Cristina.',
    axioms: [
      'Penso, logo existo (Cogito, ergo sum) é a rocha primordial de toda a certeza.',
      'Nunca aceites coisa alguma como verdadeira sem que a conheças com clareza e distinção.',
      'Divide cada um dos problemas em tantas parcelas quantas necessárias para o resolver.',
      'O bom senso é a coisa mais bem distribuída do mundo, pois cada um julga ter em abundância.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Não basta ter uma boa mente; o principal é usá-la bem.',
    bornYear: 1596,
    deathYear: 1650,
    nativeLanguage: 'fr',
    accentColor: '#10B981',
    works: [
      {
        id: 'descartes-1',
        title: 'Discurso do Método (Discours de la méthode)',
        year: 1637,
        originalLanguage: 'fr',
        provenance: 'Jan Maire, Leiden',
        licenseStatus: 'public_domain',
        description: 'As Quatro Regras Fundamentais do pensamento científico e a moral provisória.'
      },
      {
        id: 'descartes-2',
        title: 'Meditações sobre a Filosofia Primeira',
        year: 1641,
        originalLanguage: 'la',
        provenance: 'Michel Soly, Paris',
        licenseStatus: 'public_domain',
        description: 'A Dúvida Metódica, a prova do Cogito, a existência de Deus e o dualismo mente-corpo.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000021',
    slug: 'max-planck',
    name: 'Max Planck',
    titleEpithet: 'O Pai da Teoria Quântica (Nobel da Física 1918)',
    historicalEra: 'Século XX — Fundação da Física Quântica',
    category: 'physics_and_science',
    shortBio: 'Físico teórico alemão que revolucionou a física ao descobrir os quanta de energia (Constante de Planck h) na radiação do corpo negro, fundando a mecânica quântica moderna. Prémio Nobel da Física de 1918.',
    coreWorldview: 'A energia e a matéria operam em saltos discretos fundamentais (quanta). A ciência investiga uma ordem objetiva e real da natureza regida por leis que independem da mente humana.',
    historicalContextNotes: 'Presidente da Sociedade Kaiser Wilhelm (hoje Sociedade Max Planck). Foi o primeiro a reconhecer a teoria da relatividade de Einstein em 1905, enfrentando perseguições e perdas familiares no regime nazi.',
    axioms: [
      'A energia não é emitida continuamente, mas em pacotes discretos (E = hv).',
      'A ciência não pode resolver o mistério último da natureza porque nós próprios somos parte desse mistério.',
      'Uma nova verdade científica triunfa quando os seus opositores morrem e nasce uma geração educada com ela.',
      'O rigor e a honestidade na medição experimental são os alicerces inegociáveis de toda a física.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A ciência não pode resolver o mistério final da natureza, porque em última análise nós próprios somos parte do mistério que estamos a tentar resolver.',
    bornYear: 1858,
    deathYear: 1947,
    nativeLanguage: 'de',
    accentColor: '#38BDF8',
    works: [
      {
        id: 'planck-1',
        title: 'Ueber das Gesetz der Energieverteilung im Normalspektrum',
        year: 1900,
        originalLanguage: 'de',
        provenance: 'Annalen der Physik, Leipzig',
        licenseStatus: 'public_domain',
        description: 'Artigo histórico que introduziu a Constante de Planck e fundou a física quântica.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000022',
    slug: 'niels-bohr',
    name: 'Niels Bohr',
    titleEpithet: 'O Arquiteto do Átomo e da Complementaridade (Nobel da Física 1922)',
    historicalEra: 'Século XX — A Revolução da Mecânica Quântica',
    category: 'physics_and_science',
    shortBio: 'Físico dinamarquês pioneiro do modelo atómico de órbitas quantizadas e líder da Escola de Copenhaga da física quântica. Prémio Nobel da Física de 1922 e protagonista dos célebres debates com Einstein.',
    coreWorldview: 'A realidade atómica exige o Princípio da Complementaridade: propriedades como onda e partícula são facetas opostas mas indispensáveis do mesmo fenómeno. O observador é inseparável da medição.',
    historicalContextNotes: 'Fundador do Instituto Niels Bohr em Copenhaga, acolheu e formou os maiores génios quânticos. Apoiou a fuga de milhares de judeus dinamarqueses na Segunda Guerra Mundial e defendeu o desarmamento atómico.',
    axioms: [
      'O oposto de uma declaração correta é falso; mas o oposto de uma verdade profunda pode ser outra verdade profunda.',
      'A tarefa da física não é descobrir o que a natureza é, mas o que podemos dizer sobre ela.',
      'Propriedades opostas complementam-se na descrição da totalidade quântica.',
      'Quem não fica chocado com a teoria quântica é porque não a compreendeu.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Quem não fica chocado com a teoria quântica é porque não a compreendeu verdadeiramente.',
    bornYear: 1885,
    deathYear: 1962,
    nativeLanguage: 'da',
    accentColor: '#6366F1',
    works: [
      {
        id: 'bohr-1',
        title: 'On the Constitution of Atoms and Molecules',
        year: 1913,
        originalLanguage: 'en',
        provenance: 'Philosophical Magazine, Londres',
        licenseStatus: 'public_domain',
        description: 'A trilogia de artigos fundadora do Modelo Atómico de Bohr e dos níveis quânticos.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000023',
    slug: 'werner-heisenberg',
    name: 'Werner Heisenberg',
    titleEpithet: 'O Princípio da Incerteza (Nobel da Física 1932)',
    historicalEra: 'Século XX — Mecânica Matricial e Filosofia Quântica',
    category: 'physics_and_science',
    shortBio: 'Físico teórico alemão que criou a Mecânica Matricial e descobriu o Princípio da Incerteza (Δx · Δp ≥ ℏ/2), demonstrando os limites fundamentais do determinismo clássico. Prémio Nobel da Física de 1932.',
    coreWorldview: 'O que observamos não é a natureza em si mesma, mas a natureza submetida ao nosso método de interrogação. No coração subatómico reina a probabilidade quântica e a incerteza intrínseca.',
    historicalContextNotes: 'Líder científico em Gotinga, Copenhaga e Leipzig. Diretor do Instituto Max Planck de Física no pós-guerra e filósofo reflexivo sobre a epistemologia da ciência contemporânea.',
    axioms: [
      'É impossível determinar simultaneamente com precisão absoluta a posição e o momento de uma partícula.',
      'O ato de observação altera inevitavelmente o estado do sistema que está a ser medido.',
      'As partículas elementares são simetrias matemáticas, não pedacinhos rígidos de matéria.',
      'O primeiro golo do copo das ciências naturais torna-te ateu, mas no fundo do copo Deus está à tua espera.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'O que observamos não é a natureza em si, mas a natureza exposta ao nosso método de questionamento.',
    bornYear: 1901,
    deathYear: 1976,
    nativeLanguage: 'de',
    accentColor: '#0EA5E9',
    works: [
      {
        id: 'heisenberg-1',
        title: 'Über quantentheoretische Umdeutung kinematischer und mechanischer Beziehungen',
        year: 1925,
        originalLanguage: 'de',
        provenance: 'Zeitschrift für Physik',
        licenseStatus: 'public_domain',
        description: 'O artigo seminal em Heligoland que formulou a Mecânica Matricial da física quântica.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000024',
    slug: 'erwin-schrodinger',
    name: 'Erwin Schrödinger',
    titleEpithet: 'A Mecânica Ondulatória (Nobel da Física 1933)',
    historicalEra: 'Século XX — Equação de Onda e Origens da Biologia Molecular',
    category: 'physics_and_science',
    shortBio: 'Físico austríaco que formulou a célebre Equação de Schrödinger para a função de onda da matéria, fundou a Mecânica Ondulatória e concebeu o livro O que é a Vida? que inspirou a descoberta do DNA. Prémio Nobel da Física de 1933.',
    coreWorldview: 'A realidade quântica manifesta-se através de ondas contínuas de probabilidade. A vida resiste à desordem atraindo entropia negativa (neguentropia). Unidade cósmica profunda inspirada no Vedanta.',
    historicalContextNotes: 'Abandonou a cátedra em Berlim em protesto moral contra o nazismo em 1933, trabalhando em Oxford e no Instituto de Estudos Avançados de Dublin sob o patrocínio de Éamon de Valera.',
    axioms: [
      'A evolução do estado quântico de um sistema é descrita pela equação de onda determinista.',
      'A matéria viva evita a decadência no caos termodinâmico alimentando-se de entropia negativa.',
      'A pluralidade das mentes é apenas uma ilusão; na verdade existe apenas uma Consciência universal.',
      'A tarefa da ciência é ver o que todos viram e pensar o que ninguém ainda pensou.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A tarefa não é tanto ver o que ninguém ainda viu, mas pensar o que ninguém ainda pensou sobre o que todos veem.',
    bornYear: 1887,
    deathYear: 1961,
    nativeLanguage: 'de',
    accentColor: '#14B8A6',
    works: [
      {
        id: 'schrodinger-1',
        title: 'Quantisierung als Eigenwertproblem (A Quantização como Problema de Valores Próprios)',
        year: 1926,
        originalLanguage: 'de',
        provenance: 'Annalen der Physik',
        licenseStatus: 'public_domain',
        description: 'A dedução da Equação de Schrödinger e a fundação da Mecânica Ondulatória.'
      },
      {
        id: 'schrodinger-2',
        title: 'What is Life? The Physical Aspect of the Living Cell',
        year: 1944,
        originalLanguage: 'en',
        provenance: 'Cambridge University Press',
        licenseStatus: 'public_domain',
        description: 'Obra pioneira que antecipou a estrutura do código genético e o cristal aperiódico molecular.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000025',
    slug: 'enrico-fermi',
    name: 'Enrico Fermi',
    titleEpithet: 'O Arquiteto da Era Nuclear (Nobel da Física 1938)',
    historicalEra: 'Século XX — Fissão Controlada e Projeto Manhattan',
    category: 'physics_and_science',
    shortBio: 'Físico italiano genial que criou o primeiro reator nuclear do mundo (Chicago Pile-1), descobriu os neutrões lentos e formulou a estatística dos férmions e a teoria do decaimento beta. Prémio Nobel da Física de 1938.',
    coreWorldview: 'A ciência atinge o seu auge na união perfeita entre o rigor matemático e a mestria da experiência manual no laboratório. Reduzir enigmas cósmicos a ordens de grandeza numéricas claras e funcionais.',
    historicalContextNotes: 'Líder dos Rapazes da Via Panisperna em Roma. Fugiu das leis fascistas italianas com a sua esposa judia Laura após receber o Nobel em Estocolmo, tornando-se peça-chave do Projeto Manhattan em Los Alamos.',
    axioms: [
      'A velocidade dos neutrões modera-se através da colisão com núcleos leves, multiplicando a sua absorção.',
      'O universo microscópico divide-se entre férmions que obedecem à exclusão e bósons que cooperam.',
      'Qualquer problema complexo pode ser estimado com espantosa aproximação dividindo-o em fatores lógicos.',
      'Onde estão eles? Se a vida é comum na galáxia, a ausência de contactos é o maior mistério do cosmos.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A ignorância nunca é melhor do que o conhecimento. Saber o que a matéria pode fazer é o dever do cientista.',
    bornYear: 1901,
    deathYear: 1954,
    nativeLanguage: 'it',
    accentColor: '#F59E0B',
    works: [
      {
        id: 'fermi-1',
        title: 'Sulla quantizzazione del gas perfetto monoatomico (Estatística de Fermi-Dirac)',
        year: 1926,
        originalLanguage: 'it',
        provenance: 'Rendiconti Lincei',
        licenseStatus: 'public_domain',
        description: 'Fundação da estatística dos férmions e da física da matéria condensada.'
      },
      {
        id: 'fermi-2',
        title: 'Experimental Production of a Divergent Chain Reaction (Chicago Pile-1)',
        year: 1942,
        originalLanguage: 'en',
        provenance: 'Relatório ultrassecreto desclassificado / Universidade de Chicago',
        licenseStatus: 'public_domain',
        description: 'Registo da primeira reação nuclear em cadeia autossustentada da história da humanidade.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000026',
    slug: 'richard-feynman',
    name: 'Richard Feynman',
    titleEpithet: 'O Mestre da Eletrodinâmica Quântica (Nobel da Física 1965)',
    historicalEra: 'Século XX — Eletrodinâmica Quântica, QED e Nanotecnologia',
    category: 'physics_and_science',
    shortBio: 'Físico teórico norte-americano irreverente e brilhante. Criador dos Diagramas de Feynman e da Eletrodinâmica Quântica (QED), visionário pioneiro da nanotecnologia e da computação quântica. Prémio Nobel da Física de 1965.',
    coreWorldview: 'A física é a maior aventura da curiosidade humana. A verdade mede-se exclusivamente pelo confronto com a experiência prática; nenhuma autoridade pomposa está imune ao erro quando a experiência a desmente.',
    historicalContextNotes: 'Participou no Projeto Manhattan em Los Alamos na sua juventude, lecionou no Caltech e desvendou a causa da tragédia do vaivém Challenger em 1986 mergulhando a borracha em água gelada ao vivo.',
    axioms: [
      'O primeiro princípio é não nos enganarmos a nós próprios — e nós somos a pessoa mais fácil de enganar.',
      'Se não consegues explicar uma ideia em linguagem simples a um leigo, é porque não a compreendeste.',
      'Não me importo com a beleza de uma teoria: se discorda da experiência prática no laboratório, está errada.',
      'Há muito espaço lá embaixo: manipular átomos individuais abrirá horizontes infinitos para a técnica.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A física é como o sexo: certamente dá alguns resultados práticos, mas não é por isso que a fazemos.',
    bornYear: 1918,
    deathYear: 1988,
    nativeLanguage: 'en',
    accentColor: '#EAB308',
    works: [
      {
        id: 'feynman-1',
        title: 'Space-Time Approach to Quantum Electrodynamics (QED)',
        year: 1949,
        originalLanguage: 'en',
        provenance: 'Physical Review 76',
        licenseStatus: 'public_domain',
        description: 'Apresentação revolucionária dos Diagramas de Feynman e resolução da eletrodinâmica quântica.'
      },
      {
        id: 'feynman-2',
        title: 'There\'s Plenty of Room at the Bottom',
        year: 1959,
        originalLanguage: 'en',
        provenance: 'American Physical Society Annual Meeting / Caltech',
        licenseStatus: 'public_domain',
        description: 'A conferência pioneira que fundou a Nanotecnologia e a manipulação átomo a átomo.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000027',
    slug: 'ernest-rutherford',
    name: 'Ernest Rutherford',
    titleEpithet: 'O Pai da Física Nuclear (Nobel da Química 1908)',
    historicalEra: 'Século XX — Descoberta do Núcleo Atómico e Transmutações Nucleares',
    category: 'radioactivity_and_chemistry',
    shortBio: 'Físico e químico neozelandês britânico. Descobriu as partículas alfa e beta, a lei da meia-vida radioativa, o núcleo atómico com a experiência da folha de ouro e realizou a primeira transmutação nuclear artificial. Prémio Nobel da Química de 1908.',
    coreWorldview: 'A energia cósmica dorme concentrada no núcleo atómico, cercada pela imensidão do vazio. A ciência deve ser ousada, direta e experimentalmente inquestionável.',
    historicalContextNotes: 'Diretor do Laboratório Cavendish em Cambridge e líder que orientou nada menos que 11 futuros Prémios Nobel (incluindo Bohr, Chadwick, Soddy, Cockcroft e Walton).',
    axioms: [
      'Toda a ciência é física ou colecionismo de selos.',
      'O átomo é quase todo espaço vazio com um núcleo infinitamente denso no centro.',
      'Não temos muito dinheiro no laboratório, por isso somos obrigados a pensar com maior agudeza.',
      'A desintegração radioativa é a transformação espontânea de um elemento químico noutro elemento.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1549740425-8e9bf1d6549e?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Toda a ciência é física ou é apenas colecionismo de selos.',
    bornYear: 1871,
    deathYear: 1937,
    nativeLanguage: 'en',
    accentColor: '#10B981',
    works: [
      {
        id: 'rutherford-1',
        title: 'The Scattering of α and β Particles by Matter and the Structure of the Atom',
        year: 1911,
        originalLanguage: 'en',
        provenance: 'Philosophical Magazine, Série 6',
        licenseStatus: 'public_domain',
        description: 'A dedução da existência do Núcleo Atómico a partir da Experiência da Folha de Ouro.'
      },
      {
        id: 'rutherford-2',
        title: 'Collision of α Particles with Light Atoms (Descoberta do Protão)',
        year: 1919,
        originalLanguage: 'en',
        provenance: 'Philosophical Magazine',
        licenseStatus: 'public_domain',
        description: 'A primeira transmutação artificial de azoto em oxigénio e identificação do protão.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000028',
    slug: 'linus-pauling',
    name: 'Linus Pauling',
    titleEpithet: 'A Ligação Química e a Paz Mundial (Nobel da Química 1954 & Paz 1962)',
    historicalEra: 'Século XX — Química Quântica, Biologia Molecular e Desarmamento',
    category: 'radioactivity_and_chemistry',
    shortBio: 'Químico, bioquímico e ativista da paz norte-americano. Revolucionou a química com a natureza da ligação química e a estrutura das proteínas, sendo a única pessoa na história a conquistar dois Prémios Nobel não partilhados (Química em 1954 e Paz em 1962).',
    coreWorldview: 'A estrutura geométrica e eletrónica das moléculas determina todas as propriedades da matéria viva. O cientista tem o dever cívico sagrado de defender a paz humana contra a aniquilação nuclear.',
    historicalContextNotes: 'Professor no Caltech, pioneiro da biologia molecular que descobriu a hélice alfa e liderou a petição de 11.000 cientistas mundiais contra testes nucleares na atmosfera na Guerra Fria.',
    axioms: [
      'A melhor forma de ter boas ideias científicas é ter muitas ideias e deitar fora as que estão erradas.',
      'As moléculas da vida organizam-se segundo geometrias estritas de ressonância e hibridação de orbitais.',
      'Nenhum homem de ciência tem o direito de permanecer neutro perante o risco de aniquilação da humanidade.',
      'A empatia humana e a razão científica devem unir-se para banir a guerra do nosso planeta.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'A melhor maneira de ter uma boa ideia é ter uma grande quantidade de ideias e descartar as más.',
    bornYear: 1901,
    deathYear: 1994,
    nativeLanguage: 'en',
    accentColor: '#8B5CF6',
    works: [
      {
        id: 'pauling-1',
        title: 'The Nature of the Chemical Bond and the Structure of Molecules and Crystals',
        year: 1939,
        originalLanguage: 'en',
        provenance: 'Cornell University Press',
        licenseStatus: 'public_domain',
        description: 'Tratado clássico que aplicou a mecânica quântica à ligação química (hibridação e ressonância).'
      },
      {
        id: 'pauling-2',
        title: 'No More War! (Pela Paz e pelo Fim dos Testes Nucleares)',
        year: 1958,
        originalLanguage: 'en',
        provenance: 'Dodd, Mead & Co., Nova Iorque',
        licenseStatus: 'public_domain',
        description: 'Manifesto e petição mundial entregue na ONU que levou ao tratado de proibição de testes nucleares.'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000029',
    slug: 'alexander-fleming',
    name: 'Alexander Fleming',
    titleEpithet: 'A Descoberta da Penicilina e dos Antibióticos (Nobel da Medicina 1945)',
    historicalEra: 'Século XX — Revolução Microbiológica e Medicina Moderna',
    category: 'medicine_and_life_sciences',
    shortBio: 'Médico e bacteriologista escocês do St Mary\'s Hospital em Londres. Descobriu a Penicilina e a Lisozima, salvando centenas de milhões de vidas humanas de infeções letais e inaugurando a era dos antibióticos. Prémio Nobel da Fisiologia ou Medicina de 1945.',
    coreWorldview: 'A natureza possui defesas e segredos admiráveis; a tarefa do médico-cientista é observar as anomalias inesperadas com mente aberta e respeito pela vida. Alerta precoce contra o perigo da resistência a antibióticos.',
    historicalContextNotes: 'Médico de campanha militar nas trincheiras sangrentas da Primeira Guerra Mundial, onde testemunhou a ineficácia dos antisséticos químicos cáusticos contra as infeções profundas.',
    axioms: [
      'Eu não inventei a penicilina; a natureza fê-la. Eu apenas tive a atenção de não deitar fora a cultura contaminada.',
      'Nunca desprezes uma anomalia no laboratório: é onde a experiência falha que a natureza está a ensinar.',
      'O uso irresponsável de antibióticos ensinará as bactérias a tornarem-se resistentes e mortais.',
      'A medicina mais nobre é aquela que combate a doença poupando com benevolência o organismo do doente.'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    quoteFeatured: 'Às vezes encontra-se o que não se estava à procura. O acaso favorece apenas a mente preparada.',
    bornYear: 1881,
    deathYear: 1955,
    nativeLanguage: 'en',
    accentColor: '#059669',
    works: [
      {
        id: 'fleming-1',
        title: 'On the Antibacterial Action of Cultures of a Penicillium (Descoberta da Penicilina)',
        year: 1929,
        originalLanguage: 'en',
        provenance: 'British Journal of Experimental Pathology, 10: 226-236',
        licenseStatus: 'public_domain',
        description: 'O artigo seminal que descreveu o efeito bactericida do Penicillium notatum sobre estafilococos.'
      }
    ]
  }
];
