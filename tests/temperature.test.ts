import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';
import { temperature } from '../src/categories/temperature.js';
import { convert } from '../src/core/convert.js';

describe('temperature category', () => {
  it('converts the freezing and boiling points of water', () => {
    expect(convert(temperature, 0, 'C', 'F')).toBe(32);
    expect(convert(temperature, 100, 'C', 'F')).toBe(212);
    expect(convert(temperature, 100, 'C', 'K')).toBe(373.15);
  });

  it('converts absolute zero and round trips', () => {
    expect(convert(temperature, 0, 'K', 'C')).toBe(-273.15);
    expect(convert(temperature, 0, 'K', 'F')).toBe(-459.67);
    expect(convert(temperature, convert(temperature, 98.6, 'F', 'C'), 'C', 'F')).toBe(98.6);
  });

  it('lists the temperature units', async () => {
    const response = await request(createApp()).get('/temperature/units');

    expect(response.status).toBe(200);
    expect(response.body.base).toBe('K');
    expect(response.body.units.map((unit: { symbol: string }) => unit.symbol)).toEqual([
      'C',
      'F',
      'K',
    ]);
  });

  it('converts a value through the endpoint', async () => {
    const response = await request(createApp())
      .post('/temperature/convert')
      .send({ value: 100, from: 'C', to: 'F' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      category: 'temperature',
      value: 100,
      from: 'C',
      to: 'F',
      result: 212,
    });
  });

  it('responds 400 for an unknown unit', async () => {
    const response = await request(createApp())
      .post('/temperature/convert')
      .send({ value: 1, from: 'C', to: 'R' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Unknown unit 'R' for category 'temperature'" });
  });
});
