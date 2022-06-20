import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";
import { IDvdCreate } from "../../interfaces";
import { IUser, IQuantity } from "../../interfaces";
import { Stock } from "../../entities/stock.entity";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";

export const getDvdService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);

  const dvds = await dvdRepository.find();

  return { status: 200, message: dvds };
};

export const createDvdService = async (body: IDvdCreate, user: IUser) => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);
  console.log(body);

  const allowedKeys = ["name", "duration", "price", "quantity"];
  const notKeys = [];

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

  const stock = new Stock();
  stock.price = body.price;
  stock.quantity = body.quantity;
  stockRepository.create(stock);
  await stockRepository.save(stock);
  const dvd = new Dvd();
  dvd.name = body.name;
  dvd.duration = body.duration;
  dvd.stock = stock;
  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);
  return { status: 201, message: dvd };
};

export const buyDvdService = async (
  dvdId: string,
  newUser: IUser,
  body: IQuantity
) => {
  const allowedKeys = ["quantity"];
  const notKeys = [];

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

  const dvdRepository = AppDataSource.getRepository(Dvd);
  const userRepository = AppDataSource.getRepository(User);
  const stockRepository = AppDataSource.getRepository(Stock);
  const cartRepository = AppDataSource.getRepository(Cart);

  const dvd = await dvdRepository.findOneBy({
    id: dvdId,
  });

  if (!dvd) {
    return { status: 404, message: { error: "DVD not found." } };
  }

  const user = await userRepository.findOneBy({
    id: newUser.id,
  });

  const stock = await stockRepository.findOneBy({
    id: dvd?.stock.id,
  });

  if (dvd && body.quantity > dvd.stock.quantity) {
    return {
      status: 422,
      message: {
        error: `current stock: ${dvd.stock.quantity}, received demand: ${body.quantity}`,
      },
    };
  }

  if (stock && dvd && user) {
    await stockRepository.update(stock.id, {
      quantity: dvd.stock.quantity - body.quantity,
    });

    const cart = new Cart();
    cart.total = stock.price * body.quantity;
    cart.paid = false;
    cart.user = user;
    cart.dvd = dvd;

    cartRepository.create(cart);
    await cartRepository.save(cart);

    const newReturn = {
      id: cart.id,
      total: cart.total,
      paid: cart.paid,
      newUser: user,
      dvd,
    };

    return { status: 201, message: newReturn };
  }

  return { status: 400, message: { error: "Error" } };
};
