import { Router } from "express";

import {
  createUserController,
  loginController,
} from "../controllers/user/user.controller";
import { authUser } from "../middlewares/authUser.middleware";
import emailExistsMiddleware from "../middlewares/emailExists.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", emailExistsMiddleware, createUserController);
  routes.post("/login", loginController);

  return routes;
};
