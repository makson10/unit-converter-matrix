import { factor } from '../core/convert.js';
import type { Category } from '../core/types.js';

export const weight: Category = {
  name: 'weight',
  base: 'kg',
  units: [
    { symbol: 'mg', name: 'milligram', ...factor(0.000001) },
    { symbol: 'g', name: 'gram', ...factor(0.001) },
    { symbol: 'kg', name: 'kilogram', ...factor(1) },
    { symbol: 't', name: 'tonne', ...factor(1000) },
    { symbol: 'oz', name: 'ounce', ...factor(0.028349523125) },
    { symbol: 'lb', name: 'pound', ...factor(0.45359237) },
  ],
};
