import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/appError";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token as string,
      String(process.env.SECRET_KEY),
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            error: {
              name: "JsonWebTokenError",
              message: "jwt malformed",
            },
          });
        }
        req.newUser = decoded.user;
      }
    );
    next();
  } else {
    return res.status(401).json({
      message: "missing authorization token",
    });
  }
};
