import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import httpStatus from 'http-status';
import { UserService } from './user.service';

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived data successfully',
    data: result,
  });
});
const singleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await UserService.singleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived data successfully',
    data: result,
  });
});
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const data = req?.body;
  const result = await UserService.updateSingle(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update user data successfully',
    data: result,
  });
});
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;

  const result = await UserService.deleteSingle(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'deleted successfully',
    data: result,
  });
});

export const UserController = {
  getAll,
  singleUser,
  updateSingle,
  deleteSingle,
};
