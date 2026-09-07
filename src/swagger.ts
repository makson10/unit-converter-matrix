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
    components: {
      schemas: {
        UnitList: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            base: { type: 'string' },
            units: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  symbol: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        ConvertRequest: {
          type: 'object',
          required: ['value', 'from', 'to'],
          properties: {
            value: { type: 'number' },
            from: { type: 'string' },
            to: { type: 'string' },
          },
        },
        ConvertResponse: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            value: { type: 'number' },
            from: { type: 'string' },
            to: { type: 'string' },
            result: { type: 'number' },
          },
        },
        Error: {
          type: 'object',
          required: ['error'],
          properties: {
            error: { type: 'string' },
          },
        },
      },
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
