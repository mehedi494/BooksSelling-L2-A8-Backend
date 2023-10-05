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

    return result;
  }
  const orders = await prisma.orders.findMany({where:{userId:userId as string}})
if( !orders.length && user.id !== orders[0]?.userId ){
  throw new ApiError(404,"not order found")
}
  return await prisma.orders.findMany({
    where: { userId },
  });
};

const getSingle = async (
  orderId: string,
  payload: JwtPayload
): Promise<orders | null> => {
  const { userId, role } = payload;
  const user = await prisma.users.findUnique({
    where: { id: userId as string },
  });
console.log(user?.id,role);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not exist');
  }

  if (user && role === 'admin') {
    const result = await prisma.orders.findUnique({where:{id: orderId}});

    return result;
  }
  const orders = await prisma.orders.findUnique({where:{id:userId as string}})
if(  user.id !== orders?.userId ){
  throw new ApiError(404,"not order found")
}
  return await prisma.orders.findUnique({
    where: { id: orderId },
  });
};

export const OrderService = {
  createOrder,
  getAll,
  getSingle,
};
