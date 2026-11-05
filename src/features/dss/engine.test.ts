import { describe, it, expect } from 'vitest';
import {
  DSS_ENTRY_CHIPS,
  DSS_NODES,
  matchFreeTextToEntryNode,
  stepDssNode,
  type DssNode,
} from './engine';

describe('Diagnostic DSS Rule Engine', () => {
  it('exposes all 6 validated fault categories in entry chips', () => {
    expect(DSS_ENTRY_CHIPS).toHaveLength(6);
    const categories = DSS_ENTRY_CHIPS.map((c) => c.categoryKey);
    expect(categories).toEqual([
      'starting',
      'overheating',
      'brakes',
      'warning_lights',
      'ac',
      'vibration',
    ]);
  });

  it('guarantees every branch from every entry chip terminates at a valid diagnosis leaf', () => {
    const visit = (node: DssNode, depth = 0): void => {
      expect(depth).toBeLessThan(6);
      if (node.kind === 'diagnosis') {
        expect(node.causes.length).toBeGreaterThanOrEqual(3);
        const sum = node.causes.reduce((acc, c) => acc + c.likelihoodPct, 0);
        expect(sum).toBe(100);
        expect(node.costRangeEgp.max).toBeGreaterThan(node.costRangeEgp.min);
        return;
      }
      expect(node.options.length).toBeGreaterThanOrEqual(2);
      for (const opt of node.options) {
        const nextNode = stepDssNode(node.id, opt.id);
        visit(nextNode, depth + 1);
      }
    };

    for (const chip of DSS_ENTRY_CHIPS) {
      const startNode = DSS_NODES[chip.entryNodeId];
      expect(startNode).toBeDefined();
      visit(startNode);
    }
  });

  it('matches English, Arabic, and Franco-Arabic symptom inputs accurately', () => {
    expect(matchFreeTextToEntryNode('My car battery is clicking').id).toBe('q_starting_1');
    expect(matchFreeTextToEntryNode('el batarya mesh radya tedoor').id).toBe('q_starting_1');
    expect(matchFreeTextToEntryNode('العربية بتسخن والحرارة عالية').id).toBe('q_overheating_1');
    expect(matchFreeTextToEntryNode('squeaking sound in faramel').id).toBe('q_brakes_1');
    expect(matchFreeTextToEntryNode('التكييف سخن').id).toBe('q_ac_1');
    expect(matchFreeTextToEntryNode('رعشة في الطارة على ١٠٠').id).toBe('q_vibration_1');
  });
});

