import { users } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const getProfile = async (payload: JwtPayload): Promise<users | null> => {
  console.log(payload.userId);
  const result = await prisma.users.findUnique({
    where: { id: payload?.userId },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};
