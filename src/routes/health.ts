import { Router } from 'express';

import { version } from '../version.js';

export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Liveness check
 *     responses:
 *       200:
 *         description: The service is up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 version:
 *                   type: string
 *                   example: 0.1.0
 */
healthRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', version });
});
