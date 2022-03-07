// Imports
// ========================================================
import { PrismaClient, Prisma, Nonce } from '@prisma/client';
import { NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { NonceType } from './types';
import randToken from 'rand-token';
import { QUERY_ORG_FORM } from '../forms/queries';

// Config
// ========================================================
const prisma = new PrismaClient();

// Queries
// ========================================================
/**
 *
 * @param payload
 * @returns
 */
export const CREATE_NONCE = async (payload: {
  formId: NonceType['orgFormId'];
}) => {
  if (!(await (await QUERY_ORG_FORM(`${payload.formId}`)).data)) {
    throw new NotFound(dictionary.ORG_FORMS.ERROR.READ.NOT_FOUND);
  }

  const options: Prisma.NonceCreateArgs = {
    data: {
      orgFormId: `${payload.formId}`,
      nonce: randToken.uid(64),
    },
  };

  const data = await prisma.nonce.create(options);

  return { data };
};

/**
 *
 * @param id
 * @returns
 */
export const QUERY_NONCE = async (id?: string, nonce?: string) => {
  let options: Prisma.NonceFindFirstArgs = {};

  if (id) {
    options.where = {
      ...options.where,
      id,
    };
  }

  if (nonce) {
    options.where = {
      ...options.where,
      nonce,
    };
  }

  const data = await prisma.nonce.findFirst(options);

  if (!data) throw new NotFound(dictionary.NONCE.ERROR.READ.NOT_FOUND);

  return { data };
};
