import { ProfileService } from './profile.service';
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getProfile = catchAsync(async (req: Request, res: Response) => {

      const result = await ProfileService.getProfile(req.user as JwtPayload);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Fetch profile successfull',
        data: result,
      });
    });
    export const ProfileController ={
        getProfile
    }