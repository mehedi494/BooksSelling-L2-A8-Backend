import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BooksSearchableField } from './books.constants';
import { BooksService } from './books.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.createBooks(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BooksSearchableField);
  const options = pick(req.query, paginationFields);

  const result = await BooksService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const byCategoryBook = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, BooksSearchableField);
  const id = req.params.categoryId;
  const options = pick(req.query, paginationFields);

  const result = await BooksService.byCategoryBook(id, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category wise book fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const singleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BooksService.singleBook(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'book fetched successfully',

    data: result,
  });
});

export const BooksController = {
  createBook,
  getAllFromDb,
  byCategoryBook,
  singleBook,
};
