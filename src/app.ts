import express from 'express';

import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';
import { healthRouter } from './routes/health.js';
import { lengthRouter } from './routes/length.js';
import { mountSwagger } from './swagger.js';

export function createApp() {
  const app = express();

  app.use(express.json());

  mountSwagger(app);
  app.use(healthRouter);
  app.use('/length', lengthRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
