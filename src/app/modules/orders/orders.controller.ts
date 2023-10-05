import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./orders.service";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";


const createOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId
  console.log(req.user);
    const result = await OrderService.createOrder(id,req.body );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order place successfully',
      data: result,
    });
  });

const getAll = catchAsync(async (req: Request, res: Response) => {
  
    const result = await OrderService.getAll(req.user as JwtPayload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All order fetch successfull',
      data: result,
    });
  });

  export const OrderController ={
    createOrder,getAll
  }