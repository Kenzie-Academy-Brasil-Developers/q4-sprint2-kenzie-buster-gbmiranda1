import { Request, Response } from "express";
import {
  getDvdService,
  createDvdService,
  buyDvdService,
} from "../../services/dvd/dvd.service";

export const getDvdController = async (req: Request, res: Response) => {
  try {
    const dvd = await getDvdService();

    return res.status(dvd.status).json(dvd.message);
  } catch (err) {
    console.error(err);
  }
};

export const createDvdController = async (req: Request, res: Response) => {
  try {
    const dvd = await createDvdService(req.body, req.newUser);

    return res.status(dvd.status).json(dvd.message);
  } catch (err) {
    console.error(err);
  }
};

export const buyDvdController = async (req: Request, res: Response) => {
  try {
    const { dvdId } = req.params;
    const token = String(req.headers.authorization);

    const buyDvd = await buyDvdService(dvdId, req.newUser, req.body);

    return res.status(buyDvd.status).json(buyDvd.message);
  } catch (err) {
    console.error(err);
  }
};
