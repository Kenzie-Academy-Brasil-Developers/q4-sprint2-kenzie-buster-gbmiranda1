import { IUserCreate, IUser } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { ILogin } from "../../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUserService = async (
  body: IUserCreate,
  currentUser: IUser
) => {
  const userRepository = AppDataSource.getRepository(User);

  const allowedKeys = ["name", "email", "password"];
  const notKeys = [];

  if (body.isAdm && !currentUser) {
    return { status: 401, message: { error: "Missing Admin Permission" } };
  }

  for (let i = 0; i < allowedKeys.length; i++) {
    if (!Object.keys(body).includes(allowedKeys[i])) {
      notKeys.push(allowedKeys[i]);
    }
  }

  if (notKeys.length > 0) {
    let result = [];
    for (let i = 0; i < notKeys.length; i++) {
      result.push(`${notKeys[i]} is a required field`);
    }
    return { status: 401, message: { error: result } };
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  const user = new User();
  user.name = body.name;
  user.email = body.email.toLowerCase();
  user.password = hashPassword;
  user.isAdm = body.isAdm;
  console.log(user);
  userRepository.create(user);
  await userRepository.save(user);

  const { password, ...removePassword } = user;

  return { status: 201, message: removePassword };
};

export const loginService = async (body: ILogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: body.email,
    },
  });

  const allowedKeys = ["email", "password"];

  if (!body.password) {
    return {
      status: 404,
      message: { error: "Password required" },
    };
  }

  if (!body.email) {
    return {
      status: 404,
      message: { error: "Email required" },
    };
  }

  if (!user) {
    return {
      status: 404,
      message: { error: "Email or Password doesn't matches." },
    };
  }

  const compare = await bcrypt.compare(body.password, user.password);

  if (!compare) {
    return {
      status: 404,
      message: { error: "Email or Password doesn't matches." },
    };
  }

  const token = jwt.sign({ user: user }, String(process.env.SECRET_KEY), {
    expiresIn: process.env.EXPIRES_IN,
  });

  return { status: 200, message: { token: token } };
};
