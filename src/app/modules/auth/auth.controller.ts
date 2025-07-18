/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const logingInfo = await AuthService.credentialslogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: logingInfo,
    });
  }
);

export const AuthController = {
  credentialsLogin,
};
