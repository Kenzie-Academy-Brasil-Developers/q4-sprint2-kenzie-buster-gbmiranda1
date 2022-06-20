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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.createUserService = void 0;
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUserService = (body, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
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
    const hashPassword = yield bcrypt_1.default.hash(body.password, 10);
    console.log(hashPassword);
    const user = new user_entity_1.User();
    user.name = body.name;
    user.email = body.email.toLowerCase();
    user.password = hashPassword;
    user.isAdm = body.isAdm;
    console.log(user);
    userRepository.create(user);
    yield userRepository.save(user);
    const { password } = user, removePassword = __rest(user, ["password"]);
    return { status: 201, message: removePassword };
});
exports.createUserService = createUserService;
const loginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOne({
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
    const compare = yield bcrypt_1.default.compare(body.password, user.password);
    if (!compare) {
        return {
            status: 404,
            message: { error: "Email or Password doesn't matches." },
        };
    }
    const token = jsonwebtoken_1.default.sign({ user: user }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN,
    });
    return { status: 200, message: { token: token } };
});
exports.loginService = loginService;
//# sourceMappingURL=user.service.js.map