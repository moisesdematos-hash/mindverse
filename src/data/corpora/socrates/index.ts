import { CorpusDocument } from '../josephus';

export const SOCRATES_CORPUS: CorpusDocument[] = [
  {
    id: 'corp-socrates-apology',
    personalityId: '00000000-0000-0000-0000-000000000005',
    title: 'Apologia de Sócrates (Platão)',
    titleOriginal: 'Apologia Sōkratous',
    author: 'Sócrates (através de Platão)',
    yearPublished: -399,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Edição crítica baseada em John Burnet / Domínio Público',
    edition: 'Platonis Opera, Oxford Classical Texts',
    provenance: 'Perseus Digital Library / Oxford Classical Texts',
    sourceUrl: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'soc-ap-1',
        book: 'Discurso de Defesa',
        chapter: 'Secção 21-23',
        section: '21b-23b',
        heading: 'O Oráculo de Delfos e o Reconhecimento da Própria Ignorância',
        textOriginalOrTranslation: 'Fui ter com um dos cidadãos reputados sábios, julgando que ali, mais do que em qualquer outro lugar, refutaria o oráculo. Mas, ao examiná-lo, pareceu-me que ele parecia sábio a muitos homens, e sobretudo a si mesmo, mas não o era. Tentei então demonstrar-lhe que supunha saber sem saber. Por isso, tornei-me odioso para ele e para muitos dos presentes. Ao afastar-me, pensei comigo mesmo: "Sou mais sábio do que este homem; pois é provável que nenhum de nós saiba nada de belo ou de bom, mas ele julga saber algo sem saber, enquanto eu, como não sei, tão-pouco julgo saber".',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Platão, Apologia de Sócrates, 21b-23b'
      },
      {
        id: 'soc-ap-2',
        book: 'Discurso de Defesa',
        chapter: 'Secção 38',
        section: '38a',
        heading: 'A Vida Não Examinada Não Merece Ser Vivida',
        textOriginalOrTranslation: 'Se vos disser que o maior bem para o ser humano é conversar todos os dias sobre a virtude e sobre as outras matérias a respeito das quais me ouvis dialogar e examinar-me a mim mesmo e aos outros, e que uma vida sem exame não é digna de ser vivida por um ser humano (ho de anexetastos bios ou biōtos anthrōpōi), ainda menos me acreditareis.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Platão, Apologia de Sócrates, 38a'
      }
    ]
  },
  {
    id: 'corp-socrates-gorgias',
    personalityId: '00000000-0000-0000-0000-000000000005',
    title: 'Górgias (Platão)',
    titleOriginal: 'Gorgias',
    author: 'Sócrates (através de Platão)',
    yearPublished: -380,
    originalLanguage: 'grc',
    translationLanguage: 'pt',
    translator: 'Tradução canónica de domínio público',
    edition: 'Platonis Opera, Vol. III',
    provenance: 'Perseus Digital Library',
    sourceUrl: 'http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0177',
    licenseStatus: 'public_domain',
    sections: [
      {
        id: 'soc-gor-1',
        book: 'Diálogo com Polo e Cálicles',
        chapter: 'Secção 469-474',
        section: '469b-474c',
        heading: 'Cometer Injustiça é Pior do que Sofrê-la',
        textOriginalOrTranslation: 'Sustento que cometer injustiça é o maior de todos os males. Se fosse forçado a escolher entre cometer injustiça ou sofrê-la, preferiria mil vezes sofrer a injustiça do que cometê-la. Aquele que comete injustiça e não é punido nem emendado é o mais infeliz de todos os homens; pois a impunidade perpetua a doença da alma, ao passo que a punição justa liberta a alma do pior dos males.',
        epistemicType: 'primary_source',
        bibliographicCitation: 'Platão, Górgias, 469b-474c'
      }
    ]
  }
];
