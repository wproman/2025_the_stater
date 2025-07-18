import bcrypt from "bcryptjs";
import AppError from "../../errorHelper/AppError";
import { JwtHelper } from "../../utils/jwt";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.models";

const credentialslogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  // Here you would typically validate the credentials against a database
  // For demonstration purposes, we will assume the credentials are valid
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    isUserExist.password as string
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const JwtPayload = {
    email: isUserExist.email,

    role: isUserExist.role,
    id: isUserExist._id,
  };
  const accessToken = JwtHelper.generateToken(
    JwtPayload,
    process.env.JWT_SECRET as string,
    process.env.JWT_EXPIRATION
  );

  return {
    email,
    accessToken,
  };
};

export const AuthService = {
  credentialslogin,
};
