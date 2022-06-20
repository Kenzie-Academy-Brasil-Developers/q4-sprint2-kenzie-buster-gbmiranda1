import express from "express";
import IUser from "../../src/interfaces/index";

declare global {
  namespace Express {
    interface Request {
      newUser: IUser;
    }
  }
}
