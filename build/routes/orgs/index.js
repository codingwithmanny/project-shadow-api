"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var express_1 = require("express");
var list_1 = __importDefault(require("./list"));
var create_1 = __importDefault(require("./create"));
var read_1 = __importDefault(require("./read"));
var update_1 = __importDefault(require("./update"));
var delete_1 = __importDefault(require("./delete"));
// Config
// ========================================================
var router = (0, express_1.Router)();
// Routes
// ========================================================
router.use(list_1.default);
router.use(create_1.default);
router.use(read_1.default);
router.use(update_1.default);
router.use(delete_1.default);
// Exports
// ========================================================
exports.default = router;
//# sourceMappingURL=index.js.map