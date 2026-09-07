import { factor } from '../core/convert.js';
import type { Category } from '../core/types.js';

export const length: Category = {
  name: 'length',
  base: 'm',
  units: [
    { symbol: 'mm', name: 'millimetre', ...factor(0.001) },
    { symbol: 'cm', name: 'centimetre', ...factor(0.01) },
    { symbol: 'm', name: 'metre', ...factor(1) },
    { symbol: 'km', name: 'kilometre', ...factor(1000) },
    { symbol: 'in', name: 'inch', ...factor(0.0254) },
    { symbol: 'ft', name: 'foot', ...factor(0.3048) },
    { symbol: 'yd', name: 'yard', ...factor(0.9144) },
    { symbol: 'mi', name: 'mile', ...factor(1609.344) },
  ],
};
