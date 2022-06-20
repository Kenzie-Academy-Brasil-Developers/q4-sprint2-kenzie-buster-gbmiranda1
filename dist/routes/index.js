"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const user_routes_1 = require("./user.routes");
const cart_routes_1 = require("./cart.routes");
const dvd_routes_1 = require("./dvd.routes");
const appRoutes = (app) => {
    app.use("/api/users", (0, user_routes_1.userRoutes)());
    app.use("/api/dvds", (0, dvd_routes_1.dvdRoutes)());
    app.use("/api/carts", (0, cart_routes_1.cartRoutes)());
};
exports.appRoutes = appRoutes;
//# sourceMappingURL=index.js.map