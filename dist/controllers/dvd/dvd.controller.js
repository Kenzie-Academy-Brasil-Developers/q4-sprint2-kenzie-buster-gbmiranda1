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
exports.buyDvdController = exports.createDvdController = exports.getDvdController = void 0;
const dvd_service_1 = require("../../services/dvd/dvd.service");
const getDvdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dvd = yield (0, dvd_service_1.getDvdService)();
        return res.status(dvd.status).json(dvd.message);
    }
    catch (err) {
        console.error(err);
    }
});
exports.getDvdController = getDvdController;
const createDvdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dvd = yield (0, dvd_service_1.createDvdService)(req.body, req.newUser);
        return res.status(dvd.status).json(dvd.message);
    }
    catch (err) {
        console.error(err);
    }
});
exports.createDvdController = createDvdController;
const buyDvdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dvdId } = req.params;
        const token = String(req.headers.authorization);
        const buyDvd = yield (0, dvd_service_1.buyDvdService)(dvdId, req.newUser, req.body);
        return res.status(buyDvd.status).json(buyDvd.message);
    }
    catch (err) {
        console.error(err);
    }
});
exports.buyDvdController = buyDvdController;
//# sourceMappingURL=dvd.controller.js.map