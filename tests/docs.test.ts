import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';

describe('GET /docs.json', () => {
  it('serves the OpenAPI document with the documented routes', async () => {
    const response = await request(createApp()).get('/docs.json');

    expect(response.status).toBe(200);
    expect(response.body.openapi).toBe('3.0.3');
    expect(response.body.paths).toHaveProperty('/health');
  });
});
