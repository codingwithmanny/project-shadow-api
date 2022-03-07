"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var helpers_1 = require("../utils/helpers");
// Middleware
// ========================================================
var authMiddleware = function (req, res, next) {
    var _a;
    try {
        var user = (0, jsonwebtoken_1.verify)("".concat((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '')), "".concat(process.env.SUPABASE_JWT_SECRET));
        req.user = user;
    }
    catch (error) {
        console.log({ error: error });
        return res.status(401).json((0, helpers_1.buildErrorResponse)('Forbidden'));
    }
    next();
};
// Exports
// ========================================================
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map