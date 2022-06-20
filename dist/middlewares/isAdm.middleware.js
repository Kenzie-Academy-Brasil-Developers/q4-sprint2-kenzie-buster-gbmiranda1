"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmMiddleware = (req, res, next) => {
    if (req.newUser && !req.newUser.isAdm) {
        return res.status(401).json({ error: "Missing Admin Permission" });
    }
    next();
};
exports.default = isAdmMiddleware;
//# sourceMappingURL=isAdm.middleware.js.map