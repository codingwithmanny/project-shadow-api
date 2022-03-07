// Imports
// ========================================================
import { PrismaClient, Prisma } from '@prisma/client';
import { BadRequest, NotFound } from '../../utils/errorHandlers';
import dictionary from '../../utils/dictionary.json';
import { User } from './types';

// Config
// ========================================================
const prisma = new PrismaClient();

// Queries
// ========================================================
/**
 *
 * @param param0
 * @returns
 */
export const QUERY_USERS = async ({
  query = null,
  take = 10,
  skip = 0,
  orderBy = 'id',
  sort = 'asc',
}: any) => {
  const optionOrderBy = ['id', 'username', 'email'].includes(orderBy)
    ? orderBy
    : 'id';
  const optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
  const options: Prisma.UserFindManyArgs = {};

  if (query) {
    options.where = {
      OR: [
        {
          username: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  options.orderBy = {
    [optionOrderBy]: optionSort,
  };

  const pagination = {
    query,
    take,
    skip,
    orderBy: optionOrderBy,
    sort: optionSort,
    total: await prisma.user.count(options as Prisma.UserCountArgs),
  };

  options.take = take;
  options.skip = skip;

  const data = await prisma.user.findMany(options);

  return { data, pagination };
};

/**
 *
 * @param id
 */
export const QUERY_USER = async (id: string) => {
  const data = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!data) throw new NotFound(dictionary.USERS.ERROR.READ.NOT_FOUND);

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const CREATE_USER = async (payload: {
  username: User['username'];
  email: User['email'];
}) => {
  console.log({ payload });
  if (
    await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    })
  ) {
    throw new BadRequest(dictionary.USERS.ERROR.CREATE.DUPLICATE);
  }

  const create = {
    email: payload.email as string,
    username: payload.username as string,
  };

  const data = await prisma.user.create({
    data: create,
  });

  return { data };
};

/**
 *
 * @param id
 * @param data
 * @returns
 */
export const UPDATE_USER = async (id: string, payload: Partial<User>) => {
  console.log({ payload });
  if (
    !(await prisma.user.findFirst({
      where: {
        id,
      },
    }))
  )
    return { data: null };

  const update: Partial<User> = {};

  if (payload?.username) {
    update.username = payload.username;
  }

  if (payload?.email) {
    update.email = payload.email;
  }

  if (Object.keys(payload)?.length > 0) {
    update.updatedAt = new Date();
  }

  const data = await prisma.user.update({
    where: {
      id,
    },
    data: update,
  });

  return { data };
};

/**
 *
 * @param payload
 */
export const UPSERT_USER = async (payload: Partial<User>) => {
  const user = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });

  const update: Partial<User> = {};

  if (payload?.email) {
    update.email = payload.email;
  }

  if (payload?.username) {
    update.username = payload.username;
  }

  if (Object.keys(payload)?.length > 0) {
    update.updatedAt = new Date();
  }

  if (!user) {
    const data = await prisma.user.create({
      data: {
        id: payload.id,
        username: `${payload?.username ?? payload?.email}`,
        email: `${payload?.email}`,
      },
    });

    return { data };
  }

  const data = await prisma.user.update({
    where: {
      id: user.id as string,
    },
    data: update,
  });

  return { data };
};

/**
 *
 * @param id
 */
export const DELETE_USER = async (id: string) => {
  if (
    !(await prisma.user.findFirst({
      where: {
        id,
      },
    }))
  )
    return { data: null };

  const data = await prisma.user.delete({
    where: {
      id,
    },
  });

  return { data };
};
