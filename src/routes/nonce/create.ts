// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
import { CREATE_NONCE } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateNonce = async (req: Request, res: Response) => {
  const {
    data: { nonce },
  } = await CREATE_NONCE(req.body);

  return res.json(
    buildSuccessResponse({
      nonce,
    }),
  );
};

// Middlewares
// ========================================================
router.post('/', body('formId').isString(), Validator, CreateNonce);

// Exports
// ========================================================
export default router;
