import { CorpusDocument } from '../josephus';

export const CURIE_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-curie-radioactive-substances',
    personalityId: '00000000-0000-0000-0000-000000000010',
    title: 'Investigações sobre as Substâncias Radioativas (Recherches sur les substances radioactives)',
    titleOriginal: 'Recherches sur les substances radioactives',
    author: 'Marie Curie (Marie Skłodowska-Curie)',
    yearPublished: 1903,
    originalLanguage: 'fr',
    translationLanguage: 'pt',
    translator: 'Tese de Doutoramento da Faculdade de Ciências de Paris / Domínio Público',
    edition: 'Gauthier-Villars, Paris (1903)',
    provenance: 'Bibliothèque nationale de France (Gallica) / Nobel Prize Archives',
    sourceUrl: 'https://gallica.bnf.fr/ark:/12148/bpt6k202272c',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'mc-rad-1',
        book: 'Capítulo I: Radioatividade do Urânio e do Tório',
        chapter: 'Propriedades da Radiação Ionizante',
        section: 'Medição Eletrométrica Rigorosa',
        heading: 'A Emissão Atómica Espontânea e a Evidência Experimental',
        textOriginalOrTranslation: 'Cheguei à conclusão de que a emissão dos raios de Becquerel é uma propriedade atómica do urânio e do tório, que persiste inalterada em todos os seus compostos químicos e estados físicos. A medição da condutividade elétrica do ar ionizado por estas substâncias, realizada com o eletrómetro de quadrantes e o quartzo piezelétrico inventado por Pierre e Jacques Curie, permitiu determinar com precisão quantitativa rigorosa a intensidade da radiação, demonstrando que a radioatividade é um fenómeno subatómico espontâneo independente de reações externas.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Marie Curie, Recherches sur les substances radioactives (1903), Cap. I, §3'
      },
      {
        id: 'mc-rad-2',
        book: 'Capítulo II: Método de Investigação Química',
        chapter: 'Descoberta e Separação do Polónio e do Rádio',
        section: 'Cristalização Fracionada na Pechblenda',
        heading: 'Tenacidade Laboratorial e Isolamento Elementar',
        textOriginalOrTranslation: 'Ao analisar a pechblenda de Joachimsthal, descobrimos que este mineral apresentava uma atividade muito superior à do próprio urânio puro que continha. Isto indicava a presença de um corpo novo extraordinariamente ativo. Procedendo a milhares de cristalizações fracionadas em condições de grande exigência física durante anos de trabalho num hangar desprovido de conforto, conseguimos isolar em primeiro lugar o polónio e depois o rádio no estado de cloreto puro, determinando o seu peso atómico como sendo 225.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Marie Curie, Recherches sur les substances radioactives (1903), Cap. II, §6'
      }
    ]
  }
];
