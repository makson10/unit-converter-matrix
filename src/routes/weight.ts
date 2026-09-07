import { weight } from '../categories/weight.js';
import { createCategoryRouter } from '../core/category-router.js';

/**
 * @openapi
 * /weight/units:
 *   get:
 *     tags: [Weight]
 *     summary: List weight units
 *     responses:
 *       200:
 *         description: Units of the weight category and its base unit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitList'
 *             example:
 *               category: weight
 *               base: kg
 *               units:
 *                 - symbol: g
 *                   name: gram
 *                 - symbol: kg
 *                   name: kilogram
 *                 - symbol: lb
 *                   name: pound
 * /weight/convert:
 *   post:
 *     tags: [Weight]
 *     summary: Convert a weight value between two units
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvertRequest'
 *           example:
 *             value: 2
 *             from: lb
 *             to: kg
 *     responses:
 *       200:
 *         description: The converted value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConvertResponse'
 *             example:
 *               category: weight
 *               value: 2
 *               from: lb
 *               to: kg
 *               result: 0.907185
 *       400:
 *         description: Unknown unit or invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Unknown unit 'stone' for category 'weight'
 */
export const weightRouter = createCategoryRouter(weight);
