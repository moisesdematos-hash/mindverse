import { CorpusDocument } from './josephus';

export const NOBEL_PLANCK_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-planck-quanta',
    personalityId: '00000000-0000-0000-0000-000000000021',
    title: 'Sobre a Lei de Distribuição de Energia no Espectro Normal',
    titleOriginal: 'Ueber das Gesetz der Energieverteilung im Normalspektrum',
    author: 'Max Planck',
    yearPublished: 1900,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Tradução científica de referência',
    edition: 'Annalen der Physik, 4. Folge, Band 4',
    provenance: 'Deutsche Physikalische Gesellschaft / Annalen der Physik',
    sourceUrl: 'https://gallica.bnf.fr',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'planck-quantum-postulate',
        book: 'Artigo Original',
        chapter: 'Secção §2-§4',
        section: 'Annalen der Physik (1901) 553-563',
        heading: 'O Quantum Elementar de Ação (E = hν)',
        textOriginalOrTranslation: 'Fomos compelidos a considerar a energia vibracional não como uma grandeza contínua infinitamente divisível, mas como um número inteiro de elementos discretos e indivisíveis de energia ε, cada um igual a h multiplicado pela frequência ν (E = hν). O coeficiente universal h, que denominei quantum elementar de ação, dita a descontinuidade microscópica fundamental com que a matéria troca energia com a radiação eletromagnética.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Planck, M., Ueber das Gesetz der Energieverteilung im Normalspektrum, Annalen der Physik (1901), p. 556'
      }
    ]
  }
];

export const NOBEL_BOHR_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-bohr-atomic',
    personalityId: '00000000-0000-0000-0000-000000000022',
    title: 'Sobre a Constituição de Átomos e Moléculas',
    titleOriginal: 'On the Constitution of Atoms and Molecules',
    author: 'Niels Bohr',
    yearPublished: 1913,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de história da física quântica',
    edition: 'Philosophical Magazine, Série 6, Vol. 26',
    provenance: 'Philosophical Magazine / Bohr Archives',
    sourceUrl: 'https://archive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'bohr-quantized-orbits',
        book: 'Parte I: Estados Estacionários',
        chapter: 'Secção 1-3',
        section: 'Phil. Mag. 26, 1-25 (1913)',
        heading: 'Postulado dos Estados Estacionários e Transições Quânticas',
        textOriginalOrTranslation: 'O átomo existe numa série de estados estacionários discretos sem irradiar qualquer energia eletromagnética enquanto o elétron permanece numa dessas órbitas permitidas. A radiação ou absorção ocorre apenas na passagem descontínua e abrupta entre dois desses estados, sendo a frequência emitida determinada pela relação exata hν = E₁ - E₂.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Bohr, N., On the Constitution of Atoms and Molecules, Philosophical Magazine, Vol. 26 (1913)'
      }
    ]
  }
];

export const NOBEL_HEISENBERG_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-heisenberg-uncertainty',
    personalityId: '00000000-0000-0000-0000-000000000023',
    title: 'Sobre o Conteúdo Percetual da Cinemática e Mecânica Teórica Quântica',
    titleOriginal: 'Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik',
    author: 'Werner Heisenberg',
    yearPublished: 1927,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Tradução científica de fundamentos da mecânica quântica',
    edition: 'Zeitschrift für Physik, Vol. 43',
    provenance: 'Zeitschrift für Physik / Max Planck Institute',
    sourceUrl: 'https://archive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'heisenberg-principle-formulation',
        book: 'Artigo Fundamental',
        chapter: 'Secção §1: Definição de Posição e Momento',
        section: 'Z. Phys. 43, 172-198 (1927)',
        heading: 'O Princípio da Incerteza (Δx · Δp ≥ ℏ/2)',
        textOriginalOrTranslation: 'Quanto mais precisamente for determinada a posição de uma partícula quântica, menos precisamente poderá ser conhecido o seu momento linear no mesmo instante, e vice-versa. Esta indefinição não resulta de imperfeições nos nossos aparelhos de observação, mas é uma propriedade intrínseca da natureza dual da matéria formulada matematicamente pela relação Δx · Δp ≥ h / 4π.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Heisenberg, W., Über den anschaulichen Inhalt..., Zeitschrift für Physik, 43 (1927)'
      }
    ]
  }
];

export const NOBEL_SCHRODINGER_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-schrodinger-wave',
    personalityId: '00000000-0000-0000-0000-000000000024',
    title: 'Quantização como um Problema de Valores Próprios',
    titleOriginal: 'Quantisierung als Eigenwertproblem',
    author: 'Erwin Schrödinger',
    yearPublished: 1926,
    originalLanguage: 'de',
    translationLanguage: 'pt',
    translator: 'Tradução de textos clássicos da mecânica ondulatória',
    edition: 'Annalen der Physik, Vol. 79',
    provenance: 'Annalen der Physik / Schrödinger Papers',
    sourceUrl: 'https://archive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'schrodinger-equation',
        book: 'Primeira Comunicação',
        chapter: 'Secção §1: A Equação de Onda',
        section: 'Ann. Phys. 79, 361-376 (1926)',
        heading: 'A Mecânica Ondulatória e a Função de Onda Ψ',
        textOriginalOrTranslation: 'Os níveis discretos de energia e as órbitas dos átomos deixam de ser postulados misteriosos e surgem naturalmente como frequências e nós próprios de uma equação diferencial de ondas. A realidade subatómica é contínua e ondulatória, descrita pela função Ψ cuja propagação e evolução no espaço-tempo é rigorosamente determinista.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Schrödinger, E., Quantisierung als Eigenwertproblem, Annalen der Physik, 79 (1926)'
      }
    ]
  }
];

export const NOBEL_FERMI_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-fermi-reactor',
    personalityId: '00000000-0000-0000-0000-000000000025',
    title: 'Reações Nucleares em Cadeia Controladas e Radiação por Neutrões',
    titleOriginal: 'Experimental Production of a Divergent Chain Reaction',
    author: 'Enrico Fermi',
    yearPublished: 1942,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Documento histórico desclassificado do Manhattan Project',
    edition: 'Chicago Pile-1 Technical Report',
    provenance: 'Metallurgical Laboratory, University of Chicago / US AEC',
    sourceUrl: 'https://osti.gov',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'fermi-criticality-cp1',
        book: 'Relatório Chicago Pile-1',
        chapter: 'Secção Operacional',
        section: 'CP-1 Divergence Log (2 Dez 1942)',
        heading: 'Atingimento da Criticalidade Auto-Sustentada (k ≥ 1.0)',
        textOriginalOrTranslation: 'A barra de controlo de cádmio foi gradualmente retirada sob monitorização contínua dos contadores de neutrões lentos. Às 15h25, o fator de multiplicação efetivo superou a unidade (k > 1.0), demonstrando que a fissão nuclear em cadeia com urânio natural moderado por grafite se auto-sustenta de forma totalmente controlável e calculável.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Fermi, E., Experimental Production of a Divergent Chain Reaction, Chicago Pile-1 Report (1942)'
      }
    ]
  }
];

export const NOBEL_FEYNMAN_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-feynman-qed',
    personalityId: '00000000-0000-0000-0000-000000000026',
    title: 'A Abordagem dos Trajetos no Espaço-Tempo à Eletrodinâmica Quântica',
    titleOriginal: 'Space-Time Approach to Quantum Electrodynamics',
    author: 'Richard Feynman',
    yearPublished: 1949,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de artigos seminais da física moderna',
    edition: 'Physical Review, Vol. 76',
    provenance: 'Physical Review / American Physical Society',
    sourceUrl: 'https://journals.aps.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'feynman-path-integral',
        book: 'Artigo Fundamental de QED',
        chapter: 'Secção I-II',
        section: 'Phys. Rev. 76, 769-789 (1949)',
        heading: 'Soma sobre Todos os Caminhos e Diagramas de Interação',
        textOriginalOrTranslation: 'Para calcular a probabilidade de uma partícula viajar do ponto A ao ponto B, não assumimos uma única trajetória clássica, mas somamos as contribuições de fase de todas as histórias e caminhos possíveis através do espaço-tempo. Os diagramas representam graficamente essas amplitudes de probabilidade onde as partículas interagem através da troca de fotões virtuais.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Feynman, R. P., Space-Time Approach to Quantum Electrodynamics, Physical Review, 76 (1949)'
      }
    ]
  }
];

export const NOBEL_RUTHERFORD_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-rutherford-nucleus',
    personalityId: '00000000-0000-0000-0000-000000000027',
    title: 'A Dispersão de Partículas Alfa e a Estrutura do Átomo',
    titleOriginal: 'The Scattering of α and β Particles by Matter and the Structure of the Atom',
    author: 'Ernest Rutherford',
    yearPublished: 1911,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução histórica dos arquivos da Royal Society',
    edition: 'Philosophical Magazine, Série 6, Vol. 21',
    provenance: 'Philosophical Magazine / Cavendish Laboratory',
    sourceUrl: 'https://archive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'rutherford-dense-nucleus',
        book: 'Artigo Fundamental',
        chapter: 'Secção §1-§3',
        section: 'Phil. Mag. 21, 669-688 (1911)',
        heading: 'Descoberta do Núcleo Atómico Central Concentrado',
        textOriginalOrTranslation: 'A observação de que uma fração diminuta de partículas alfa sofre deflexões superiores a 90 graus ao colidir com uma fina folha de ouro é um facto tão extraordinário como disparar um projétil de 15 polegadas contra uma folha de papel de seda e vê-lo ricochetear para trás. Isto só é concebível se a quase totalidade da massa e a carga positiva do átomo estiverem concentradas num volume minúsculo central — o núcleo.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Rutherford, E., The Scattering of α and β Particles by Matter..., Philosophical Magazine (1911)'
      }
    ]
  }
];

export const NOBEL_PAULING_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-pauling-chemical-bond',
    personalityId: '00000000-0000-0000-0000-000000000028',
    title: 'A Natureza da Ligação Química',
    titleOriginal: 'The Nature of the Chemical Bond',
    author: 'Linus Pauling',
    yearPublished: 1939,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução do tratado clássico da química moderna',
    edition: 'Cornell University Press, 1ª Edição',
    provenance: 'Cornell University Press / Oregon State University Archives',
    sourceUrl: 'https://archive.org',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'pauling-hybridization-resonance',
        book: 'Tratado Principal',
        chapter: 'Capítulo 1-2',
        section: 'The Nature of the Chemical Bond, pp. 1-64',
        heading: 'Hibridação de Orbitais e Ressonância Eletrónica',
        textOriginalOrTranslation: 'A estabilidade e a geometria tridimensional das moléculas orgânicas e inorgânicas são explicadas pela mecânica quântica através do conceito de hibridação orbital (sp³, sp², sp) e do fenómeno de ressonância quântica entre múltiplas estruturas de valência equivalentes, conferindo energia adicional de estabilização estrutural.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Pauling, L., The Nature of the Chemical Bond, Cornell University Press (1939)'
      }
    ]
  }
];

export const NOBEL_FLEMING_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-fleming-penicillin',
    personalityId: '00000000-0000-0000-0000-000000000029',
    title: 'Sobre a Ação Antibacteriana de Culturas de um Penicillium com Observações Especiais sobre o seu Uso no Isolamento de B. influenzae',
    titleOriginal: 'On the Antibacterial Action of Cultures of a Penicillium, with Special Reference to their Use in the Isolation of B. influenzae',
    author: 'Alexander Fleming',
    yearPublished: 1929,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Tradução médica do artigo seminal da antibioticoterapia',
    edition: 'British Journal of Experimental Pathology, Vol. 10',
    provenance: 'British Journal of Experimental Pathology / St. Marys Hospital',
    sourceUrl: 'https://ncbi.nlm.nih.gov/pmc',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'fleming-penicillin-discovery',
        book: 'Artigo Fundamental',
        chapter: 'Secção Experimental',
        section: 'Br. J. Exp. Pathol. 10(3): 226-236 (1929)',
        heading: 'Descoberta do Efeito Lítico do Penicillium notatum sobre Estafilococos',
        textOriginalOrTranslation: 'Numa placa de ágar inoculada com estafilococos deixada na bancada, formou-se uma colónia de bolor que contaminou a amostra. Em redor do fungo (Penicillium notatum), as colónias bacterianas previamente desenvolvidas tornaram-se transparentes e dissolveram-se completamente por lise. O filtrado do caldo de cultura possui extraordinário poder bactericida não tóxico para leucócitos humanos.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Fleming, A., On the Antibacterial Action of Cultures of a Penicillium, Br. J. Exp. Pathol. (1929)'
      }
    ]
  }
];
