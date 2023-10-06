import { users } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAll = async (): Promise<Partial<users | null>[]> => {
  const result = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      role: true,
      profileImg: true,
      review_rating: true,
      orders: true,
    },
    /* include: {
      orders: true,
      review_rating: true,
    }, */
  });

  return result;
};
const singleUser = async (id: string): Promise<Partial<users | null>> => {
  const result = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      address: true,
      contactNo: true,
      email: true,
      role: true,
      profileImg: true,
      review_rating: true,
      orders: true,
    },
    /* include: {
      orders: true,
      review_rating: true,
    }, */
  });

  return result;
};
const updateSingle = async (
  id: string,
  payload: Partial<users>
): Promise<Partial<users | null>> => {
  const result = await prisma.users.update({
    where: { id },
    data: payload,

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};
const deleteSingle = async (id: string): Promise<users | null> => {
  const result = await prisma.users.delete({
    where: { id },

    include: {
      orders: true,
      review_rating: true,
    },
  });

  return result;
};

export const UserService = {
  getAll,
  singleUser,
  updateSingle,
  deleteSingle,
};
