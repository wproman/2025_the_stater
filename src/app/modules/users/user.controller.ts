/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";


import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

// Create User Controller
const createUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userData = req.body;

    const newUser = await UserService.createUserService(userData);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
  }
);

// Get All Users Controller
const getAllUsers = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const users = await UserService.getAllUsersService();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.params.id;
   
    const verifiedToken = req.user
    const payload = req.body;
    const users = await UserService.updateUserService(
      userId,
      payload,
      verifiedToken
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  }
);

// Export controller
export const UserController = {
  createUser,
  getAllUsers,
  updateUser,
};
