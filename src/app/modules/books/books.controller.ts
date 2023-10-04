import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BooksService } from "./books.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { BooksSearchableField } from "./books.constants";
import { paginationFields } from "../../../constants/pagination";

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
    const id = req.params.categoryId
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

  export const BooksController ={
    createBook,getAllFromDb,byCategoryBook
  }