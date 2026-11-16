import { CorpusDocument } from './josephus';

export const PLATO_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-plato-republic',
    personalityId: '00000000-0000-0000-0000-000000000012',
    title: 'A República (Politeia)',
    titleOriginal: 'Politeia (Res Publica)',
    author: 'Platão de Atenas',
    yearPublished: -375,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de Maria Helena da Rocha Pereira',
    edition: 'Stephanus 514a–520a',
    provenance: 'Perseus Digital Library / Fundação Calouste Gulbenkian',
    sourceUrl: 'http://data.perseus.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'pl-rep-cave',
        book: 'Livro VII',
        chapter: 'Capítulo 1-2',
        section: 'Stephanus 514a-517c',
        heading: 'A Alegoria da Caverna e a Ascensão ao Bem',
        textOriginalOrTranslation: 'Imagina homens numa habitação subterrânea em forma de caverna, acorrentados desde a infância de tal modo que só podem olhar para a frente. Atrás deles brilha um fogo, e entre o fogo e os prisioneiros há um muro por onde homens transportam estátuas e figuras. Os prisioneiros tomariam as sombras projetadas na parede pela única realidade existente. Mas se um deles fosse libertado e forçado a subir até à luz do sol, ficaria primeiro encandeado; depois contemplaria os astros e, finalmente, o próprio Sol no seu esplendor, compreendendo que é ele quem gera as estações e governa o mundo visível. A subida e a contemplação do mundo superior é a ascensão da alma ao mundo inteligível, cujo cume é a Ideia do Bem.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Platão, A República, Livro VII, Stephanus 514a-517c'
      },
      {
        id: 'pl-rep-king',
        book: 'Livro V',
        chapter: 'Capítulo 18',
        section: 'Stephanus 473c-474a',
        heading: 'O Rei-Filósofo e a Condição da Justiça',
        textOriginalOrTranslation: 'A menos que os filósofos se tornem reis nas nossas cidades, ou que aqueles a quem hoje chamamos reis e governantes se dediquem à filosofia com genuína grandeza, de tal modo que o poder político e a sabedoria coincidam numa só pessoa, não haverá trégua para os males das cidades nem para o género humano.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Platão, A República, Livro V, Stephanus 473d'
      }
    ]
  }
];

export const MACHIAVELLI_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-machiavelli-prince',
    personalityId: '00000000-0000-0000-0000-000000000013',
    title: 'O Príncipe (Il Principe)',
    titleOriginal: 'De Principatibus (Il Principe)',
    author: 'Nicolau Maquiavel',
    yearPublished: 1513,
    originalLanguage: 'it',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de Lívio Xavier',
    edition: 'Edição Blado (1532)',
    provenance: 'Biblioteca Nazionale Centrale di Firenze / Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1232',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'mc-pr-15',
        book: 'Tratado',
        chapter: 'Capítulo XV e XVIII',
        section: 'A Raposa e o Leão e a Verdade Factual',
        heading: 'A Verdade Efetiva das Coisas e a Astúcia Política',
        textOriginalOrTranslation: 'Muitos imaginaram repúblicas e principados que nunca se viram nem existiram na realidade. Há tanta distância entre como se vive e como se deveria viver que aquele que abandona o que se faz pelo que se deveria fazer aprende mais a sua ruína do que a sua preservação. O príncipe deve saber agir como animal quando necessário: deve escolher a raposa e o leão, porque o leão não se defende das armadilhas e a raposa não se defende dos lobos. É preciso, pois, ser raposa para conhecer as armadilhas e leão para aterrorizar os lobos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Nicolau Maquiavel, O Príncipe, Cap. XV e XVIII'
      },
      {
        id: 'mc-pr-25',
        book: 'Tratado',
        chapter: 'Capítulo XXV',
        section: 'O Papel da Fortuna e da Virtù',
        heading: 'O Dique da Prudência Humana contra o Rio da Fortuna',
        textOriginalOrTranslation: 'Não desconheço que muitos creram e creem que as coisas do mundo são governadas pela fortuna e por Deus de modo que a prudência humana não as pode corrigir. Todavia, para que o nosso livre-arbítrio não seja extinto, julgo que a fortuna é árbitro de metade das nossas ações, mas deixa governar a outra metade a nós mesmos. Comparo-a a um rio impetuoso que, quando enfurecido, inunda planícies e derruba árvores; mas os homens de virtude constroem diques e canais nos tempos de bonança para canalizar a torrente.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Nicolau Maquiavel, O Príncipe, Cap. XXV'
      }
    ]
  }
];

export const NEWTON_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-newton-principia',
    personalityId: '00000000-0000-0000-0000-000000000014',
    title: 'Philosophiae Naturalis Principia Mathematica',
    titleOriginal: 'Philosophiae Naturalis Principia Mathematica',
    author: 'Sir Isaac Newton',
    yearPublished: 1687,
    originalLanguage: 'la',
    translationLanguage: 'pt',
    translator: 'Tradução de Andrew Motte / Edição Royal Society',
    edition: 'Londini: Jussu Societatis Regiae ac Typis Josephi Streater',
    provenance: 'Cambridge University Digital Library',
    sourceUrl: 'https://cudl.lib.cam.ac.uk',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'nw-pr-axioms',
        book: 'Axiomata sive Leges Motus',
        chapter: 'Leis Fundamentais do Movimento',
        section: 'Leis I, II e III',
        heading: 'As Três Leis Universais da Mecânica',
        textOriginalOrTranslation: 'Lei I: Todo o corpo permanece no seu estado de repouso ou de movimento uniforme em linha reta, a menos que seja compelido a mudar esse estado por forças impressas. Lei II: A mudança de movimento é sempre proporcional à força motriz impressa e dá-se na direção da linha reta na qual essa força é aplicada (F = ma). Lei III: A toda a ação opõe-se sempre uma reação igual e contrária; as ações mútuas de dois corpos um sobre o outro são sempre iguais e dirigidas em sentidos opostos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Isaac Newton, Principia Mathematica, Axiomata sive Leges Motus, p. 12-14'
      },
      {
        id: 'nw-pr-gravity',
        book: 'Livro III: O Sistema do Mundo',
        chapter: 'Proposição VII',
        section: 'Gravitação Universal',
        heading: 'A Lei da Gravitação e o Método Científico',
        textOriginalOrTranslation: 'Existe uma gravidade que atua sobre todos os corpos proporcionalmente à quantidade de matéria contida em cada um, e que se estende por todos os lados até distâncias imensas, diminuindo sempre na proporção do quadrado da distância entre os corpos. Não invento hipóteses (Hypotheses non fingo); tudo aquilo que não se deduz dos fenómenos empíricos deve ser chamado hipótese, e as hipóteses não têm lugar na filosofia experimental.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Isaac Newton, Principia Mathematica, Livro III, Scholium Generale'
      }
    ]
  }
];

export const TURING_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-turing-computability',
    personalityId: '00000000-0000-0000-0000-000000000015',
    title: 'On Computable Numbers and Artificial Intelligence',
    titleOriginal: 'On Computable Numbers & Computing Machinery and Intelligence',
    author: 'Alan M. Turing',
    yearPublished: 1936,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de ensaios fundamentais',
    edition: 'Proceedings of London Math Society & Mind (1950)',
    provenance: 'The Turing Digital Archive / Oxford Mind Journal',
    sourceUrl: 'https://www.turingarchive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'tr-comp-machine',
        book: 'Artigo Fundador',
        chapter: 'Secções 1-3',
        section: 'A Máquina Universal',
        heading: 'A Máquina de Turing Universal e o Cálculo de Algoritmos',
        textOriginalOrTranslation: 'É possível conceber uma única máquina que pode ser usada para computar qualquer sequência computável. Se a esta máquina for fornecida uma fita contendo as instruções para o funcionamento de uma máquina de computação específica, a máquina universal simulará o comportamento dessa máquina particular. Uma única máquina programável é suficiente para abranger todas as computações lógicas possíveis.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Alan Turing, On Computable Numbers, 1936, p. 230-245'
      },
      {
        id: 'tr-comp-test',
        book: 'Revista Mind',
        chapter: 'Secções 1-2',
        section: 'O Jogo da Imitação',
        heading: 'O Teste de Turing para Inteligência de Máquinas',
        textOriginalOrTranslation: 'Proponho considerar a questão: "Podem as máquinas pensar?" Como estes termos são difusos, substituo a questão pelo Jogo da Imitação. Um interrogador humano conversa através de um terminal com dois intervenientes ocultos (um homem e uma máquina). Se o interrogador não for capaz de distinguir com maior taxa de acerto a resposta da máquina da resposta humana, devemos aceitar que a máquina exibe um comportamento inteligente real.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Alan Turing, Computing Machinery and Intelligence, Mind 59, 1950, p. 433-460'
      }
    ]
  }
];

export const LOVELACE_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-lovelace-engine',
    personalityId: '00000000-0000-0000-0000-000000000016',
    title: 'Notas sobre a Máquina Analítica de Charles Babbage',
    titleOriginal: 'Sketch of the Analytical Engine with Notes by the Translator',
    author: 'Ada Augusta Lovelace',
    yearPublished: 1843,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica das Notas A e G',
    edition: 'Scientific Memoirs de Richard Taylor, Londres',
    provenance: 'British Library / The Lovelace Papers',
    sourceUrl: 'https://www.fourmilab.ch/babbage/sketch.html',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'lv-eng-symbolic',
        book: 'Notas da Tradutora',
        chapter: 'Nota A',
        section: 'A Natureza dos Símbolos Universais',
        heading: 'A Computação Simbólica e a Criação Artística por Máquinas',
        textOriginalOrTranslation: 'A Máquina Analítica não se limita a calcular meras tabelas de números. Se imaginarmos que as relações fundamentais dos sons na ciência da harmonia e da composição musical fossem suscetíveis de ser expressas segundo leis matemáticas, a máquina poderia compor peças musicais elaboradas e científicas de qualquer grau de complexidade ou extensão. O tear de Jacquard tece flores e folhas em seda através de cartões perfurados; da mesma forma, a Máquina Analítica tece padrões algébricos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Ada Lovelace, Sketch of the Analytical Engine, Nota A, 1843'
      },
      {
        id: 'lv-eng-bernoulli',
        book: 'Notas da Tradutora',
        chapter: 'Nota G',
        section: 'O Primeiro Algoritmo da História',
        heading: 'Diagrama de Operações e Ciclos de Execução para os Números de Bernoulli',
        textOriginalOrTranslation: 'Apresentamos aqui o diagrama completo de cartões de operação e variáveis que orientam a máquina a calcular recursivamente os Números de Bernoulli sem intervenção manual. A máquina pode executar ciclos e ramificações condicionais dependendo dos resultados intermediários, realizando assim operações que transcenderiam a vida inteira de cálculo de dezenas de homens.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Ada Lovelace, Sketch of the Analytical Engine, Nota G, 1843'
      }
    ]
  }
];

export const NIETZSCHE_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-nietzsche-zarathustra',
    personalityId: '00000000-0000-0000-0000-000000000017',
    title: 'Assim Falava Zaratustra e Além do Bem e do Mal',
    titleOriginal: 'Also sprach Zarathustra & Jenseits von Gut und Böse',
    author: 'Friedrich Nietzsche',
    yearPublished: 1883,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de Paulo César de Souza',
    edition: 'Kritische Studienausgabe (KSA), Giorgio Colli e Mazzino Montinari',
    provenance: 'Nietzsche Source / De Gruyter',
    sourceUrl: 'http://www.nietzschesource.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'nz-zar-metamorphoses',
        book: 'Assim Falava Zaratustra',
        chapter: 'Discursos de Zaratustra',
        section: 'Das Três Metamorfoses',
        heading: 'O Camelo, o Leão e a Criança',
        textOriginalOrTranslation: 'Três metamorfoses do espírito vos nomeio: como o espírito se transforma em camelo, o camelo em leão e o leão, por fim, em criança. O camelo ajoelha-se e pede para ser pesado: carrega o fardo dos valores herdados dizendo "Tu deves". Mas no deserto mais solitário o camelo torna-se leão: quer conquistar a sua liberdade e ser senhor do seu próprio deserto, rugindo um sagrado "Eu quero" contra o grande dragão do dever. Mas que pode a criança que nem o leão pôde? A criança é inocência e esquecimento, um novo começo, um jogo, uma roda que gira por si mesma, um primeiro movimento, um sagrado Sim à vida.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Friedrich Nietzsche, Assim Falava Zaratustra, Das Três Metamorfoses'
      },
      {
        id: 'nz-zar-overman',
        book: 'Assim Falava Zaratustra',
        chapter: 'Prólogo',
        section: '§3-4',
        heading: 'O Homem como Ponte e o Amor Fati',
        textOriginalOrTranslation: 'Eu vos ensino o Além-do-Homem (Übermensch). O homem é algo que deve ser superado. Que fizestes vós para o superar? Todos os seres criaram algo acima de si mesmos; e quereis vós ser a vazante dessa grande maré? O homem é uma corda amarrada entre o animal e o Além-do-Homem — uma corda sobre o abismo. O que é grande no homem é que ele é uma ponte e não um fim: o que pode ser amado no homem é que ele é um ocaso e uma passagem.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Friedrich Nietzsche, Assim Falava Zaratustra, Prólogo §3'
      }
    ]
  }
];

export const ALEXANDER_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-alexander-anabasis',
    personalityId: '00000000-0000-0000-0000-000000000018',
    title: 'Campanhas Canónicas de Alexandre (Anábase de Arriano)',
    titleOriginal: 'Anabasis Alexandri (Arriano de Nicomédia)',
    author: 'Alexandre III da Macedónia (via Arriano e Plutarco)',
    yearPublished: -330,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Edição canónica clássica / Loeb Library',
    edition: 'Bibliotheca Teubneriana / Perseus Project',
    provenance: 'Harvard University Press / Perseus Digital Library',
    sourceUrl: 'http://data.perseus.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'al-anab-gaugamela',
        book: 'Livro III',
        chapter: 'Capítulo 12-15',
        section: 'A Batalha Decisiva de Gaugamela',
        heading: 'A Manobra da Cunha e a Liderança pela Frente',
        textOriginalOrTranslation: 'Em Gaugamela, quando o rei persa Dario III enviou os seus carros de foice e elefantes, Alexandre não recuou nem permaneceu na defensiva. Ordenou que a falange abrisse alas para os carros passarem no vazio e reuniu a cavalaria dos Companheiros numa ponta de lança em forma de cunha, atacando diretamente a brecha aberta entre as linhas persas. Alexandre cavalgava em pessoa na ponta da cunha, de espada em punho, inspirando os seus homens pelo exemplo imediato até que o pânico desfez o centro do exército persa.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Arriano, Anábase de Alexandre, Livro III, Cap. 14'
      },
      {
        id: 'al-anab-homonoia',
        book: 'Livro VII',
        chapter: 'Capítulo 11',
        section: 'O Juramento de Opis e as Núpcias de Susa',
        heading: 'A Homonoia: Oração pela Concórdia dos Povos',
        textOriginalOrTranslation: 'Nas festividades de Opis, Alexandre realizou um sacrifício aos deuses e orou para que gregos, macedónios e persas pudessem desfrutar da concórdia (Homonoia) e de uma comunidade compartilhada de destino. Declarou que considerava todos os homens corajosos e virtuosos como seus concidadãos, sem distinção de raça ou nascimento.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Arriano, Anábase de Alexandre, Livro VII, Cap. 11, §9'
      }
    ]
  }
];

export const SENECA_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-seneca-brevity',
    personalityId: '00000000-0000-0000-0000-000000000019',
    title: 'Sobre a Brevidade da Vida e Cartas a Lucílio',
    titleOriginal: 'De Brevitate Vitae & Epistulae Morales ad Lucilium',
    author: 'Lúcio Aneu Séneca',
    yearPublished: 49,
    originalLanguage: 'la',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de J. A. Segurado e Campos',
    edition: 'Fundação Calouste Gulbenkian (Lisboa)',
    provenance: 'The Latin Library / Oxford Classical Texts',
    sourceUrl: 'http://thelatinlibrary.com/sen.html',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'sn-brev-time',
        book: 'De Brevitate Vitae',
        chapter: 'Capítulo 1 e 3',
        section: 'O Valor do Tempo Humano',
        heading: 'A Vida Não é Curta: Nós é que a Desperdiçamos',
        textOriginalOrTranslation: 'A maioria dos mortais queixa-se da mesquinhez da natureza, dizendo que nascemos para um espaço muito breve de tempo. Não temos uma vida curta, mas desperdiçamos grande parte dela. A vida é longa o bastante e foi-nos dada em medida generosa para a realização das maiores façanhas, se for bem empregada. Mas quando ela se dissipa no luxo e na negligência, sem ser dedicada a nada de bom, quando a necessidade extrema finalmente nos aperta, percebemos que ela passou sem que tivéssemos notado que estava a decorrer. Reivindica o teu direito sobre ti mesmo: poupa e guarda o tempo que até agora te era roubado ou te escapava entre os dedos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Séneca, De Brevitate Vitae, Cap. I, §1-4'
      },
      {
        id: 'sn-ep-lucilius',
        book: 'Cartas a Lucílio',
        chapter: 'Carta 1',
        section: 'Exortação à Sabedoria Interior',
        heading: 'Reivindica a Tua Liberdade e a Serenidade da Mente',
        textOriginalOrTranslation: 'Faz isso, meu Lucílio: reivindica-te a ti mesmo, e o tempo que até agora te era tirado, ou te fugia, recolhe-o e conserva-o. Nada nos pertence, Lucílio, a não ser o tempo; este é o único bem fugaz e escorregadio que a natureza nos concedeu em posse, e do qual qualquer um nos pode expulsar. Nenhum homem é escravo se a sua mente for livre; a morte não é um castigo que nos espera no fim da estrada, mas algo que nos acompanha em cada dia que já passou.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Séneca, Epistulae Morales ad Lucilium, Carta 1, §1-3'
      }
    ]
  }
];

export const DESCARTES_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-descartes-discourse',
    personalityId: '00000000-0000-0000-0000-000000000020',
    title: 'Discurso do Método e Meditações Metafísicas',
    titleOriginal: 'Discours de la méthode & Meditationes de Prima Philosophia',
    author: 'René Descartes',
    yearPublished: 1637,
    originalLanguage: 'fr',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de J. Guinsburg e Bento Prado Jr.',
    edition: 'Oeuvres de Descartes (Adam et Tannery, Paris)',
    provenance: 'Bibliothèque nationale de France (Gallica)',
    sourceUrl: 'https://gallica.bnf.fr',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'ds-disc-method',
        book: 'Discurso do Método',
        chapter: 'Parte II',
        section: 'Os Quatro Preceitos Fundamentais',
        heading: 'As Quatro Regras para Bem Conduzir a Razão',
        textOriginalOrTranslation: 'O primeiro preceito era o de nunca aceitar coisa alguma como verdadeira sem que a conhecesse evidentemente como tal; ou seja, evitar cuidadosamente a precipitação e a prevenção. O segundo, dividir cada uma das dificuldades que examinasse em tantas parcelas quantas fossem possíveis e necessárias para melhor as resolver. O terceiro, conduzir por ordem os meus pensamentos, começando pelos objetos mais simples e fáceis de conhecer, para subir pouco a pouco até ao conhecimento dos mais compostos. E o último, fazer sempre enumerações tão completas e revisões tão gerais que eu tivesse a certeza de nada omitir.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'René Descartes, Discurso do Método, Parte II, AT VI 18'
      },
      {
        id: 'ds-med-cogito',
        book: 'Meditações Metafísicas',
        chapter: 'Meditação Segunda',
        section: 'A Natureza da Mente Humana',
        heading: 'O Cogito Ergo Sum: A Certeza Inabalável da Consciência',
        textOriginalOrTranslation: 'Mesmo que exista um génio maligno, sumamente poderoso e astuto, que empregue toda a sua indústria em me enganar, se ele me engana, então sem dúvida nenhuma eu sou, eu existo. E por mais que ele me engane, nunca conseguirá fazer com que eu nada seja enquanto eu pensar que sou alguma coisa. De modo que, após ter pesado e examinado cuidadosamente todas as coisas, deve-se concluir e ter por constante esta proposição: Eu sou, eu existo (Je suis, j\'existe / Cogito, ergo sum), é necessariamente verdadeira todas as vezes que a enuncio ou a concebo na minha mente.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'René Descartes, Meditações Metafísicas, Meditação Segunda, AT VII 25'
      }
    ]
  }
];
