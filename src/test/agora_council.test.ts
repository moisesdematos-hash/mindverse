import { describe, it, expect, beforeAll } from 'vitest';
import { globalCouncilEngine } from '../server/council/councilEngine';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';
import { getDocumentsForPersonality, getAllCanonicalDocuments } from '../data/corpora';

describe('FASE 3 — Motor Multiagente do Ágora (Conselho das Grandes Mentes)', () => {
  const allMinds = COHORT_GENESIS_PERSONALITIES;

  const EINSTEIN = allMinds.find(p => p.slug === 'albert-einstein')!;
  const ARISTOTLE = allMinds.find(p => p.slug === 'aristoteles')!;
  const SOCRATES = allMinds.find(p => p.slug === 'socrates')!;
  const MARCUS = allMinds.find(p => p.slug === 'marco-aurelio')!;
  const SUNTZU = allMinds.find(p => p.slug === 'sun-tzu')!;
  const SMITH = allMinds.find(p => p.slug === 'adam-smith')!;
  const DRUCKER = allMinds.find(p => p.slug === 'peter-drucker')!;

  beforeAll(async () => {
    await globalCouncilEngine.initialize();
  });

  describe('1. Suporte Dinâmico de Participantes (2 a 7 Mentes)', () => {
    it('deve validar e instanciar um Conselho com 2 pensadores', async () => {
      const session = await globalCouncilEngine.createSession({
        motion: 'A justiça individual pode ser sacrificada pela paz social?',
        participants: [SOCRATES, ARISTOTLE],
        maxRounds: 2,
      });

      expect(session.participants).toHaveLength(2);
      expect(session.status).toBe('assembling');
      expect(session.motion).toContain('justiça individual');
    });

    it('deve validar e instanciar um Conselho com 3 pensadores', async () => {
      const session = await globalCouncilEngine.createSession({
        motion: 'Como gerir uma transição de crise sistémica?',
        participants: [MARCUS, SUNTZU, DRUCKER],
        maxRounds: 3,
      });

      expect(session.participants).toHaveLength(3);
      expect(session.maxRounds).toBe(3);
    });

    it('deve validar e instanciar um Conselho com 4 pensadores (Sócrates, Aristóteles, Sun Tzu, Drucker)', async () => {
      const session = await globalCouncilEngine.createSession({
        motion: 'Como equilibrar inovação tecnológica rápida com prudência ética nas organizações?',
        participants: [SOCRATES, ARISTOTLE, SUNTZU, DRUCKER],
        maxRounds: 3,
      });

      expect(session.participants).toHaveLength(4);
      expect(session.participants.map(p => p.name)).toEqual([
        'Sócrates',
        'Aristóteles',
        'Sun Tzu',
        'Peter Drucker'
      ]);
    });

    it('deve validar e instanciar a capacidade máxima de 7 pensadores', async () => {
      const sevenMinds = [EINSTEIN, ARISTOTLE, SOCRATES, MARCUS, SUNTZU, SMITH, DRUCKER];
      const session = await globalCouncilEngine.createSession({
        motion: 'Qual deve ser o princípio regulador do desenvolvimento da inteligência artificial?',
        participants: sevenMinds,
        maxRounds: 2,
      });

      expect(session.participants).toHaveLength(7);
      expect(session.participants.length).toBeLessThanOrEqual(7);
    });

    it('deve rejeitar Conselhos com menos de 2 ou mais de 7 participantes', async () => {
      // Rejeita 1 pensador
      await expect(
        globalCouncilEngine.createSession({
          motion: 'Teste solitário',
          participants: [SOCRATES],
        })
      ).rejects.toThrow(/exige entre 2 e 7/);

      // Rejeita 8 pensadores
      const eightMinds = allMinds.slice(0, 8);
      await expect(
        globalCouncilEngine.createSession({
          motion: 'Teste excessivo',
          participants: eightMinds,
        })
      ).rejects.toThrow(/exige entre 2 e 7/);
    });
  });

  describe('2. Ingestão e Isolamento RAG de Todas as 11 Mentes', () => {
    it('todas as 11 personalidades devem possuir corpora canónicos verificados', () => {
      const allDocs = getAllCanonicalDocuments();
      expect(allDocs.length).toBeGreaterThanOrEqual(15);

      for (const p of allMinds) {
        const docs = getDocumentsForPersonality(p.id);
        expect(docs.length, `Corpus ausente para ${p.name}`).toBeGreaterThan(0);
        docs.forEach(doc => {
          expect(doc.personalityId).toBe(p.id);
          expect(doc.licenseStatus).toBe('public_domain');
          expect(doc.sections.length).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('3. Execução Real de Deliberação Multiagente (Confronto e Síntese)', () => {
    it('deve executar o Conselho com Sócrates e Peter Drucker gerando teses, réplicas e síntese', async () => {
      const session = await globalCouncilEngine.createSession({
        motion: 'A eficácia operacional é superior ao exame ético dos propósitos?',
        participants: [SOCRATES, DRUCKER],
        maxRounds: 2,
      });

      const completed = await globalCouncilEngine.runFullCouncil(session);

      expect(completed.status).toBe('completed');
      expect(completed.rounds.length).toBe(2);

      // Ronda 1: Teses Independentes
      const r1 = completed.rounds[0];
      expect(r1.interventions).toHaveLength(2);
      expect(r1.interventions[0].personalityName).toBe('Sócrates');
      expect(r1.interventions[1].personalityName).toBe('Peter Drucker');

      // Ronda 2: Réplica Cruzada
      const r2 = completed.rounds[1];
      expect(r2.interventions).toHaveLength(2);
      expect(r2.interventions[0].stage).toBe('cross_examination');

      // Síntese Conclusiva do Moderador
      expect(completed.synthesis).toBeDefined();
      expect(completed.synthesis?.collectiveDiagnosis).toBeTruthy();
      expect(completed.synthesis?.irreducibleDivergences.length).toBeGreaterThan(0);
      expect(completed.synthesis?.actionPlan.length).toBeGreaterThan(0);
      expect(completed.totalTokensUsed).toBeGreaterThan(0);
    }, 35000);

    it('deve suportar interrupção limpa via AbortSignal sem corromper o estado', async () => {
      const session = await globalCouncilEngine.createSession({
        motion: 'Teste de interrupção',
        participants: [ARISTOTLE, SUNTZU],
        maxRounds: 2,
      });

      const controller = new AbortController();
      controller.abort(); // Interrompe imediatamente

      await expect(
        globalCouncilEngine.runFullCouncil(session, undefined, controller.signal)
      ).rejects.toThrow(/interrompido/);

      expect(session.status).toBe('paused');
    });
  });
});
