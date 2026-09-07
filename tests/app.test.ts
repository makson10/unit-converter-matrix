import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../src/app.js';

describe('app', () => {
  it('responds 404 with the error shape for an unknown route', async () => {
    const response = await request(createApp()).get('/nope');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route GET /nope not found' });
  });

  it('responds 400 for a malformed json body', async () => {
    const response = await request(createApp())
      .post('/health')
      .set('Content-Type', 'application/json')
      .send('{bad');

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual(expect.any(String));
  });
});
