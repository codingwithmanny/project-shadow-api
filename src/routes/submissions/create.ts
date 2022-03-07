// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import authMiddleware from '../../middlewares/authMiddleware';
import Validator from '../../middlewares/validator';
import { body } from 'express-validator';
// import { CREATE_ORG_MEMBER } from './queries';
import { QUERY_ORG_FROM_API_KEY } from '../forms/queries';
import { QUERY_NONCE } from '../nonce/queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateSubmisson = async (req: Request, res: Response) => {
  const payload = req.body;

  // Validate form and apiKey
  await QUERY_ORG_FROM_API_KEY(payload.formId, payload.apiKey);

  // Validate nonce
  await QUERY_NONCE(undefined, payload.nonce);

  // TODO: Validate signature

  // const { data } = await CREATE_ORG_MEMBER_WITH_FORM({
  //   formId: payload.formId,
  //   name: payload?.name ?? undefined,
  //   walletAddress: payload.walletAddress,
  //   signature: payload.signature,
  // });

  return res.json(buildSuccessResponse({ data: true }));
};

// Middlewares
// ========================================================
router.post(
  '/',
  body('formId').isString(),
  body('apiKey').isString(),
  body('nonce').isString(),
  body('name').optional(),
  body('walletAddress').isString(),
  body('signature').isString(),
  Validator,
  CreateSubmisson,
);

// Exports
// ========================================================
export default router;

// // Imports
// // ========================================================
// import { Router, Request, Response } from 'express';
// import { buildSuccessResponse } from '../../utils/helpers';
// import authMiddleware from '../../middlewares/authMiddleware';
// import Validator from '../../middlewares/validator';
// import { body } from 'express-validator';
// import { CREATE_ORG_MEMBER } from './queries';

// // Config
// // ========================================================
// const router = Router();

// // Route
// // ========================================================
// const CreateMember = async (req: Request, res: Response) => {
//   const userId = req?.user?.sub ?? undefined;

//   const { data } = await CREATE_ORG_MEMBER(
//     {
//       ...req.body,
//       orgId: req.params.id,
//     },
//     userId,
//   );

//   return res.json(buildSuccessResponse(data));
// };

// // Middlewares
// // ========================================================
// router.post(
//   '/:id/members',
//   authMiddleware,
//   body('name').optional(),
//   body('walletAddress').isString().isLength({ min: 3 }),
//   body('validated').optional(),
//   Validator,
//   CreateMember,
// );

// // Exports
// // ========================================================
// export default router;
