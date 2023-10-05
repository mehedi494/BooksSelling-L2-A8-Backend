import { orders } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (
  id: string,
  data: {
    userId: string;
    orderedBooks: { [key: string]: string | number }[];
  }
): Promise<orders> => {
  const existUser = await prisma.users.findUnique({
    where: { id },
  });
  const result = await prisma.orders.create({
    data: {
      userId: existUser?.id as string,
      orderedBooks: data.orderedBooks,
    },
  });

  return result;
};


const getAll = async (payload: JwtPayload): Promise<orders[]> => {
  const { userId, role } = payload;
  const user = await prisma.users.findUnique({
    where: { id: userId as string },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not exist');
  }

  if (user && role === 'admin') {
    const result = await prisma.orders.findMany({});
    console.log('as an admin');
    return result;
  }
  console.log('only same user');
  return await prisma.orders.findMany({
    where: { userId },
  });
};

export const OrderService = {
  createOrder,
  getAll,
};
