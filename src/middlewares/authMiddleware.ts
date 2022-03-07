// Imports
// ========================================================
import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { buildErrorResponse } from '../utils/helpers';

// Middleware
// ========================================================
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = verify(
      `${req.headers['authorization']?.replace('Bearer ', '')}`,
      `${process.env.SUPABASE_JWT_SECRET}`,
    );
    req.user = user as Request['user'];
  } catch (error) {
    console.log({ error });
    return res.status(401).json(buildErrorResponse('Forbidden'));
  }

  next();
};

// Exports
// ========================================================
export default authMiddleware;
