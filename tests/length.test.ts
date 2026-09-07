import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';
import { length } from '../src/categories/length.js';
import { convert } from '../src/core/convert.js';

describe('length category', () => {
  it('converts between metric and imperial units', () => {
    expect(convert(length, 5, 'km', 'mi')).toBe(3.106856);
    expect(convert(length, 1, 'in', 'cm')).toBe(2.54);
    expect(convert(length, 1, 'mi', 'ft')).toBe(5280);
  });

  it('lists the length units', async () => {
    const response = await request(createApp()).get('/length/units');

    expect(response.status).toBe(200);
    expect(response.body.base).toBe('m');
    expect(response.body.units.map((unit: { symbol: string }) => unit.symbol)).toEqual([
      'mm',
      'cm',
      'm',
      'km',
      'in',
      'ft',
      'yd',
      'mi',
    ]);
  });

  it('converts a value through the endpoint', async () => {
    const response = await request(createApp())
      .post('/length/convert')
      .send({ value: 5, from: 'km', to: 'mi' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      category: 'length',
      value: 5,
      from: 'km',
      to: 'mi',
      result: 3.106856,
    });
  });

  it('responds 400 for an unknown unit', async () => {
    const response = await request(createApp())
      .post('/length/convert')
      .send({ value: 1, from: 'm', to: 'parsec' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Unknown unit 'parsec' for category 'length'" });
  });
});
