import { Request, Response, NextFunction } from "express";
import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const emailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const emailExists = await userRepository.findOneBy({
    email: Equal(req.body.email),
  });

  if (emailExists) {
    return res.status(409).json({ error: "Email already exists." });
  }
  next();
};

export default emailExistsMiddleware;
