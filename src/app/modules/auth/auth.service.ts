import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginData, ILoginResponse } from '../user/user.interface';


/*........Auth Service...*/
const createUser = async (data: users): Promise<users> => {
  data.password = await bcrypt.hash(data.password, Number(11));
  const result = await prisma.users.create({
    data,

    include: {},
  });
  result.password = '';

  return result;
};

const loginUser = async (data: ILoginData): Promise<ILoginResponse> => {
  const { email, password } = data;
  const userExist = await prisma?.users?.findUnique({
    where: {
      email,
    },
  });

  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exits');
  }
  const savedPassword = userExist.password;
  const matchPass = await bcrypt.compare(password, savedPassword);
  if (!matchPass) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password');
  }

  const { id: userId, role } = userExist;
  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config?.jwt?.expires_in as string
  );

  return { token };
};

export const AuthService = {
    createUser,
    loginUser,

  };
  
