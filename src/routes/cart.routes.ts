import { Router } from "express";

import cartPayController from "../controllers/cart/cart.controller";

import { authUser } from "../middlewares/authUser.middleware";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", authUser, cartPayController);

  return routes;
};
