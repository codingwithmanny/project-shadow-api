"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var express_1 = require("express");
var create_1 = __importDefault(require("./create"));
// Config
// ========================================================
var router = (0, express_1.Router)();
// Routes
// ========================================================
router.use(create_1.default);
// Exports
// ========================================================
exports.default = router;
//# sourceMappingURL=index.js.map