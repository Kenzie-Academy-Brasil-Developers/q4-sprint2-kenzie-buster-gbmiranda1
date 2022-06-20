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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_service_1 = __importDefault(require("../../services/cart/cart.service"));
const cartPayController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pay = yield (0, cart_service_1.default)(req.newUser);
        return res.status(pay.status).json(pay.message);
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = cartPayController;
//# sourceMappingURL=cart.controller.js.map