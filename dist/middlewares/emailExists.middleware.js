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
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const emailExistsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const emailExists = yield userRepository.findOneBy({
        email: (0, typeorm_1.Equal)(req.body.email),
    });
    if (emailExists) {
        return res.status(409).json({ error: "Email already exists." });
    }
    next();
});
exports.default = emailExistsMiddleware;
//# sourceMappingURL=emailExists.middleware.js.map