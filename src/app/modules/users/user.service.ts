import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, UserRole } from "./user.interface";
import { User } from "./user.models";

const createUserService = async (payload: Partial<IUser>): Promise<IUser> => {
  const { email, password, ...rest } = payload;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }
  const hashedPassword = bcrypt.hashSync(password as string, 10);

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const updateUserService = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError("User not found", 404);
  }

  if (
    decodedToken.role !== UserRole.SUPER_ADMIN &&
    decodedToken.role !== UserRole.ADMIN
  ) {
    throw new AppError("You are not authorized to update role", 403);
  }
  if (
    payload.role === UserRole.SUPER_ADMIN &&
    decodedToken.role !== UserRole.SUPER_ADMIN
  ) {
    throw new AppError("Only SUPER_ADMIN can assign SUPER_ADMIN role", 403);
  }

 // Prevent downgrading SUPER_ADMIN to any other role
if (
  isUserExist.role === UserRole.SUPER_ADMIN &&
  payload.role &&
  payload.role !== UserRole.SUPER_ADMIN
) {
  throw new AppError("SUPER_ADMIN role cannot be changed to another role", 403);
}

  if (payload.isDeleted || payload.isVerified || payload.isActive) {
    throw new AppError("You are not authorized to update this field", 403);
  }

  if (payload.password) {
    const hashedPassword = bcrypt.hashSync(payload.password as string, 10);
    payload.password = hashedPassword;
  }
  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

const getAllUsersService = async (): Promise<IUser[]> => {
  const users = await User.find();
  if (!users) {
    throw new Error("No users found");
  }
  return users;
};
export const UserService = {
  createUserService,
  getAllUsersService,
  updateUserService,
};
