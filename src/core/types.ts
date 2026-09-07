export interface Unit {
  symbol: string;
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface Category {
  name: string;
  base: string;
  units: Unit[];
}
