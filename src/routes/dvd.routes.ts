import { Router } from "express";

import {
  getDvdController,
  createDvdController,
  buyDvdController,
} from "../controllers/dvd/dvd.controller";

import { authUser } from "../middlewares/authUser.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const routes = Router();

export const dvdRoutes = () => {
  routes.get("", getDvdController);
  routes.post("/register", authUser, isAdmMiddleware, createDvdController);
  routes.post("/buy/:dvdId", authUser, buyDvdController);

  return routes;
};
