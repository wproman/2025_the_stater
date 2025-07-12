import { IUser } from "./user.interface";
import { User } from "./user.models";


const createUserService = async (payload: Partial<IUser>): Promise<IUser> => {
  if (!payload.name || !payload.email) {
    throw new Error("Name and email are required to create a user");
  }

  const user = await User.create(payload);
  return user;
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
};
