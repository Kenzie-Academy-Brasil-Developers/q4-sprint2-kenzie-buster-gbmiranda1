"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [path_1.default.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path_1.default.join(__dirname, "./migrations/**/*.{js,ts}")],
});
//# sourceMappingURL=data-source.js.map