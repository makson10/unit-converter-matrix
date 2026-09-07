import { describe, expect, it } from 'vitest';

import { convert, factor } from '../../src/core/convert.js';
import { UnknownUnitError } from '../../src/core/errors.js';
import type { Category } from '../../src/core/types.js';

const distance: Category = {
  name: 'distance',
  base: 'm',
  units: [
    { symbol: 'm', name: 'metre', ...factor(1) },
    { symbol: 'cm', name: 'centimetre', ...factor(0.01) },
  ],
};

describe('convert', () => {
  it('converts through the base unit and rounds the result', () => {
    expect(convert(distance, 250, 'cm', 'm')).toBe(2.5);
    expect(convert(distance, 1, 'm', 'cm')).toBe(100);
  });

  it('throws for an unknown unit', () => {
    expect(() => convert(distance, 1, 'm', 'yd')).toThrow(UnknownUnitError);
  });
});
