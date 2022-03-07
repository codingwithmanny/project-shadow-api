"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var helpers_1 = require("../utils/helpers");
// Middleware
// ========================================================
var Validator = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json((0, helpers_1.buildErrorResponse)(errors.array()));
    }
    next();
};
// Exports
// ========================================================
exports.default = Validator;
//# sourceMappingURL=validator.js.map