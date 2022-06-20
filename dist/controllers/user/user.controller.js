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
exports.loginController = exports.createUserController = void 0;
const user_service_1 = require("../../services/user/user.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("oi");
        const token = req.headers.authorization;
        const currentUser = req.newUser;
        const user = yield (0, user_service_1.createUserService)(req.body, currentUser);
        return res.status(user.status).json(user.message);
    }
    catch (err) {
        console.error(err);
    }
});
exports.createUserController = createUserController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield (0, user_service_1.loginService)(req.body);
        return res.status(login.status).json(login.message);
    }
    catch (err) {
        console.error(err);
    }
});
exports.loginController = loginController;
//# sourceMappingURL=user.controller.js.map