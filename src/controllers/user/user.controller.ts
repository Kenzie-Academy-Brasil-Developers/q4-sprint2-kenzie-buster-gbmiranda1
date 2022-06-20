import { Request, Response } from "express";
import {
  createUserService,
  loginService,
} from "../../services/user/user.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    console.log("oi");
    const token = req.headers.authorization;
    const currentUser = req.newUser;
    const user = await createUserService(req.body, currentUser);

    return res.status(user.status).json(user.message);
  } catch (err) {
    console.error(err);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const login = await loginService(req.body);

    return res.status(login.status).json(login.message);
  } catch (err) {
    console.error(err);
  }
};
