import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";


import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  });
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'log in successfully',
      data: result,
    });
  });


  export const UserController = {
    createUser,loginUser,
  }