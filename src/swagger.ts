import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { version } from './version.js';

const currentFile = fileURLToPath(import.meta.url);
const routeFiles = fileURLToPath(new URL(`./routes/*${extname(currentFile)}`, import.meta.url));

export const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Unit Converter Matrix',
      version,
      description: 'Converts a numeric value between units of the same category.',
    },
  },
  apis: [routeFiles],
});

export function mountSwagger(app: Express) {
  app.get('/docs.json', (_req, res) => {
    res.json(openApiSpec);
  });
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
}
