import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';
import { weight } from '../src/categories/weight.js';
import { convert } from '../src/core/convert.js';

describe('weight category', () => {
  it('converts between metric and imperial units', () => {
    expect(convert(weight, 2, 'lb', 'kg')).toBe(0.907185);
    expect(convert(weight, 16, 'oz', 'lb')).toBe(1);
    expect(convert(weight, 1, 't', 'g')).toBe(1000000);
  });

  it('lists the weight units', async () => {
    const response = await request(createApp()).get('/weight/units');

    expect(response.status).toBe(200);
    expect(response.body.base).toBe('kg');
    expect(response.body.units.map((unit: { symbol: string }) => unit.symbol)).toEqual([
      'mg',
      'g',
      'kg',
      't',
      'oz',
      'lb',
    ]);
  });

  it('converts a value through the endpoint', async () => {
    const response = await request(createApp())
      .post('/weight/convert')
      .send({ value: 2, from: 'lb', to: 'kg' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      category: 'weight',
      value: 2,
      from: 'lb',
      to: 'kg',
      result: 0.907185,
    });
  });

  it('responds 400 for an unknown unit', async () => {
    const response = await request(createApp())
      .post('/weight/convert')
      .send({ value: 1, from: 'kg', to: 'stone' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Unknown unit 'stone' for category 'weight'" });
  });
});
