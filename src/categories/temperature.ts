import { factor } from '../core/convert.js';
import type { Category } from '../core/types.js';

const KELVIN_OFFSET = 273.15;

export const temperature: Category = {
  name: 'temperature',
  base: 'K',
  units: [
    {
      symbol: 'C',
      name: 'degree Celsius',
      toBase: (value) => value + KELVIN_OFFSET,
      fromBase: (value) => value - KELVIN_OFFSET,
    },
    {
      symbol: 'F',
      name: 'degree Fahrenheit',
      toBase: (value) => ((value - 32) * 5) / 9 + KELVIN_OFFSET,
      fromBase: (value) => ((value - KELVIN_OFFSET) * 9) / 5 + 32,
    },
    { symbol: 'K', name: 'kelvin', ...factor(1) },
  ],
};
