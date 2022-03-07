"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var express_1 = require("express");
var get_1 = __importDefault(require("./get"));
var post_1 = __importDefault(require("./post"));
// Config
// ========================================================
var router = (0, express_1.Router)();
// Routes
// ========================================================
router.use(get_1.default);
router.use(post_1.default);
// Exports
// ========================================================
exports.default = router;
//# sourceMappingURL=index.js.map