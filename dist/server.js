"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    var _a;
    console.log("Data Source initialized");
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    app_1.default.listen(port, () => {
        console.log(`App running on localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
//# sourceMappingURL=server.js.map