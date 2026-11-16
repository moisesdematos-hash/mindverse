import { describe, it, expect } from 'vitest';
import { COHORT_GENESIS_PERSONALITIES } from '../data/personalities';

describe('Cohort Genesis Personalities Dataset', () => {
  it('should contain the 47 canonical historical personalities and minds', () => {
    expect(COHORT_GENESIS_PERSONALITIES).toHaveLength(47);
  });

  it('should include Flavius Josephus (Flávio Josefo) with all 4 required canonical works', () => {
    const josephus = COHORT_GENESIS_PERSONALITIES.find((p) => p.slug === 'flavio-josefo');
    expect(josephus).toBeDefined();
    expect(josephus?.name).toContain('Flávio Josefo');
    expect(josephus?.category).toBe('ancient_history_and_judaica');
    
    // Check works
    const workTitles = josephus?.works.map((w) => w.title).join(' ');
    expect(workTitles).toContain('Guerra dos Judeus');
    expect(workTitles).toContain('Antiguidades Judaicas');
    expect(workTitles).toContain('Contra Apião');
    expect(workTitles).toContain('Autobiografia');

    // Check historiographical context notes
    expect(josephus?.historicalContextNotes).toBeTruthy();
    expect(josephus?.historicalContextNotes).toContain('Flávios');
    expect(josephus?.historicalContextNotes).toContain('Segundo Templo');
  });

  it('should ensure each personality has valid axioms, worldview and quote', () => {
    COHORT_GENESIS_PERSONALITIES.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.titleEpithet).toBeTruthy();
      expect(p.shortBio.length).toBeGreaterThan(20);
      expect(p.coreWorldview.length).toBeGreaterThan(20);
      expect(p.quoteFeatured.length).toBeGreaterThan(10);
      expect(p.axioms.length).toBeGreaterThanOrEqual(3);
      expect(p.works.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should not contain duplicate IDs or slugs', () => {
    const ids = COHORT_GENESIS_PERSONALITIES.map((p) => p.id);
    const slugs = COHORT_GENESIS_PERSONALITIES.map((p) => p.slug);

    expect(new Set(ids).size).toBe(COHORT_GENESIS_PERSONALITIES.length);
    expect(new Set(slugs).size).toBe(COHORT_GENESIS_PERSONALITIES.length);
  });
});
