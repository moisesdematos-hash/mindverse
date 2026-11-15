import { CorpusDocument } from '../josephus';

export const TESLA_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-tesla-my-inventions',
    personalityId: '00000000-0000-0000-0000-000000000003',
    title: 'Minhas Invenções (My Inventions: The Autobiography of Nikola Tesla)',
    titleOriginal: 'My Inventions: The Autobiography of Nikola Tesla',
    author: 'Nikola Tesla',
    yearPublished: 1919,
    originalLanguage: 'en',
    translationLanguage: 'pt',
    translator: 'Publicação na Electrical Experimenter Magazine / Domínio Público',
    edition: 'Electrical Experimenter, Nova Iorque (1919)',
    provenance: 'Tesla Memorial Society / Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/52481',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'nt-mi-1',
        book: 'Capítulo I & II: As Primeiras Experiências e o Método Criativo',
        chapter: 'Visualização Mental e Engenharia sem Esboços',
        section: 'A Mente como Laboratório Concreto',
        heading: 'Construção Mental e Ressonância Criativa',
        textOriginalOrTranslation: 'O meu método é diferente do de outros inventores: quando tenho uma ideia, não me precipito imediatamente para a oficina para construir um modelo físico. Em vez disso, começo por concebê-la na minha mente. Modifico o desenho, corrijo defeitos, equilibro as massas e coloco o dispositivo a funcionar na minha imaginação durante semanas. Para mim, é absolutamente indiferente se testo uma turbina nos meus pensamentos ou se a experimento na oficina: os resultados práticos coincidem com rigor absoluto. O cérebro humano é apenas um recetor no universo; existe um núcleo de onde obtemos conhecimento, força e inspiração.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Nikola Tesla, My Inventions (1919), Cap. I: Early Life'
      },
      {
        id: 'nt-mi-2',
        book: 'Capítulo V: O Transmissor Amplificador e a Comunicação Global',
        chapter: 'A Transmissão de Energia sem Fios',
        section: 'O Sistema Mundial e a Interconexão Humana',
        heading: 'Energia Cósmica, Frequência e Comunicação Planetária',
        textOriginalOrTranslation: 'Se quisermos eliminar a miséria e a discórdia entre as nações, devemos facilitar a rápida transmissão de energia e de pensamento entre todos os pontos do globo. A Terra é um condutor imenso que responde a impulsos elétricos de frequência afinada em ressonância estacionária. Com o Sistema Mundial, a voz, a música, os dados de negócios e a energia motriz poderão ser distribuídos instantaneamente para qualquer recanto do planeta, convertendo toda a humanidade numa comunidade orgânica unificada.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Nikola Tesla, My Inventions (1919), Cap. V: The Magnifying Transmitter'
      }
    ]
  }
];
