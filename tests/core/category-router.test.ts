import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createCategoryRouter } from '../../src/core/category-router.js';
import { factor } from '../../src/core/convert.js';
import type { Category } from '../../src/core/types.js';
import { errorHandler } from '../../src/middleware/error-handler.js';

const distance: Category = {
  name: 'distance',
  base: 'm',
  units: [
    { symbol: 'm', name: 'metre', ...factor(1) },
    { symbol: 'cm', name: 'centimetre', ...factor(0.01) },
  ],
};

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/distance', createCategoryRouter(distance));
  app.use(errorHandler);
  return app;
}

describe('category router', () => {
  it('lists the units of the category', async () => {
    const response = await request(createTestApp()).get('/distance/units');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      category: 'distance',
      base: 'm',
      units: [
        { symbol: 'm', name: 'metre' },
        { symbol: 'cm', name: 'centimetre' },
      ],
    });
  });

  it('converts a value between two units', async () => {
    const response = await request(createTestApp())
      .post('/distance/convert')
      .send({ value: 250, from: 'cm', to: 'm' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      category: 'distance',
      value: 250,
      from: 'cm',
      to: 'm',
      result: 2.5,
    });
  });

  it('responds 400 for an unknown unit', async () => {
    const response = await request(createTestApp())
      .post('/distance/convert')
      .send({ value: 1, from: 'm', to: 'yd' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Unknown unit 'yd' for category 'distance'" });
  });
});
