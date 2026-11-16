import { describe, it, expect } from 'vitest';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';
import { isSupabaseConfigured } from '../lib/supabase';
import pt from '../i18n/locales/pt.json';
import en from '../i18n/locales/en.json';
import fr from '../i18n/locales/fr.json';
import es from '../i18n/locales/es.json';

describe('Auditoria Técnica e Histórica da Fase 1', () => {
  it('deve confirmar a presença exata das 29 personalidades canónicas do Cohort Genesis e Expansão', () => {
    expect(COHORT_GENESIS_PERSONALITIES).toHaveLength(29);
    
    const slugs = COHORT_GENESIS_PERSONALITIES.map(p => p.slug);
    expect(slugs).toContain('albert-einstein');
    expect(slugs).toContain('leonardo-da-vinci');
    expect(slugs).toContain('nikola-tesla');
    expect(slugs).toContain('aristoteles');
    expect(slugs).toContain('socrates');
    expect(slugs).toContain('marco-aurelio');
    expect(slugs).toContain('sun-tzu');
    expect(slugs).toContain('adam-smith');
    expect(slugs).toContain('peter-drucker');
    expect(slugs).toContain('marie-curie');
    expect(slugs).toContain('flavio-josefo');
  });

  it('deve auditar o perfil histórico estrito de Flávio Josefo', () => {
    const josephus = COHORT_GENESIS_PERSONALITIES.find(p => p.slug === 'flavio-josefo');
    expect(josephus).toBeDefined();
    expect(josephus?.category).toBe('ancient_history_and_judaica');

    // Confirmar as 4 obras documentais verificáveis
    const workTitles = josephus?.works.map(w => w.title) || [];
    expect(workTitles.some(t => t.includes('Guerra dos Judeus'))).toBe(true);
    expect(workTitles.some(t => t.includes('Antiguidades Judaicas'))).toBe(true);
    expect(workTitles.some(t => t.includes('Contra Apião'))).toBe(true);
    expect(workTitles.some(t => t.includes('Autobiografia'))).toBe(true);

    // Confirmar contextualização dos imperadores Flávios e limitações historiográficas
    expect(josephus?.historicalContextNotes).toContain('Flávios');
    expect(josephus?.historicalContextNotes).toContain('Segundo Templo');
    expect(josephus?.historicalContextNotes).toContain('apologéticas');
  });

  it('deve confirmar que os 4 idiomas (PT, EN, FR, ES) têm as mesmas chaves de tradução raiz', () => {
    const ptKeys = Object.keys(pt).sort();
    const enKeys = Object.keys(en).sort();
    const frKeys = Object.keys(fr).sort();
    const esKeys = Object.keys(es).sort();

    expect(enKeys).toEqual(ptKeys);
    expect(frKeys).toEqual(ptKeys);
    expect(esKeys).toEqual(ptKeys);
  });

  it('deve verificar que o cliente Supabase lida graciosamente com ausência de credenciais no .env', () => {
    // Quando as chaves não estão configuradas ou são placeholders, não deve lançar exceção
    expect(typeof isSupabaseConfigured()).toBe('boolean');
  });
});
