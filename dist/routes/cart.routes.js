"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart/cart.controller"));
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const routes = (0, express_1.Router)();
const cartRoutes = () => {
    routes.put("/pay", authUser_middleware_1.authUser, cart_controller_1.default);
    return routes;
};
exports.cartRoutes = cartRoutes;
//# sourceMappingURL=cart.routes.js.map