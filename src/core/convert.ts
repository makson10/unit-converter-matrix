import { UnknownUnitError } from './errors.js';
import type { Category, Unit } from './types.js';

const PRECISION = 6;

export function factor(multiplier: number): Pick<Unit, 'toBase' | 'fromBase'> {
  return {
    toBase: (value) => value * multiplier,
    fromBase: (value) => value / multiplier,
  };
}

export function findUnit(category: Category, symbol: string): Unit {
  const unit = category.units.find((candidate) => candidate.symbol === symbol);
  if (!unit) {
    throw new UnknownUnitError(symbol, category.name);
  }
  return unit;
}

export function convert(category: Category, value: number, from: string, to: string): number {
  const source = findUnit(category, from);
  const target = findUnit(category, to);
  return round(target.fromBase(source.toBase(value)));
}

function round(value: number): number {
  return Number(value.toFixed(PRECISION));
}
