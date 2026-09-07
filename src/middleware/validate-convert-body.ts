import type { RequestHandler } from 'express';

import { BadRequestError } from '../core/errors.js';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function validationMessage(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return 'Request body must be a JSON object';
  }
  const { value, from, to } = body as Record<string, unknown>;
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return "'value' must be a finite number";
  }
  if (!isNonEmptyString(from) || !isNonEmptyString(to)) {
    return "'from' and 'to' must be non-empty strings";
  }
  return undefined;
}

export const validateConvertBody: RequestHandler = (req, _res, next) => {
  const message = validationMessage(req.body);
  if (message) {
    next(new BadRequestError(message));
    return;
  }
  next();
};
