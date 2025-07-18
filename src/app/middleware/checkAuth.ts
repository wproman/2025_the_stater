import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelper/AppError";
import { UserRole } from "../modules/users/user.interface";
import { JwtHelper } from "../utils/jwt";

const checAuth = (...authRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return next();
    }
    const verifyToken = JwtHelper.verifyToken(
      accessToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (!verifyToken) {
      res.status(401).json({ message: "Invalid token" });
      return next();
    }
    req.user = verifyToken;
    if (authRoles.length > 0 && !authRoles.includes(verifyToken.role)) {
      throw new AppError(`Unauthorized access ${verifyToken}`, 403);
    }
    next();
  };
};
export default checAuth;
