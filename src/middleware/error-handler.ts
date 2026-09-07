import type { ErrorRequestHandler } from 'express';

import { HttpError } from '../core/errors.js';

interface ExposedError {
  status: number;
  expose: boolean;
  message: string;
}

function isExposedError(error: unknown): error is ExposedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'expose' in error &&
    error.expose === true &&
    'status' in error &&
    typeof error.status === 'number'
  );
}

function toHttpError(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error;
  }
  if (isExposedError(error)) {
    return new HttpError(error.status, error.message);
  }
  console.error(error);
  return new HttpError(500, 'Internal Server Error');
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const { status, message } = toHttpError(error);
  res.status(status).json({ error: message });
};
