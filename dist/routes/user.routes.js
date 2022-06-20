"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user/user.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const emailExists_middleware_1 = __importDefault(require("../middlewares/emailExists.middleware"));
const isAdm_middleware_1 = __importDefault(require("../middlewares/isAdm.middleware"));
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("/register", emailExists_middleware_1.default, authUser_middleware_1.authUser, isAdm_middleware_1.default, user_controller_1.createUserController);
    routes.post("/login", user_controller_1.loginController);
    return routes;
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.routes.js.map