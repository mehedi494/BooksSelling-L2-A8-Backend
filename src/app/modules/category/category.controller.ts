import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAll();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived categories successfully',
    data: result,
  });
});
const single = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.single(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched category successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAll,
  single,
};
