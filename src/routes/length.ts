import { length } from '../categories/length.js';
import { createCategoryRouter } from '../core/category-router.js';

/**
 * @openapi
 * /length/units:
 *   get:
 *     tags: [Length]
 *     summary: List length units
 *     responses:
 *       200:
 *         description: Units of the length category and its base unit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitList'
 *             example:
 *               category: length
 *               base: m
 *               units:
 *                 - symbol: m
 *                   name: metre
 *                 - symbol: km
 *                   name: kilometre
 *                 - symbol: mi
 *                   name: mile
 * /length/convert:
 *   post:
 *     tags: [Length]
 *     summary: Convert a length value between two units
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvertRequest'
 *           example:
 *             value: 5
 *             from: km
 *             to: mi
 *     responses:
 *       200:
 *         description: The converted value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConvertResponse'
 *             example:
 *               category: length
 *               value: 5
 *               from: km
 *               to: mi
 *               result: 3.106856
 *       400:
 *         description: Unknown unit or invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Unknown unit 'parsec' for category 'length'
 */
export const lengthRouter = createCategoryRouter(length);
