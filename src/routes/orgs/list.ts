// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_ORGS } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ListOrgs = async (req: Request, res: Response) => {
  const userId = `${req?.user?.sub ?? ''}`;

  const { data, pagination } = await QUERY_ORGS({
    query: req?.query?.q as string | undefined,
    take: req?.query?.take
      ? (parseInt(req.query.take as string, 0) as number)
      : undefined,
    skip: req?.query?.skip
      ? (parseInt(req.query.skip as string, 0) as number)
      : undefined,
    orderBy: req?.query?.orderBy as string | undefined,
    sort: req?.query?.sort as string | undefined,
    include: req?.query?.include as string | undefined,
    userId,
  });
  return res.json(buildSuccessResponse(data, pagination));
};

// Middlewares
// ========================================================
router.get('/', authMiddleware, ListOrgs);

// Exports
// ========================================================
export default router;
