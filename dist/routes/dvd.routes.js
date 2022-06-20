"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dvdRoutes = void 0;
const express_1 = require("express");
const dvd_controller_1 = require("../controllers/dvd/dvd.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const isAdm_middleware_1 = __importDefault(require("../middlewares/isAdm.middleware"));
const routes = (0, express_1.Router)();
const dvdRoutes = () => {
    routes.get("", dvd_controller_1.getDvdController);
    routes.post("/register", authUser_middleware_1.authUser, isAdm_middleware_1.default, dvd_controller_1.createDvdController);
    routes.post("/buy/:dvdId", authUser_middleware_1.authUser, dvd_controller_1.buyDvdController);
    return routes;
};
exports.dvdRoutes = dvdRoutes;
//# sourceMappingURL=dvd.routes.js.map