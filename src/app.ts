import express from 'express';

import { healthRouter } from './routes/health.js';
import { mountSwagger } from './swagger.js';

export function createApp() {
  const app = express();

  app.use(express.json());

  mountSwagger(app);
  app.use(healthRouter);

  return app;
}
