"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: {
                        name: "JsonWebTokenError",
                        message: "jwt malformed",
                    },
                });
            }
            req.newUser = decoded.user;
        });
        next();
    }
    else {
        return res.status(401).json({
            message: "missing authorization token",
        });
    }
};
exports.authUser = authUser;
//# sourceMappingURL=authUser.middleware.js.map