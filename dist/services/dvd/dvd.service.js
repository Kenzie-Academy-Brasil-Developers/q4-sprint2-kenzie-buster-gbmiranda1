"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyDvdService = exports.createDvdService = exports.getDvdService = void 0;
const data_source_1 = require("../../data-source");
const dvd_entity_1 = require("../../entities/dvd.entity");
const stock_entity_1 = require("../../entities/stock.entity");
const user_entity_1 = require("../../entities/user.entity");
const cart_entity_1 = require("../../entities/cart.entity");
const getDvdService = () => __awaiter(void 0, void 0, void 0, function* () {
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const dvds = yield dvdRepository.find();
    return { status: 200, message: dvds };
});
exports.getDvdService = getDvdService;
const createDvdService = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const stockRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
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
    const stock = new stock_entity_1.Stock();
    stock.price = body.price;
    stock.quantity = body.quantity;
    stockRepository.create(stock);
    yield stockRepository.save(stock);
    const dvd = new dvd_entity_1.Dvd();
    dvd.name = body.name;
    dvd.duration = body.duration;
    dvd.stock = stock;
    dvdRepository.create(dvd);
    yield dvdRepository.save(dvd);
    return { status: 201, message: dvd };
});
exports.createDvdService = createDvdService;
const buyDvdService = (dvdId, newUser, body) => __awaiter(void 0, void 0, void 0, function* () {
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
    const dvdRepository = data_source_1.AppDataSource.getRepository(dvd_entity_1.Dvd);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const stockRepository = data_source_1.AppDataSource.getRepository(stock_entity_1.Stock);
    const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
    const dvd = yield dvdRepository.findOneBy({
        id: dvdId,
    });
    if (!dvd) {
        return { status: 404, message: { error: "DVD not found." } };
    }
    const user = yield userRepository.findOneBy({
        id: newUser.id,
    });
    const stock = yield stockRepository.findOneBy({
        id: dvd === null || dvd === void 0 ? void 0 : dvd.stock.id,
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
        yield stockRepository.update(stock.id, {
            quantity: dvd.stock.quantity - body.quantity,
        });
        const cart = new cart_entity_1.Cart();
        cart.total = stock.price * body.quantity;
        cart.paid = false;
        cart.user = user;
        cart.dvd = dvd;
        cartRepository.create(cart);
        yield cartRepository.save(cart);
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
});
exports.buyDvdService = buyDvdService;
//# sourceMappingURL=dvd.service.js.map