// Imports
// ========================================================
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Routes from './routes';
import { buildErrorResponse } from './utils/helpers';
import { BadRequest, Forbidden, NotFound } from './utils/errorHandlers';
import { Prisma } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uwcypckicqfkheotlxxt.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y3lwY2tpY3Fma2hlb3RseHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYxMzUzNzcsImV4cCI6MTk2MTcxMTM3N30.opR7SkaWAVJqchxJL8xIRJ4Oj2f0h-pEzT3o20gtPpk';

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ENV VARS
// ========================================================
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const VERSION: string = process.env.VERSION || 'unknown';

// Init
// ========================================================
const app = express();

// Middlewares
// ========================================================
app.use(cors());
app.use(helmet());
app.use(express.json());

// Endpoints / Routes
// ========================================================
/**
 *
 */
app.get('/', (_req, res) =>
  res.send({ version: VERSION, environment: NODE_ENV }),
);

/**
 *
 */
app.get('/healthz', (_req, res) => res.send({ status: 'ok' }));

/**
 *
 */
app.use('/api', Routes);

// Error Handler
// ========================================================
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (['NotFound', 'BadRequest', 'Forbidden'].includes(error?.name)) {
    return res
      .status(error?.httpStatusCode ?? 400)
      .json(
        buildErrorResponse({ message: error?.message ?? 'Unknown error.' }),
      );
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return res.status(400).json(
      buildErrorResponse({
        message: error?.message ?? 'Unknown database error.',
      }),
    );
  }
  next(error);
});

// Exprots
// ========================================================
export default app;
export { client };
