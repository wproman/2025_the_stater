import { Types } from "mongoose";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export enum IsActive {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  DELETED = "deleted",
}
// auth provider
export interface IAuthProvider {
  provider: "google" | "credentials"; // google, facebook, etc.
  providerId: string;
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;

  auths: IAuthProvider[];
  role: UserRole;
  bookings?: Types.ObjectId[]; // Array of booking IDs
  guides?: Types.ObjectId[]; // Array of guide IDs
}
