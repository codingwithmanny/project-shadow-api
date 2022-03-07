// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_ORG_HOOK } from './queries';
import authMiddleware from '../../middlewares/authMiddleware';
import { request } from 'undici';
import { HttpMethod } from 'undici/types/dispatcher';

// Config
// ========================================================
const router = Router();

const randomString = (len = 1) =>
  new Array(len * 2)
    .fill(1000)
    .map((x) =>
      Math.ceil(x * Math.random())
        .toString(36)
        .charAt(0),
    )
    .filter(Boolean)
    .sort(() => Math.random() - 0.5)
    .map((x, i) => (i % 2 === 0 ? x.toUpperCase() : x))
    .join('')
    .substr(0, len);

// Route
// ========================================================
const TestOrgHook = async (req: Request, res: Response) => {
  const userId = req?.user?.sub ?? undefined;
  const { data } = await QUERY_ORG_HOOK(req.params.id, userId);

  const dates = [null, `${new Date()}`];
  const json = {
    name: 'Test Name',
    method: (data?.method ?? 'get').toLocaleUpperCase() as HttpMethod,
    walletAddress: `0x${randomString(40)}`,
    validated: dates[Math.floor(Math.random() * 2)],
  };

  if (data.method === 'post') {
    const { statusCode, headers, body } = await request(`${data.url}`, {
      method: json.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    const jsonBody = await body.json();

    return res.json(
      buildSuccessResponse({
        statusCode,
        headers,
        body: jsonBody,
      }),
    );
  }

  const query = Object.keys(json)
    .map((attr) => {
      return `${attr}=${
        json[attr as 'method' | 'walletAddress' | 'validated']
      }`;
    })
    .join('&');

  const { statusCode, headers, body } = await request(`${data.url}?${query}`, {
    method: json.method,
  });

  const jsonBody = await body.json();

  return res.json(
    buildSuccessResponse({
      statusCode,
      headers,
      body: jsonBody,
    }),
  );
};

// Middlewares
// ========================================================
router.get('/:orgId/hooks/:id/test', authMiddleware, TestOrgHook);

// Exports
// ========================================================
export default router;
