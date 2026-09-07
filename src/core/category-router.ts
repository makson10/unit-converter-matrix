import { Router } from 'express';

import { validateConvertBody } from '../middleware/validate-convert-body.js';
import { convert } from './convert.js';
import type { Category } from './types.js';

export function createCategoryRouter(category: Category) {
  const router = Router();

  router.get('/units', (_req, res) => {
    res.json({
      category: category.name,
      base: category.base,
      units: category.units.map(({ symbol, name }) => ({ symbol, name })),
    });
  });

  router.post('/convert', validateConvertBody, (req, res) => {
    const { value, from, to } = req.body;
    const result = convert(category, value, from, to);
    res.json({ category: category.name, value, from, to, result });
  });

  return router;
}
