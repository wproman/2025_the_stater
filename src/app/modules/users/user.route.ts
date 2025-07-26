import { Router } from "express";
import checAuth from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserRole } from "./user.interface";
import { updateUserSchemaZod, userSchemaZod } from "./user.validate.zod";


const router = Router();

router.post(  "/register",  validateRequest(userSchemaZod),UserController.createUser);
router.get(  "/all-user",  checAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),  UserController.getAllUsers);
router.patch(  "/:id", validateRequest(updateUserSchemaZod),  checAuth(...Object.values(UserRole)), UserController.updateUser);

export const UserRoutes = router;
