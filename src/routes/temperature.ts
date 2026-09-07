import { temperature } from '../categories/temperature.js';
import { createCategoryRouter } from '../core/category-router.js';

/**
 * @openapi
 * /temperature/units:
 *   get:
 *     tags: [Temperature]
 *     summary: List temperature units
 *     responses:
 *       200:
 *         description: Units of the temperature category and its base unit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitList'
 *             example:
 *               category: temperature
 *               base: K
 *               units:
 *                 - symbol: C
 *                   name: degree Celsius
 *                 - symbol: F
 *                   name: degree Fahrenheit
 *                 - symbol: K
 *                   name: kelvin
 * /temperature/convert:
 *   post:
 *     tags: [Temperature]
 *     summary: Convert a temperature value between two scales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvertRequest'
 *           example:
 *             value: 100
 *             from: C
 *             to: F
 *     responses:
 *       200:
 *         description: The converted value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConvertResponse'
 *             example:
 *               category: temperature
 *               value: 100
 *               from: C
 *               to: F
 *               result: 212
 *       400:
 *         description: Unknown unit or invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Unknown unit 'R' for category 'temperature'
 */
export const temperatureRouter = createCategoryRouter(temperature);
