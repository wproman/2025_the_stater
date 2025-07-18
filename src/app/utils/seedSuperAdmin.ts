import bcrypt from "bcryptjs";
import {
  IAuthProvider,
  IUser,
  UserRole,
} from "../modules/users/user.interface";
import { User } from "../modules/users/user.models";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      email: process.env.SuperAdminEmail,
    });
    if (isSuperAdminExists) {
      console.log("Super Admin already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(
      process.env.SuperAdminPassword as string,
      10
    );
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: process.env.SuperAdminEmail as string,
    };
    const payload: IUser = {
      name: process.env.SuperAdminName as string,
      email: process.env.SuperAdminEmail as string,
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = new User(payload);
    await superAdmin.save();
    console.log("Super Admin created successfully", superAdmin);
  } catch (error) {
    console.log("Error creating Super Admin:", error);
  }
};
