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
const data_source_1 = require("../../data-source");
const cart_entity_1 = require("../../entities/cart.entity");
const cartPayService = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
    const cart = yield cartRepository.find();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].user.id === newUser.id) {
            yield cartRepository.update(cart[i].id, { paid: true });
        }
    }
    const cartUpdate = yield cartRepository.find();
    const userCarts = [];
    for (let i = 0; i < cartUpdate.length; i++) {
        if (cartUpdate[i].user.id === newUser.id) {
            userCarts.push(cartUpdate[i]);
        }
    }
    return { status: 200, message: userCarts };
});
exports.default = cartPayService;
//# sourceMappingURL=cart.service.js.map